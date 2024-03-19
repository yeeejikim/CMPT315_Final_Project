
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import CustomerSerializer, RestaurantSerializer, MenuItemSerializer, OrderSerializer, ManagerSerializer
from .models import Customers, Restaurants, MenuItems, Orders, Managers

# Create your views here.

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customers.objects.all()

class RestaurantsView(viewsets.ModelViewSet):
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


# generic views
class RestaurantListAPIView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantDetailAPIView(generics.RetrieveAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field = 'pk'

# class RestaurantUpdateAPIView(generics.UpdateAPIView):
#     queryset = Restaurants.objects.all()
#     serializer_class = RestaurantSerializer
#     lookup_field = 'pk'
#     def update(self, serializer):
#         instance = serializer.save()

class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'

class OrderUpdateAPIView(generics.UpdateAPIView, UpdateModelMixin):
    # permission_classes = [IsAuthenticated]
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)