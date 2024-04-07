from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import backend.API.db as db


@csrf_exempt
def Query_8(request):
    if request.method == "GET":
        sql_query = """
        SELECT 
            f.`name` AS facility_name,
            f.address AS facility_address,
            f.city AS facility_city,
            f.province AS facility_province,
            f.postalCode AS facility_postal_code,
            f.phoneNumber AS facility_phone_number,
            f.webAddress AS facility_web_address,
            ft.`name` AS facility_type,
            f.capacity AS facility_capacity,
            CONCAT(p2.firstName, ' ', p2.lastName) AS general_manager_name,
            COUNT(DISTINCT s.SSN) AS num_employees,
            SUM(CASE WHEN r.name = 'Doctor' THEN 1 ELSE 0 END) AS num_doctors,
            SUM(CASE WHEN r.name = 'Nurse' THEN 1 ELSE 0 END) AS num_nurses
        FROM 
            Facility AS f
            JOIN FacilityType AS ft ON f.typeId = ft.id
            JOIN `Schedule` AS s ON f.id = s.facilityId
            JOIN Person AS p ON p.SSN = s.SSN
            JOIN `Role` AS r ON r.id = p.roleId,
            Person AS p2 -- For managers
            JOIN Facility AS f2 ON f2.managerId = p2.SSN
        WHERE f2.id = f.id
        GROUP BY
            facility_name, facility_address, facility_city, facility_province, facility_postal_code, facility_phone_number, facility_web_address,
            facility_type, facility_capacity, general_manager_name
        ORDER BY
            facility_province ASC, facility_city ASC, facility_type ASC, num_doctors ASC;
        """

        # for testing purposes
        print(sql_query)

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")



@csrf_exempt
def Query_9(request):
    if request.method == "GET":
        body = request.body.decode("utf-8")
        facility_name = json.loads(body)
        sql_query = f"""
        SELECT 
            p.firstName,
            p.lastName,
            wh.start AS start_date_of_work,
            p.dateOfBirth,
            p.medicareNumber,
            p.telephoneNumber,
            r.address AS primary_address,
            r.city,
            r.province,
            r.postalCode,
            p.citizenship,
            p.emailAddress,
            COUNT(sr.residenceId) AS number_of_secondary_residences
        FROM 
            Person p
            JOIN WorkHistory wh ON p.SSN = wh.SSN
            JOIN Facility f ON wh.facilityId = f.id
            JOIN Residence r ON p.primaryResidenceId = r.id
            LEFT JOIN SecondaryResidence sr ON p.SSN = sr.SSN
        WHERE f.name = {facility_name}
        GROUP BY 
            p.SSN
        HAVING number_of_secondary_residences >= 1
        ORDER BY start_date_of_work DESC, p.firstName DESC, p.lastName DESC;
        """

        # for testing purposes
        print(sql_query)

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")


@csrf_exempt
def Query_10(request):
    if request.method == "GET":
        # define needed fields
        fields = 'SSN', 'startAt', 'endAt'
        body = request.body.decode("utf-8")
        req_body = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not req_body.get(field):
                req_body[field] = "NULL"

        sql_query = f"""
        SELECT 
            f.name AS facility_name,
            DAYOFYEAR(s.scheduleDate) AS day_of_year,
            s.startAt AS start_time,
            s.endAt AS end_time
        FROM 
            Schedule AS s
            JOIN Facility AS f ON s.facilityId = f.id
        WHERE s.SSN = {req_body['SSN']} AND s.scheduleDate BETWEEN {req_body['startAt']} AND {req_body['endAt']}
        ORDER BY 
            f.name ASC, DAYOFYEAR(s.scheduleDate) ASC, s.startAt ASC;
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")


# THIS SQL QUERY IS UNTESTED.
@csrf_exempt
def Query_11(request):
    if request.method == "GET":
        body = request.body.decode("utf-8")
        ssn = json.loads(body)
        sql_query = f"""
        SELECT 
            rt.name AS residence_type,
            p.firstName,
            p.lastName,
            ro.name AS occupation,
            re.relationship
        FROM 
            Person p
            JOIN Residence AS pr ON p.primaryResidenceId = pr.id
            JOIN ResidenceType AS rt ON pr.typeId = rt.id
            JOIN Relationship AS re ON p.SSN = re.SSN
            JOIN `Role` AS ro ON p.roleId = ro.id
        WHERE 
            re.SSN = {ssn}
        UNION
        SELECT 
            rt2.name AS residence_type,
            p2.firstName,
            p2.lastName,
            ro2.name AS occupation,
            re2.relationship
        FROM 
            Person p2
            JOIN SecondaryResidence AS sr2 ON p2.SSN = sr2.SSN
            JOIN Residence AS r2 ON sr2.residenceId = r2.id
            JOIN ResidenceType AS rt2 ON r2.typeId = rt2.id
            JOIN Relationship AS re2 ON p2.SSN = re2.SSN
            JOIN Role AS ro2 ON p2.roleId = ro2.id
        WHERE 
            re2.SSN = {ssn};
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")


