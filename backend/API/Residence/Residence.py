from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'typeId', 'numberOfBedroom', 'address', 'city', 'province', 'postalCode', 'phoneNumber'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        residence = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not residence.get(field):
                residence[field] = "NULL"

        query = f"INSERT INTO Residence(typeId, numberOfBedroom, address, city, province, postalCode, phoneNumber)" \
                f"VALUES({residence['typeId']}, {residence['numberOfBedroom']}, '{residence['address']}', '{residence['city']}', '{residence['province']}', '{residence['postalCode']}', {residence['phoneNumber']})"

        # to remove the quotes around null fields
        query = query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a POST url")

@csrf_exempt
def update(request):
    if request.method == "PUT":
        body = request.body.decode("utf-8")
        residence = json.loads(body)
        query = "UPDATE Residence SET "
        for field in residence:
            if field == 'id':
                continue
            if type(residence[field]) in (int, bool):
                query += f"{field} = {residence[field]}, "
            else:
                query += f"{field} = \"{residence[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE id = {residence['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        residence = json.loads(body)
        query = f"DELETE FROM Residence WHERE id = {residence['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    try:
        if request.method == "GET":
            id = request.GET.get("id")
            #residence = json.loads(body)
            query = f"SELECT * FROM Residence WHERE id = {id}"
            result = db.execute_sql(query)
            tup = result["tuples"][0]
            response = {
                "id": tup[0],
            }
            for (number, field) in enumerate(fields, 1):
                response[field] = tup[number]

            result["objects"] = response

            return JsonResponse(result)
        else:
            return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")
    except IndexError as ie:
        return HttpResponse("No results")