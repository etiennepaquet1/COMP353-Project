import smtplib
from email.mime.text import MIMEText

import backend.API.db as db
import datetime

from backend.API.EmailLog import EmailLog

smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
smtp_server.login('hatsoff580@gmail.com', 'vqjk oqoe ogec grfn')


def create_email_log(logDate, subject, body, sender, receiver):
    query = f"INSERT INTO EmailLog(logDate, subject, body, sender, receiver)" \
            f"VALUES('{logDate}', '{subject}', '{body}', '{sender}', '{receiver}')"

    result = db.execute_sql(query)


def send_schedules():
    pass


def handle_create_infection(SSN: str):

    query = f"SELECT emailAddress, firstName, lastName FROM Person WHERE SSN = {SSN}"
    result = db.execute_sql(query)
    email, firstName, lastName = result["tuples"][0]

    today = datetime.date.today()
    two_weeks_future = today + datetime.timedelta(days=14)
    two_weeks_ago = today - datetime.timedelta(days=14)

    # delete every schedule in the next 2 weeks
    query = f"DELETE FROM schedule S WHERE S.SSN = {SSN} AND '{today.isoformat()}' <= S.scheduleDate AND S.scheduleDate < '{two_weeks_future.isoformat()}'"
    result = db.execute_sql(query)

    # send email to employee indicating removal of assignment
    assignment_removal_body = 'To whom it may concern,\n' \
                              f'Due to an infection report, all your scheduled work shifts in the next two weeks, from {today.isoformat()} to {two_weeks_future.isoformat()} have been cancelled.'
    msg = MIMEText(assignment_removal_body)
    msg['Subject'] = 'HFESTS Shifts Cancelled'
    msg['From'] = 'HFESTS Administration'
    msg['To'] = f'{firstName} {lastName}'
    smtp_server.sendmail(from_addr='hatsoff580@gmail.com', to_addrs=[email], msg=msg.as_string())

    try:
        # Add the email to the database
        create_email_log(logDate=today.isoformat(),
                         subject=msg['Subject'],
                         body=assignment_removal_body,
                         sender='facility1',  # hardcoded because we dont know which facility to use for email
                         receiver=email)
    except Exception:
        return

    # Select all employees with a time overlap
    query = f'''
    SELECT emailAddress, firstName, lastName FROM Person P
    WHERE P.SSN IN
    (SELECT S2.SSN FROM schedule S1, schedule S2 
    WHERE S1.SSN = {SSN}
    AND S1.facilityId = S2.facilityId
    AND S1.scheduleDate = S2.scheduleDate
    AND ((S1.startAt < S2.startAt <= S1.endAt) OR (S2.startAt < S1.startAt <= S2.endAt))
    AND {two_weeks_ago} < S1.scheduleDate <= {today})
    '''

    result = db.execute_sql(query)

    addresses_sent = {email}
    for email, firstName, lastName in result["tuples"]:
        if email not in addresses_sent:
            addresses_sent.add(email)
            try:
                # send warning email to employees
                warning_body = 'To whom it may concern,\n' \
                                          f'One of your colleagues with whom you worked in the past two weeks has been infected with COVID-19. Please take the appropriate precautions.'
                msg = MIMEText(warning_body)
                msg['Subject'] = 'Warning'
                msg['From'] = 'HFESTS Administration'
                msg['To'] = f'{firstName} {lastName}'
                smtp_server.sendmail(from_addr='hatsoff580@gmail.com', to_addrs=[email], msg=msg.as_string())

                # Add the email to the database
                create_email_log(logDate=today.isoformat(),
                                 subject=msg['Subject'],
                                 body=assignment_removal_body,
                                 sender='facility1',  # hardcoded because we dont know which facility to use for email
                                 receiver=email)
            except Exception:
                return
