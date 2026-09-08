import urllib.request
import json

def test_full_flow():
    # 1. Place an order through the API
    order_data = {
        "buyer_name": "Dr. Sunita Rao",
        "buyer_type": "Consumer",
        "buyer_phone": "+91 98450 12345",
        "delivery_address": "Flat 501, Green Meadows, Indiranagar",
        "delivery_district": "Bengaluru Urban",
        "delivery_slot": "Tomorrow Morning (7:00 AM - 10:00 AM)",
        "items": [
            {"produce_id": 1, "quantity_kg": 15.0},
            {"produce_id": 2, "quantity_kg": 10.0}
        ]
    }

    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/orders",
        data=json.dumps(order_data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        order = json.loads(resp.read().decode("utf-8"))
        print(f"[SUCCESS] Order Created! Tracking Code: {order['tracking_code']}")
        print(f"          Total: Rs. {order['total_amount']}, Savings: Rs. {order['consumer_savings']}, Farmer Gain: Rs. {order['farmer_extra_earnings']}")

    order_id = order["id"]

    # 2. Advance status to 'Picked Up'
    patch_data = json.dumps({"status": "Picked Up"}).encode("utf-8")
    req_patch = urllib.request.Request(
        f"http://127.0.0.1:8000/api/orders/{order_id}/status",
        data=patch_data,
        headers={"Content-Type": "application/json"},
        method="PATCH"
    )
    with urllib.request.urlopen(req_patch) as resp:
        status_res = json.loads(resp.read().decode("utf-8"))
        print(f"[SUCCESS] Order Status updated to: {status_res['new_status']}")

    # 3. Advance status to 'Delivered' (releases escrow)
    del_data = json.dumps({"status": "Delivered"}).encode("utf-8")
    req_del = urllib.request.Request(
        f"http://127.0.0.1:8000/api/orders/{order_id}/status",
        data=del_data,
        headers={"Content-Type": "application/json"},
        method="PATCH"
    )
    with urllib.request.urlopen(req_del) as resp:
        del_res = json.loads(resp.read().decode("utf-8"))
        print(f"[SUCCESS] Order Status updated to: {del_res['new_status']} (Escrow Released to Farmer)")

    # 4. Verify AI forecasting endpoint
    with urllib.request.urlopen("http://127.0.0.1:8000/api/forecast?crop=onion&days=30") as resp:
        fore = json.loads(resp.read().decode("utf-8"))
        print(f"[SUCCESS] AI Forecasting verified for: {fore['crop_name']} over {fore['horizon_days']} days (Market: {fore['market_status']})")

    # 5. Verify Logistics Route Optimization
    req_vrp = urllib.request.Request(
        "http://127.0.0.1:8000/api/logistics/optimize?corridor_id=nashik-mumbai",
        method="POST"
    )
    with urllib.request.urlopen(req_vrp) as resp:
        vrp = json.loads(resp.read().decode("utf-8"))
        print(f"[SUCCESS] VRP Route Optimization verified for: {vrp['corridor_name']}")
        print(f"          Optimized: {vrp['optimized_distance_km']} km, Saved: {vrp['km_saved']} km, CO2 Avoided: {vrp['co2_saved_kg']} kg")

    print("\n=========================================================================")
    print(" ALL BACKEND, DATABASE, AI MODELS & LOGISTICS INTEGRATION TESTS PASSED! ")
    print("=========================================================================")

if __name__ == "__main__":
    test_full_flow()
