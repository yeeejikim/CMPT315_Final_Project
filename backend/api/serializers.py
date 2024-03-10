from rest_framework import serializers
from .models import Customer, Restaurant, Menu, Order

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('cust_id', 'cust_pass', 'cust_name', 'cust_email', 'cust_phone')

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('item_id', 'item_name', 'item_price', 'item_desc', 'item_availability', 'restaurant')

class RestaurantSerializer(serializers.ModelSerializer):
    # menu = MenuSerializer(many = True, read_only = True)
    class Meta:
        model = Restaurant
        fields = ('rest_id', 'rest_name', 'manager_id', 'manager_pass', 'rest_phone', 'rest_address')

class OrderSerializer(serializers.ModelSerializer):
    # menu = MenuSerializer(many = True, read_only = True)
    class Meta: 
        model = Order
        fields = ('order_id', 'order_time', 'order_status', 'order_instruction', 'order_pickup', 'customer', 'restaurant', 'menu')