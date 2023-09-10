from django.urls import path
from .views import list_technicans, list_appointments, show_technician, delete_appointment, cancel_appointment, finish_appointment

urlpatterns = [

    path('technicians/<int:pk>/', show_technician, name="show_technicians"),
    path('technicians/', list_technicans, name="list_technicians"),
    path('appointments/<int:pk>/cancel/', cancel_appointment, name="cancel_appointment"),
    path('appointments/<int:pk>/finish/', finish_appointment, name="finish_appointment"),
    path('appointments/<int:pk>/', delete_appointment, name="delete_appointment"),
    path('appointments/', list_appointments, name="list_appointments"),


]
