"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
# router.register(r'students', views.StudentView, 'Student')
router.register(r'customers', views.CustomerView, 'Customers')
router.register(r'restaurants', views.RestaurantsView, 'Restaurants')
router.register(r'menus', views.MenuItemView, 'MenuItems')
router.register(r'orders', views.OrderView, 'Orders')
router.register(r'managers', views.ManagerView, 'Managers')
# router.register(r'restaurant/(?P<pk>[^/.]+)', views.RestaurantView, 'Restaurant')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('restaurant/', views.RestaurantListAPIView.as_view()),
    path('restaurant/<int:pk>/', views.RestaurantDetailAPIView.as_view()),
    # path('restaurant/<int:pk>/update/', views.RestaurantUpdateAPIView.as_view()),
    path('order/', views.OrderListCreateAPIView.as_view()),
    path('order/<int:pk>/', views.OrderDetailAPIView.as_view()),
    path('order/<int:pk>/update/', views.OrderUpdateAPIView.as_view()),
    path('order/post/', views.OrderCreateAPIView.as_view())

]
