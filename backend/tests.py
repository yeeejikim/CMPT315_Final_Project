import requests

endpoint = "http://localhost:8000/order/post/"

# data = {
#     "order_status": "Order completed",
#     "pickup_time": "2024-03-20T01:57:00"
# }

# get_response = requests.patch("http://localhost:8000/order/1/update/", {
#     # "order_status": "Ready for pickup",
#     "order_status": "Order completed",
#     "pickup_time": "2024-03-20T01:57:00"
# })
# print(get_response.json())
# print(get_response.content)


data = {
    "order_time": timezone.now(),
    "order_status": "Order placed",
    "order_instruction": "ya",
    "order_pickup": "2024-03-19T 4:15:00",
    "customer": 1,
    "restaurant": 1,
    "menuItems": [
        1, 2
    ]
}

get_response = requests.post("http://localhost:8000/order/post/", data)

print(get_response.json())
print(get_response.content)