const nodejsmailer = require('nodemailer');

var transporter = nodejsmailer.createTransport({
    service:'gmail',
    auth:{
        user:'lalanrana01000@gmail.com',
        pass:'lcowbbjsduqtkuoq'
    }
});

var mailOptions ={
    from:'lalanrana01001@gmail.com',
    to:'lalanrana01002@gmail.com',
    subject:"Sending Email to Rajat",
    text:"Welcome to NodeMailer, It's Working",
}  

transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }else{
        console.log('Email Send ' + info.response);
    }
});

