/**
 * KisanSetu-AI: Marketplace Module
 * SIH Problem Statement 26033 - DoCA
 * Manages Consumer & Bulk Buyer produce browsing, cart, and direct checkout.
 */

let allProduce = [];
let cart = [];
let currentBuyerMode = 'Consumer'; // 'Consumer' or 'BulkBuyer'
let activeCategory = 'all';

const Marketplace = {
  init() {
    this.bindEvents();
    this.loadCatalog();
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('marketplace-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterAndRender();
      });
    }

    // Category pills
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        this.filterAndRender();
      });
    });

    // Buyer mode toggle
    const consumerBtn = document.getElementById('mode-consumer-btn');
    const bulkBtn = document.getElementById('mode-bulk-btn');
    if (consumerBtn && bulkBtn) {
      consumerBtn.addEventListener('click', () => {
        consumerBtn.classList.add('active');
        bulkBtn.classList.remove('active');
        currentBuyerMode = 'Consumer';
        App.showToast('Switched to Consumer Mode (1-20 kg household orders)');
        this.renderCatalog();
        this.renderCart();
      });

      bulkBtn.addEventListener('click', () => {
        bulkBtn.classList.add('active');
        consumerBtn.classList.remove('active');
        currentBuyerMode = 'BulkBuyer';
        App.showToast('Switched to Bulk Buyer Mode (FPO wholesale discounts applied)');
        this.renderCatalog();
        this.renderCart();
      });
    }

    // Cart Drawer Toggle
    const cartTrigger = document.getElementById('cart-trigger-btn');
    const closeDrawerBtn = document.getElementById('close-cart-btn');
    const drawerOverlay = document.getElementById('cart-drawer-overlay');

    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => this.openCart());
    }
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => this.closeCart());
    }
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) this.closeCart();
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
    }

    // Order form submit
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleOrderSubmit(e));
    }

    const cancelCheckoutBtn = document.getElementById('cancel-checkout-btn');
    if (cancelCheckoutBtn) {
      cancelCheckoutBtn.addEventListener('click', () => this.closeCheckoutModal());
    }
  },

  async loadCatalog() {
    try {
      allProduce = await API.getProduce();
      this.renderCatalog();
    } catch (err) {
      console.error('Failed to load produce:', err);
      App.showToast('Could not fetch produce catalog', 'error');
    }
  },

  filterAndRender() {
    const searchVal = (document.getElementById('marketplace-search')?.value || '').toLowerCase().trim();
    const sortVal = document.getElementById('sort-select')?.value || 'recent';

    let filtered = allProduce.filter(item => {
      const matchCat = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = !searchVal ||
        item.crop_name.toLowerCase().includes(searchVal) ||
        item.farmer_name.toLowerCase().includes(searchVal) ||
        item.district.toLowerCase().includes(searchVal);
      return matchCat && matchSearch;
    });

    if (sortVal === 'price_low') {
      filtered.sort((a, b) => a.direct_price_per_kg - b.direct_price_per_kg);
    } else if (sortVal === 'price_high') {
      filtered.sort((a, b) => b.direct_price_per_kg - a.direct_price_per_kg);
    } else if (sortVal === 'freshness') {
      filtered.sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date));
    }

    this.renderCards(filtered);
  },

  renderCatalog() {
    this.filterAndRender();
  },

  renderCards(items) {
    const grid = document.getElementById('produce-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🌾</div>
          <h3>No farm produce matching your criteria</h3>
          <p style="margin-top: 6px;">Try clearing your filters or search keywords.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const isBulk = currentBuyerMode === 'BulkBuyer';
      const effectivePrice = isBulk ? Math.round(item.direct_price_per_kg * 0.95) : item.direct_price_per_kg;
      const savingsPerKg = Math.max(0, item.traditional_retail_price - effectivePrice);
      const savingsPct = Math.round((savingsPerKg / item.traditional_retail_price) * 100);
      const defaultQty = isBulk ? Math.max(50, item.min_order_kg) : Math.max(2, item.min_order_kg);

      return `
        <div class="produce-card" id="produce-card-${item.id}">
          <div class="produce-card-image-wrap">
            <img src="${item.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'}"
                 alt="${item.crop_name}" class="produce-card-img" loading="lazy" />
            <div class="produce-badges-top">
              ${item.organic_certified ? '<span class="badge-tag badge-organic">🌱 100% Organic</span>' : ''}
              <span class="badge-tag badge-grade">⭐ ${item.quality_grade}</span>
            </div>
            <div class="badge-shelf">⏱️ Fresh: ${item.harvest_date}</div>
          </div>

          <div class="produce-card-content">
            <div class="produce-farmer-meta">
              <span class="farmer-fpo-name">👨‍🌾 ${item.farmer_name}</span>
              <span style="color: var(--text-dim);">${item.fpo_name || 'Independent FPO'}</span>
            </div>

            <h3 class="produce-title">${item.crop_name}</h3>
            <div class="produce-variety">${item.variety || 'Premium Variety'}</div>

            <div class="produce-location">
              <span>📍 ${item.district}, ${item.state}</span>
              <span style="margin-left: auto; color: var(--color-primary); font-weight: 600;">📦 ${item.quantity_kg} kg left</span>
            </div>

            <div class="price-comparison-box">
              <div class="price-box-main">
                <div class="direct-price">
                  ₹${effectivePrice} <span>/ kg</span>
                </div>
                <div class="retail-mandi-compare">
                  Retail: ₹${item.traditional_retail_price}/kg
                </div>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span class="savings-chip">💰 Save ${savingsPct}% vs Supermarkets</span>
                <span style="font-size: 0.72rem; color: var(--color-saffron);">0% Middleman Fee</span>
              </div>
              <div class="price-detail-row">
                <span>Farmer Payout: <strong style="color: var(--color-primary-light);">₹${effectivePrice - 4}/kg</strong></span>
                <span>(Trad. Mandi pays only ₹${item.traditional_mandi_price}/kg)</span>
              </div>
            </div>

            <div class="card-action-footer">
              <div class="qty-control-wrap">
                <button type="button" class="qty-btn" onclick="Marketplace.adjustCardQty(${item.id}, -1)">-</button>
                <input type="number" id="qty-input-${item.id}" class="qty-input" value="${defaultQty}" min="${item.min_order_kg}" max="${item.quantity_kg}" />
                <button type="button" class="qty-btn" onclick="Marketplace.adjustCardQty(${item.id}, 1)">+</button>
              </div>
              <button type="button" class="btn btn-primary btn-add-cart" onclick="Marketplace.addToCart(${item.id})">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  adjustCardQty(produceId, delta) {
    const input = document.getElementById(`qty-input-${produceId}`);
    if (!input) return;
    const current = parseInt(input.value) || 1;
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 9999;
    const step = currentBuyerMode === 'BulkBuyer' ? 25 : 1;
    const nextVal = Math.max(min, Math.min(max, current + (delta * step)));
    input.value = nextVal;
  },

  addToCart(produceId) {
    const item = allProduce.find(p => p.id === produceId);
    if (!item) return;

    const qtyInput = document.getElementById(`qty-input-${produceId}`);
    const qty = parseInt(qtyInput ? qtyInput.value : 1);

    if (qty <= 0 || isNaN(qty)) {
      App.showToast('Please enter a valid quantity', 'error');
      return;
    }

    if (qty > item.quantity_kg) {
      App.showToast(`Only ${item.quantity_kg} kg available in stock`, 'warning');
      return;
    }

    const isBulk = currentBuyerMode === 'BulkBuyer';
    const effectivePrice = isBulk && qty >= 100 ? Math.round(item.direct_price_per_kg * 0.95) : item.direct_price_per_kg;

    const existingIndex = cart.findIndex(c => c.produceId === produceId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity = qty;
      cart[existingIndex].unitPrice = effectivePrice;
    } else {
      cart.push({
        produceId: item.id,
        cropName: item.crop_name,
        variety: item.variety,
        farmerName: item.farmer_name,
        quantity: qty,
        unitPrice: effectivePrice,
        retailPrice: item.traditional_retail_price,
        mandiPrice: item.traditional_mandi_price,
        imageUrl: item.image_url
      });
    }

    this.updateCartBadge();
    this.renderCart();
    App.showToast(`Added ${qty} kg ${item.crop_name} to cart!`);
  },

  updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
      const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  },

  openCart() {
    document.getElementById('cart-drawer')?.classList.add('active');
    document.getElementById('cart-drawer-overlay')?.classList.add('active');
    this.renderCart();
  },

  closeCart() {
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('cart-drawer-overlay')?.classList.remove('active');
  },

  renderCart() {
    const list = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    if (!list) return;

    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="font-size: 2.8rem; margin-bottom: 10px;">🧺</div>
          <p>Your direct basket is empty.</p>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Add fresh harvest produce directly from farmers.</span>
        </div>
      `;
      if (summaryContainer) summaryContainer.style.display = 'none';
      return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';

    let subtotal = 0;
    let totalKg = 0;
    let consumerSavings = 0;
    let farmerGain = 0;

    list.innerHTML = cart.map((item, idx) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const tradRetailCost = item.quantity * item.retailPrice;
      const tradMandiCost = item.quantity * item.mandiPrice;

      subtotal += itemSubtotal;
      totalKg += item.quantity;
      consumerSavings += Math.max(0, tradRetailCost - itemSubtotal);
      farmerGain += Math.max(0, itemSubtotal - tradMandiCost);

      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.cropName} (${item.quantity} kg)</div>
            <div class="cart-item-farmer">👨‍🌾 ${item.farmerName}</div>
            <div class="cart-item-price">₹${item.unitPrice}/kg • Subtotal: ₹${itemSubtotal.toLocaleString()}</div>
          </div>
          <button type="button" class="cart-item-remove" onclick="Marketplace.removeFromCart(${idx})" title="Remove item">
            🗑️
          </button>
        </div>
      `;
    }).join('');

    const directLogistics = Math.round(totalKg * 4.5);
    const platformFee = Math.round(subtotal * 0.03);
    const grandTotal = subtotal + directLogistics + platformFee;

    // Update summary UI
    document.getElementById('cart-subtotal-val').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cart-logistics-val').textContent = `₹${directLogistics.toLocaleString()}`;
    document.getElementById('cart-platform-val').textContent = `₹${platformFee.toLocaleString()}`;
    document.getElementById('cart-total-val').textContent = `₹${grandTotal.toLocaleString()}`;
    document.getElementById('cart-savings-val').textContent = `₹${consumerSavings.toLocaleString()}`;
    document.getElementById('cart-farmer-gain-val').textContent = `₹${farmerGain.toLocaleString()}`;
  },

  removeFromCart(index) {
    cart.splice(index, 1);
    this.updateCartBadge();
    this.renderCart();
  },

  openCheckoutModal() {
    if (cart.length === 0) {
      App.showToast('Cart is empty', 'warning');
      return;
    }
    this.closeCart();
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('active');
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
  },

  async handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('buyer-name-input')?.value.trim();
    const phone = document.getElementById('buyer-phone-input')?.value.trim();
    const address = document.getElementById('buyer-address-input')?.value.trim();
    const district = document.getElementById('buyer-district-input')?.value.trim() || 'Bengaluru Urban';
    const slot = document.getElementById('buyer-slot-select')?.value || 'Morning 7:00 AM - 10:00 AM';

    if (!name || !phone || !address) {
      App.showToast('Please fill out all delivery details', 'error');
      return;
    }

    const payload = {
      buyer_name: name,
      buyer_type: currentBuyerMode,
      buyer_phone: phone,
      delivery_address: address,
      delivery_district: district,
      delivery_slot: slot,
      items: cart.map(c => ({
        produce_id: c.produceId,
        quantity_kg: c.quantity
      }))
    };

    try {
      const submitBtn = document.getElementById('submit-order-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Securing Escrow & Dispatching...';
      }

      const orderResult = await API.createOrder(payload);

      this.closeCheckoutModal();
      this.showReceiptModal(orderResult);

      // Reset cart and reload catalog
      cart = [];
      this.updateCartBadge();
      this.renderCart();
      await this.loadCatalog();
      App.loadStats();

    } catch (err) {
      console.error(err);
      App.showToast(err.message, 'error');
    } finally {
      const submitBtn = document.getElementById('submit-order-btn');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔒 Confirm Order (Escrow Protected)';
      }
    }
  },

  showReceiptModal(order) {
    const receiptModal = document.getElementById('receipt-modal');
    const receiptBody = document.getElementById('receipt-modal-body');
    if (!receiptModal || !receiptBody) return;

    receiptBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 3.2rem; color: var(--color-primary); margin-bottom: 8px;">✅</div>
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--text-main);">Order Placed Successfully!</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">
          Tracking Code: <strong style="color: var(--color-saffron);">${order.tracking_code}</strong>
        </p>
      </div>

      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
        <h4 style="color: var(--color-primary-light); font-size: 0.95rem; margin-bottom: 6px;">Impact Created via Direct Procurement:</h4>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
          <span>Your Consumer Direct Savings:</span>
          <strong style="color: var(--color-primary-light);">₹${order.consumer_savings.toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
          <span>Extra Income Directly to Farmers:</span>
          <strong style="color: var(--color-saffron);">+₹${order.farmer_extra_earnings.toLocaleString()}</strong>
        </div>
      </div>

      <div style="background: var(--bg-surface-elevated); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--text-muted);">Buyer:</span>
          <strong>${order.buyer_name} (${order.buyer_type})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--text-muted);">Delivery Slot:</span>
          <strong>${order.delivery_slot}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: var(--text-muted);">Address:</span>
          <strong>${order.delivery_address}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px dashed var(--border-subtle); padding-top: 8px; margin-top: 8px;">
          <span style="color: var(--text-muted);">Total Paid (Escrow Held):</span>
          <strong style="font-size: 1.1rem; color: var(--text-main);">₹${order.total_amount.toLocaleString()}</strong>
        </div>
      </div>

      <button type="button" class="btn btn-primary" style="width: 100%;" onclick="document.getElementById('receipt-modal').classList.remove('active')">
        Done
      </button>
    `;

    receiptModal.classList.add('active');
  }
};
