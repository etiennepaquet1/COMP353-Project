from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'SSN', 'doseIteration', 'date', 'typeId'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        vaccine = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not vaccine.get(field):
                vaccine[field] = "NULL"

        query = f"INSERT INTO Vaccine(SSN, doseIteration, date, typeId)" \
                f"VALUES('{vaccine['SSN']}', {vaccine['doseIteration']}, '{vaccine['date']}', {vaccine['typeId']})"

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
        vaccine = json.loads(body)
        query = "UPDATE Vaccine SET "
        for field in vaccine:
            if field in ("SSN", 'doseIteration'):
                continue
            if type(vaccine[field]) in (int, bool):
                query += f"{field} = {vaccine[field]}, "
            else:
                query += f"{field} = \"{vaccine[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE SSN = {vaccine['SSN']} AND doseIteration = {vaccine['doseIteration']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        vaccine = json.loads(body)
        query = f"DELETE FROM Vaccine WHERE SSN = {vaccine['SSN']} AND doseIteration = {vaccine['doseIteration']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    try:
        if request.method == "GET":
            ssn = request.GET.get("SSN")
            doseIteration = request.GET.get("doseIteration")
            #vaccine = json.loads(body)
            query = f"SELECT * FROM Vaccine WHERE SSN = {ssn} AND doseIteration = {doseIteration}"
            result = db.execute_sql(query)
            tup = result["tuples"][0]
            response = {}
            for (number, field) in enumerate(fields):
                response[field] = tup[number]
            result["objects"] = response

            return JsonResponse(result)
        else:
            return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")
    except IndexError as ie:
        return HttpResponse("No results")

