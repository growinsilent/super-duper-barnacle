/**
 * KisanSetu-AI: Farmer Portal Module
 * SIH Problem Statement 26033 - DoCA
 * Provides direct crop listing, AI price guidance, inventory management, and order fulfillment.
 */

const FarmerPortal = {
  init() {
    this.bindEvents();
    this.loadFarmerDashboard();
  },

  bindEvents() {
    // Open Add Produce Modal
    const openAddBtn = document.getElementById('open-add-produce-btn');
    const closeAddBtn = document.getElementById('close-add-produce-btn');
    const cancelAddBtn = document.getElementById('cancel-add-produce-btn');
    const addModal = document.getElementById('add-produce-modal');

    if (openAddBtn) {
      openAddBtn.addEventListener('click', () => {
        if (addModal) addModal.classList.add('active');
      });
    }
    if (closeAddBtn) {
      closeAddBtn.addEventListener('click', () => {
        if (addModal) addModal.classList.remove('active');
      });
    }
    if (cancelAddBtn) {
      cancelAddBtn.addEventListener('click', () => {
        if (addModal) addModal.classList.remove('active');
      });
    }

    // Add Produce Form Submit
    const form = document.getElementById('add-produce-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleProduceSubmit(e));
    }

    // Crop Selection change for live AI price recommendation helper
    const cropInput = document.getElementById('new-crop-name');
    if (cropInput) {
      cropInput.addEventListener('change', (e) => this.updatePriceGuidance(e.target.value));
    }
  },

  updatePriceGuidance(cropVal) {
    const guidanceBox = document.getElementById('farmer-price-guidance-box');
    const priceInput = document.getElementById('new-direct-price');
    if (!guidanceBox) return;

    const lower = cropVal.toLowerCase();
    let recMin = 25, recMax = 35;
    if (lower.includes('tomato')) { recMin = 28; recMax = 34; }
    else if (lower.includes('onion')) { recMin = 26; recMax = 32; }
    else if (lower.includes('potato')) { recMin = 20; recMax = 24; }
    else if (lower.includes('chilli')) { recMin = 140; recMax = 160; }
    else if (lower.includes('apple')) { recMin = 105; recMax = 125; }
    else if (lower.includes('rice')) { recMin = 80; recMax = 95; }

    guidanceBox.innerHTML = `
      <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm); padding: 10px; font-size: 0.8rem; color: var(--text-main);">
        💡 <strong>DoCA AI Price Recommendation:</strong> For <em>${cropVal}</em>, fair direct price is 
        <strong style="color: var(--color-primary-light);">₹${recMin} - ₹${recMax}/kg</strong>. 
        (Mandi middleman pays ~₹${Math.round(recMin * 0.65)}/kg).
      </div>
    `;

    if (priceInput && !priceInput.value) {
      priceInput.value = recMin;
    }
  },

  async loadFarmerDashboard() {
    try {
      const produceList = await API.getProduce();
      const orders = await API.getOrders();
      this.renderFarmerInventory(produceList);
      this.renderFarmerOrders(orders);
    } catch (err) {
      console.error(err);
    }
  },

  renderFarmerInventory(items) {
    const tbody = document.getElementById('farmer-inventory-tbody');
    const lotCountEl = document.getElementById('farmer-lot-count');
    const totalStockEl = document.getElementById('farmer-total-stock');
    if (!tbody) return;

    if (lotCountEl) lotCountEl.textContent = items.length;
    const totalKg = items.reduce((s, i) => s + i.quantity_kg, 0);
    if (totalStockEl) totalStockEl.textContent = `${(totalKg / 1000).toFixed(1)} MT`;

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px;">No active produce lots listed.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(p => `
      <tr>
        <td>
          <strong>${p.crop_name}</strong>
          <div style="font-size: 0.76rem; color: var(--text-muted);">${p.variety || ''}</div>
        </td>
        <td>${p.category}</td>
        <td><strong>${p.quantity_kg} kg</strong></td>
        <td>
          <span style="color: var(--color-primary-light); font-weight: 700;">₹${p.direct_price_per_kg}/kg</span>
          <div style="font-size: 0.72rem; color: var(--text-dim);">Trad Mandi: ₹${p.traditional_mandi_price}/kg</div>
        </td>
        <td>${p.farm_location}, ${p.district}</td>
        <td>
          <span class="badge-tag ${p.status === 'Available' ? 'badge-organic' : 'badge-grade'}">${p.status}</span>
        </td>
        <td>
          <button type="button" class="btn btn-secondary btn-sm" onclick="FarmerPortal.deleteLot(${p.id})">
            Remove
          </button>
        </td>
      </tr>
    `).join('');
  },

  renderFarmerOrders(orders) {
    const ordersList = document.getElementById('farmer-orders-container');
    if (!ordersList) return;

    if (orders.length === 0) {
      ordersList.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-muted);">No orders received yet.</div>`;
      return;
    }

    ordersList.innerHTML = orders.map(o => `
      <div class="glass-card" style="padding: 18px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="color: var(--color-saffron); font-weight: 700; font-size: 0.95rem;">${o.tracking_code}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">${o.buyer_type} • ${o.delivery_district}</span>
          </div>
          <span class="badge-tag badge-grade" style="color: #fff; background: rgba(59, 130, 246, 0.2); border-color: var(--color-blue);">
            🚚 ${o.delivery_status}
          </span>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
          <strong>Buyer:</strong> ${o.buyer_name} (${o.buyer_phone}) • <em>${o.delivery_slot}</em>
        </div>

        <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); padding: 10px; margin-bottom: 12px; font-size: 0.82rem;">
          <div style="display: flex; justify-content: space-between;">
            <span>Total Value: <strong>₹${o.total_amount.toLocaleString()}</strong> (${o.total_quantity_kg} kg)</span>
            <span style="color: var(--color-primary-light);">Farmer Direct Gain: <strong>+₹${o.farmer_extra_earnings.toLocaleString()}</strong></span>
          </div>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 4px;">
            Payment: <strong>${o.payment_status}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${o.delivery_status === 'Order Placed' ? `
            <button type="button" class="btn btn-primary btn-sm" onclick="FarmerPortal.updateOrderStatus(${o.id}, 'Picked Up')">
              📦 Confirm & Ready for Pickup
            </button>
          ` : ''}
          ${o.delivery_status === 'Picked Up' ? `
            <button type="button" class="btn btn-saffron btn-sm" onclick="FarmerPortal.updateOrderStatus(${o.id}, 'In Cold Transit')">
              ❄️ Handover to Cold Fleet
            </button>
          ` : ''}
          ${o.delivery_status === 'In Cold Transit' ? `
            <button type="button" class="btn btn-secondary btn-sm" onclick="FarmerPortal.updateOrderStatus(${o.id}, 'Delivered')">
              🏁 Confirm Customer Delivery (Release Escrow)
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');
  },

  async handleProduceSubmit(e) {
    e.preventDefault();
    const farmerName = document.getElementById('new-farmer-name')?.value.trim();
    const farmerPhone = document.getElementById('new-farmer-phone')?.value.trim();
    const fpoName = document.getElementById('new-fpo-name')?.value.trim() || 'Kisan Agro Collective';
    const cropName = document.getElementById('new-crop-name')?.value.trim();
    const variety = document.getElementById('new-variety')?.value.trim() || 'Hybrid A1';
    const category = document.getElementById('new-category')?.value || 'Vegetables';
    const harvestDate = document.getElementById('new-harvest-date')?.value || new Date().toISOString().split('T')[0];
    const qty = parseFloat(document.getElementById('new-quantity')?.value) || 100;
    const directPrice = parseFloat(document.getElementById('new-direct-price')?.value) || 30;
    const location = document.getElementById('new-location')?.value.trim();
    const district = document.getElementById('new-district')?.value.trim();
    const state = document.getElementById('new-state')?.value.trim();
    const isOrganic = document.getElementById('new-organic')?.checked ? 1 : 0;
    const grade = document.getElementById('new-grade')?.value || 'Grade A';

    if (!farmerName || !cropName || !directPrice || !district) {
      App.showToast('Please fill out required fields', 'error');
      return;
    }

    const payload = {
      farmer_name: farmerName,
      farmer_phone: farmerPhone,
      fpo_name: fpoName,
      crop_name: cropName,
      variety: variety,
      category: category,
      harvest_date: harvestDate,
      quantity_kg: qty,
      min_order_kg: 5,
      direct_price_per_kg: directPrice,
      farm_location: location,
      district: district,
      state: state,
      organic_certified: isOrganic,
      quality_grade: grade
    };

    try {
      await API.createProduce(payload);
      App.showToast(`Produce listing created for ${cropName}!`);
      document.getElementById('add-produce-modal')?.classList.remove('active');
      document.getElementById('add-produce-form')?.reset();
      this.loadFarmerDashboard();
      Marketplace.loadCatalog();
      App.loadStats();
    } catch (err) {
      console.error(err);
      App.showToast(err.message, 'error');
    }
  },

  async deleteLot(id) {
    if (!confirm('Are you sure you want to remove this active produce listing?')) return;
    try {
      await API.deleteProduce(id);
      App.showToast('Produce listing removed');
      this.loadFarmerDashboard();
      Marketplace.loadCatalog();
      App.loadStats();
    } catch (err) {
      App.showToast(err.message, 'error');
    }
  },

  async updateOrderStatus(orderId, nextStatus) {
    try {
      await API.updateOrderStatus(orderId, nextStatus);
      App.showToast(`Order status updated to: ${nextStatus}`);
      this.loadFarmerDashboard();
      App.loadStats();
    } catch (err) {
      App.showToast(err.message, 'error');
    }
  }
};
