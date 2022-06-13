// plugin
// import axios from "axios";
import { showInputText, showLoading, showSuccess, showToastSuccess, showWarning } from "../plugin/sweet_alert.js"
import { sendEmail } from "../smtp/mail.js"
import * as host from "../config/host.js"

// Khai báo
var form_login = document.getElementById('form-login')
var input_username = document.getElementById('input-username')
var input_password = document.getElementById('input-password')
var button_forgot_password = document.getElementById('btn-forgot-password')

// Sự kiện đăng nhập 
form_login.addEventListener('submit', function (event) {
  console.log("Bắt đầu - đăng nhập")
  event.preventDefault()
  login()
})

async function login() {
  console.log('Bắt đầu - kiểm tra đăng nhập')
  let username = input_username.value
  let password = input_password.value
  showLoading("Security Center", "Checking information")
  const response = await axios.post(host.convertAPI('user/get-user'), {
    email: username,
    password: password
  });
  let data = response.data
  if (data != null) {
    showToastSuccess("Signed in successfully")
  }
  else {
    showWarning("Warning", "Please check your email and password")
  }
}

// Sự kiện quên mật khẩu
button_forgot_password.addEventListener('click', function (event) {
  console.log("Bắt đầu - quên mật khẩu")
  event.preventDefault()
  showInputText("Reset your password", "Send email to reset your password", "Input your email", (email) => {
    sendEmail(email, window.location.hostname + ":" + window.location.port)
  })
})

window.onload = () => {
  if (sessionStorage.getItem('user') != null) {
    // window.location.href = '/index.html';
  }
};
