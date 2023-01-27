const express = require("express");
const router = express.Router();
const schema = require("../model/model")
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const cookie = require("cookie-parser");
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const key = process.env.SESSION_SECRET;
const time = 1000 * 15 * 60;
router.use(cookie());
router.use(bodyParser.urlencoded({ extended: true }));
const sendmail = require("../nodemailer/mailer");
const bcrypt = require("bcrypt");




//signup post

router.post('/signup', async (req, res) => {

  try {
  const pass = req.body.password;
  bcrypt.hash(pass, 12, async function (err, hash){
    const otp=sendmail(req.body.email);
    const detail = { email: req.body.email, password: hash, name: req.body.username, email_status: false,otp:otp }
      const usr = new schema(detail)
      const adnew = await usr.save();
      console.log(otp)
      res.send({ msg: "signup successful redirect to the login page" })
    }) 
    
}

  catch
  {
    res.status(400).send({ msg: "email is all ready register" + "<html><br><br><a href='/'>return<a></html>" });
  }

})


//otp verification

router.post("/otpverification", async (req, res) => {
      
  try{
      let otp = await schema.findOne({email:req.body.email})
  if (otp.otp == req.body.otp) {
    await schema.updateOne({ email: req.body.email }, { email_status: true });
    res.send({ msg: "otp verified" })
  }
  else {
    res.send({ msg: "otp is not matching" })

  }
  }
  catch{
    res.status(400).send({ msg: "something went wrong" });
  }
})


//login post

router.post("/login", async (req, res) => {

  try {
    const lemail = req.body.email
    const lpassword = req.body.password

    const semail = await schema.findOne({email: lemail })
    if (semail && semail.email_status === true) {
      bcrypt.compare(lpassword, semail.password, function(err, rs){
        if(err)
        {
          res.send({msg:"kuchh error hai bro"})
        }
        if (!rs) {

          res.send({ msg: "password not match" });
        }
        else {
          const token = jwt.sign({ email: semail.email, id: semail._id }, key)
          res.cookie("token", token, {
            expires: new Date(Date.now() + time),
            httpOnly: true
          })
          console.log(token);
          res.send({ msg: `user logged in`, email: `${lemail}` })
        }

      })
      
    }
    else
      res.send({ msg: "Email is not register" + "<html><br><br><a href='/'>signup<a></html>" })
  }

  catch (e) {
    res.status(400).send(e);
  }
})


//forget password get



// forget password post

router.post("/forgetpassword", async (req, res) => {
  try{
  const semail = await schema.findOne({email: req.body.email })
  if (!semail) {
    res.send({ msg: "Email is not register" + "<html><br><br><a href='/'>signup<a></html>" })
  }
  else {
    const otp =sendmail(req.body.email);
    await schema.updateOne({email:req.body.email},{otp:otp})

    res.send( { msg: "otp send to "+req.body.email })
  }
  }
  catch{
    res.status(400).send(e);
  }
})


//forget password otp verification

router.post("/fov", async (req, res) => {

    try{
      const otp = schema.findOne({email:req.body.email})
  if (otp.otp == req.body.otp) {
    await schema.updateOne({ email: req.body.email }, { password: req.body.password });
    res.send({msg:"password changed"})
  }
  else {
    res.send({ msg: "otp is not matching"  })
  }
}
catch{
  res.status(400).send(e);
}
})

module.exports = router;
