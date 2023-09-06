from django.shortcuts import render
from django.http import JsonResponse
from .models import AutomobileVO, Sale, Salesperson, Customer
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
            safe=False
        )

    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects(id=id)
            return JsonResponse(
                {"salesperson": salesperson},
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=404
            )
    else:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False
        )

    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects(id=id)
            return JsonResponse(
                {"customer": customer},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404
            )
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer is not valid"},
                status=400
            )

        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson is not valid"},
                status=400
            )

        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile is not valid"},
                status=400
            )

        sales = Sale.objects.create(**content)
        return JsonResponse(
                {"sales": sales},
                encoder=SalesEncoder,
                safe=False,
            )



@require_http_methods(["GET", "DELETE"])
def api_show_sales(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sales does not exist"},
            )
    else:
        request.method == "DELETE"
        count, _= Sale.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
