import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something


def get_automobiles():
    url=('http://inventory-api:8000/api/automobiles/')
    response=requests.get(url)
    content=json.loads(response.content)
    print('fetched automobiles--------')
    print(content)

    for automobile in content['autos']:
        print("adding automobile "+str(automobile))
        AutomobileVO.objects.update_or_create(
            import_href=automobile['href'],
            defaults={"vin":automobile["vin"],
                      "sold":automobile["sold"]},
        )




def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_automobiles()

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
