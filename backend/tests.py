import requests

endpoint = "http://localhost:8000/order/1/update/"

data = {
    "order_status": "Ready for pickup",
    "pickup_time": "2024-03-20T01:57:00"
}

get_response = requests.put(endpoint, json=data)
print(get_response.json())