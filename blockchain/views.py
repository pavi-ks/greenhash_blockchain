from django.shortcuts import render
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
import requests, pickle, os, json
import numpy as np
import pandas as pd
from .utils import *

# Load Models
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'ml')
with open(os.path.join(MODEL_DIR, 'crop_model.pkl'), 'rb') as f:
    crop_model = pickle.load(f)
with open(os.path.join(MODEL_DIR, 'fertilizer_model.pkl'), 'rb') as f:
    fertilizer_model = pickle.load(f)
with open(os.path.join(MODEL_DIR, 'soil_encoder.pkl'), 'rb') as f:
    soil_encoder = pickle.load(f)
with open(os.path.join(MODEL_DIR, 'crop_encoder.pkl'), 'rb') as f:
    crop_encoder = pickle.load(f)

# Load Fertilizer Dataset for remarks
fertilizer_df = pd.read_csv(os.path.join(os.path.dirname(__file__), '../dataset/fertilizer_recommendation_dataset.csv'))

# Homepage with IPFS Data
# def home(request):
#     CID = 'bafybeihm6px3ggussdws6altshxqvttwecxhgzgldihhs5jvgnj32zcl4a'
#     pinata_url = f'https://gateway.pinata.cloud/ipfs/{CID}'
#     try:
#         response = requests.get(pinata_url)
#         sensor_list = response.json()
#     except Exception as e:
#         sensor_list = {"error": f"Failed to fetch data: {e}"}
#     return render(request, 'index.html', { 'sensor_list': sensor_list })


# Crop Prediction API
@csrf_exempt
def predict_crop(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'moisture']
            input_vals = [data.get(feat, 0) for feat in features]

            # Predict crop
            prediction = crop_model.predict([input_vals])[0]

            # New row
            new_row = data.copy()
            new_row['predicted_crop'] = prediction

            #  Fetch latest CID from blockchain
            latest_cid = get_latest_cid_from_blockchain()

            #  Fetch existing dataset from IPFS
            dataset = fetch_ipfs_json(latest_cid)
            if not isinstance(dataset, list):
                dataset = []

            #  Append new row
            dataset.append(new_row)

            #  Upload updated dataset
            new_cid = upload_to_ipfs(dataset)
            # print("New CID:", new_cid)
            print(f"New IPFS CID: {new_cid}")

            
            try:
                url = f"https://gateway.pinata.cloud/ipfs/{new_cid}"
                response = requests.get(url)
                ipfs_content = response.json()
                print(" IPFS Content:")
                print(json.dumps(ipfs_content, indent=4))
            except Exception as e:
                print(f" Error fetching IPFS content: {e}")


            #  Update smart contract with new CID
            upload_new_cid_to_blockchain(new_cid, sender_address=None, private_key=None)


            return JsonResponse({
                "predicted_crop": prediction,
                "ipfs_cid": new_cid
            })

        except Exception as e:
            return JsonResponse({"error": str(e)})

# Fertilizer Prediction API
@csrf_exempt
def predict_fertilizer(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received:", data)

            soil_encoded = soil_encoder.transform([data["Soil"].strip().title()])[0]
            crop_encoded = crop_encoder.transform([data["Crop"].strip().title()])[0]
            print("Encoded Soil:", soil_encoded, ", Crop:", crop_encoded)

            input_values = [
                float(data.get("Temperature", 0)),
                float(data.get("Moisture", 0)),
                float(data.get("Rainfall", 0)),
                float(data.get("PH", 0)),
                float(data.get("Nitrogen", 0)),
                float(data.get("Phosphorous", 0)),
                float(data.get("Potassium", 0)),
                float(data.get("Carbon", 0)),
                soil_encoded,
                crop_encoded
            ]

            print("Final Input to Model:", input_values)

            input_df = pd.DataFrame([input_values], columns=[
                "Temperature", "Moisture", "Rainfall", "PH", "Nitrogen",
                "Phosphorous", "Potassium", "Carbon", "Soil_encoded", "Crop_encoded"
            ])

            predicted = fertilizer_model.predict(input_df)[0]
            print("Predicted Fertilizer:", predicted)

            # Safe access to Remarks (if column exists)
            if "Remarks" in fertilizer_df.columns:
                row = fertilizer_df[fertilizer_df["Fertilizer"] == predicted]
                remark = row["Remarks"].values[0] if not row.empty else "No remark found for this fertilizer."
            else:
                remark = "Fertilizer advice not available in dataset."

            return JsonResponse({
                "predicted_fertilizer": predicted,
                "remark": remark
            })

        except Exception as e:
            print("ERROR:", str(e))
            return JsonResponse({"error": str(e)})


@require_GET
def get_encoder_labels(request):
    try:
        with open(os.path.join(MODEL_DIR, 'soil_encoder.pkl'), 'rb') as f:
            soil_encoder = pickle.load(f)
        with open(os.path.join(MODEL_DIR, 'crop_encoder.pkl'), 'rb') as f:
            crop_encoder = pickle.load(f)

        return JsonResponse({
            "soil_types": list(soil_encoder.classes_),
            "crop_types": list(crop_encoder.classes_)
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})
    

def get_realtime_data(request):
    CID = 'bafybeicz6hfglvwzpdl6tcj5dq3u6x76stfbul7moz2qbfztqczb7xozdi'  # Replace with actual
    pinata_url = f'https://gateway.pinata.cloud/ipfs/{CID}'

    try:
        response = requests.get(pinata_url)
        sensor_list = response.json()
        return JsonResponse(sensor_list, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)})
    

def upload_to_ipfs(json_data):
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    headers = {
        "Content-Type": "application/json",
        "pinata_api_key": "b6a09e42a839df879ca5",
        "pinata_secret_api_key": "4227ef503b589a9d2ad54092ac81ab7462a7290d8c3d86195b3a2519409fb649",
    }
    payload = {
        "pinataMetadata": {"name": "updated_sensor_data"},
        "pinataContent": json_data,
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    result = response.json()
    return result["IpfsHash"]


