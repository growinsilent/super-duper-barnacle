/**
 * KisanSetu-AI: Demand Forecasting & Fair Price Intelligence Module
 * SIH Problem Statement 26033 - DoCA
 * Leverages Chart.js to visualize ML demand forecasts and DoCA price corridors.
 */

let forecastChart = null;
let currentCrop = 'tomato';
let currentHorizon = 14;

const Forecasting = {
  init() {
    this.bindEvents();
    this.loadForecast();
  },

  bindEvents() {
    const cropSelect = document.getElementById('forecast-crop-select');
    if (cropSelect) {
      cropSelect.addEventListener('change', (e) => {
        currentCrop = e.target.value;
        this.loadForecast();
      });
    }

    const horizonBtns = document.querySelectorAll('.horizon-btn');
    horizonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        horizonBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentHorizon = parseInt(btn.dataset.days);
        this.loadForecast();
      });
    });
  },

  async loadForecast() {
    try {
      const data = await API.getForecast(currentCrop, currentHorizon);
      this.renderForecastUI(data);
      this.renderChart(data);
    } catch (err) {
      console.error(err);
      App.showToast('Failed to load AI forecast', 'error');
    }
  },

  renderForecastUI(data) {
    // Title and crop header
    const titleEl = document.getElementById('forecast-crop-title');
    if (titleEl) titleEl.textContent = `${data.crop_name} — AI Demand & Fair Price Prediction`;

    // Market status badge
    const statusBadge = document.getElementById('market-status-badge');
    if (statusBadge) {
      statusBadge.textContent = `⚡ ${data.market_status}`;
      statusBadge.className = data.market_status.includes('Surge') ? 'badge-tag badge-grade' : 'badge-tag badge-organic';
    }

    // Advice box
    const adviceEl = document.getElementById('forecast-advice-text');
    if (adviceEl) adviceEl.textContent = data.actionable_farmer_advice;

    // Price Band Widget
    const pb = data.price_band;
    document.getElementById('pb-farmer-cost').textContent = `₹${pb.cost_of_production_kg}/kg`;
    document.getElementById('pb-swaminathan-msp').textContent = `₹${pb.swaminathan_msp_benchmark_kg}/kg`;
    document.getElementById('pb-rec-direct').textContent = `₹${pb.recommended_farmer_price_kg}/kg`;
    document.getElementById('pb-consumer-ceiling').textContent = `₹${pb.consumer_ceiling_price_kg}/kg`;
    document.getElementById('pb-trad-retail').textContent = `₹${pb.traditional_retail_price_kg}/kg`;
    document.getElementById('pb-middlemen-spread').textContent = `₹${pb.middlemen_spread_rupees}/kg (${Math.round((pb.middlemen_spread_rupees / pb.traditional_retail_price_kg) * 100)}% of consumer price)`;

    // Driver Insights
    const driversList = document.getElementById('market-drivers-list');
    if (driversList) {
      driversList.innerHTML = data.driver_insights.map(insight => `
        <div class="market-driver-tag">
          🔹 ${insight}
        </div>
      `).join('');
    }
  },

  renderChart(data) {
    const ctx = document.getElementById('forecast-chart-canvas')?.getContext('2d');
    if (!ctx) return;

    // Build timeline labels & datasets
    const histLabels = data.historical_series.map(d => d.date);
    const foreLabels = data.forecast_series.map(d => d.date);
    const allLabels = [...histLabels, ...foreLabels];

    // Historical line: values for historical days, null for forecast days
    const histDemand = [
      ...data.historical_series.map(d => d.demand_tons),
      ...Array(foreLabels.length).fill(null)
    ];

    // Forecast line: connects to the last historical point
    const lastHistVal = data.historical_series[data.historical_series.length - 1].demand_tons;
    const foreDemand = [
      ...Array(histLabels.length - 1).fill(null),
      lastHistVal,
      ...data.forecast_series.map(d => d.forecast_demand_tons)
    ];

    const upperBound = [
      ...Array(histLabels.length - 1).fill(null),
      lastHistVal,
      ...data.forecast_series.map(d => d.upper_bound_tons)
    ];

    const lowerBound = [
      ...Array(histLabels.length - 1).fill(null),
      lastHistVal,
      ...data.forecast_series.map(d => d.lower_bound_tons)
    ];

    if (forecastChart) {
      forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: 'Historical Demand (MT/Day)',
            data: histDemand,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2.5,
            pointRadius: 3,
            tension: 0.3,
            fill: false
          },
          {
            label: 'AI Forecasted Demand (MT/Day)',
            data: foreDemand,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            borderWidth: 3,
            borderDash: [6, 4],
            pointRadius: 4,
            pointBackgroundColor: '#10b981',
            tension: 0.35,
            fill: false
          },
          {
            label: 'Upper Confidence Band (95%)',
            data: upperBound,
            borderColor: 'rgba(245, 158, 11, 0.4)',
            borderWidth: 1,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Lower Confidence Band (95%)',
            data: lowerBound,
            borderColor: 'rgba(245, 158, 11, 0.4)',
            borderWidth: 1,
            borderDash: [3, 3],
            pointRadius: 0,
            tension: 0.35,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' }
            }
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          },
          y: {
            title: { display: true, text: 'Metric Tons / Day', color: '#94a3b8' },
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }
};
