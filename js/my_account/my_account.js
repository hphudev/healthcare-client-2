// plugin
import * as vnappmob from '../plugin/vnappmob.js'
import * as host from '../config/host.js'
import { showConfirm, showLoading, showSuccess, showWarning } from '../plugin/sweet_alert.js'
// Khai báo
var user = JSON.parse(sessionStorage.getItem('user'))
var select_province = document.getElementById('select-province')
var select_district = document.getElementById('select-district')
var select_ward = document.getElementById('select-ward')
var form_register = document.getElementById('form-register')
var input_first_name = document.getElementById('input-first-name')
var input_last_name = document.getElementById('input-last-name')
var input_email = document.getElementById('input-email')
var input_detail_address = document.getElementById('input-detail-address')
var input_password = document.getElementById('input-password')
var input_confirm_password = document.getElementById('input-confirm-password')
// Autocomplete địa chỉ
select_province.addEventListener('focus', () => {
  vnappmob.getProvince(select_province)
})

select_province.addEventListener('change', () => {
  vnappmob.getDistrict(select_province.value, select_district)
})

select_district.addEventListener('change', () => {
  vnappmob.getWard(select_district.value, select_ward)
})

// Sự kiện đăng ký
form_register.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (input_password.value != input_confirm_password.value) {
    showWarning('Warning', 'Password and Confirm password field are not the same')
  }
  showLoading('Security Center', 'Checking your information...')
  const response = await axios.post(host.convertAPI('user/update-user'), {
    id: user.id,
    first_name: input_first_name.value,
    last_name: input_last_name.value,
    email: input_email.value,
    province: select_province.value,
    district: select_district.value,
    ward: select_ward.value,
    detail_address: input_detail_address.value,
    password: input_password.value
  })
  console.log(response)
  if (response.data != 'error') {
    showSuccess('Success', 'Your information is updated successfully')
    console.log(response.data)
    sessionStorage.setItem('user', JSON.stringify(response.data))
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  else {
    showWarning('Warning', 'Your email is exist in system')
  }
})

// 
// Chuyển hướng khi chưa đăng nhập
function direction() {
  if (sessionStorage.getItem('user') === null) {
    window.location.href = 'login.html?direction=order.html';
  }
  else {
    document.getElementById('li-logout').style.visibility = "visible"
  }
}

window.addEventListener('load', () => {
  direction()
  input_first_name.value = user.first_name
  input_last_name.value = user.last_name
  input_email.value = user.email
  input_detail_address.value = user.detail_address
  input_password.value = user.password
  input_confirm_password.value = user.password
  vnappmob.getProvince(select_province, user.province, (result) => {
    select_province.value = user.province
  })
  vnappmob.getDistrict(user.province, select_district, user.district, (result) => {
    select_district.value = user.district
  })
  vnappmob.getWard(user.district, select_ward, user.ward, (result) => {
    select_ward.value = user.ward
  })
})

// logout
document.getElementById('li-logout').addEventListener('click', (event)=>{
  event.preventDefault()
  showConfirm('You want to sign out?', 'Press confirm to sign out', (result) => {
    if (result === true) {
      sessionStorage.removeItem('user')
      window.location.reload()
    }
  })
})