FROM python:3

RUN apt-get update -y && \
    apt-get install -y vim

COPY ./server/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./server /app

EXPOSE 5000

CMD ["python", "Server.py" ]
