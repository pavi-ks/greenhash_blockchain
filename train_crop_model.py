import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("dataset/Crop_recommendation.csv")

# Generate fake moisture (if not already there)
df['moisture'] = (0.4 * df['humidity'] + 0.6 * df['rainfall']) / 3

# Features and target
features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'moisture']
X = df[features]
y = df['label']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
with open("blockchain/ml/crop_model.pkl", "wb") as f:
        pickle.dump(model, f)

        print("? Model retrained and saved!")

