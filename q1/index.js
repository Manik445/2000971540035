var express = require('express');
const axios = require("axios");

var app = express();
app.get('/getSchedule', async function (req, res) {

  try {
    const access_token = await axios.post("http://20.244.56.144/train/auth", {
      "companyName": "2000971540035",
      "clientID": "8885e728-f90a-491f-bf41-674744ec2013",
      "clientSecret": "EDnTAfUSllforGFt",
      "ownerName": "Manik Gupta",
      "ownerEmail": "manikgupta919@gmail.com",
      "rollNo": "2000971540035"
      });
    const token = access_token.data.access_token
    const scheduleRes = await axios.get("http://20.244.56.144/train/trains", { headers: {"Authorization" : `Bearer ${token}`}})
    const schedule = scheduleRes.data
    const filteredSchedule = schedule.filter((train) => {
      const traindepartureTime = train.departureTime
      const currentDate  = new Date()
      const trainDate = new Date();
      trainDate.setHours(traindepartureTime.Hours)
      trainDate.setMinutes(traindepartureTime.Minutes)
      trainDate.setSeconds(traindepartureTime.Seconds)
      var difference = currentDate.getTime() - trainDate.getTime();
      var resultInMinutes = Math.round(difference / 60000);
      if(resultInMinutes<=30) {
        return false
      } else {
        return true
      }
    })
    res.send(filteredSchedule)
  } catch(e) {

  }
  
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});