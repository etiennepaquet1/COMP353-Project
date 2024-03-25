from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'SSN', 'facilityId', 'start', 'end'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        workhistory = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not workhistory.get(field):
                workhistory[field] = "NULL"

        query = f"INSERT INTO WorkHistory(SSN, facilityId, start, end)" \
                f"VALUES('{workhistory['SSN']}', {workhistory['facilityId']}, '{workhistory['start']}', " \
                f"'{workhistory['end']}')"

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
        workhistory = json.loads(body)
        query = "UPDATE WorkHistory SET "
        for field in workhistory:
            if field in ('SSN', 'facilityId'):
                continue
            if type(workhistory[field]) in (int, bool):
                query += f"{field} = {workhistory[field]}, "
            else:
                query += f"{field} = \"{workhistory[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE SSN = {workhistory['SSN']} AND facilityId = {workhistory['facilityId']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        workhistory = json.loads(body)
        query = f"DELETE FROM WorkHistory WHERE SSN = {workhistory['SSN']} AND facilityId = {workhistory['facilityId']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    if request.method == "GET":
        body = request.body.decode("utf-8")
        workhistory = json.loads(body)
        query = f"SELECT * FROM WorkHistory WHERE SSN = {workhistory['SSN']} AND facilityId = {workhistory['facilityId']}"
        result = db.execute_sql(query)
        tup = result["tuples"][0]
        response = {
        }
        for (number, field) in enumerate(fields):
            response[field] = tup[number]
        result["objects"] = response

        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")
