const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'notifikeysin123@gmail.com',
      pass: 'werdester'
    }
  });




  var sendMail = (to,text)=>{

	var mailOptions = {
	  from: 'notifikeysin123@gmail.com',
	  to: to,
	  subject: 'Başvurunuzla Alakalı Bir Gelişme Var !!!',
	  text
	};


	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

}

module.exports={sendMail}