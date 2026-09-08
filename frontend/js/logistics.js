/**
 * KisanSetu-AI: Logistics & AI Route Optimization Module
 * SIH Problem Statement 26033 - DoCA
 * Leverages Leaflet.js to render interactive GIS multi-stop milk runs and savings analytics.
 */

let mapInstance = null;
let currentMarkers = [];
let routePolyline = null;
let currentCorridor = 'kolar-bengaluru';
let truckSimulationMarker = null;
let simulationInterval = null;

const Logistics = {
  init() {
    this.bindEvents();
    this.initMap();
    this.loadCorridorData();
  },

  bindEvents() {
    const corridorSelect = document.getElementById('logistics-corridor-select');
    if (corridorSelect) {
      corridorSelect.addEventListener('change', (e) => {
        currentCorridor = e.target.value;
        this.loadCorridorData();
      });
    }

    const reoptimizeBtn = document.getElementById('run-vrp-optimize-btn');
    if (reoptimizeBtn) {
      reoptimizeBtn.addEventListener('click', () => {
        this.runOptimizationAnimation();
      });
    }

    const simBtn = document.getElementById('simulate-truck-btn');
    if (simBtn) {
      simBtn.addEventListener('click', () => {
        this.simulateTruckMovement();
      });
    }
  },

  initMap() {
    const container = document.getElementById('logistics-map');
    if (!container || mapInstance) return;

    // Center on southern/central India initially
    mapInstance = L.map('logistics-map').setView([13.05, 77.9], 9);

    // Dark styled OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 18
    }).addTo(mapInstance);
  },

  async loadCorridorData() {
    try {
      const data = await API.optimizeRoute(currentCorridor);
      this.renderLogisticsUI(data);
      this.renderMapRoute(data);
    } catch (err) {
      console.error(err);
      App.showToast('Failed to load corridor route data', 'error');
    }
  },

  async runOptimizationAnimation() {
    const btn = document.getElementById('run-vrp-optimize-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⚡ Solving Multi-Stop VRP...';
    }

    try {
      const data = await API.optimizeRoute(currentCorridor);
      setTimeout(() => {
        this.renderLogisticsUI(data);
        this.renderMapRoute(data);
        App.showToast(`AI Route Optimization Complete: Saved ${data.km_saved} km and ${data.co2_saved_kg} kg CO2!`);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '⚡ Recalculate AI Route Optimization';
        }
      }, 600);
    } catch (err) {
      App.showToast(err.message, 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '⚡ Recalculate AI Route Optimization';
      }
    }
  },

  renderLogisticsUI(data) {
    // Header & vehicle info
    document.getElementById('corridor-name-title').textContent = data.corridor_name;
    document.getElementById('corridor-vehicle-tag').textContent = `🚛 ${data.vehicle_type}`;

    // Metrics mini cards
    document.getElementById('metric-dist-saved').textContent = `${data.km_saved} km`;
    document.getElementById('metric-efficiency-pct').textContent = `+${data.efficiency_gain_pct}%`;
    document.getElementById('metric-fuel-saved').textContent = `${data.fuel_saved_liters} L`;
    document.getElementById('metric-co2-saved').textContent = `${data.co2_saved_kg} kg`;
    document.getElementById('metric-fuel-cost-saved').textContent = `₹${data.fuel_cost_saved_rupees.toLocaleString()}`;
    document.getElementById('metric-cargo-total').textContent = `${data.total_cargo_handled_kg} kg`;

    // Waypoint Timeline list
    const timeline = document.getElementById('waypoints-timeline-list');
    if (!timeline) return;

    timeline.innerHTML = data.waypoints.map(w => {
      let icon = '📍';
      let borderCol = 'var(--color-blue)';
      if (w.type === 'depot') { icon = '🏢'; borderCol = '#3b82f6'; }
      else if (w.type === 'farm_pickup') { icon = '🚜'; borderCol = '#10b981'; }
      else if (w.type === 'delivery') { icon = '🛒'; borderCol = '#f59e0b'; }

      return `
        <div class="waypoint-node">
          <div class="waypoint-icon" style="border-color: ${borderCol};">
            ${icon}
          </div>
          <div class="waypoint-info">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="waypoint-title">${w.name}</span>
              <span style="font-size: 0.72rem; color: var(--color-saffron); font-weight: 700;">${w.eta}</span>
            </div>
            <div class="waypoint-action">${w.action}</div>
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); margin-top: 4px;">
              <span>Cumulative Load: <strong>${w.current_load_kg} kg</strong></span>
              <span>Leg: <strong>${w.leg_km} km</strong></span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderMapRoute(data) {
    if (!mapInstance) return;

    // Clear previous markers & lines
    currentMarkers.forEach(m => mapInstance.removeLayer(m));
    currentMarkers = [];
    if (routePolyline) {
      mapInstance.removeLayer(routePolyline);
      routePolyline = null;
    }
    if (truckSimulationMarker) {
      mapInstance.removeLayer(truckSimulationMarker);
      truckSimulationMarker = null;
    }
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }

    const latLngs = [];

    // Create custom pin icons using HTML
    data.waypoints.forEach(w => {
      const pos = [w.lat, w.lon];
      latLngs.push(pos);

      let pinHtml = `<div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px;">🏢</div>`;
      if (w.type === 'farm_pickup') {
        pinHtml = `<div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px;">🚜</div>`;
      } else if (w.type === 'delivery') {
        pinHtml = `<div style="background: #f59e0b; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px;">🛒</div>`;
      }

      const icon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: pinHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker(pos, { icon }).addTo(mapInstance);
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #111;">
          <strong>Stop ${w.step}: ${w.name}</strong><br/>
          <em>ETA: ${w.eta}</em><br/>
          <span style="color: #059669; font-weight: bold;">${w.action}</span>
        </div>
      `);
      currentMarkers.push(marker);
    });

    // Draw high visibility glowing route polyline
    routePolyline = L.polyline(latLngs, {
      color: '#10b981',
      weight: 5,
      opacity: 0.85,
      dashArray: '1, 8',
      lineCap: 'round'
    }).addTo(mapInstance);

    // Zoom and pan to fit all stops snugly
    mapInstance.fitBounds(routePolyline.getBounds(), { padding: [40, 40] });
  },

  simulateTruckMovement() {
    if (!mapInstance || currentMarkers.length === 0) return;

    if (truckSimulationMarker) {
      mapInstance.removeLayer(truckSimulationMarker);
    }
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }

    const stops = currentMarkers.map(m => m.getLatLng());
    let currentIdx = 0;

    const truckIcon = L.divIcon({
      className: 'truck-sim-marker',
      html: `<div style="background: #dc2626; color: #fff; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 0 15px rgba(220,38,38,0.8); display: flex; align-items: center; gap: 4px; width: max-content;">🚛 Reefer Milk Run</div>`,
      iconSize: [100, 30],
      iconAnchor: [50, 15]
    });

    truckSimulationMarker = L.marker(stops[0], { icon: truckIcon }).addTo(mapInstance);
    App.showToast('Simulating live cold-chain truck transit...');

    simulationInterval = setInterval(() => {
      currentIdx++;
      if (currentIdx >= stops.length) {
        clearInterval(simulationInterval);
        App.showToast('Reefer Milk Run Delivery Completed to all Buyers!');
        return;
      }
      truckSimulationMarker.setLatLng(stops[currentIdx]);
      currentMarkers[currentIdx].openPopup();
    }, 2000);
  }
};