# THIS SQL QUERY IS UNTESTED.
@csrf_exempt
def Query_12(request):
    if request.method == "GET":
        sql_query = f"""
        SELECT 
            p.firstName,
            p.lastName,
            i.date AS date_of_infection,
            f.name AS facility_name,
            COUNT(sr.residenceId) AS number_of_secondary_residences
        FROM 
            Person p
            JOIN Role AS r ON p.roleId = r.id
            JOIN Infection AS i ON p.SSN = i.SSN
            JOIN WorkHistory AS wh ON p.SSN = wh.SSN
            JOIN Facility AS f ON wh.facilityId = f.id
            LEFT JOIN SecondaryResidence AS sr ON p.SSN = sr.SSN
        WHERE r.name = 'Doctor' AND i.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 WEEK)
        GROUP BY 
            p.SSN,
            p.firstName,
            p.lastName,
            i.date,
            f.name
        ORDER BY 
            facility_name ASC,
            number_of_secondary_residences ASC;
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")


#
@csrf_exempt
def Query_13(request):
    if request.method == "GET":
        # define needed fields
        fields = 'name', 'startAt', 'endAt'
        body = request.body.decode("utf-8")
        req_body = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not req_body.get(field):
                req_body[field] = "NULL"

        sql_query = f"""
        SELECT 
            el.id AS email_id,
            el.logDate AS email_date,
            el.subject AS email_subject,
            el.body AS email_body,
            el.sender AS email_sender,
            el.receiver AS email_receiver
        FROM 
            EmailLog as el
        WHERE 
            el.subject LIKE '%cancellation%' -- Assuming cancellation emails have 'cancellation' in the subject
            AND logDate BETWEEN {req_body['startAt']} AND {req_body['endAt']}
            AND sender = {req_body['name']}
        ORDER BY 
            email_date DESC;
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")

