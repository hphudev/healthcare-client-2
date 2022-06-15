// plugin
// import axios from "axios";
import { showInfo, showInputText, showLoading, showSuccess, showToastSuccess, showWarning } from "../plugin/sweet_alert.js"
import { sendEmailToResetPassWord } from "../smtp/mail.js"
import * as host from "../config/host.js"

// Khai báo
var form_login = document.getElementById('form-login')
var input_username = document.getElementById('input-username')
var input_password = document.getElementById('input-password')
var button_forgot_password = document.getElementById('btn-forgot-password')

// Chuyển hướng khi đã đăng nhập
function direction() {
  let queryString = window.location.search
  let urlParams = new URLSearchParams(queryString)
  let address = urlParams.get('direction')
  if (address != null) {
    window.location.href = address
  }
  else {
    window.location.href = 'index.html';
  }
}
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
  console.log(data)
  if (data != null) {
    sessionStorage.setItem('user', JSON.stringify(data))
    showToastSuccess("Signed in successfully")
    setTimeout(() => {
      window.location.reload();
    }, 1500);
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
    let token = btoa(Math.floor(Math.random() * 999999) + 100000);
    sendEmailToResetPassWord(email, `https://${window.location.hostname}/healthcare-client-2/login.html?email=${email}&token=${token}`, 
    {
      email: email,
      token: token
    }, async (data) => {
      if (data != "fail") {
        const response = await axios.post(host.convertAPI('user/update-token-user'), {
          email: data.email,
          token: data.token
        })
        if (response.data == "success") {
          showSuccess('Success', 'Token is generated successfully')
        }
      }
    })
  })
})

window.onload = () => {
  if (sessionStorage.getItem('user') != null) {
    direction()
  }
  let queryString = window.location.search
  let urlParams = new URLSearchParams(queryString)
  let email = urlParams.get('email')
  let token = urlParams.get('token')
  if (email != null & token != null) {
    loginByToken(email, token)
  }
};

// Login bằng token
async function loginByToken(email, token) {
  console.log('Bắt đầu - kiểm tra đăng nhập')
  showLoading("Security Center", "Checking information")
  const response = await axios.post(host.convertAPI('user/get-user-by-token'), {
    email: email,
    token: token
  });
  let data = response.data
  console.log(data)
  if (data != null) {
    sessionStorage.setItem('user', JSON.stringify(data))
    showInfo('Information', 'Please change your password in My Account', async (result) => {
      const response = await axios.post(host.convertAPI('user/update-token-user'), {
        email: email,
        token: null
      })
      window.location.href = 'my_account.html'
    })
  }
  else {
    showWarning("Warning", "Your token is expired")
  }
}