/**
 * KisanSetu-AI: Client-Side Mock API Service
 * SIH Problem Statement 26033 - DoCA
 * Pure frontend mock implementation providing zero-dependency, offline-ready mock data
 * for Marketplace, Farmer Portal, AI Forecasting, Smart Route Optimizer, and Price Transparency.
 */

// Initial Seed Data for Produce Catalog
let produceStore = [
  {
    id: 1,
    farmer_name: "Rameshwar Patil",
    farmer_phone: "+91 98231 44520",
    fpo_name: "Godavari Valley FPO",
    crop_name: "Nashik Red Onion",
    variety: "Garwa (Late Kharif)",
    category: "Vegetables",
    harvest_date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    quantity_kg: 4500,
    min_order_kg: 5,
    direct_price_per_kg: 28.0,
    traditional_mandi_price: 17.5,
    traditional_retail_price: 46.0,
    farm_location: "Pimpalgaon Baswant, Niphad",
    district: "Nashik",
    state: "Maharashtra",
    latitude: 20.1706,
    longitude: 73.9859,
    organic_certified: 0,
    quality_grade: "Grade A (45-55mm)",
    shelf_life_days: 21,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 2,
    farmer_name: "Manjunath Gowda",
    farmer_phone: "+91 94481 29831",
    fpo_name: "Kolar Horti Farmers Producer Co.",
    crop_name: "Roma Hybrid Tomato",
    variety: "Abhinav F1",
    category: "Vegetables",
    harvest_date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    quantity_kg: 3200,
    min_order_kg: 5,
    direct_price_per_kg: 32.0,
    traditional_mandi_price: 19.0,
    traditional_retail_price: 54.0,
    farm_location: "Srinivaspur Taluk",
    district: "Kolar",
    state: "Karnataka",
    latitude: 13.1367,
    longitude: 78.1291,
    organic_certified: 1,
    quality_grade: "Export Grade (Firm Red)",
    shelf_life_days: 10,
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 3,
    farmer_name: "Sukhwinder Singh",
    farmer_phone: "+91 98722 51042",
    fpo_name: "Malwa Agri Collective",
    crop_name: "Kufri Jyoti Potato",
    variety: "Table Grade A",
    category: "Vegetables",
    harvest_date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    quantity_kg: 8500,
    min_order_kg: 10,
    direct_price_per_kg: 22.0,
    traditional_mandi_price: 14.0,
    traditional_retail_price: 36.0,
    farm_location: "Samrala Tehsil",
    district: "Ludhiana",
    state: "Punjab",
    latitude: 30.9010,
    longitude: 75.8573,
    organic_certified: 0,
    quality_grade: "Grade A (Medium-Large)",
    shelf_life_days: 35,
    image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 4,
    farmer_name: "Venkatasubba Reddy",
    farmer_phone: "+91 98480 67123",
    fpo_name: "Amaravathi Spice Growers Association",
    crop_name: "Guntur Sannam Chilli",
    variety: "S4 Red Hot",
    category: "Spices",
    harvest_date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    quantity_kg: 1200,
    min_order_kg: 2,
    direct_price_per_kg: 145.0,
    traditional_mandi_price: 95.0,
    traditional_retail_price: 220.0,
    farm_location: "Tenali Rural Hub",
    district: "Guntur",
    state: "Andhra Pradesh",
    latitude: 16.3067,
    longitude: 80.4365,
    organic_certified: 1,
    quality_grade: "Export High-SHU",
    shelf_life_days: 60,
    image_url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 5,
    farmer_name: "Khemraj Thakur",
    farmer_phone: "+91 94180 88219",
    fpo_name: "Himalayan Orchards FPO",
    crop_name: "Royal Delicious Apples",
    variety: "Mountain Crispy",
    category: "Fruits",
    harvest_date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    quantity_kg: 2800,
    min_order_kg: 5,
    direct_price_per_kg: 110.0,
    traditional_mandi_price: 65.0,
    traditional_retail_price: 175.0,
    farm_location: "Kotkhai Apple Belt",
    district: "Shimla",
    state: "Himachal Pradesh",
    latitude: 31.1048,
    longitude: 77.1734,
    organic_certified: 1,
    quality_grade: "Grade Extra Fancy (Box Pack)",
    shelf_life_days: 25,
    image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 6,
    farmer_name: "Harpreet Singh Virk",
    farmer_phone: "+91 97800 12390",
    fpo_name: "Karnal Rice Exporters Cluster",
    crop_name: "Traditional Basmati 1121",
    variety: "Aged 1-Year Extra Long Grain",
    category: "Grains",
    harvest_date: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0],
    quantity_kg: 15000,
    min_order_kg: 25,
    direct_price_per_kg: 85.0,
    traditional_mandi_price: 58.0,
    traditional_retail_price: 135.0,
    farm_location: "Taraori Mandi Belt",
    district: "Karnal",
    state: "Haryana",
    latitude: 29.6857,
    longitude: 76.9905,
    organic_certified: 0,
    quality_grade: "Premium Export (Raw)",
    shelf_life_days: 365,
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 7,
    farmer_name: "Santosh Yadav",
    farmer_phone: "+91 99351 77312",
    fpo_name: "Kashi Green Agro FPO",
    crop_name: "Fresh Snowball Cauliflower",
    variety: "Pusa Deepali",
    category: "Vegetables",
    harvest_date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    quantity_kg: 2100,
    min_order_kg: 5,
    direct_price_per_kg: 24.0,
    traditional_mandi_price: 13.0,
    traditional_retail_price: 42.0,
    farm_location: "Rohania Block",
    district: "Varanasi",
    state: "Uttar Pradesh",
    latitude: 25.3176,
    longitude: 82.9739,
    organic_certified: 1,
    quality_grade: "Compact White Curd",
    shelf_life_days: 6,
    image_url: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 8,
    farmer_name: "Dattatraya Shinde",
    farmer_phone: "+91 98229 44109",
    fpo_name: "Solapur Anar Producer Co.",
    crop_name: "Bhagwa Pomegranate",
    variety: "Deep Red Arils",
    category: "Fruits",
    harvest_date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    quantity_kg: 4200,
    min_order_kg: 10,
    direct_price_per_kg: 95.0,
    traditional_mandi_price: 55.0,
    traditional_retail_price: 160.0,
    farm_location: "Sangola Tehsil",
    district: "Solapur",
    state: "Maharashtra",
    latitude: 17.6599,
    longitude: 75.9064,
    organic_certified: 1,
    quality_grade: "Super Grade (300g+ per fruit)",
    shelf_life_days: 18,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  }
];

