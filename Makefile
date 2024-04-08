# Shortcuts for running DiveGo App

migrate:
	DEVENV=development python manage.py migrate

makemigrations:
	DEVENV=development python manage.py makemigrations

server:
	DEVENV=development python manage.py runserver

dev:
	python -m venv venv && source venv/bin/activate 

postgres:
	brew services start postgresql@14

build:
	pip install --upgrade pip && pip install -r requirements.txt && pip list

env: dev build

# gui:
# 	cd divego_frontend && yarn && yarn run dev

# prodgui:
# 	cd divego_frontend && yarn && yarn run build

# watchgui:
# 	cd divego_frontend && yarn && yarn run devwatch

# deletedb:
# 	rm db.sqlite3

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
# 	eb deploy divego-project

# deploy: prodgui static	ebdeploy

# deploybeupdates: prodgui build static ebdeploy