from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        person = json.loads(body)

        query = f"INSERT INTO Person(SSN, emailAddress, lastName, firstName, dateOfBirth, telephoneNumber, citizenship, medicareNumber, primaryResidenceId, roleId)" \
                f"VALUES('{person['SSN']}', '{person['emailAddress']}', '{person['lastName']}', '{person['firstName']}', " \
                f"'{person['dateOfBirth']}', '{person['telephoneNumber']}', '{person['citizenship']}', '{person['medicareNumber']}', " \
                f"{person['primaryResidenceId']}, {person['roleId']})"

        # add object to database
        result = db.execute_sql(query)
        return HttpResponse(result)

    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a POST url")