// Initial Seed Data for Orders
let ordersStore = [
  {
    id: 1,
    tracking_code: "KS-CON-8921",
    buyer_name: "Ananya Sharma",
    buyer_type: "Consumer",
    buyer_phone: "+91 98112 34567",
    delivery_address: "Flat 402, Green Glen Layout, Bellandur",
    delivery_district: "Bengaluru Urban",
    delivery_lat: 12.9352,
    delivery_lon: 77.6245,
    total_amount: 960.0,
    total_quantity_kg: 30.0,
    consumer_savings: 380.0,
    farmer_extra_earnings: 290.0,
    payment_status: "Escrow Held (Secure)",
    delivery_status: "In Cold Transit",
    delivery_slot: "Tomorrow Morning 7 AM - 10 AM",
    items: [
      { id: 1, order_id: 1, produce_id: 2, crop_name: "Roma Hybrid Tomato", quantity_kg: 20.0, unit_price: 32.0, subtotal: 640.0, farmer_name: "Manjunath Gowda" },
      { id: 2, order_id: 1, produce_id: 1, crop_name: "Nashik Red Onion", quantity_kg: 10.0, unit_price: 28.0, subtotal: 280.0, farmer_name: "Rameshwar Patil" }
    ]
  },
  {
    id: 2,
    tracking_code: "KS-BUL-9403",
    buyer_name: "Taj Gateway Hotels Kitchen",
    buyer_type: "BulkBuyer",
    buyer_phone: "+91 80 6660 4545",
    delivery_address: "Residency Road, Central Logistics Dock",
    delivery_district: "Bengaluru Urban",
    delivery_lat: 12.9716,
    delivery_lon: 77.5946,
    total_amount: 13500.0,
    total_quantity_kg: 500.0,
    consumer_savings: 6800.0,
    farmer_extra_earnings: 5200.0,
    payment_status: "Escrow Held (Secure)",
    delivery_status: "Picked Up",
    delivery_slot: "Today Afternoon 2 PM - 5 PM",
    items: [
      { id: 3, order_id: 2, produce_id: 2, crop_name: "Roma Hybrid Tomato", quantity_kg: 300.0, unit_price: 30.4, subtotal: 9120.0, farmer_name: "Manjunath Gowda" },
      { id: 4, order_id: 2, produce_id: 3, crop_name: "Kufri Jyoti Potato", quantity_kg: 200.0, unit_price: 21.9, subtotal: 4380.0, farmer_name: "Sukhwinder Singh" }
    ]
  },
  {
    id: 3,
    tracking_code: "KS-CON-7712",
    buyer_name: "Vikram Mehra",
    buyer_type: "Consumer",
    buyer_phone: "+91 99001 55667",
    delivery_address: "A-12, Sector 15, Noida",
    delivery_district: "Gautam Buddha Nagar",
    delivery_lat: 28.5355,
    delivery_lon: 77.3910,
    total_amount: 640.0,
    total_quantity_kg: 20.0,
    consumer_savings: 240.0,
    farmer_extra_earnings: 180.0,
    payment_status: "Escrow Released to Farmer",
    delivery_status: "Delivered",
    delivery_slot: "Delivered yesterday",
    items: [
      { id: 5, order_id: 3, produce_id: 2, crop_name: "Roma Hybrid Tomato", quantity_kg: 20.0, unit_price: 32.0, subtotal: 640.0, farmer_name: "Manjunath Gowda" }
    ]
  }
];

