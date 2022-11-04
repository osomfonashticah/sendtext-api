const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const User = require("./model/birthDayModel");
const axios = require("axios");

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB connected successfully");
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "* * * 1 * *",
  async function () {
    const users = await User.find({});

    users.map((user) => {
      if (
        month === user.Birthday.getMonth() + 1 &&
        day === user.Birthday.getDate()
      ) {
        axios
          .post(
            `https://apps.mnotify.net/smsapi?key=${process.env.KEY}&to=${user.Tel}&msg=${user.Message}&sender_id=${process.env.SENDER_ID}`
          )
          .then(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  },
  null,
  true,
  "America/Los_Angeles"
);
// Use this if the 4th param is default value(false)
// job.start()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running live on ${port}`);
});
