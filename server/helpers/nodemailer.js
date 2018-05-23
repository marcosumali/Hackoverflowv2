function sendemail (email) {
  const nodemailer = require('nodemailer');

  nodemailer.createTestAccount((err, account) => {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'youremailserviceid@gmail.com', // generated ethereal user
          pass: 'katakunci' // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
    });

    
    let mailOptions = {
      from: '"Hack Overflow" <youremailserviceid@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello from Hack Overflow', // Subject line
      text: 'Welcome to Hack Overflow ;D', // plain text body
      html: `Hi <b><span style="color:dodgerblue">${email}</span></b>, <br>
      <p style="margin-bottom:0px;">Welcome to Hack Overflow!</p><br>
      <p style="margin-top:0px;margin-bottom:0px;">You're now part of a community of hundreds of thousands of developers <br>
      using our forum to build better apps and grow their businesses. <br>
      Congrats on joining our community. <br></p>
      <br>
      <p>We can't wait to see what you create!</p>
      <b>The Hack Overflow Team</b>` // html body
    };
    
    // console.log('send email done to', email)

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

module.exports = sendemail;

