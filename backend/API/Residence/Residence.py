from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        residence = json.loads(body)

        query = f"INSERT INTO Residence(typeId, numberOfBedroom, address, city, province, postalCode, phoneNumber)" \
                f"VALUES({residence['typeId']}, {residence['numberOfBedroom']}, '{residence['address']}', '{residence['city']}', '{residence['province']}', '{residence['postalCode']}', {residence['phoneNumber']})"

        # add object to database

        result = db.execute_sql(query)
        return HttpResponse(result)

    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a POST url")