// Crop base profiles for AI forecasting & price transparency
const CROP_PROFILES = {
  tomato: {
    name: "Tomato (Hybrid & Desi)",
    base_daily_demand_tons: 180.0,
    base_farmer_cost_kg: 14.5,
    base_fair_price_kg: 30.0,
    typical_retail_price_kg: 55.0,
    spoilage_risk: "High (Perishable: 5-8 days)",
    optimal_storage_temp: "12°C - 15°C",
    volatility_factor: 0.28,
    seasonality_period_days: 90,
    current_driver_insights: [
      "Hot weather in central plateau accelerating ripening cycle (+12% supply boost)",
      "Navratri & upcoming festive culinary surge (+24% institutional bulk demand)",
      "Direct FPO dispatch saves ₹18-22/kg in intermediate mandi commission cuts"
    ]
  },
  onion: {
    name: "Nashik Red Onion",
    base_daily_demand_tons: 320.0,
    base_farmer_cost_kg: 13.0,
    base_fair_price_kg: 27.0,
    typical_retail_price_kg: 48.0,
    spoilage_risk: "Moderate (Storable: 3-4 months)",
    optimal_storage_temp: "Dry ventilated ambient",
    volatility_factor: 0.20,
    seasonality_period_days: 120,
    current_driver_insights: [
      "Late Kharif arrivals stabilizing domestic supply buffers",
      "DoCA Price Stabilization Fund monitoring retail buffer stocks",
      "Direct aggregation removes 3 intermediary handovers between farm gate and retail"
    ]
  },
  potato: {
    name: "Kufri Jyoti Potato",
    base_daily_demand_tons: 450.0,
    base_farmer_cost_kg: 10.5,
    base_fair_price_kg: 21.0,
    typical_retail_price_kg: 38.0,
    spoilage_risk: "Low (Cold storage storable)",
    optimal_storage_temp: "4°C - 7°C",
    volatility_factor: 0.12,
    seasonality_period_days: 180,
    current_driver_insights: [
      "Cold storage outbound release matching steady urban kitchen demand",
      "High bulk processing demand from snack and frozen food manufacturers",
      "Farmer realization increased by +54% vs traditional distress farm-gate sales"
    ]
  },
  chilli: {
    name: "Guntur Sannam Red Chilli",
    base_daily_demand_tons: 45.0,
    base_farmer_cost_kg: 85.0,
    base_fair_price_kg: 145.0,
    typical_retail_price_kg: 230.0,
    spoilage_risk: "Low (Sun-dried)",
    optimal_storage_temp: "Dry cool storage",
    volatility_factor: 0.16,
    seasonality_period_days: 150,
    current_driver_insights: [
      "Spice export and domestic masala blending units sourcing aggressively",
      "High oleoresin content fetching premium grading on direct DoCA platform",
      "Traceability tagging commands 15% higher value directly to producer groups"
    ]
  },
  apple: {
    name: "Royal Delicious Apples",
    base_daily_demand_tons: 95.0,
    base_farmer_cost_kg: 52.0,
    base_fair_price_kg: 110.0,
    typical_retail_price_kg: 180.0,
    spoilage_risk: "Moderate (Cold-chain required)",
    optimal_storage_temp: "0°C - 2°C",
    volatility_factor: 0.18,
    seasonality_period_days: 180,
    current_driver_insights: [
      "Controlled Atmosphere (CA) storage release maintains peak crispness",
      "Urban consumer preference for wax-free natural Himalayan produce",
      "Cold logistics aggregation avoids middleman sorting losses of up to 20%"
    ]
  },
  rice: {
    name: "Traditional Basmati 1121",
    base_daily_demand_tons: 260.0,
    base_farmer_cost_kg: 46.0,
    base_fair_price_kg: 85.0,
    typical_retail_price_kg: 140.0,
    spoilage_risk: "Very Low (Aged grain)",
    optimal_storage_temp: "Dry silo",
    volatility_factor: 0.08,
    seasonality_period_days: 360,
    current_driver_insights: [
      "Bulk institutional purchasing for upcoming wedding and holiday season",
      "FPO collective milling removes private rice mill brokerage deductions",
      "Farmer gets direct online escrow release within 24 hours of hub check-in"
    ]
  }
};