# NEED TO TEST.
@csrf_exempt
def Query_14(request):
    if request.method == "GET":
        body = request.body.decode("utf-8")
        facility_name = json.loads(body)

        sql_query = f"""
        SELECT 
            p.firstName,
            p.lastName,
            r.name AS role,
            COUNT(sr.residenceId) AS num_secondary_residences
        FROM 
            Person p
        JOIN Role AS r ON p.roleId = r.id
        JOIN SecondaryResidence AS sr ON p.SSN = sr.SSN
        JOIN WorkHistory AS wh ON p.SSN = wh.SSN
        JOIN Schedule AS s ON p.SSN = s.SSN
        JOIN Facility AS f ON s.facilityId = f.id
        WHERE 
            f.name = {facility_name}
            AND sr.residenceId IN (
                SELECT sr2.residenceId 
                FROM SecondaryResidence sr2
                GROUP BY sr2.residenceId 
                HAVING COUNT(sr2.residenceId) >= 3
            )
            AND s.scheduleDate BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 4 WEEK) AND CURRENT_DATE()
        GROUP BY 
            p.firstName, p.lastName, role
        ORDER BY 
            role ASC, num_secondary_residences ASC;
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")

# NEED TO TEST
@csrf_exempt
def Query_15(request):
    if request.method == "GET":
        sql_query = f"""
        SELECT 
            p.firstName,
            p.lastName,
            MIN(wh.start) AS first_day_of_work_as_nurse,
            p.dateOfBirth,
            p.emailAddress,
            COUNT(i.id) AS total_times_infected,
            COUNT(v.typeId) AS total_vaccines_received,
            SUM(TIMESTAMPDIFF(HOUR, s.startAt, s.endAt)) AS total_hours_scheduled,
            COUNT(sr.residenceId) AS total_secondary_residences
        FROM 
            Person p
        JOIN Role AS ro ON p.roleId = ro.id
        JOIN WorkHistory AS wh ON p.SSN = wh.SSN
        JOIN Schedule AS s ON p.SSN = s.SSN
        LEFT JOIN Infection AS i ON p.SSN = i.SSN
        LEFT JOIN Vaccine AS v ON p.SSN = v.SSN
        LEFT JOIN SecondaryResidence AS sr ON p.SSN = sr.SSN
        WHERE 
            ro.name = 'Nurse'
            AND wh.facilityId IN (
                SELECT SSN
                FROM WorkHistory
                GROUP BY SSN
                HAVING COUNT(DISTINCT facilityId) >= 2
            )
            AND i.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 WEEK)
        GROUP BY 
            p.SSN
        ORDER BY 
            first_day_of_work_as_nurse ASC,
            p.firstName ASC,
            p.lastName ASC;
        """

        # for testing purposes
        print(sql_query)

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")


@csrf_exempt
def Query_16_17(request):
    if request.method == "GET":
        sql_query = f"""
        SELECT 
            r.name AS role_name,
            COUNT(DISTINCT wh.SSN) AS total_employees_working,
            COUNT(DISTINCT CASE WHEN i.id IS NOT NULL THEN wh.SSN END) AS total_employees_infected
        FROM 
            Role r
        LEFT JOIN Person AS p ON r.id = p.roleId
        LEFT JOIN WorkHistory AS wh ON p.SSN = wh.SSN
        LEFT JOIN Infection AS i ON p.SSN = i.SSN
        GROUP BY 
            role_name
        ORDER BY 
            role_name ASC;
        """

        # for testing purposes
        print(sql_query)

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")

@csrf_exempt
def Query_18(request):
    if request.method == "GET":
        # define needed fields
        fields = 'startAt', 'endAt'
        body = request.body.decode("utf-8")
        req_body = json.loads(body)

        # find null fields and replace them with NULL
        for field in fields:
            if not req_body.get(field):
                req_body[field] = "NULL"

        sql_query = f"""
        SELECT 
            f.province,
            COUNT(DISTINCT f.id) AS total_facilities,
            COUNT(DISTINCT s.SSN) AS total_employees_working,
            COUNT(DISTINCT CASE WHEN i.id IS NOT NULL THEN wh.SSN END) AS total_employees_working_and_infected,
            MAX(f.capacity) as max_capacity,
            SUM(TIMESTAMPDIFF(HOUR, s.startAt, s.endAt)) AS total_hours_scheduled
        FROM 
            Facility f
            LEFT JOIN WorkHistory AS wh ON f.id = wh.facilityId
            LEFT JOIN Infection AS i ON wh.SSN = i.SSN
            LEFT JOIN Schedule AS s ON f.id = s.facilityId
        WHERE 
            s.scheduleDate BETWEEN {req_body['startAt']} AND {req_body['endAt']}
        GROUP BY 
            f.province
        ORDER BY 
            f.province ASC;
        """

        # for testing purposes
        print(sql_query)

        # to remove the quotes around null fields
        sql_query = sql_query.replace("\'NULL\'", "NULL")

        result = db.execute_sql(sql_query)
        return JsonResponse(result)
    else:
        return HttpResponse(f"wrong method: you are using a {request.method} request on a GET url")