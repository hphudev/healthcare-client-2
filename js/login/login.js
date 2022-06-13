// plugin
import { showLoading, showSuccess, showToastSuccess, showWarning } from "../plugin/sweet_alert.js";
import { sendEmail } from "../smtp/mail.js";

// Khai báo
var form_login = document.getElementById('form-login');
var input_username = document.getElementById('input-username');
var input_password = document.getElementById('input-password');
var button_forgot_password = document.getElementById('btn-forgot-password');

// Sự kiện đăng nhập 
form_login.addEventListener('submit', function (event) {
  console.log("Bắt đầu đăng nhập");
  event.preventDefault();
  checkLogin();
})

function checkLogin() {
  let username = input_username.value;
  let password = input_password.value;
  showLoading("Bảo mật", "Đang kiểm tra thông tin");
  $.ajax({
    type: "post",
    url: hostName + "/user/get-user",
    data: {
      email: username,
      password: password
    },
    success: function (response) {
      console.log(response);
      if (response !== 'null') {
        sessionStorage.setItem('user', JSON.stringify(response));
        showToastSuccess("Signed in successfully");
      }
      else {
        showWarning('Warning', "Please check username and password.");
      }
    }
  });
}

// Sự kiện quên mật khẩu
button_forgot_password.addEventListener('click', function(event) {
  console.log("Bắt đầu quên mật khẩu");
  event.preventDefault();
  sendEmail('healthcare.uit.system@gmail.com', 'Phú', 'Private', window.location.hostname);
}) 

window.onload = () => {
  if (sessionStorage.getItem('user') != null) {
    // window.location.href = '/index.html';
  }
};
