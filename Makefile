# Shortcuts for running DiveGo App

migrate:
	DEVENV=development python manage.py migrate

makemigrations:
	DEVENV=development python manage.py makemigrations

server:
	DEVENV=development python manage.py runserver 0.0.0.0:8000

dev:
	python -m venv venv && source venv/bin/activate 

postgres:
	brew services start postgresql@14

# gui:
# 	cd gdaypunchwebapp/gdaypunchreact && yarn && yarn run dev

# prodgui:
# 	cd gdaypunchwebapp/gdaypunchreact && yarn && yarn run build

# watchgui:
# 	cd gdaypunchwebapp/gdaypunchreact && yarn && yarn run devwatch

# deletemigrations:
# 	cd gdaypunchbackend/gdaypunchapi/migrations && find . ! -name __init__.py -maxdepth 1 -type f -delete

# deletedb:
# 	rm db.sqlite3

# build:
# 	pip install --upgrade pip && pip install --upgrade wheel && pip install --upgrade setuptools && pip install --user -r requirements.txt && pip list

# env: dev build

# static:
# 	DEPLOYENV=deployment python manage.py collectstatic --noinput 

# migrations: makemigrations migrate

# mailserver:
# 	brew services start mailhog

# stopmail:
# 	brew services stop mailhog

# buildrun: env server

# resetdb: deletemigrations deletedb makemigrations migrate

# app: gui	dev build migrate	server

# dockerapp: gui build migrate	server

# ebdeploy: 
# 	eb deploy gday-punch-web-dev

# deploy: prodgui static	ebdeploy

# deploybeupdates: prodgui build static ebdeploy