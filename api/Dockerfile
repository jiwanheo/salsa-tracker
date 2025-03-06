FROM python:3.11

WORKDIR /api

COPY app/main.py app/main.py
COPY requirements.txt .
RUN pip install -r requirements.txt

CMD ["fastapi", "run", "app/main.py", "--port", "8000"]