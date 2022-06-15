// Plugin
import { showLoading, showSuccess, showWarning } from "../plugin/sweet_alert.js"
import * as email from "../config/email.js"

// Gửi email
export function sendEmailToResetPassWord(to_email, message, data, callback) {
  showLoading('Email Center', 'Sending email...');
  emailjs.send(email.serviceID, email.templateID, {
    to_email: to_email,
    message: message
  }, email.publicKey)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        showSuccess('Success', 'Email sent');
        callback(data)
      }
    }, function(error) {
      showWarning('Warning', `Please check your email again and your internet`);
      callback('fail')
    });
}