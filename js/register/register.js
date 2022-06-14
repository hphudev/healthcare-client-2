// plugin
import * as vnappmob from '../plugin/vnappmob.js'

// Khai báo
var select_province = document.getElementById('select-province')
var select_district = document.getElementById('select-district')
var select_award = document.getElementById('select-award')

// Cập nhật province

select_province.addEventListener('focus', () => {
  vnappmob.getProvince(select_province)
})

select_province.addEventListener('change', () => {
  vnappmob.getDistrict(select_province.value, select_district)
})

select_district.addEventListener('change', () => {
  vnappmob.getAward(select_district.value, select_award)
})