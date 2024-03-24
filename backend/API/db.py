import mysql.connector
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="mainproject",
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
