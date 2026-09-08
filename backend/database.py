"""
Database engine and schema for KisanSetu-AI
SIH Problem Statement 26033 - DoCA
"""
import sqlite3
import os
import json
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "kisansetu.db")

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Produce Listings Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS produce (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farmer_name TEXT NOT NULL,
        farmer_phone TEXT NOT NULL,
        fpo_name TEXT,
        crop_name TEXT NOT NULL,
        variety TEXT,
        category TEXT NOT NULL,
        harvest_date TEXT NOT NULL,
        quantity_kg REAL NOT NULL,
        min_order_kg REAL DEFAULT 1,
        direct_price_per_kg REAL NOT NULL,
        traditional_mandi_price REAL NOT NULL,
        traditional_retail_price REAL NOT NULL,
        farm_location TEXT NOT NULL,
        district TEXT NOT NULL,
        state TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        organic_certified INTEGER DEFAULT 0,
        quality_grade TEXT DEFAULT 'Grade A',
        shelf_life_days INTEGER DEFAULT 7,
        image_url TEXT,
        status TEXT DEFAULT 'Available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Orders Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tracking_code TEXT UNIQUE NOT NULL,
        buyer_name TEXT NOT NULL,
        buyer_type TEXT NOT NULL, -- 'Consumer' or 'BulkBuyer'
        buyer_phone TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        delivery_district TEXT NOT NULL,
        delivery_lat REAL NOT NULL,
        delivery_lon REAL NOT NULL,
        total_amount REAL NOT NULL,
        total_quantity_kg REAL NOT NULL,
        consumer_savings REAL NOT NULL,
        farmer_extra_earnings REAL NOT NULL,
        payment_status TEXT DEFAULT 'Escrow Held (Secure)',
        delivery_status TEXT DEFAULT 'Order Placed', -- 'Order Placed', 'Picked Up', 'In Cold Transit', 'Delivered'
        delivery_slot TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Order Items Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        produce_id INTEGER NOT NULL,
        crop_name TEXT NOT NULL,
        quantity_kg REAL NOT NULL,
        unit_price REAL NOT NULL,
        subtotal REAL NOT NULL,
        farmer_name TEXT NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(produce_id) REFERENCES produce(id)
    )
    """)

    # Logistics Routes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS logistics_routes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_name TEXT NOT NULL,
        vehicle_type TEXT NOT NULL,
        driver_name TEXT NOT NULL,
        driver_phone TEXT NOT NULL,
        origin_hub TEXT NOT NULL,
        destination_hub TEXT NOT NULL,
        stops_json TEXT NOT NULL,
        total_distance_km REAL NOT NULL,
        unoptimized_distance_km REAL NOT NULL,
        fuel_saved_liters REAL NOT NULL,
        co2_saved_kg REAL NOT NULL,
        status TEXT DEFAULT 'Scheduled', -- 'Scheduled', 'In Progress', 'Completed'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", DB_PATH)
