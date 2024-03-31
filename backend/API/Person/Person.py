from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'SSN', 'emailAddress', 'lastName', 'firstName', 'dateOfBirth', 'telephoneNumber', 'citizenship', 'medicareNumber', 'primaryResidenceId', 'roleId'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        person = json.loads(body)


        # find null fields and replace them with NULL
        for field in fields:
            if not person.get(field):
                person[field] = "NULL"

        query = f"INSERT INTO Person(SSN, emailAddress, lastName, firstName, dateOfBirth, telephoneNumber, citizenship, medicareNumber, primaryResidenceId, roleId)" \
                f"VALUES('{person['SSN']}', '{person['emailAddress']}', '{person['lastName']}', '{person['firstName']}', " \
                f"'{person['dateOfBirth']}', '{person['telephoneNumber']}', '{person['citizenship']}', '{person['medicareNumber']}', " \
                f"{person['primaryResidenceId']}, {person['roleId']})"

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
        person = json.loads(body)
        query = "UPDATE Person SET "
        for field in person:
            if field == 'SSN':
                continue
            if type(person[field]) in (int, bool):
                query += f"{field} = {person[field]}, "
            else:
                query += f"{field} = \"{person[field]}\", "
        query = query.removesuffix(', ')

        query += f" WHERE SSN = {person['SSN']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a PUT url")

@csrf_exempt
def delete(request):
    if request.method == "DELETE":
        body = request.body.decode("utf-8")
        person = json.loads(body)
        query = f"DELETE FROM Person WHERE SSN = {person['SSN']}"
        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")

@csrf_exempt
def get(request):
    try:
        if request.method == "GET":
            body = request.body.decode("utf-8")
            person = json.loads(body)
            query = f"SELECT * FROM Person WHERE SSN = {person['SSN']}"
            result = db.execute_sql(query)
            tup = result["tuples"][0]
            response = {
                "SSN": tup[0]
            }
            for (number, field) in enumerate(fields):
                response[field] = tup[number]

            result["objects"] = response

            return JsonResponse(result)
        else:
            return HttpResponse(f"wrong method: you are using a  {request.method} request on a DELETE url")
    except IndexError as ie:
        return HttpResponse("No results")