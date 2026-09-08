/**
 * KisanSetu-AI: API Client
 * SIH Problem Statement 26033 - DoCA
 */

const API_BASE = '/api';

const API = {
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch platform stats');
    return await res.json();
  },

  async getProduce(filters = {}) {
    const query = new URLSearchParams();
    if (filters.category) query.append('category', filters.category);
    if (filters.search) query.append('search', filters.search);
    if (filters.organic) query.append('organic', filters.organic);
    if (filters.sort_by) query.append('sort_by', filters.sort_by);

    const res = await fetch(`${API_BASE}/produce?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch produce catalog');
    return await res.json();
  },

  async getProduceById(id) {
    const res = await fetch(`${API_BASE}/produce/${id}`);
    if (!res.ok) throw new Error('Failed to load produce details');
    return await res.json();
  },

  async createProduce(produceData) {
    const res = await fetch(`${API_BASE}/produce`, {
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
    const res = await fetch(`${API_BASE}/produce/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete produce listing');
    return await res.json();
  },

  async getOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  },

  async createOrder(orderPayload) {
    const res = await fetch(`${API_BASE}/orders`, {
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
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  },

  async getForecast(crop = 'tomato', days = 14) {
    const res = await fetch(`${API_BASE}/forecast?crop=${encodeURIComponent(crop)}&days=${days}`);
    if (!res.ok) throw new Error('Failed to fetch AI forecast');
    return await res.json();
  },

  async getCorridors() {
    const res = await fetch(`${API_BASE}/logistics/corridors`);
    if (!res.ok) throw new Error('Failed to fetch corridors');
    return await res.json();
  },

  async optimizeRoute(corridorId = 'kolar-bengaluru') {
    const res = await fetch(`${API_BASE}/logistics/optimize?corridor_id=${encodeURIComponent(corridorId)}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to optimize logistics route');
    return await res.json();
  },

  async getPriceTransparency(crop = 'tomato') {
    const res = await fetch(`${API_BASE}/transparency?crop=${encodeURIComponent(crop)}`);
    if (!res.ok) throw new Error('Failed to fetch price transparency data');
    return await res.json();
  }
};
