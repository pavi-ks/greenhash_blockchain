import json
import requests
from web3 import Web3

from django.conf import settings

PINATA_JWT = settings.PINATA_JWT

def get_contract():
    with open(settings.ABI_PATH) as f:
        contract_info = json.load(f)
    abi = contract_info.get('abi')
    if abi is None:
        raise ValueError(f"ABI not found in {settings.ABI_PATH}")

    web3 = Web3(Web3.HTTPProvider(settings.BLOCKCHAIN_PROVIDER))
    contract = web3.eth.contract(address=Web3.to_checksum_address(settings.CONTRACT_ADDRESS), abi=abi)
    return contract, web3

def get_latest_cid_from_blockchain():
    contract, _ = get_contract()
    try:
        return contract.functions.getLatestCID().call()
    except Exception as e:
        print("No CID uploaded yet. Initializing now.")
        return None

def fetch_ipfs_json(cid):
    url = f"https://gateway.pinata.cloud/ipfs/{cid}"
    response = requests.get(url)
    if response.status_code == 200:
        try:
            return response.json()
        except:
            return []
    return []
def upload_to_ipfs(data, name="data.json"):
    headers = {
        "Authorization": f"Bearer {PINATA_JWT}"
    }
    files = {
        'file': (name, json.dumps(data))
    }
    response = requests.post("https://api.pinata.cloud/pinning/pinFileToIPFS", files=files, headers=headers)
    response.raise_for_status()
    return response.json()["IpfsHash"]
def upload_to_ipfs(data, name="data.json"):
    headers = {
        "Authorization": f"Bearer {PINATA_JWT}"
    }
    files = {
        'file': (name, json.dumps(data))
    }
    response = requests.post("https://api.pinata.cloud/pinning/pinFileToIPFS", files=files, headers=headers)
    response.raise_for_status()
    return response.json()["IpfsHash"]


def upload_new_cid_to_blockchain(new_cid, sender_address=None, private_key=None):
    contract, web3 = get_contract()
    
    if sender_address and private_key:
        # For manual signing
        nonce = web3.eth.get_transaction_count(sender_address)
        tx = contract.functions.uploadCID(new_cid).build_transaction({
            'from': sender_address,
            'nonce': nonce,
            'gas': 2000000,
            'gasPrice': web3.to_wei('5', 'gwei')
        })
        signed_tx = web3.eth.account.sign_transaction(tx, private_key=private_key)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    else:
        # For Ganache or unlocked accounts
        tx_hash = contract.functions.uploadCID(new_cid).transact({'from': web3.eth.accounts[0]})
    
    return web3.eth.wait_for_transaction_receipt(tx_hash)

def append_data_to_ipfs_and_update_blockchain(new_data, sender_address=None, private_key=None):
    # Step 1: Fetch the latest CID from blockchain
    current_cid = get_latest_cid_from_blockchain()

    # Step 2: Fetch existing data from IPFS
    existing_data = fetch_ipfs_json(current_cid)
    
    # Step 3: Ensure it's a list (in case the JSON was a single object)
    if not isinstance(existing_data, list):
        existing_data = [existing_data]

    # Step 4: Append the new data
    existing_data.append(new_data)

    # Step 5: Upload new data to IPFS
    new_cid = upload_to_ipfs(existing_data, name="updated_predictions.json")

    # Step 6: Update CID in smart contract
    receipt = upload_new_cid_to_blockchain(new_cid, sender_address, private_key)

    return new_cid, receipt

def store_prediction_on_chain(prediction_type, input_data_json, prediction_result, sender_address, private_key):
    contract, web3 = get_contract()
    nonce = web3.eth.get_transaction_count(sender_address)
    
    tx = contract.functions.storePrediction(
        prediction_type,
        json.dumps(input_data_json),
        prediction_result
    ).build_transaction({
        'from': sender_address,
        'nonce': nonce,
        'gas': 2000000,
        'gasPrice': web3.to_wei('5', 'gwei')
    })
    
    signed_tx = web3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return web3.eth.wait_for_transaction_receipt(tx_hash)