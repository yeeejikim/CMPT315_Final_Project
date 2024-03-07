from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import CustomerSerializer, RestaurantSerializer, MenuItemSerializer, OrderSerializer, ManagerSerializer
from .models import Customers, Restaurants, MenuItems, Orders, Managers

# Create your views here.

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customers.objects.all()

class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurants.objects.all()

class MenuItemView(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    queryset = MenuItems.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()

class ManagerView(viewsets.ModelViewSet):
    serializer_class = ManagerSerializer
    queryset = Managers.objects.all()