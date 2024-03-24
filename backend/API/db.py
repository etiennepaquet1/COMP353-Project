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
    except mysql.connector.Error as err:
        return (f"Query returned error: {err.errno}\n"
              f"{err.msg}")
    return "Query executed successfully"
