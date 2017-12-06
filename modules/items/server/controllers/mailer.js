'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	pool: false,
	auth: {
		user: 'labinventorywebapp@gmail.com',
		pass: '1234qwer!@#$QWER'
	},
	tls: {
                rejectUnauthorized: false
    }
});

let Mailer = new function() {
	this.checkForThreshold = function(email, oldval, newval, threshold, itemName) {
		if(oldval > threshold && newval < threshold){
		console.log('message sending in process');
		let mailOptions = {
			from: '"Lab Inventory Web App" <XXXX@ufl.edu>',
			to: email,
			subject: 'Item below resupply threshold',
			text: 'The count of item ' + itemName + ' has been updated to reflect that it needs resupply.'
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
		}
	};
	this.inspectOrBrokenCheck = function(email, oldStatus, newStatus, itemName) {
		if(oldStatus = "working" && newStatus != "working"){
		console.log('message sending in process');
		let mailOptions = {
			from: '"Lab Inventory Web App" <XXXX@ufl.edu>',
			to: email,
			subject: 'Lab Item needs attention',
			text: 'Item ' + itemName + ' has been updated to reflect that it needs technician attention.'
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
		});
		}
	};
};

module.exports = Mailer;
