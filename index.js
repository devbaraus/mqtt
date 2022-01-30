require('dotenv').config()

const mqtt = require('mqtt')
const { Database } = require('./database')
const db = new Database()

const host = process.env.HOST
const port = process.env.PORT
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`


const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.USER,
    password: process.env.PASSWORD,
    reconnectPeriod: 1000,
})

const topic = '/door/+'

client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
    // publish message
    // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //     if (error) {
    //         console.error(error)
    //     }
    // })
})

// receive message
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    db.push({
        topic,
        user: payload.toString(),
        timestamp: Date.now(),
    })
})
