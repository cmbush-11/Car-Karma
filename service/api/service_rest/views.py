from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician,Appointment, AutomobileVO, validate_status

# Create your views here.

class AutomobileVODetailEncoder(ModelEncoder):
    model=AutomobileVO
    properties=["import_href","vin", "sold"]

class TechnicianListEncoder(ModelEncoder):
    model=Technician
    properties=[
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model=Technician
    properties=[
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentListEncoder(ModelEncoder):
    model=Appointment
    properties=[
        "id",
        "date_time",
        "vin",
        "customer",
        "technician",
        "status",
        "reason",
        "vip",


    ]
    encoders={
        "technician":TechnicianDetailEncoder(),
    }

class AppointmentDetailEncoder(ModelEncoder):
    model=Appointment
    properties=[
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
        "status",
        "vip",

    ]
    encoders={
        "technician":TechnicianDetailEncoder(),
    }

class AppointmentStatusEncoder(ModelEncoder):
    model=Appointment
    properties=[
        "status",
    ]





@require_http_methods(["GET","POST"])
def list_technicans(request):
    if request.method=="GET":
        technicians=Technician.objects.all()
        return JsonResponse(
            {"technicians":technicians},
            encoder=TechnicianListEncoder,
            safe=False,
        )
    elif request.method=="POST":
        content=json.loads(request.body)
        technician=Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def show_technician(request,pk):
    if request.method=="DELETE":
        try:
            count,_=Technician.objects.filter(id=pk).delete()
            return JsonResponse({"deleted":count>0})
        except Technician.DoesNotExist:
            return JsonResponse({"message":"Technician does not exist"})










@require_http_methods(["GET","POST"])
def list_appointments(request):

    if request.method=="GET":
        appointments=Appointment.objects.all()


        #go through every appointment and check if it's vin matches an auto
        # auto = AutomobileVO.objects.all();
        # try:
        #     for a in appointments:
        #         for b in auto:
        #             if a.vin == b.vin:
        #                 a.vip="yes"
        #             else:
        #                 a.vip="no"
        request

        for a in appointments:
            try:

                # found = False

                # autos = AutomobileVO.objects.all()
                # print(f'fetched {len(autos)} autmobiles')
                # for au in autos:
                #     print(f'automobile with vin {au.vin}')
                #     if au.vin ==  a.vin:
                #         print('found match!!!')
                #         a.vip = True
                #         found = True
                # if not found:
                #     a.vip = False
                auto = AutomobileVO.objects.get(vin=a.vin);
                a.vip = True


            except AutomobileVO.DoesNotExist:
                 print("did not find vehicle with vin = "+a.vin)
                 a.vip=False
        # except AutomobileVO.DoesNotExist:
        #         a.vip="no"



        return JsonResponse(
            {"appointments":appointments},
            encoder=AppointmentListEncoder,

        )
    elif request.method=="POST":
        print(request.body)
        content=json.loads(request.body)
        try:

            technician=Technician.objects.get(id=content["technician"])
            content["technician"]=technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee name"},
                status=400,
            )

        appointment=Appointment.objects.create(**content)
        try :
            validate_status(appointment.status)
        except:
            appointment.status = "created"
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def delete_appointment(request,pk):
    if request.method=="DELETE":
        try:
            count,_=Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted":count>0})
        except Appointment.DoesNotExist:
            return JsonResponse({"message":"Appointment does not exist"})








@require_http_methods(["PUT"])
def finish_appointment(request,pk):
  if request.method=="PUT":
        appointment = Appointment.objects.filter(id=pk)[0]
        # print(f'fetch appointment with  {appointment.vip} {type(appointment.vip)}')

        if appointment.status is "created":
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
                status=400
            )
        else:
            appointment.status = "finished"
            vip = appointment.vip;

            # if vip == True or vip.toLowerCase() == "true":
            #     vip = True
            # else:
            #     vip = False
            appointment.save()
            validate_status(appointment.status)
            return JsonResponse(
                 appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
                status=200
                )

@require_http_methods(["PUT"])
def cancel_appointment(request,pk):

    if request.method=="PUT":
        appointment = Appointment.objects.filter(id=pk)[0]

        if appointment.status is "created":
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
                status=400
            )
        else:
            appointment.status = "cancelled"
            vip = appointment.vip;

            # if vip == True or vip.toLowerCase() == "true":
            #     vip = True
            # else:
            #     vip = False
            appointment.save()
            validate_status(appointment.status)
            return JsonResponse(
                 appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
                status=200
                )
