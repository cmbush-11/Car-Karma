from django.contrib import admin
from .models import AutomobileVO, Salesperson, Customer, Sale


@admin.register(AutomobileVO)
class AutomobileV0admin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class Salespersonadmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class Customeradmin(admin.ModelAdmin):
    pass


@admin.register(Sale)
class Saleadmin(admin.ModelAdmin):
    pass
