const express = require('express')
const app = express()
const port = 3000
const db = require('monk')('localhost/mydb');
const nodemailer = require("nodemailer");

app.get('/', (req, res) => {
  res.send('Hi World!')
})

app.get('/testimonials', (req, res) => {
    console.log(req.query)
    const users = db.get('Testimonial');

    console.log(`req.query`,req.query);
    const payload = req.query;
    const dbRes = users.insert(payload);
    res.send('Thanks for your feedback!')
  })
  app.get('/contactus',async (req, res) => {
    console.log(req.query)
    const users = db.get('contactus');

    console.log(`req.query`,req.query);
    const payload = req.query;
    const dbRes = users.insert(payload);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "rossyk187@gmail.com", // generated ethereal user
          pass: "abc_12345678@", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: req.query.email, // list of receivers
        subject: "Thank you for contacting us ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b> Hi,${req.query.name}</b> <br> Thank You for query we will get back to you soon as possible`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    res.send('Thanks for your Query')
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
