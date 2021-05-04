import json
import paho.mqtt.client as mqtt

host = "broker.hivemq.com"
topic = "iot20202/parking-01"

client = mqtt.Client()
client.connect(host, 1883, 60)

# This is the Publisher
def publish(data):
    summary = {'type': data['type'], 'number': data['number'], 'time': data['time']}
    print("Publish => '", host, "' with topic: '", topic, "' summary: ", json.dumps(summary))

    payload = json.dumps(data)
    client.publish(topic, payload)