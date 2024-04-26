# Shortcuts for running DiveGo App

migrate:
	DEVENV=development python manage.py migrate

makemigrations:
	DEVENV=development python manage.py makemigrations

server:
	source venv/bin/activate && DEVENV=development python manage.py runserver

postgres:
	brew services start postgresql@14

build:
	pip install --upgrade pip && pip install -r requirements.txt && pip list

nativeios:
	./scripts/prepare.sh -t ios
	
ios:
	cd divego_rn && yarn ios

env: build

gui:
	cd frontend && rm -rf node_modules && yarn && yarn start

# prodgui:
# 	cd frontend && yarn && yarn start

# watchgui:
# 	cd frontend && yarn && yarn run devwatch

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