/**
 * KisanSetu-AI: Master Application Controller
 * SIH Problem Statement 26033 - DoCA
 * Manages tab routing, role synchronization, live platform metrics, and toasts.
 */

const App = {
  init() {
    this.bindNavigation();
    this.bindRoleSelector();
    this.loadStats();

    // Initialize sub-modules
    Marketplace.init();
    FarmerPortal.init();
    Forecasting.init();
    Logistics.init();
    PriceTransparency.init();
  },

  bindNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        this.switchTab(targetTab);
      });
    });
  },

  switchTab(tabId) {
    this.activeTab = tabId;

    // Update tab buttons
    document.querySelectorAll('.nav-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    // Update view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `view-${tabId}`);
    });

    // Sub-module specific triggers on tab switch
    if (tabId === 'logistics' && mapInstance) {
      setTimeout(() => {
        mapInstance.invalidateSize();
      }, 200);
    } else if (tabId === 'forecasting') {
      setTimeout(() => {
        Forecasting.loadForecast();
      }, 100);
    } else if (tabId === 'transparency') {
      setTimeout(() => {
        PriceTransparency.loadData();
      }, 100);
    }
  },

  bindRoleSelector() {
    const roleSelect = document.getElementById('global-role-select');
    if (!roleSelect) return;

    roleSelect.addEventListener('change', (e) => {
      const role = e.target.value;
      if (role === 'farmer') {
        this.switchTab('farmer');
        this.showToast('Switched persona to Farmer / FPO Producer');
      } else if (role === 'consumer') {
        this.switchTab('marketplace');
        document.getElementById('mode-consumer-btn')?.click();
        this.showToast('Switched persona to Retail Consumer');
      } else if (role === 'bulk') {
        this.switchTab('marketplace');
        document.getElementById('mode-bulk-btn')?.click();
        this.showToast('Switched persona to Bulk Buyer (HoReCa / Supermarket)');
      } else if (role === 'logistics') {
        this.switchTab('logistics');
        this.showToast('Switched persona to Logistics & Cold Fleet Dispatcher');
      } else if (role === 'analyst') {
        this.switchTab('forecasting');
        this.showToast('Switched persona to DoCA Market Intelligence Analyst');
      }
    });
  },

  async loadStats() {
    try {
      const stats = await API.getStats();
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };

      setVal('stat-farmers-count', stats.total_farmers_onboarded.toLocaleString());
      setVal('stat-middlemen-wiped', `₹${(stats.middlemen_commissions_eliminated_inr / 100000).toFixed(2)} L`);
      setVal('stat-farmer-gain-pct', `+${stats.average_farmer_realization_boost_pct}%`);
      setVal('stat-consumer-saving-pct', `-${stats.average_consumer_price_reduction_pct}%`);
      setVal('stat-co2-saved', `${stats.total_co2_emissions_saved_kg} kg`);
    } catch (err) {
      console.warn('Could not refresh live stats:', err);
    }
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'warning') icon = '⚡';

    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
