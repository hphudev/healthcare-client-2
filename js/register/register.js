// plugin
import * as vnappmob from '../plugin/vnappmob.js'
import * as host from '../config/host.js'
import { showLoading, showSuccess, showWarning } from '../plugin/sweet_alert.js'
// Khai báo
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
  if (input_password.value != input_confirm_password.value){
    showWarning('Warning', 'Password and Confirm password field are not the same')
  }
  showLoading('Security Center', 'Checking your information...')
  const response = await axios.post(host.convertAPI('user/register-account'), {
    first_name: input_first_name.value,
    last_name: input_last_name.value,
    email: input_email.value,
    province: select_province.value,
    district: select_district.value,
    ward: select_ward.value,
    detail_address: input_detail_address.value,
    password: input_password.value
  })
  if (response === 'success') {
    showSuccess('Success', 'Sign up successfully')
    window.location.reload()
  }
  else {
    showWarning('Warning', 'Your email is exist in system')
  }
})