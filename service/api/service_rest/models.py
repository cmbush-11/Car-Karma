from django.db import models
from django.urls import reverse
from django.core.exceptions import ValidationError
# Create your models here.

def validate_status(value):

    if "created" in value:
        return value
    if "cancelled" in value:
        return value
    if "finished" in value:
        return value
    else:
        raise ValidationError("this field accepts created, cancelled or finished only")




class AutomobileVO(models.Model):
    import_href=models.CharField(max_length=200,unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
    def __str__(self):
        return self.vin



class Technician(models.Model):
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    employee_id=models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_technician",kwargs={"pk":self.pk})
    def __str__(self):
        return self.first_name
    class Meta:
        ordering = ("first_name",)




class Appointment(models.Model):
    date_time=models.DateTimeField()
    reason=models.TextField(max_length=500)
    status=models.CharField(
        max_length=200,
        default="created",
        validators=[validate_status],

    )
    vin=models.CharField(max_length=200)
    customer=models.CharField(max_length=200)
    vip=models.BooleanField(default=False)

    technician=models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_appointment",kwargs={"pk":self.pk})
