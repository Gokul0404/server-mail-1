
//npm i nodemon express

const express = require("express");
const app = express();
const cors = require("cors"); // npm i cors
const mailer = require("nodemailer");
require("dotenv").config(); //npm i dotenv

//middleware
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send('<h1 style="text-align:center; color:blue">welcome</h1>');
});

app.post("/api/sendEmail", (req, res) => {
  console.log(req.body);
  res.send("yes i got");
  let data = req.body;
  console.log(data);

  //mail send work
  const transporter = mailer.createTransport({
    host: "example.com",
    port: 465,
    secure: true,

    service: "gmail",
    auth: {
      user: "gokul332020@gmail.com",
      pass: process.env.appPassword,
    },
    // secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailoptions = {
    from: "gokul332020@gmail.com",
    to: "gokulspk04@gmail.com",
    subject: "message from client",
    html: `<ul style="list-style:none; color:black;">
          <li> Name: ${data.name}</li>
          <li>MobileNumber: ${data.phonenumber}</li>
          <li>Email Id: ${data.email}</li>
          <li>Message: ${data.message}</li>
        </ul>`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
});

app.listen(8005, () => {
  console.log("port start");
});
