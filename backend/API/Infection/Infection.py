from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'id', 'typeId', 'date', 'SSN'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        infection = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not infection.get(field):
                infection[field] = "NULL"

        query = f"INSERT INTO Infection(typeId, date, SSN)" \
                f"VALUES({infection['typeId']}, '{infection['date']}', '{infection['SSN']}')"

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
        infection = json.loads(body)
        query = "UPDATE Infection SET "
        for field in infection:
            if field in ("id"):
                continue
            if type(infection[field]) in (int, bool):
                query += f"{field} = {infection[field]}, "
            else:
                query += f"{field} = \"{infection[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE id = {infection['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        infection = json.loads(body)
        query = f"DELETE FROM Infection WHERE id = {infection['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    try:
        if request.method == "GET":
            body = request.body.decode("utf-8")
            infection = json.loads(body)
            query = f"SELECT * FROM Infection WHERE id = {infection['id']}"
            result = db.execute_sql(query)

            if len(result["tuples"]) == 0:
                return JsonResponse(result)

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