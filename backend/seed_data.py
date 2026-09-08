"""
Seed data generator for KisanSetu-AI
Populates realistic Indian agricultural data, active farmer listings,
and historical benchmark pricing.
"""
from database import get_db, init_db
from datetime import datetime, timedelta

SAMPLE_PRODUCE = [
    {
        "farmer_name": "Rameshwar Patil",
        "farmer_phone": "+91 98231 44520",
        "fpo_name": "Godavari Valley FPO",
        "crop_name": "Nashik Red Onion",
        "variety": "Garwa (Late Kharif)",
        "category": "Vegetables",
        "harvest_date": (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d"),
        "quantity_kg": 4500,
        "min_order_kg": 5,
        "direct_price_per_kg": 28.0,
        "traditional_mandi_price": 17.5,
        "traditional_retail_price": 46.0,
        "farm_location": "Pimpalgaon Baswant, Niphad",
        "district": "Nashik",
        "state": "Maharashtra",
        "latitude": 20.1706,
        "longitude": 73.9859,
        "organic_certified": 0,
        "quality_grade": "Grade A (45-55mm)",
        "shelf_life_days": 21,
        "image_url": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Manjunath Gowda",
        "farmer_phone": "+91 94481 29831",
        "fpo_name": "Kolar Horti Farmers Producer Co.",
        "crop_name": "Roma Hybrid Tomato",
        "variety": "Abhinav F1",
        "category": "Vegetables",
        "harvest_date": (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d"),
        "quantity_kg": 3200,
        "min_order_kg": 5,
        "direct_price_per_kg": 32.0,
        "traditional_mandi_price": 19.0,
        "traditional_retail_price": 54.0,
        "farm_location": "Srinivaspur Taluk",
        "district": "Kolar",
        "state": "Karnataka",
        "latitude": 13.1367,
        "longitude": 78.1291,
        "organic_certified": 1,
        "quality_grade": "Export Grade (Firm Red)",
        "shelf_life_days": 10,
        "image_url": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Sukhwinder Singh",
        "farmer_phone": "+91 98722 51042",
        "fpo_name": "Malwa Agri Collective",
        "crop_name": "Kufri Jyoti Potato",
        "variety": "Table Grade A",
        "category": "Vegetables",
        "harvest_date": (datetime.now() - timedelta(days=4)).strftime("%Y-%m-%d"),
        "quantity_kg": 8500,
        "min_order_kg": 10,
        "direct_price_per_kg": 22.0,
        "traditional_mandi_price": 14.0,
        "traditional_retail_price": 36.0,
        "farm_location": "Samrala Tehsil",
        "district": "Ludhiana",
        "state": "Punjab",
        "latitude": 30.9010,
        "longitude": 75.8573,
        "organic_certified": 0,
        "quality_grade": "Grade A (Medium-Large)",
        "shelf_life_days": 35,
        "image_url": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Venkatasubba Reddy",
        "farmer_phone": "+91 98480 67123",
        "fpo_name": "Amaravathi Spice Growers Association",
        "crop_name": "Guntur Sannam Chilli",
        "variety": "S4 Red Hot",
        "category": "Spices",
        "harvest_date": (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d"),
        "quantity_kg": 1200,
        "min_order_kg": 2,
        "direct_price_per_kg": 145.0,
        "traditional_mandi_price": 95.0,
        "traditional_retail_price": 220.0,
        "farm_location": "Tenali Rural Hub",
        "district": "Guntur",
        "state": "Andhra Pradesh",
        "latitude": 16.3067,
        "longitude": 80.4365,
        "organic_certified": 1,
        "quality_grade": "Export High-SHU",
        "shelf_life_days": 60,
        "image_url": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Khemraj Thakur",
        "farmer_phone": "+91 94180 88219",
        "fpo_name": "Himalayan Orchards FPO",
        "crop_name": "Royal Delicious Apples",
        "variety": "Mountain Crispy",
        "category": "Fruits",
        "harvest_date": (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d"),
        "quantity_kg": 2800,
        "min_order_kg": 5,
        "direct_price_per_kg": 110.0,
        "traditional_mandi_price": 65.0,
        "traditional_retail_price": 175.0,
        "farm_location": "Kotkhai Apple Belt",
        "district": "Shimla",
        "state": "Himachal Pradesh",
        "latitude": 31.1048,
        "longitude": 77.1734,
        "organic_certified": 1,
        "quality_grade": "Grade Extra Fancy (Box Pack)",
        "shelf_life_days": 25,
        "image_url": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Harpreet Singh Virk",
        "farmer_phone": "+91 97800 12390",
        "fpo_name": "Karnal Rice Exporters Cluster",
        "crop_name": "Traditional Basmati 1121",
        "variety": "Aged 1-Year Extra Long Grain",
        "category": "Grains",
        "harvest_date": (datetime.now() - timedelta(days=15)).strftime("%Y-%m-%d"),
        "quantity_kg": 15000,
        "min_order_kg": 25,
        "direct_price_per_kg": 85.0,
        "traditional_mandi_price": 58.0,
        "traditional_retail_price": 135.0,
        "farm_location": "Taraori Mandi Belt",
        "district": "Karnal",
        "state": "Haryana",
        "latitude": 29.6857,
        "longitude": 76.9905,
        "organic_certified": 0,
        "quality_grade": "Premium Export (Raw)",
        "shelf_life_days": 365,
        "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Santosh Yadav",
        "farmer_phone": "+91 99351 77312",
        "fpo_name": "Kashi Green Agro FPO",
        "crop_name": "Fresh Snowball Cauliflower",
        "variety": "Pusa Deepali",
        "category": "Vegetables",
        "harvest_date": (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d"),
        "quantity_kg": 2100,
        "min_order_kg": 5,
        "direct_price_per_kg": 24.0,
        "traditional_mandi_price": 13.0,
        "traditional_retail_price": 42.0,
        "farm_location": "Rohania Block",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "latitude": 25.3176,
        "longitude": 82.9739,
        "organic_certified": 1,
        "quality_grade": "Compact White Curd",
        "shelf_life_days": 6,
        "image_url": "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    },
    {
        "farmer_name": "Dattatraya Shinde",
        "farmer_phone": "+91 98229 44109",
        "fpo_name": "Solapur Anar Producer Co.",
        "crop_name": "Bhagwa Pomegranate",
        "variety": "Deep Red Arils",
        "category": "Fruits",
        "harvest_date": (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d"),
        "quantity_kg": 4200,
        "min_order_kg": 10,
        "direct_price_per_kg": 95.0,
        "traditional_mandi_price": 55.0,
        "traditional_retail_price": 160.0,
        "farm_location": "Sangola Tehsil",
        "district": "Solapur",
        "state": "Maharashtra",
        "latitude": 17.6599,
        "longitude": 75.9064,
        "organic_certified": 1,
        "quality_grade": "Super Grade (300g+ per fruit)",
        "shelf_life_days": 18,
        "image_url": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        "status": "Available"
    }
]

def seed_database():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Check if produce already seeded
    cursor.execute("SELECT COUNT(*) FROM produce")
    count = cursor.fetchone()[0]
    if count == 0:
        for p in SAMPLE_PRODUCE:
            cursor.execute("""
            INSERT INTO produce (
                farmer_name, farmer_phone, fpo_name, crop_name, variety, category,
                harvest_date, quantity_kg, min_order_kg, direct_price_per_kg,
                traditional_mandi_price, traditional_retail_price, farm_location,
                district, state, latitude, longitude, organic_certified,
                quality_grade, shelf_life_days, image_url, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                p["farmer_name"], p["farmer_phone"], p["fpo_name"], p["crop_name"],
                p["variety"], p["category"], p["harvest_date"], p["quantity_kg"],
                p["min_order_kg"], p["direct_price_per_kg"], p["traditional_mandi_price"],
                p["traditional_retail_price"], p["farm_location"], p["district"],
                p["state"], p["latitude"], p["longitude"], p["organic_certified"],
                p["quality_grade"], p["shelf_life_days"], p["image_url"], p["status"]
            ))

        # Seed sample orders for tracking and analytics
        cursor.execute("""
        INSERT INTO orders (
            tracking_code, buyer_name, buyer_type, buyer_phone, delivery_address,
            delivery_district, delivery_lat, delivery_lon, total_amount, total_quantity_kg,
            consumer_savings, farmer_extra_earnings, payment_status, delivery_status, delivery_slot
        ) VALUES
        ('KS-ORD-8921', 'Ananya Sharma', 'Consumer', '+91 98112 34567', 'Flat 402, Green Glen Layout, Bellandur', 'Bengaluru Urban', 12.9352, 77.6245, 960.0, 30.0, 380.0, 290.0, 'Escrow Held (Secure)', 'In Cold Transit', 'Tomorrow Morning 7 AM - 10 AM'),
        ('KS-ORD-9403', 'Taj Gateway Hotels Kitchen', 'BulkBuyer', '+91 80 6660 4545', 'Residency Road, Central Logistics Dock', 'Bengaluru Urban', 12.9716, 77.5946, 17500.0, 500.0, 6800.0, 5200.0, 'Escrow Held (Secure)', 'Picked Up', 'Today Afternoon 2 PM - 5 PM'),
        ('KS-ORD-7712', 'Vikram Mehra', 'Consumer', '+91 99001 55667', 'A-12, Sector 15, Noida', 'Gautam Buddha Nagar', 28.5355, 77.3910, 640.0, 20.0, 240.0, 180.0, 'Escrow Released to Farmer', 'Delivered', 'Delivered yesterday')
        """)

        # Seed order items
        cursor.execute("""
        INSERT INTO order_items (order_id, produce_id, crop_name, quantity_kg, unit_price, subtotal, farmer_name)
        VALUES
        (1, 2, 'Roma Hybrid Tomato', 20.0, 32.0, 640.0, 'Manjunath Gowda'),
        (1, 1, 'Nashik Red Onion', 10.0, 28.0, 280.0, 'Rameshwar Patil'),
        (2, 2, 'Roma Hybrid Tomato', 300.0, 31.0, 9300.0, 'Manjunath Gowda'),
        (2, 3, 'Kufri Jyoti Potato', 200.0, 21.0, 4200.0, 'Sukhwinder Singh')
        """)

        # Seed initial logistics route
        stops = [
            {"name": "Central Kolar Cold Hub (Origin)", "lat": 13.1367, "lon": 78.1291, "type": "origin", "action": "Dispatch Vehicle"},
            {"name": "Gowda Tomato Orchards (Pickup 1)", "lat": 13.1520, "lon": 78.1450, "type": "farm_pickup", "action": "Loaded 320 kg Tomatoes"},
            {"name": "Srinivaspur Vegetable Cluster (Pickup 2)", "lat": 13.1800, "lon": 78.1600, "type": "farm_pickup", "action": "Loaded 180 kg Veggies"},
            {"name": "Hoskote Aggregation Point (Cross-Dock)", "lat": 13.0709, "lon": 77.7981, "type": "hub", "action": "Sort & Quality Scan"},
            {"name": "Whitefield Consumer Cluster (Dropoff 1)", "lat": 12.9698, "lon": 77.7500, "type": "delivery", "action": "Direct Delivery 25 Households"},
            {"name": "Bellandur Hub (Final Dropoff)", "lat": 12.9352, "lon": 77.6245, "type": "delivery", "action": "Final Delivery Completed"}
        ]
        import json
        cursor.execute("""
        INSERT INTO logistics_routes (
            route_name, vehicle_type, driver_name, driver_phone,
            origin_hub, destination_hub, stops_json, total_distance_km,
            unoptimized_distance_km, fuel_saved_liters, co2_saved_kg, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "Kolar-Bengaluru East Cold Corridor", "Refrigerated 3.5T Eicher",
            "Madan Lal", "+91 97412 88301",
            "Kolar APMC Outer Yard", "Bengaluru City Hub",
            json.dumps(stops), 84.5, 138.0, 18.2, 47.3, "In Progress"
        ))

        conn.commit()
        print("Database seeded with sample Indian agricultural produce, orders, and routes.")
    else:
        print(f"Database already contains {count} produce items.")

    conn.close()

if __name__ == "__main__":
    seed_database()
