from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'id', 'SSN', 'facilityId', 'scheduleDate', 'startAt', 'endAt', 'statusId'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        schedule = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not schedule.get(field):
                schedule[field] = "NULL"

        query = f"INSERT INTO Schedule(SSN, facilityId, scheduleDate, startAt, endAt, statusId)" \
                f"VALUES('{schedule['SSN']}', {schedule['facilityId']}, '{schedule['scheduleDate']}', '{schedule['startAt']}', '{schedule['endAt']}', {schedule['statusId']})"

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
        schedule = json.loads(body)
        query = "UPDATE Schedule SET "
        for field in schedule:
            if field in ("id"):
                continue
            if type(schedule[field]) in (int, bool):
                query += f"{field} = {schedule[field]}, "
            else:
                query += f"{field} = \"{schedule[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE id = {schedule['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        schedule = json.loads(body)
        query = f"DELETE FROM Schedule WHERE id = {schedule['id']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    try:
        if request.method == "GET":
            body = request.body.decode("utf-8")
            schedule = json.loads(body)
            query = f"SELECT * FROM Schedule WHERE id = {schedule['id']}"
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