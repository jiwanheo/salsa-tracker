DC := docker compose

alembic-revision:
	sudo $(DC) -f alembic/docker-compose.yaml run --rm alembic alembic revision -m "$(m)"

alembic-upgrade:
	sudo $(DC) -f alembic/docker-compose.yaml run --rm alembic alembic upgrade head


# Dev environment
up:
	sudo $(DC) -f docker-compose-dev.yaml up -d

down: 
	sudo $(DC) -f docker-compose-dev.yaml down


# Rebuild specific service
rebuild-api:
	sudo $(DC) -f docker-compose-dev.yaml up -d --build api

rebuild-ui:
	sudo $(DC) -f docker-compose-dev.yaml up -d --build ui
