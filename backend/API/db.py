import mysql.connector
db = mysql.connector.connect(
    host="sjc353.encs.concordia.ca",
    user="sjc353_4",
    password="P4ssw0rd1",
    database="sjc353_4",
    autocommit=True
)
cursor = db.cursor()

def execute_sql(statement):
    try:
        cursor.execute(statement)
        tuples = cursor.fetchall()

    except mysql.connector.Error as err:
        return {"success": False, "error_number": err.errno, "error_message": err.msg}

    return {"success": True, "result": "Query executed successfully", "tuples": tuples}
