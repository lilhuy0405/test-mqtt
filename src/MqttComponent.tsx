import {useEffect} from 'react';
//eslint-disable-next-line
//@ts-ignore
import * as mqtt from 'mqtt/dist/mqtt.min';

const MqttComponent = () => {
  // Replace with your EMQ server details
  const brokerUrl = 'wss://54.255.62.9:8084/mqtt';
  const topic = '/test/topic';

  useEffect(() => {
    // Create an MQTT client
    const client = mqtt.connect(brokerUrl);

    // Handle connection events
    client.on('connect', () => {
      console.log('Connected to EMQ server');
      // Subscribe to topics or perform other actions here
      client.subscribe(topic);
    });

    client.on('error', (error: any) => {
      console.error('MQTT Error:', error);
    });

    client.on('close', () => {
      console.log('Connection to EMQ server closed');
    });

    // Handle incoming messages
    client.on('message', (receivedTopic: any, message: any) => {
      console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
      // Handle the incoming message as needed
    });

    // Clean up the connection on component unmount
    return () => {
      client.end();
    };
  }, [brokerUrl, topic]);

  // You can render your component JSX here
  return (
    <div>
      <h1>MQTT Connection Example</h1>
      {/* Your component content goes here */}
    </div>
  );
};

export default MqttComponent;
