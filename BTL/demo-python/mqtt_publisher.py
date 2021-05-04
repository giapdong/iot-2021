import paho.mqtt.client as mqtt

# This is the Publisher
def publish():
    client = mqtt.Client()
    client.connect("broker.hivemq.com",1883,60)
    client.publish("topic/test", "Hello world!")
    client.disconnect()