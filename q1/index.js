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
    res.send(schedule)
  } catch(e) {

  }
  
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});