// Logistics Corridors configuration
const CORRIDORS = {
  "kolar-bengaluru": {
    corridor_id: "kolar-bengaluru",
    name: "Kolar Horti Hub to Bengaluru Urban Cold Corridor",
    vehicle: "Refrigerated 4T Tata 407 (Temperature Controlled 8°C)",
    depot: { name: "Kolar Central Cold Aggregation Hub", lat: 13.1367, lon: 78.1291, type: "depot" },
    pickups: [
      { id: "P1", name: "Gowda Tomato Orchards (Niphad Road)", lat: 13.1580, lon: 78.1480, cargo_kg: 650, crop: "Roma Tomatoes", contact: "+91 94481 29831" },
      { id: "P2", name: "Srinivaspur Capsicum Greenhouses", lat: 13.2010, lon: 78.2100, cargo_kg: 420, crop: "Green Bell Peppers", contact: "+91 98450 11200" },
      { id: "P3", name: "Bangarapet Organic Veg Cluster", lat: 12.9800, lon: 78.2000, cargo_kg: 550, crop: "Leafy Vegetables", contact: "+91 99011 44556" },
      { id: "P4", name: "Malur Fruit Farmers Collective", lat: 13.0038, lon: 77.9400, cargo_kg: 800, crop: "Papaya & Melons", contact: "+91 97400 33211" }
    ],
    dropoffs: [
      { id: "D1", name: "Hoskote Outer Ring Distribution Center", lat: 13.0709, lon: 77.7981, cargo_kg: 600, type: "cross_dock", contact: "+91 80 2845 0000" },
      { id: "D2", name: "Whitefield Consumer Dark-Store", lat: 12.9698, lon: 77.7500, cargo_kg: 750, type: "retail_hub", contact: "+91 80 4411 2233" },
      { id: "D3", name: "Bellandur Green Valley Consumer Hub", lat: 12.9352, lon: 77.6245, cargo_kg: 1070, type: "consumer_hub", contact: "+91 98112 34567" }
    ]
  },
  "nashik-mumbai": {
    corridor_id: "nashik-mumbai",
    name: "Nashik Agro Cluster to Mumbai Metropolitan Corridor",
    vehicle: "Eicher Pro 9-Tonne Refrigerated Truck",
    depot: { name: "Pimpalgaon Baswant Onion Terminal", lat: 20.1706, lon: 73.9859, type: "depot" },
    pickups: [
      { id: "P1", name: "Niphad FPO Onion Godown", lat: 20.0800, lon: 74.1100, cargo_kg: 2200, crop: "Red Onions", contact: "+91 98231 44520" },
      { id: "P2", name: "Dindori Table Grape Vineyards", lat: 20.2000, lon: 73.8300, cargo_kg: 1400, crop: "Thomson Grapes", contact: "+91 98220 11990" },
      { id: "P3", name: "Sinnar Agro Cooperative Yard", lat: 19.8500, lon: 74.0000, cargo_kg: 1800, crop: "Pomegranate & Veg", contact: "+91 98229 33441" }
    ],
    dropoffs: [
      { id: "D1", name: "Kalyan Regional Food Sorting Center", lat: 19.2403, lon: 73.1305, cargo_kg: 2000, type: "cross_dock", contact: "+91 22 2541 7890" },
      { id: "D2", name: "Vashi APMC Direct-to-FPO Bay", lat: 19.0760, lon: 72.9980, cargo_kg: 2400, type: "wholesale_direct", contact: "+91 22 2789 1234" },
      { id: "D3", name: "Dadar Consumer Cooperative Market", lat: 19.0178, lon: 72.8478, cargo_kg: 1000, type: "consumer_hub", contact: "+91 98200 44551" }
    ]
  },
  "ludhiana-delhi": {
    corridor_id: "ludhiana-delhi",
    name: "Punjab Agri Belt to Delhi-NCR Food Security Grid",
    vehicle: "BharatBenz 12-Tonne Cold Carrier",
    depot: { name: "Ludhiana Central Agro Aggregation Yard", lat: 30.9010, lon: 75.8573, type: "depot" },
    pickups: [
      { id: "P1", name: "Samrala Cold Store (Potato Lots)", lat: 30.8400, lon: 76.1900, cargo_kg: 3500, crop: "Kufri Potatoes", contact: "+91 98722 51042" },
      { id: "P2", name: "Khanna Grain Growers Hub", lat: 30.7000, lon: 76.2100, cargo_kg: 4000, crop: "Organic Wheat", contact: "+91 98760 33412" },
      { id: "P3", name: "Karnal Basmati Direct Yard", lat: 29.6857, lon: 76.9905, cargo_kg: 2500, crop: "Basmati 1121", contact: "+91 97800 12390" }
    ],
    dropoffs: [
      { id: "D1", name: "Kundli Border Cold Hub (Delhi Entry)", lat: 28.8700, lon: 77.1200, cargo_kg: 3000, type: "cross_dock", contact: "+91 11 2780 4400" },
      { id: "D2", name: "Azadpur Direct Farmer Terminal", lat: 28.7100, lon: 77.1700, cargo_kg: 4500, type: "wholesale_direct", contact: "+91 11 2765 1199" },
      { id: "D3", name: "Okhla Urban Consumer Superhub", lat: 28.5300, lon: 77.2700, cargo_kg: 2500, type: "consumer_hub", contact: "+91 99100 88231" }
    ]
  }
};

// Helper function for Haversine distance calculation in KM
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371.0;
  const ROAD_TORTUOSITY = 1.25;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * ROAD_TORTUOSITY * 100) / 100;
}

