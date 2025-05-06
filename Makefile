DC := docker compose

alembic-revision:
	docker compose -f alembic/docker-compose-dev.yaml run --rm alembic alembic revision -m "$(m)"

alembic-upgrade:
	docker compose -f alembic/docker-compose-dev.yaml run --rm alembic alembic upgrade head


# Dev environment
up:
	$(DC) -f docker-compose-dev.yaml up -d

down: 
	$(DC) -f docker-compose-dev.yaml down


# Rebuild specific service
rebuild-api:
	$(DC) -f docker-compose-dev.yaml up -d --build api

rebuild-ui:
	$(DC) -f docker-compose-dev.yaml up -d --build ui
