/**
 * KisanSetu-AI: API Client
 * SIH Problem Statement 26033 - DoCA
 * Uses relative URLs so the same frontend works both when served by the
 * local FastAPI backend (http://localhost:8000) and when deployed on Vercel
 * with a serverless / API proxy (vercel.json rewrites /api/* to the backend).
 */

// Leave empty to use same-origin relative URLs. This avoids CORS and lets
// Vercel's `rewrites` proxy /api/* to the live backend automatically.
const API_BASE = "";

const API = {
  async getStats() {
    const res = await fetch(`${API_BASE}/api/stats`);
    if (!res.ok) throw new Error('Failed to fetch platform stats');
    return await res.json();
  },

  async getProduce(filters = {}) {
    const query = new URLSearchParams();
    if (filters.category) query.append('category', filters.category);
    if (filters.search) query.append('search', filters.search);
    if (filters.organic) query.append('organic', filters.organic);
    if (filters.sort_by) query.append('sort_by', filters.sort_by);

    const res = await fetch(`${API_BASE}/api/produce?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch produce catalog');
    return await res.json();
  },

  async getProduceById(id) {
    const res = await fetch(`${API_BASE}/api/produce/${id}`);
    if (!res.ok) throw new Error('Failed to load produce details');
    return await res.json();
  },

  async createProduce(produceData) {
    const res = await fetch(`${API_BASE}/api/produce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produceData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to list produce');
    }
    return await res.json();
  },

  async deleteProduce(id) {
    const res = await fetch(`${API_BASE}/api/produce/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete produce listing');
    return await res.json();
  },

  async getOrders() {
    const res = await fetch(`${API_BASE}/api/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  },

  async createOrder(orderPayload) {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to place direct order');
    }
    return await res.json();
  },

  async updateOrderStatus(orderId, newStatus) {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  },

  async getForecast(crop = 'tomato', days = 14) {
    const res = await fetch(`${API_BASE}/api/forecast?crop=${encodeURIComponent(crop)}&days=${days}`);
    if (!res.ok) throw new Error('Failed to fetch AI forecast');
    return await res.json();
  },

  async getCorridors() {
    const res = await fetch(`${API_BASE}/api/logistics/corridors`);
    if (!res.ok) throw new Error('Failed to fetch corridors');
    return await res.json();
  },

  async optimizeRoute(corridorId = 'kolar-bengaluru') {
    const res = await fetch(`${API_BASE}/api/logistics/optimize?corridor_id=${encodeURIComponent(corridorId)}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to optimize logistics route');
    return await res.json();
  },

  async getPriceTransparency(crop = 'tomato') {
    const res = await fetch(`${API_BASE}/api/transparency?crop=${encodeURIComponent(crop)}`);
    if (!res.ok) throw new Error('Failed to fetch price transparency data');
    return await res.json();
  }
};