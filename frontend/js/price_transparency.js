/**
 * KisanSetu-AI: Price Transparency & Intermediary Elimination Module
 * SIH Problem Statement 26033 - DoCA
 * Provides an interactive comparison of the traditional 5-layer middleman markup
 * vs the KisanSetu Direct Farmer-to-Buyer model.
 */

let currentTransparencyCrop = 'tomato';
let currentVolumeKg = 500;

const PriceTransparency = {
  init() {
    this.bindEvents();
    this.loadData();
  },

  bindEvents() {
    const cropSelect = document.getElementById('transparency-crop-select');
    if (cropSelect) {
      cropSelect.addEventListener('change', (e) => {
        currentTransparencyCrop = e.target.value;
        this.loadData();
      });
    }

    const slider = document.getElementById('volume-slider');
    const sliderVal = document.getElementById('volume-slider-display');
    if (slider) {
      slider.addEventListener('input', (e) => {
        currentVolumeKg = parseInt(e.target.value);
        if (sliderVal) sliderVal.textContent = `${currentVolumeKg.toLocaleString()} kg (${(currentVolumeKg / 1000).toFixed(1)} MT)`;
        this.updateCalculations();
      });
    }
  },

  cachedData: null,

  async loadData() {
    try {
      this.cachedData = await API.getPriceTransparency(currentTransparencyCrop);
      this.renderStaticSteps(this.cachedData);
      this.updateCalculations();
    } catch (err) {
      console.error(err);
      App.showToast('Failed to load transparency breakdown', 'error');
    }
  },

  renderStaticSteps(data) {
    const trad = data.traditional_chain;
    const direct = data.kisansetu_chain;

    // Traditional Steps
    document.getElementById('step-trad-farmer').textContent = `₹${trad.farmer_payout}/kg`;
    document.getElementById('step-trad-village').textContent = `+₹${trad.village_middleman}/kg`;
    document.getElementById('step-trad-mandi').textContent = `+₹${trad.mandi_agent_commission}/kg`;
    document.getElementById('step-trad-transit').textContent = `+₹${trad.freight_broker}/kg`;
    document.getElementById('step-trad-wholesaler').textContent = `+₹${trad.secondary_wholesaler}/kg`;
    document.getElementById('step-trad-retailer').textContent = `+₹${trad.local_retailer_markup}/kg`;
    document.getElementById('step-trad-final').textContent = `₹${trad.final_consumer_price}/kg`;

    // Direct Steps
    document.getElementById('step-direct-farmer').textContent = `₹${direct.farmer_direct_payout}/kg`;
    document.getElementById('step-direct-logistics').textContent = `+₹${direct.optimized_logistics}/kg`;
    document.getElementById('step-direct-platform').textContent = `+₹${direct.platform_escrow_fee}/kg`;
    document.getElementById('step-direct-final').textContent = `₹${direct.final_consumer_price}/kg`;
  },

  updateCalculations() {
    if (!this.cachedData) return;

    const data = this.cachedData;
    const trad = data.traditional_chain;
    const direct = data.kisansetu_chain;

    const tradTotalConsumerPaid = trad.final_consumer_price * currentVolumeKg;
    const tradFarmerReceived = trad.farmer_payout * currentVolumeKg;
    const tradMiddlemenCut = (trad.final_consumer_price - trad.farmer_payout) * currentVolumeKg;

    const directTotalConsumerPaid = direct.final_consumer_price * currentVolumeKg;
    const directFarmerReceived = direct.farmer_direct_payout * currentVolumeKg;

    const consumerSavingsRs = Math.max(0, tradTotalConsumerPaid - directTotalConsumerPaid);
    const farmerExtraGainRs = Math.max(0, directFarmerReceived - tradFarmerReceived);
    const savingsPct = Math.round((consumerSavingsRs / tradTotalConsumerPaid) * 100);
    const farmerGainPct = Math.round((farmerExtraGainRs / tradFarmerReceived) * 100);

    // Update dynamic calculation displays
    document.getElementById('calc-consumer-savings-rs').textContent = `₹${Math.round(consumerSavingsRs).toLocaleString()}`;
    document.getElementById('calc-consumer-savings-pct').textContent = `-${savingsPct}% Cheaper`;

    document.getElementById('calc-farmer-gain-rs').textContent = `+₹${Math.round(farmerExtraGainRs).toLocaleString()}`;
    document.getElementById('calc-farmer-gain-pct').textContent = `+${farmerGainPct}% Higher Income`;

    document.getElementById('calc-middlemen-wiped-rs').textContent = `₹${Math.round(tradMiddlemenCut).toLocaleString()}`;

    // Update comparison visual bar
    const tradFarmerPct = Math.round((trad.farmer_payout / trad.final_consumer_price) * 100);
    const directFarmerPct = Math.round((direct.farmer_direct_payout / direct.final_consumer_price) * 100);

    const tradBar = document.getElementById('bar-trad-farmer-share');
    const directBar = document.getElementById('bar-direct-farmer-share');

    if (tradBar) {
      tradBar.style.width = `${tradFarmerPct}%`;
      tradBar.textContent = `Farmer: ${tradFarmerPct}%`;
    }
    if (directBar) {
      directBar.style.width = `${directFarmerPct}%`;
      directBar.textContent = `Farmer: ${directFarmerPct}%`;
    }
  }
};
