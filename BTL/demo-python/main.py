import requests
import json
import time

import mqtt_subscriber as subscriber
import mqtt_publisher as publisher

def sentResult():
    data = {'type': 'in', 'number': '51F57493', 'time': '1620055805360'}
    #url = 'http://localhost:9000/admin/add'
    #url = 'http://host.docker.internal:9000/user/info'
    url = 'http://host.docker.internal:9000/user/info'
    res = requests.post(url, data)
    print(res.text)
    print("Sent to main server")

def echoGetAPI():
    res = requests.get('http://postman-echo.com/get')
    print(res.text)

def echoPostAPI():
    url = 'https://postman-echo.com/post?id=9'
    data = {'type': 'in', 'number': '51F57493', 'time': '1620055805360'}
    res = requests.post(url, data)
    print(res.text)

def mockPublish():
    while(True):
        publisher.safePublish({'type': 'in', 'number': '51F57493', 'time': '1620055805360'})
        time.sleep(1)

def main():
    print("Main function")
    mockPublish()

if __name__ == '__main__':
    main()
