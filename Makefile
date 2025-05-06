DC := docker compose

alembic-revision:
	docker compose -f alembic/docker-compose.yaml run --rm alembic alembic revision -m "$(m)"

alembic-upgrade:
	docker compose -f alembic/docker-compose.yaml run --rm alembic alembic upgrade head


# Dev environment
up:
	$(DC) up -d

down: 
	$(DC) down


# Rebuild specific service
rebuild-api:
	$(DC) up -d --build api

rebuild-ui:
	$(DC) up -d --build ui
