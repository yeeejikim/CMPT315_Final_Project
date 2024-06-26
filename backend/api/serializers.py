from rest_framework import serializers
from .models import Customers, Restaurants, MenuItems, Orders, Managers, Reviews


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ('review_id','review_text', 'rating', 'customer', 'restaurant')

class CustomerSerializer(serializers.ModelSerializer):
    review_customer = ReviewSerializer(many = True, read_only = True)
    class Meta:
        model = Customers
        fields = ('cust_id', 'cust_pass', 'cust_name', 'cust_email', 'cust_phone', 'review_customer')

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItems
        fields = ('item_id', 'item_name', 'item_price', 'item_desc', 'item_availability', 'item_image', 'restaurant')

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers
        fields = ('manager_id', 'restaurant')


class OrderSerializer(serializers.ModelSerializer):
    # menu = MenuSerializer(many = True, read_only = True)
    # order_time = serializers.DateTimeField(input_formats=["%Y-%m-%d, %H:%M:%S"], format="%Y-%m-%d, %H:%M:%S")
    # order_pickup = serializers.DateTimeField(input_formats=["%Y-%m-%d, %I:%M %p"], format="%Y-%m-%d, %H:%M:%S")
    class Meta: 
        model = Orders
        fields = ('order_id', 'order_time', 'order_status', 'order_instruction', 'order_pickup', 'customer', 'restaurant', 'menuItems', 'has_review')

class RestaurantSerializer(serializers.ModelSerializer):
    menu_restaurant = MenuItemSerializer(many = True, read_only = True)
    order_restaurant = OrderSerializer(many = True, read_only = True)
    review_restaurant = ReviewSerializer(many = True, read_only = True)
    class Meta:
        model = Restaurants
        fields = ('rest_id', 'rest_name', 'rest_phone', 'rest_address', 'rest_open', 'rest_close', 'rest_image', 'menu_restaurant', 'order_restaurant', 'review_restaurant')


class RestaurantMenuSerializer(serializers.ModelSerializer):
    menu_restaurant = MenuItemSerializer(many = True, read_only = True)
    class Meta:
        model = Restaurants
        fields = ('rest_id', 'menu_restaurant')