from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db

fields = 'logDate', 'subject', 'body', 'sender', 'receiver'


@csrf_exempt
def create(request):
    if request.method == "POST":

        body = request.body.decode("utf-8")
        log = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not log.get(field):
                log[field] = "NULL"

        query = f"INSERT INTO EmailLog(logDate, subject, body, sender, receiver)" \
                f"VALUES('{log['logDate']}', '{log['subject']}', '{log['body']}', '{log['sender']}', '{log['receiver']}')"

        # to remove the quotes around null fields
        query = query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a  {request.method} request on a POST url")

