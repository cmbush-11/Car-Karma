from django.db import models


from django.db import models




class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveIntegerField(null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.vin


class Appointment(models.Model):

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="PENDING")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    date_time = models.DateTimeField(null=True)
    vin = models.CharField(max_length=200)
    reason = models.CharField(max_length=500, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
        null=True,
    )

    def __str__(self):
        formatted_date_time = self.date_time.strftime("%m/%d/%Y %H:%M")
        return f"{formatted_date_time} - {self.vin}"
