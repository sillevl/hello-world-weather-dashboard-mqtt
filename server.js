let ttn = require("ttn")
let mqtt = require('mqtt')

require('dotenv').config()
 
const appID = process.env.APPID
const accessKey = process.env.ACCESSKEY
const topic = "webtechnology/hello-world/weather"
 
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload.payload_fields.temperature_1)
      let payload_fields = payload.payload_fields;
      let data = {
          temperature: payload_fields.temperature_1,
          humidity: payload_fields.relative_humidity_3,
          pressure: payload_fields.barometric_pressure_2
      }
      console.log(data)
      labict.publish(topic, JSON.stringify(data), {retain: true})
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })

  let labict  = mqtt.connect('mqtt://mqtt.labict.be')
