import paho.mqtt.client as mqtt
import json

# host = "broker.hivemq.com"
host = "host.docker.internal"
topic = "iot20202/parking-01"

mqtt.Client.connected_flag=False
mqtt.Client.established_flag=False
client = mqtt.Client()

# Safe connection: http://www.steves-internet-guide.com/client-connections-python-mqtt/
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connect successfully")
        client.connected_flag=True
    else:
        print("Failed connect, return code: ", rc)

def on_disconnect(client, userdata, rc):
    print("Disconnecting reason:  "  + str(rc))
    client.connected_flag=False

def publish(data):
    summary = {'type': data['type'], 'number': data['number'], 'time': data['time']}
    print("Publish => '", host, "' with topic: '", topic, "' summary: ", json.dumps(summary))

    payload = json.dumps(data)
    client.publish(topic, payload)

def establish():
    try:
        client.on_connect = on_connect
        client.on_disconnect = on_disconnect
        client.connect(host, 1883, 60)
        client.loop_start()
        client.established_flag=True
    except:
        print("Cannot establish connect to MQTT Broker")
        client.established_flag=False

def safePublish(data):
    if client.established_flag:
        if client.connected_flag:
            publish(data)
        else:
            print("Connecting to broker...")
    else:
        establish()

establish()

