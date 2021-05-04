import requests

def main():
    print('Test request module')
    req = requests.get('http://postman-echo.com/get')
    print(req.text)

if __name__ == '__main__':
    main()