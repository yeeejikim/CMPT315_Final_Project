from django.db import models
from django.utils import timezone
# Create your models here.

class Customer(models.Model):
    cust_id = models.AutoField(primary_key = True)
    cust_pass = models.CharField(max_length = 20)
    cust_name = models.CharField(max_length = 50)
    cust_email = models.EmailField
    cust_phone = models.CharField(max_length = 20)

class Restaurant(models.Model):
    rest_id = models.AutoField(primary_key = True)
    rest_name = models.CharField(max_length = 20, default = 'name')
    manager_id = models.CharField(max_length = 20)
    manager_pass = models.CharField(max_length = 20)
    rest_phone = models.CharField(max_length = 20)
    rest_address = models.CharField(max_length =  50)

class Menu(models.Model):
    item_id = models.AutoField(primary_key = True)
    item_name = models.CharField(max_length = 20)
    item_price = models.DecimalField(max_digits = 6, decimal_places = 2)
    item_desc = models.TextField(blank = True)
    item_availability = models.IntegerField(blank = True, null = True)
    restaurant = models.ForeignKey(Restaurant, on_delete = models.CASCADE)

class Order(models.Model):
    PLACED = 'placed'
    INPROGRESS = 'inProgress'
    PICKUP = 'pickup'
    COMPLETED = 'completed'
    STATUS_CHOICES = (
        (PLACED, 'Order placed'),
        (INPROGRESS, 'Order in progress'),
        (PICKUP, 'Ready for pickup'),
        (COMPLETED, 'Order completed'),
        )
    

    order_id = models.AutoField(primary_key = True)
    order_time = models.DateTimeField(auto_now_add = True)
    order_status = models.CharField(max_length=20, choices = STATUS_CHOICES, default = PLACED)
    order_instruction = models.TextField(blank = True)
    customer = models.ForeignKey(Customer, on_delete = models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete = models.CASCADE)
