

from rest_framework import generics, viewsets, filters
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin
from .serializers import CustomerSerializer, RestaurantSerializer, MenuItemSerializer, OrderSerializer, ManagerSerializer, ReviewSerializer, RestaurantMenuSerializer
from .models import Customers, Restaurants, MenuItems, Orders, Managers, Reviews
# Create your views here.

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customers.objects.all()
    search_fields = ['cust_name']
    filter_backends = (filters.SearchFilter,)
    
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

class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Reviews.objects.all()

# generic views
class RestaurantListAPIView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantDetailAPIView(generics.RetrieveAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field = 'pk'

class RestaurantMenuListAPIView(generics.ListCreateAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantMenuSerializer
    lookup_field = 'pk'

class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer

class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'

class OrderCreateAPIView(generics.CreateAPIView, CreateModelMixin):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class OrderUpdateAPIView(generics.UpdateAPIView, UpdateModelMixin):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'pk'
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)