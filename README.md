# CMPT315_Final_Project


### Activate virtual environment
`source myvenv/bin/activate`


### Activate backend
#### Open a terminal and enter
`cd backend`

`pip install -r requirements.txt`

`alias mysql=/usr/local/mysql/bin/mysql`

`mysql -u root -p` --activate mysql

#### In the mysql terminal, enter
`CREATE DATABASE 315_project_db`

**In backend/backend/settings.py under DATABASES, change password to your mysql password and make sure the database name is 315_project_db or name you chose**

`python manage.py migrate`

`python manage.py runserver`  

_Then command+click http://127.0.0.1:8000/_

### Activate frontend
#### Open another terminal and enter
`cd frontend`  

'npm i'

`npm start`  


