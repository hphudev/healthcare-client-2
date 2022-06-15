// Plugin
import { showLoading, showSuccess, showWarning } from "../plugin/sweet_alert.js"
import * as email from "../config/email.js"

// Gửi email lấy lại mật khẩu
export function sendEmailToResetPassWord(to_email, message, data = null, callback = null) {
  showLoading('Email Center', 'Sending email...');
  emailjs.send(email.serviceID, email.templateID_for_password, {
    to_email: to_email,
    message: message
  }, email.publicKey)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        showSuccess('Success', `System's email is sent`);
        if (callback != null)
          callback(data)
      }
    }, function(error) {
      showWarning('Warning', `Please check your email again and your internet`);
      if (callback != null)
        callback('fail')
    });
}

// Gửi email liên lạc
export function sendEmailToContact(subject, from_name, from_email, message, callback = null) {
  showLoading('Email Center', 'Sending email...');
  emailjs.send(email.serviceID, email.templateID_for_contact, {
    subject: subject,
    from_name: from_name,
    from_email: from_email,
    message: message
  }, email.publicKey)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        showSuccess('Success', 'Your email is sent');
        if (callback != null)
          callback("success")
      }
    }, function(error) {
      showWarning('Warning', `Please check your internet`);
      if (callback != null)
        callback('fail')
    });
}