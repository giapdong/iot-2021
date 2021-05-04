import requests

import eclipse_subscriber as subscriber
# from eclipse_subscriber import * as subscriber
# from mqtt_publisher import publisher

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

def main():
    print("Main function")
    subscriber.subscribe()

if __name__ == '__main__':
    main()
