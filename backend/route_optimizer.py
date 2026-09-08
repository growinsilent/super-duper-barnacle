"""
AI Logistics & Multi-Stop Route Optimizer Engine
KisanSetu-AI - SIH Problem Statement 26033 (DoCA)

Solves the Multi-Stop Agricultural Logistics Consolidation Problem (Milk Run VRP).
Aggregates fragmented farm-gate pickups into high-efficiency cold-chain corridors,
minimizing empty miles, transit delay, fuel burn, and CO2 emissions.
"""
import math
from datetime import datetime, timedelta

ROAD_TORTUOSITY_FACTOR = 1.25 # Real road distance vs straight-line Euclidean/Haversine
DIESEL_CONSUMPTION_KM_PER_LITER = 5.2 # Standard 3.5T - 7T commercial reefer truck
DIESEL_PRICE_PER_LITER = 92.0 # INR
CO2_KG_PER_LITER_DIESEL = 2.68 # Emission factor

# Predefined Indian Agri-Logistics Corridors for Demonstration
CORRIDORS = {
    "kolar-bengaluru": {
        "corridor_id": "kolar-bengaluru",
        "name": "Kolar Horti Hub to Bengaluru Urban Cold Corridor",
        "vehicle": "Refrigerated 4T Tata 407 (Temperature Controlled 8°C)",
        "depot": {"name": "Kolar Central Cold Aggregation Hub", "lat": 13.1367, "lon": 78.1291, "type": "depot"},
        "pickups": [
            {"id": "P1", "name": "Gowda Tomato Orchards (Niphad Road)", "lat": 13.1580, "lon": 78.1480, "cargo_kg": 650, "crop": "Roma Tomatoes", "contact": "+91 94481 29831"},
            {"id": "P2", "name": "Srinivaspur Capsicum Greenhouses", "lat": 13.2010, "lon": 78.2100, "cargo_kg": 420, "crop": "Green Bell Peppers", "contact": "+91 98450 11200"},
            {"id": "P3", "name": "Bangarapet Organic Veg Cluster", "lat": 12.9800, "lon": 78.2000, "cargo_kg": 550, "crop": "Leafy Vegetables", "contact": "+91 99011 44556"},
            {"id": "P4", "name": "Malur Fruit Farmers Collective", "lat": 13.0038, "lon": 77.9400, "cargo_kg": 800, "crop": "Papaya & Melons", "contact": "+91 97400 33211"}
        ],
        "dropoffs": [
            {"id": "D1", "name": "Hoskote Outer Ring Distribution Center", "lat": 13.0709, "lon": 77.7981, "cargo_kg": 600, "type": "cross_dock", "contact": "+91 80 2845 0000"},
            {"id": "D2", "name": "Whitefield Consumer Dark-Store", "lat": 12.9698, "lon": 77.7500, "cargo_kg": 750, "type": "retail_hub", "contact": "+91 80 4411 2233"},
            {"id": "D3", "name": "Bellandur Green Valley Consumer Hub", "lat": 12.9352, "lon": 77.6245, "cargo_kg": 1070, "type": "consumer_hub", "contact": "+91 98112 34567"}
        ]
    },
    "nashik-mumbai": {
        "corridor_id": "nashik-mumbai",
        "name": "Nashik Agro Cluster to Mumbai Metropolitan Corridor",
        "vehicle": "Eicher Pro 9-Tonne Refrigerated Truck",
        "depot": {"name": "Pimpalgaon Baswant Onion Terminal", "lat": 20.1706, "lon": 73.9859, "type": "depot"},
        "pickups": [
            {"id": "P1", "name": "Niphad FPO Onion Godown", "lat": 20.0800, "lon": 74.1100, "cargo_kg": 2200, "crop": "Red Onions", "contact": "+91 98231 44520"},
            {"id": "P2", "name": "Dindori Table Grape Vineyards", "lat": 20.2000, "lon": 73.8300, "cargo_kg": 1400, "crop": "Thomson Grapes", "contact": "+91 98220 11990"},
            {"id": "P3", "name": "Sinnar Agro Cooperative Yard", "lat": 19.8500, "lon": 74.0000, "cargo_kg": 1800, "crop": "Pomegranate & Veg", "contact": "+91 98229 33441"}
        ],
        "dropoffs": [
            {"id": "D1", "name": "Kalyan Regional Food Sorting Center", "lat": 19.2403, "lon": 73.1305, "cargo_kg": 2000, "type": "cross_dock", "contact": "+91 22 2541 7890"},
            {"id": "D2", "name": "Vashi APMC Direct-to-FPO Bay", "lat": 19.0760, "lon": 72.9980, "cargo_kg": 2400, "type": "wholesale_direct", "contact": "+91 22 2789 1234"},
            {"id": "D3", "name": "Dadar Consumer Cooperative Market", "lat": 19.0178, "lon": 72.8478, "cargo_kg": 1000, "type": "consumer_hub", "contact": "+91 98200 44551"}
        ]
    },
    "ludhiana-delhi": {
        "corridor_id": "ludhiana-delhi",
        "name": "Punjab Agri Belt to Delhi-NCR Food Security Grid",
        "vehicle": "BharatBenz 12-Tonne Cold Carrier",
        "depot": {"name": "Ludhiana Central Agro Aggregation Yard", "lat": 30.9010, "lon": 75.8573, "type": "depot"},
        "pickups": [
            {"id": "P1", "name": "Samrala Cold Store (Potato Lots)", "lat": 30.8400, "lon": 76.1900, "cargo_kg": 3500, "crop": "Kufri Potatoes", "contact": "+91 98722 51042"},
            {"id": "P2", "name": "Khanna Grain Growers Hub", "lat": 30.7000, "lon": 76.2100, "cargo_kg": 4000, "crop": "Organic Wheat", "contact": "+91 98760 33412"},
            {"id": "P3", "name": "Karnal Basmati Direct Yard", "lat": 29.6857, "lon": 76.9905, "cargo_kg": 2500, "crop": "Basmati 1121", "contact": "+91 97800 12390"}
        ],
        "dropoffs": [
            {"id": "D1", "name": "Kundli Border Cold Hub (Delhi Entry)", "lat": 28.8700, "lon": 77.1200, "cargo_kg": 3000, "type": "cross_dock", "contact": "+91 11 2780 4400"},
            {"id": "D2", "name": "Azadpur Direct Farmer Terminal", "lat": 28.7100, "lon": 77.1700, "cargo_kg": 4500, "type": "wholesale_direct", "contact": "+91 11 2765 1199"},
            {"id": "D3", "name": "Okhla Urban Consumer Superhub", "lat": 28.5300, "lon": 77.2700, "cargo_kg": 2500, "type": "consumer_hub", "contact": "+91 99100 88231"}
        ]
    }
}

