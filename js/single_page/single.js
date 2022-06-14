// Plugin
import * as host from "../config/host.js"
import { closeSwal, showLoading } from '../plugin/sweet_alert.js'

// Khai báo
var data = {}
var img_product_detail = document.getElementById('img-product-detail')
var thumb_image = document.getElementById('thumb-image')
var h_title = document.getElementById('h-title')
var a_number_of_drugs = document.getElementById('a-number-of-drugs')
var h_price = document.getElementById('h-price')
var p_describe = document.getElementById('p-describe')
var select_number_of_drugs = document.getElementById('select-number-of-drugs')

// Lấy id từ parameters
function getUrlParameters() {
  const queryString = window.location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  return urlParams;
}

// Lấy thông tin sản phẩm từ server
async function getDrugFromSever() {
  let urlParams = getUrlParameters();
  let drug_id = urlParams.get('id')
  const response = await axios.post(host.convertAPI('drug/get-drug-by-id'), {
    id: drug_id
  })
  // console.log(response)
  data = response.data
}

// Sự kiện window load
window.addEventListener('load', async () => {
  showLoading('Data Center', 'Loading item...')
  await getDrugFromSever()
  console.log(data)
  img_product_detail.setAttribute('src', host.convertImageAPI(data.drug_info.HinhAnh))
  thumb_image.setAttribute('data-thumb', host.convertImageAPI(data.drug_info.HinhAnh))
  h_title.innerHTML = data.drug_info.TenThuoc
  a_number_of_drugs.innerHTML = 'State: ' + `<b>${(data.sum <= 0) ? 'Out of stock' : (data.sum + ' items')}<b>`
  h_price.innerHTML = host.toVND(data.drug_info.GiaBan - data.drug_info.GiaBan * data.drug_info.ChietKhau / 100)
  p_describe.innerHTML = data.drug_info.MoTa
  if (data.sum <= 0) 
    select_number_of_drugs.setAttribute('disabled', '')
  else
  {
    select_number_of_drugs.removeAttribute('disabled')
    let html = ''
    for (let i = 1; i <= data.sum; i++)
      html += `<option value="${i}">${i}</option>`
    select_number_of_drugs.innerHTML = html
  }
  closeSwal()
})
