import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("broker.hivemq.com",1883,60)

# This is the Publisher
def publish():
    client.publish("topic/test", "Hello world!")
    client.disconnect()