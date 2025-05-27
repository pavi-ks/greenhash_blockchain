import pandas as pd
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("dataset/fertilizer_recommendation_dataset.csv")

# Normalize all string columns
df["Soil"] = df["Soil"].astype(str).str.strip().str.title()
df["Crop"] = df["Crop"].astype(str).str.strip().str.title()

# ✅ Automatically detect all unique labels from dataset
soil_categories = sorted(df["Soil"].unique())
crop_categories = sorted(df["Crop"].unique())

# Fit label encoders with complete categories
soil_encoder = LabelEncoder()
soil_encoder.fit(soil_categories)

crop_encoder = LabelEncoder()
crop_encoder.fit(crop_categories)

# Encode the columns with safe cleaning just before transform
df["Soil_encoded"] = soil_encoder.transform(
    df["Soil"].apply(lambda x: str(x).strip().title())
)
df["Crop_encoded"] = crop_encoder.transform(
    df["Crop"].apply(lambda x: str(x).strip().title())
)

# Define features and label
features = ["Temperature", "Moisture", "Rainfall", "PH", "Nitrogen",
            "Phosphorous", "Potassium", "Carbon", "Soil_encoded", "Crop_encoded"]
X = df[features]
y = df["Fertilizer"]

# Train/test split and model training
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model and encoders
os.makedirs("blockchain/ml", exist_ok=True)
with open("blockchain/ml/fertilizer_model.pkl", "wb") as f:
    pickle.dump(model, f)
with open("blockchain/ml/soil_encoder.pkl", "wb") as f:
    pickle.dump(soil_encoder, f)
with open("blockchain/ml/crop_encoder.pkl", "wb") as f:
    pickle.dump(crop_encoder, f)

print("✅ Fertilizer model and encoders retrained and saved successfully!")
print("✅ Soil types:", soil_encoder.classes_)
print("✅ Crop types:", crop_encoder.classes_)