const API = {
  async getStats() {
    const activeListings = produceStore.filter(p => p.status === 'Available');
    const totalStockKg = activeListings.reduce((s, p) => s + p.quantity_kg, 0);
    const uniqueFarmers = new Set(produceStore.map(p => p.farmer_name)).size;

    const totalOrders = ordersStore.length;
    const tradeVolume = ordersStore.reduce((s, o) => s + o.total_amount, 0);
    const consumerSavings = ordersStore.reduce((s, o) => s + o.consumer_savings, 0);
    const farmerGains = ordersStore.reduce((s, o) => s + o.farmer_extra_earnings, 0);

    return {
      active_listings_count: activeListings.length,
      available_stock_metric_tons: Math.round((totalStockKg / 1000.0) * 100) / 100,
      total_farmers_onboarded: uniqueFarmers + 128,
      total_orders_fulfilled: totalOrders + 42,
      total_trade_volume_inr: Math.round((tradeVolume + 145000) * 100) / 100,
      total_consumer_savings_inr: Math.round((consumerSavings + 42800) * 100) / 100,
      total_farmer_extra_earnings_inr: Math.round((farmerGains + 38400) * 100) / 100,
      middlemen_commissions_eliminated_inr: Math.round((consumerSavings + farmerGains + 81200) * 100) / 100,
      average_farmer_realization_boost_pct: 43.5,
      average_consumer_price_reduction_pct: 28.2,
      total_co2_emissions_saved_kg: 462.8
    };
  },

  async getProduce(filters = {}) {
    let list = produceStore.filter(p => p.status === 'Available');

    if (filters.category && filters.category.toLowerCase() !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.organic === 1 || filters.organic === '1') {
      list = list.filter(p => p.organic_certified === 1);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(p =>
        p.crop_name.toLowerCase().includes(q) ||
        p.farmer_name.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        (p.variety && p.variety.toLowerCase().includes(q))
      );
    }

    if (filters.sort_by === 'price_low') {
      list.sort((a, b) => a.direct_price_per_kg - b.direct_price_per_kg);
    } else if (filters.sort_by === 'price_high') {
      list.sort((a, b) => b.direct_price_per_kg - a.direct_price_per_kg);
    } else if (filters.sort_by === 'freshness') {
      list.sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date));
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return JSON.parse(JSON.stringify(list));
  },

  async getProduceById(id) {
    const item = produceStore.find(p => p.id === parseInt(id));
    if (!item) throw new Error('Produce listing not found');
    return JSON.parse(JSON.stringify(item));
  },

  async createProduce(produceData) {
    const newId = produceStore.length > 0 ? Math.max(...produceStore.map(p => p.id)) + 1 : 1;
    const directPrice = parseFloat(produceData.direct_price_per_kg) || 30.0;

    const newItem = {
      id: newId,
      farmer_name: produceData.farmer_name || 'Independent Farmer',
      farmer_phone: produceData.farmer_phone || '+91 90000 00000',
      fpo_name: produceData.fpo_name || 'Kisan Agro Collective',
      crop_name: produceData.crop_name,
      variety: produceData.variety || 'Hybrid A1',
      category: produceData.category || 'Vegetables',
      harvest_date: produceData.harvest_date || new Date().toISOString().split('T')[0],
      quantity_kg: parseFloat(produceData.quantity_kg) || 100,
      min_order_kg: parseFloat(produceData.min_order_kg) || 5,
      direct_price_per_kg: directPrice,
      traditional_mandi_price: produceData.traditional_mandi_price || Math.round(directPrice * 0.65 * 10) / 10,
      traditional_retail_price: produceData.traditional_retail_price || Math.round(directPrice * 1.55 * 10) / 10,
      farm_location: produceData.farm_location || 'Rural Hub',
      district: produceData.district || 'District Hub',
      state: produceData.state || 'State',
      latitude: produceData.latitude || 20.0,
      longitude: produceData.longitude || 74.0,
      organic_certified: produceData.organic_certified ? 1 : 0,
      quality_grade: produceData.quality_grade || 'Grade A',
      shelf_life_days: produceData.shelf_life_days || 7,
      image_url: produceData.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      status: 'Available'
    };

    produceStore.unshift(newItem);
    return JSON.parse(JSON.stringify(newItem));
  },

  async deleteProduce(id) {
    const targetId = parseInt(id);
    const index = produceStore.findIndex(p => p.id === targetId);
    if (index === -1) throw new Error('Produce listing not found');

    produceStore.splice(index, 1);
    return { message: 'Produce listing deleted successfully', id: targetId };
  },

  async getOrders() {
    return JSON.parse(JSON.stringify(ordersStore));
  },

  async createOrder(orderPayload) {
    if (!orderPayload.items || orderPayload.items.length === 0) {
      throw new Error('Cart cannot be empty');
    }

    let totalAmount = 0.0;
    let totalKg = 0.0;
    let consumerSavings = 0.0;
    let farmerExtraEarnings = 0.0;
    const validatedItems = [];

    for (const item of orderPayload.items) {
      const p = produceStore.find(prod => prod.id === item.produce_id);
      if (!p) throw new Error(`Produce ID ${item.produce_id} not found`);

      if (p.quantity_kg < item.quantity_kg) {
        throw new Error(`Requested ${item.quantity_kg} kg of ${p.crop_name} exceeds available ${p.quantity_kg} kg`);
      }

      let unitPrice = p.direct_price_per_kg;
      if (orderPayload.buyer_type === 'BulkBuyer' && item.quantity_kg >= 100) {
        unitPrice = Math.round(unitPrice * 0.95 * 100) / 100;
      }

      const subtotal = Math.round(unitPrice * item.quantity_kg * 100) / 100;
      totalAmount += subtotal;
      totalKg += item.quantity_kg;

      const tradRetailTotal = p.traditional_retail_price * item.quantity_kg;
      const tradMandiTotal = p.traditional_mandi_price * item.quantity_kg;

      consumerSavings += Math.max(0.0, tradRetailTotal - subtotal);
      farmerExtraEarnings += Math.max(0.0, subtotal - tradMandiTotal);

      validatedItems.append ? null : null; // JS array push
      validatedItems.push({
        produce_id: p.id,
        crop_name: p.crop_name,
        quantity_kg: item.quantity_kg,
        unit_price: unitPrice,
        subtotal: subtotal,
        farmer_name: p.farmer_name
      });
    }

    // Decrement stock
    for (const item of validatedItems) {
      const p = produceStore.find(prod => prod.id === item.produce_id);
      if (p) {
        p.quantity_kg -= item.quantity_kg;
        if (p.quantity_kg <= 0) p.status = 'Sold';
      }
    }

    const randomNum = Math.random().toString(36).substring(2, 6).toUpperCase();
    const trackingCode = `KS-${(orderPayload.buyer_type || 'CON').slice(0, 3).toUpperCase()}-${randomNum}`;
    const newOrderId = ordersStore.length > 0 ? Math.max(...ordersStore.map(o => o.id)) + 1 : 1;

    const newOrder = {
      id: newOrderId,
      tracking_code: trackingCode,
      buyer_name: orderPayload.buyer_name,
      buyer_type: orderPayload.buyer_type || 'Consumer',
      buyer_phone: orderPayload.buyer_phone,
      delivery_address: orderPayload.delivery_address,
      delivery_district: orderPayload.delivery_district || 'Bengaluru Urban',
      delivery_lat: 12.9716,
      delivery_lon: 77.5946,
      total_amount: Math.round(totalAmount * 100) / 100,
      total_quantity_kg: Math.round(totalKg * 100) / 100,
      consumer_savings: Math.round(consumerSavings * 100) / 100,
      farmer_extra_earnings: Math.round(farmerExtraEarnings * 100) / 100,
      payment_status: 'Escrow Held (Secure)',
      delivery_status: 'Order Placed',
      delivery_slot: orderPayload.delivery_slot || 'Standard Next-Day Morning',
      items: validatedItems
    };

    ordersStore.unshift(newOrder);
    return JSON.parse(JSON.stringify(newOrder));
  },

  async updateOrderStatus(orderId, newStatus) {
    const o = ordersStore.find(ord => ord.id === parseInt(orderId));
    if (!o) throw new Error('Order not found');

    o.delivery_status = newStatus;
    if (newStatus === 'Delivered') {
      o.payment_status = 'Escrow Released to Farmer';
    }

    return { message: 'Order status updated', order_id: parseInt(orderId), new_status: newStatus };
  },

  async getForecast(crop = 'tomato', days = 14) {
    const cropKey = (crop || 'tomato').toLowerCase().trim();
    const profile = CROP_PROFILES[cropKey] || CROP_PROFILES['tomato'];
    const today = new Date();
    const horizonDays = parseInt(days) || 14;

    // Historical 14 days
    const historicalPoints = [];
    const baseDemand = profile.base_daily_demand_tons;
    const vol = profile.volatility_factor;

    // Pseudo-random deterministic generator based on crop key
    let seed = 0;
    for (let i = 0; i < cropKey.length; i++) seed += cropKey.charCodeAt(i);
    const pseudoRandom = (i) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 14; i > 0; i--) {
      const dt = new Date(today.getTime() - i * 86400000);
      const dayOfYear = Math.floor((dt - new Date(dt.getFullYear(), 0, 0)) / 86400000);
      const seasonalMult = 1.0 + 0.18 * Math.sin(2 * Math.PI * dayOfYear / profile.seasonality_period_days);
      const noise = (pseudoRandom(i) - 0.5) * vol;
      const trendMult = 1.0 + (14 - i) * 0.006;
      const demand = Math.round(baseDemand * seasonalMult * trendMult * (1.0 + noise) * 10) / 10;
      const mandiArrival = Math.round(demand * (0.92 + pseudoRandom(i + 100) * 0.18) * 10) / 10;

      historicalPoints.push({
        date: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        full_date: dt.toISOString().split('T')[0],
        demand_tons: demand,
        mandi_arrival_tons: mandiArrival,
        type: 'historical'
      });
    }

    // Forecast Days
    const forecastPoints = [];
    const currentTrendBase = historicalPoints[historicalPoints.length - 1].demand_tons;

    for (let i = 1; i <= horizonDays; i++) {
      const dt = new Date(today.getTime() + i * 86400000);
      const dayOfYear = Math.floor((dt - new Date(dt.getFullYear(), 0, 0)) / 86400000);
      const isWeekend = (dt.getDay() === 0 || dt.getDay() === 6);
      const weekendBoost = isWeekend ? 1.15 : 1.0;
      const seasonalMult = 1.0 + 0.22 * Math.sin(2 * Math.PI * dayOfYear / profile.seasonality_period_days);
      const eventSurge = (i >= 4 && i <= 8) ? 1.25 : 1.0;

      const projected = Math.round((currentTrendBase * (1.0 + i * 0.008) * seasonalMult * weekendBoost * eventSurge / 1.18) * 10) / 10;
      const confidenceMargin = Math.round((projected * (0.05 + i * 0.006)) * 10) / 10;

      forecastPoints.push({
        date: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        full_date: dt.toISOString().split('T')[0],
        forecast_demand_tons: projected,
        upper_bound_tons: Math.round((projected + confidenceMargin) * 10) / 10,
        lower_bound_tons: Math.round((projected - confidenceMargin) * 10) / 10,
        surge_indicator: eventSurge > 1.1 ? 'High' : (isWeekend ? 'Moderate' : 'Normal'),
        type: 'forecast'
      });
    }

    const cost = profile.base_farmer_cost_kg;
    const fairDirectPrice = profile.base_fair_price_kg;
    const retailPrice = profile.typical_retail_price_kg;

    const minMsp = Math.round(cost * 1.50 * 10) / 10;
    const recommendedDirect = Math.round(fairDirectPrice * 10) / 10;
    const consumerMaxCeiling = Math.round(retailPrice * 0.82 * 10) / 10;

    const traditionalMandiCost = Math.round(cost * 1.15 * 10) / 10;
    const middlemenMargin = Math.round((retailPrice - traditionalMandiCost - 4.0) * 10) / 10;
    const kisansetuFarmerGain = Math.round((recommendedDirect - traditionalMandiCost) * 10) / 10;
    const kisansetuConsumerSavings = Math.round((retailPrice - (recommendedDirect + 3.5)) * 10) / 10;

    const avgForecastDemand = Math.round((forecastPoints.reduce((s, p) => s + p.forecast_demand_tons, 0) / forecastPoints.length) * 10) / 10;
    const marketStatus = avgForecastDemand > baseDemand * 1.10 ? 'Surge Demand Expected' : 'Steady Demand';

    return {
      crop_key: cropKey,
      crop_name: profile.name,
      horizon_days: horizonDays,
      spoilage_risk: profile.spoilage_risk,
      optimal_storage_temp: profile.optimal_storage_temp,
      market_status: marketStatus,
      historical_series: historicalPoints,
      forecast_series: forecastPoints,
      price_band: {
        cost_of_production_kg: cost,
        swaminathan_msp_benchmark_kg: minMsp,
        recommended_farmer_price_kg: recommendedDirect,
        consumer_ceiling_price_kg: consumerMaxCeiling,
        traditional_mandi_farmer_price_kg: traditionalMandiCost,
        traditional_retail_price_kg: retailPrice,
        middlemen_spread_rupees: middlemenMargin,
        farmer_extra_earning_rupees: kisansetuFarmerGain,
        farmer_earning_increase_pct: Math.round((kisansetuFarmerGain / traditionalMandiCost) * 1000) / 10,
        consumer_savings_rupees: kisansetuConsumerSavings,
        consumer_savings_pct: Math.round((kisansetuConsumerSavings / retailPrice) * 1000) / 10
      },
      driver_insights: profile.current_driver_insights,
      actionable_farmer_advice: `FPOs with ready ${profile.name} harvest are advised to aggregate and lock in direct bulk dispatches over the next 5-9 days. Projected urban demand is expected to average ${avgForecastDemand} Tons/day. Direct selling on KisanSetu yields an extra ₹${kisansetuFarmerGain}/kg directly to your bank account.`
    };
  },

  async getCorridors() {
    return Object.keys(CORRIDORS).map(cid => {
      const c = CORRIDORS[cid];
      return { id: cid, name: c.name, vehicle: c.vehicle, depot: c.depot.name };
    });
  },

  async optimizeRoute(corridorId = 'kolar-bengaluru') {
    const cid = CORRIDORS[corridorId] ? corridorId : 'kolar-bengaluru';
    const data = CORRIDORS[cid];
    const depot = data.depot;
    const pickups = JSON.parse(JSON.stringify(data.pickups));
    const dropoffs = JSON.parse(JSON.stringify(data.dropoffs));

    let unoptimizedDistanceKm = 0.0;
    for (const p of pickups) {
      const dist = haversineKm(p.lat, p.lon, dropoffs[0].lat, dropoffs[0].lon);
      unoptimizedDistanceKm += dist * 2.0;
    }
    unoptimizedDistanceKm = Math.round(unoptimizedDistanceKm * 10) / 10;

    // Nearest Neighbor Pickup Ordering
    const remainingPickups = [...pickups];
    let currentNode = depot;
    const orderedPickups = [];

    while (remainingPickups.length > 0) {
      remainingPickups.sort((a, b) =>
        haversineKm(currentNode.lat, currentNode.lon, a.lat, a.lon) -
        haversineKm(currentNode.lat, currentNode.lon, b.lat, b.lon)
      );
      const bestP = remainingPickups.shift();
      orderedPickups.push(bestP);
      currentNode = bestP;
    }

    // Nearest Neighbor Dropoff Ordering
    const remainingDropoffs = [...dropoffs];
    const orderedDropoffs = [];

    while (remainingDropoffs.length > 0) {
      remainingDropoffs.sort((a, b) =>
        haversineKm(currentNode.lat, currentNode.lon, a.lat, a.lon) -
        haversineKm(currentNode.lat, currentNode.lon, b.lat, b.lon)
      );
      const bestD = remainingDropoffs.shift();
      orderedDropoffs.push(bestD);
      currentNode = bestD;
    }

    const routeStops = [];
    let totalKm = 0.0;
    let currentCargoKg = 0;
    const startTime = new Date();
    startTime.setHours(5, 0, 0, 0);
    let currentTime = new Date(startTime.getTime());

    routeStops.push({
      step: 1,
      stop_id: 'DEPOT',
      name: depot.name,
      lat: depot.lat,
      lon: depot.lon,
      type: 'depot',
      action: 'Vehicle Inspected & Cold-Chain Pre-cooled to 8°C',
      cargo_change_kg: 0,
      current_load_kg: 0,
      eta: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      leg_km: 0.0
    });

    let prevLoc = [depot.lat, depot.lon];

    orderedPickups.forEach((p, idx) => {
      const legDist = haversineKm(prevLoc[0], prevLoc[1], p.lat, p.lon);
      totalKm += legDist;
      const travelMins = Math.floor((legDist / 45.0) * 60) + 20;
      currentTime = new Date(currentTime.getTime() + travelMins * 60000);
      currentCargoKg += p.cargo_kg;

      routeStops.push({
        step: idx + 2,
        stop_id: p.id,
        name: p.name,
        lat: p.lat,
        lon: p.lon,
        type: 'farm_pickup',
        crop: p.crop,
        action: `Loaded ${p.cargo_kg} kg fresh ${p.crop} (Quality Grade verified)`,
        cargo_change_kg: `+${p.cargo_kg}`,
        current_load_kg: currentCargoKg,
        contact: p.contact,
        eta: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        leg_km: legDist
      });
      prevLoc = [p.lat, p.lon];
    });

    orderedDropoffs.forEach((d, idx) => {
      const legDist = haversineKm(prevLoc[0], prevLoc[1], d.lat, d.lon);
      totalKm += legDist;
      const travelMins = Math.floor((legDist / 50.0) * 60) + 25;
      currentTime = new Date(currentTime.getTime() + travelMins * 60000);
      const deliveredKg = d.cargo_kg;
      currentCargoKg = Math.max(0, currentCargoKg - deliveredKg);

      routeStops.push({
        step: idx + orderedPickups.length + 2,
        stop_id: d.id,
        name: d.name,
        lat: d.lat,
        lon: d.lon,
        type: 'delivery',
        action: `Offloaded ${deliveredKg} kg to buyers (Zero Middleman direct handover)`,
        cargo_change_kg: `-${deliveredKg}`,
        current_load_kg: currentCargoKg,
        contact: d.contact,
        eta: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        leg_km: legDist
      });
      prevLoc = [d.lat, d.lon];
    });

    totalKm = Math.round(totalKm * 10) / 10;
    const kmSaved = Math.round(Math.max(0.0, unoptimizedDistanceKm - totalKm) * 10) / 10;
    const fuelSavedLiters = Math.round((kmSaved / 5.2) * 10) / 10;
    const fuelCostSavedRupees = Math.round(fuelSavedLiters * 92.0);
    const co2SavedKg = Math.round(fuelSavedLiters * 2.68 * 10) / 10;
    const efficiencyGainPct = unoptimizedDistanceKm > 0 ? Math.round((kmSaved / unoptimizedDistanceKm) * 1000) / 10 : 0;

    return {
      corridor_id: cid,
      corridor_name: data.name,
      vehicle_type: data.vehicle,
      optimized_distance_km: totalKm,
      unoptimized_distance_km: unoptimizedDistanceKm,
      km_saved: kmSaved,
      fuel_saved_liters: fuelSavedLiters,
      fuel_cost_saved_rupees: fuelCostSavedRupees,
      co2_saved_kg: co2SavedKg,
      efficiency_gain_pct: efficiencyGainPct,
      total_transit_hours: Math.round(((currentTime - startTime) / 3600000.0) * 10) / 10,
      total_cargo_handled_kg: pickups.reduce((s, p) => s + p.cargo_kg, 0),
      waypoints: routeStops,
      available_corridors: Object.keys(CORRIDORS).map(id => ({ id: id, name: CORRIDORS[id].name }))
    };
  },

  async getPriceTransparency(crop = 'tomato') {
    const cropKey = (crop || 'tomato').toLowerCase().trim();
    const prof = CROP_PROFILES[cropKey] || CROP_PROFILES['tomato'];

    const farmerCost = prof.base_farmer_cost_kg;
    const tradMandiFarmer = Math.round(farmerCost * 1.15 * 10) / 10;
    const retail = prof.typical_retail_price_kg;

    const villageAgent = Math.round(retail * 0.08 * 10) / 10;
    const apmcCommission = Math.round(retail * 0.12 * 10) / 10;
    const interstateTransit = Math.round(retail * 0.10 * 10) / 10;
    const secondaryWholesaler = Math.round(retail * 0.15 * 10) / 10;
    const retailerMargin = Math.round((retail - tradMandiFarmer - villageAgent - apmcCommission - interstateTransit - secondaryWholesaler) * 10) / 10;

    const directFarmer = prof.base_fair_price_kg;
    const directLogistics = 4.5;
    const directPlatformFee = 1.5;
    const directConsumerPrice = directFarmer + directLogistics + directPlatformFee;

    const consumerSavings = Math.round((retail - directConsumerPrice) * 10) / 10;
    const farmerGain = Math.round((directFarmer - tradMandiFarmer) * 10) / 10;

    return {
      crop_name: prof.name,
      traditional_chain: {
        farmer_payout: tradMandiFarmer,
        village_middleman: villageAgent,
        mandi_agent_commission: apmcCommission,
        freight_broker: interstateTransit,
        secondary_wholesaler: secondaryWholesaler,
        local_retailer_markup: retailerMargin,
        final_consumer_price: retail
      },
      kisansetu_chain: {
        farmer_direct_payout: directFarmer,
        optimized_logistics: directLogistics,
        platform_escrow_fee: directPlatformFee,
        final_consumer_price: directConsumerPrice
      },
      impact_summary: {
        farmer_income_increase_rs: farmerGain,
        farmer_income_increase_pct: Math.round((farmerGain / tradMandiFarmer) * 1000) / 10,
        consumer_savings_rs: consumerSavings,
        consumer_savings_pct: Math.round((consumerSavings / retail) * 1000) / 10,
        intermediaries_eliminated: 4
      }
    };
  }
};
