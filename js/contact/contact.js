// Plugin

import { sendEmailToContact } from "../smtp/mail.js"

// Khai báo
var input_name = document.getElementById('input-name')
var input_email = document.getElementById('input-email')
var input_subject = document.getElementById('input-subject')
var input_message = document.getElementById('input-message')
var form_contact = document.getElementById('form-contact')

// Hiển thị nút login
function direction() {
  if (sessionStorage.getItem('user') === null) {
    document.getElementById('li-login').style.visibility = "visible";
  }
}

// Sự kiện gửi thư
form_contact.addEventListener('submit', (event) => {
  event.preventDefault()
  sendEmailToContact(input_subject.value, input_name.value, input_email.value, input_message.value, (result) => {
    if (result == "success") {
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }
  })
})

// Sự kiện window load
window.addEventListener('load', () => {
  direction()
})