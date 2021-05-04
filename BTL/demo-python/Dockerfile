FROM python:3

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app

COPY . /usr/src/app
RUN pip install -r requirements.txt

CMD [ "python", "main.py"]
