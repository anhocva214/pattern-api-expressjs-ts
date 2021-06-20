import os
from datetime import datetime
now = datetime.now()
date_time = now.strftime("%m/%d/%Y, %H:%M:%S")

msg = input("Enter message: ")

os.system("git add .")
os.system("""git commit -m " """+msg+""" " """)
os.system("git push origin master")
# os.system("git push heroku master")