def haversine_km(lat1, lon1, lat2, lon2):
    """
    Computes great-circle distance between two GPS coordinates in kilometers.
    """
    R = 6371.0 # Earth radius in km
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) *
         math.sin(delta_lambda / 2.0) ** 2)
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c * ROAD_TORTUOSITY_FACTOR, 2)

def solve_vrp_route(corridor_id: str = "kolar-bengaluru"):
    """
    Executes AI Multi-Stop Route Optimization for farm pickups and delivery nodes.
    Returns:
    - Sequence of optimized stops
    - Distance comparison (Unaggregated individual trips vs Consolidated Milk Run)
    - Fuel & Carbon emissions saved
    - Turn-by-turn itinerary with ETAs
    """
    if corridor_id not in CORRIDORS:
        corridor_id = "kolar-bengaluru"

    data = CORRIDORS[corridor_id]
    depot = data["depot"]
    pickups = data["pickups"]
    dropoffs = data["dropoffs"]

    # Calculate unoptimized distance:
    # If each farm pickup drove independently from farm to each delivery hub and returned:
    unoptimized_distance_km = 0.0
    for p in pickups:
        # Farm to main dropoff and back
        dist = haversine_km(p["lat"], p["lon"], dropoffs[0]["lat"], dropoffs[0]["lon"])
        unoptimized_distance_km += dist * 2.0
    unoptimized_distance_km = round(unoptimized_distance_km, 1)

    # Optimized Sequence: Depot -> Best Pickups Ordering (Nearest Neighbor) -> Best Dropoffs Ordering
    # 1. Order Pickups by proximity
    remaining_pickups = list(pickups)
    current_node = depot
    ordered_pickups = []

    while remaining_pickups:
        # Find closest pickup to current_node
        best_p = min(remaining_pickups, key=lambda p: haversine_km(current_node["lat"], current_node["lon"], p["lat"], p["lon"]))
        ordered_pickups.append(best_p)
        remaining_pickups.remove(best_p)
        current_node = best_p

    # 2. Order Dropoffs by proximity from the last pickup
    remaining_dropoffs = list(dropoffs)
    ordered_dropoffs = []

    while remaining_dropoffs:
        best_d = min(remaining_dropoffs, key=lambda d: haversine_km(current_node["lat"], current_node["lon"], d["lat"], d["lon"]))
        ordered_dropoffs.append(best_d)
        remaining_dropoffs.remove(best_d)
        current_node = best_d

    # Build Master Waypoints Itinerary
    route_stops = []
    total_km = 0.0
    current_cargo_kg = 0
    start_time = datetime.now().replace(hour=5, minute=0, second=0, microsecond=0) # 5:00 AM dispatch
    current_time = start_time

    # Stop 0: Depot
    route_stops.append({
        "step": 1,
        "stop_id": "DEPOT",
        "name": depot["name"],
        "lat": depot["lat"],
        "lon": depot["lon"],
        "type": "depot",
        "action": "Vehicle Inspected & Cold-Chain Pre-cooled to 8°C",
        "cargo_change_kg": 0,
        "current_load_kg": 0,
        "eta": current_time.strftime("%I:%M %p"),
        "leg_km": 0.0
    })

    prev_loc = (depot["lat"], depot["lon"])

    # Pickups
    for idx, p in enumerate(ordered_pickups, start=2):
        leg_dist = haversine_km(prev_loc[0], prev_loc[1], p["lat"], p["lon"])
        total_km += leg_dist
        # Assume 45 km/h average rural speed + 20 min loading time
        travel_mins = int((leg_dist / 45.0) * 60) + 20
        current_time += timedelta(minutes=travel_mins)
        current_cargo_kg += p["cargo_kg"]

        route_stops.append({
            "step": idx,
            "stop_id": p["id"],
            "name": p["name"],
            "lat": p["lat"],
            "lon": p["lon"],
            "type": "farm_pickup",
            "crop": p["crop"],
            "action": f"Loaded {p['cargo_kg']} kg fresh {p['crop']} (Quality Grade verified)",
            "cargo_change_kg": f"+{p['cargo_kg']}",
            "current_load_kg": current_cargo_kg,
            "contact": p["contact"],
            "eta": current_time.strftime("%I:%M %p"),
            "leg_km": leg_dist
        })
        prev_loc = (p["lat"], p["lon"])

    # Dropoffs
    for idx, d in enumerate(ordered_dropoffs, start=len(ordered_pickups) + 2):
        leg_dist = haversine_km(prev_loc[0], prev_loc[1], d["lat"], d["lon"])
        total_km += leg_dist
        travel_mins = int((leg_dist / 50.0) * 60) + 25
        current_time += timedelta(minutes=travel_mins)
        delivered_kg = d["cargo_kg"]
        current_cargo_kg = max(0, current_cargo_kg - delivered_kg)

        route_stops.append({
            "step": idx,
            "stop_id": d["id"],
            "name": d["name"],
            "lat": d["lat"],
            "lon": d["lon"],
            "type": "delivery",
            "action": f"Offloaded {delivered_kg} kg to buyers (Zero Middleman direct handover)",
            "cargo_change_kg": f"-{delivered_kg}",
            "current_load_kg": current_cargo_kg,
            "contact": d["contact"],
            "eta": current_time.strftime("%I:%M %p"),
            "leg_km": leg_dist
        })
        prev_loc = (d["lat"], d["lon"])

    total_km = round(total_km, 1)

    # Savings metrics
    km_saved = round(max(0.0, unoptimized_distance_km - total_km), 1)
    fuel_saved_liters = round(km_saved / DIESEL_CONSUMPTION_KM_PER_LITER, 1)
    fuel_cost_saved_rupees = round(fuel_saved_liters * DIESEL_PRICE_PER_LITER, 0)
    co2_saved_kg = round(fuel_saved_liters * CO2_KG_PER_LITER_DIESEL, 1)
    efficiency_gain_pct = round((km_saved / unoptimized_distance_km) * 100, 1) if unoptimized_distance_km > 0 else 0

    return {
        "corridor_id": corridor_id,
        "corridor_name": data["name"],
        "vehicle_type": data["vehicle"],
        "optimized_distance_km": total_km,
        "unoptimized_distance_km": unoptimized_distance_km,
        "km_saved": km_saved,
        "fuel_saved_liters": fuel_saved_liters,
        "fuel_cost_saved_rupees": fuel_cost_saved_rupees,
        "co2_saved_kg": co2_saved_kg,
        "efficiency_gain_pct": efficiency_gain_pct,
        "total_transit_hours": round((current_time - start_time).total_seconds() / 3600.0, 1),
        "total_cargo_handled_kg": sum(p["cargo_kg"] for p in pickups),
        "waypoints": route_stops,
        "available_corridors": [
            {"id": cid, "name": c["name"]} for cid, c in CORRIDORS.items()
        ]
    }

if __name__ == "__main__":
    opt = solve_vrp_route("kolar-bengaluru")
    print(f"Optimized: {opt['optimized_distance_km']} km vs Unoptimized: {opt['unoptimized_distance_km']} km")
    print(f"Efficiency Gain: {opt['efficiency_gain_pct']}% | CO2 Saved: {opt['co2_saved_kg']} kg")
