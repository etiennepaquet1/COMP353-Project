from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'typeId', 'managerId', 'name', 'address', 'city', 'province', 'postalCode', 'phoneNumber', 'webAddress', 'capacity'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        facility = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not facility.get(field):
                facility[field] = "NULL"

        query = f"INSERT INTO facility(typeId, managerId , name, address, city, province, postalCode, phoneNumber, webAddress, capacity)" \
                f"VALUES({facility['typeId']}, {facility['managerId']}, '{facility['name']}', " \
                f"'{facility['address']}', '{facility['city']}', '{facility['province']}', '{facility['postalCode']}', {facility['phoneNumber']}," \
                f"'{facility['webAddress']}', {facility['capacity']})"

        # to remove the quotes around null fields
        query = query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a POST url")

@csrf_exempt
def update(request):
    if request.method == "PUT":
        body = request.body.decode("utf-8")
        facility = json.loads(body)
        query = "UPDATE facility SET "
        for field in facility:
            if field == 'id':
                continue
            if type(facility[field]) in (int, bool):
                query += f"{field} = {facility[field]}, "
            else:
                query += f"{field} = \"{facility[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE id = {facility['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        facility = json.loads(body)
        query = f"DELETE FROM facility WHERE id = {facility['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    if request.method == "GET":
        body = request.body.decode("utf-8")
        facility = json.loads(body)
        query = f"SELECT * FROM facility WHERE id = {facility['id']}"
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
