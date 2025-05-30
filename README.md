# Smart Farming System with ML, IPFS, and Ethereum

A complete smart farming platform using Django (backend), React (frontend), Machine Learning models, IPFS (Pinata) for decentralized data storage, and Ethereum (Ganache/Web3.py) for blockchain integration.

---

## 🚀 Features
- Crop prediction using ML
- Fertilizer recommendation
- Real-time sensor data from IPFS (Pinata)
- React-based interactive UI with wallet integration
- User-friendly dashboard (React)
- Time-restricted access control via smart contracts
- Blockchain-based data interaction

---

## 🧰 Prerequisites

### Backend
- Python >= 3.8
- pip
- virtualenv (recommended)

### Frontend
- Node.js >= 18.x
- npm

### Blockchain
- Ganache (https://trufflesuite.com/ganache/)
- MetaMask browser extension

### Optional
- Git

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url> GreenHash
cd GreenHash
```

### 2. Create Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
# Windows Powershell: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 3. Required Files & Models
Make sure the following exist:

```
store/ml/
    crop_model.pkl
    fertilizer_model.pkl
    soil_encoder.pkl
    crop_encoder.pkl

dataset/
    fertilizer_recommendation_dataset.csv
    crop_recommandation_dataset.csv
```

### 4. Run Database Migrations
```bash
python manage.py migrate
```

### 5. Setup Pinata (IPFS)

Create a `.env` file:
```
PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret
```

Load in code:
```python
from dotenv import load_dotenv
load_dotenv()
os.getenv("PINATA_API_KEY")
```

⚙️ Blockchain Integration
### 6. Run Ganache
- Open Ganache
- Select "Quickstart" (Ethereum)
- Copy the RPC URL (http://127.0.0.1:7545)

### 7. Ethereum via Ganache
- Launch Ganache and use `http://127.0.0.1:7545`
- Copy private key of an account

### 8. Deploy Smart Contract
- Use Remix IDE
- Paste the GreenHashData.sol code
- Compile using Solidity 0.8.x
- Deploy using "Injected Web3" environment (MetaMask should be connected)
- Copy:
-     Contract address
-     ABI (from Remix > Compilation tab > ABI)

Install web3.py:
```bash
pip install web3
```

Connect in views:
```python
web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))
```

---

## 🎨 Frontend Setup
```bash
cd frontend
npm install
npm install date-fns
npm start
```
Runs on `http://localhost:3000`

Make sure it fetches data from backend:
```js
fetch("http://127.0.0.1:8000/get_realtime_data/")
```

---

## 🧪 Run the Project

### Frontend
```bash
cd frontend
npm start
```
Visit: [http://localhost:3000](http://localhost:3000)

### Backend
In another terminal, activate virtual environment
```bash
source venv/bin/activate  # Windows: venv\Scripts\activate
# Windows Powershell: .\venv\Scripts\Activate.ps1
python manage.py runserver
```
Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)


---

## ✅ CORS Setup (If needed)
```bash
pip install django-cors-headers
```
In `settings.py`:
```python
INSTALLED_APPS = [
    'corsheaders',
    ...
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]
CORS_ALLOW_ALL_ORIGINS = True
```

---

## 📦 requirements.txt (sample)
```
Django==5.2
djangorestframework==3.16.0
django-cors-headers==4.7.0

numpy==2.1.3
pandas==2.2.3
scikit-learn==1.6.1
scipy==1.14.1
joblib==1.4.2
threadpoolctl==3.6.0

requests==2.32.3
python-dateutil==2.9.0.post0
pytz==2025.2
tzdata==2025.2

web3
eth-account
ipfshttpclient
```

##  Sample package.json (dependencies)
json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.5.0",
    "ethers": "^6.13.0",
    "tailwindcss": "^4.1.3",
    "framer-motion": "^12.6.3",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.3"
  }
}

---

## 📞 Contact
For issues or contributions, feel free to open an issue or pull request.

👨‍💻 Team Members 
K. S. Pavithran   
📧 cs24mt006@iitdh.ac.in   
🔗 github.com/pavi-ks   

Mridul Chandrawanshi   
📧 cs24mt002@iitdh.ac.in   
🔗 github.com/Mridul-IIT-DH   


Kritika Mahajan   
📧 cs24mt023@iitdh.ac.in   
🔗 github.com/kritikacs24m023   


---

Happy Farming! 🌱🚜
