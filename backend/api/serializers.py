from rest_framework import serializers
from .models import Customers, Restaurants, MenuItems, Orders, Managers

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ('cust_id', 'cust_pass', 'cust_name', 'cust_email', 'cust_phone')

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItems
        fields = ('item_id', 'item_name', 'item_price', 'item_desc', 'item_availability', 'item_image', 'restaurant')

class RestaurantSerializer(serializers.ModelSerializer):
    menu_restaurant = MenuItemSerializer(many = True, read_only = True)
    class Meta:
        model = Restaurants
        fields = ('rest_id', 'rest_name', 'rest_phone', 'rest_address', 'rest_open', 'rest_close', 'rest_image', 'menu_restaurant')

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ('manager_id', 'restaurant')

class OrderSerializer(serializers.ModelSerializer):
    # menu = MenuSerializer(many = True, read_only = True)
    class Meta: 
        model = Orders
        fields = ('order_id', 'order_time', 'order_status', 'order_instruction', 'order_pickup', 'customer', 'restaurant', 'menuItems')