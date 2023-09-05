from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default = False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length = 200, null=True)
    last_name = models.CharField(max_length= 200, null=True)
    employee_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length = 200, null=True)
    last_name = models.CharField(max_length = 200, null=True)
    address = models.CharField(max_length = 200, null=True)
    phone_number = models.CharField(max_length=200, null = True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Sale(models.Model):
    price = models.PositiveIntegerField(null=True)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.salesperson)
