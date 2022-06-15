// Plugin
import * as host from "../config/host.js"
import { closeSwal, showLoading, showSuccess } from '../plugin/sweet_alert.js'

// Khai báo
var data = {}
var img_product_detail = document.getElementById('img-product-detail')
var thumb_image = document.getElementById('thumb-image')
var h_title = document.getElementById('h-title')
var a_number_of_drugs = document.getElementById('a-number-of-drugs')
var h_price = document.getElementById('h-price')
var p_describe = document.getElementById('p-describe')
var select_number_of_drugs = document.getElementById('select-number-of-drugs')
var a_add_to_cart = document.getElementById('a-add-to-cart')
var user = JSON.parse(sessionStorage.getItem('user'))
var bottom_product = document.getElementsByClassName('bottom-product');
var form_search = document.getElementById('form-search')

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
  data = response.data
}

// Lấy danh sách sản phẩm từ server
async function getProductsFromServer() {
  const urlParams = getUrlParameters()
  let drug_group_id = urlParams.get('trait')
  let name = urlParams.get('search')
  let serverName = host.convertAPI('drugs/get-drugs-with-drug-groups')
  const response = await axios.post(serverName, {
    id: drug_group_id,
    name: name
  })
  closeSwal();
  if (response.status == 200) {
    let data = response.data;
    console.log(data);
    let html = "";
    data.forEach(element => {
      let name = element.TenThuoc
      html += `	<div class="col-md-4 bottom-cd simpleCart_shelfItem">
                  <div class="product-at ">
                    <a href="single.html?id=${element.id}&trait=${element.TenNhomThuoc}"><img style="height: 348.5px;" class="img-responsive" src="${host.convertImageAPI(element.HinhAnh)}" alt="">
                      <div class="pro-grid">
                        <span class="buy-in" style="background-color: black; text-transform: none">Buy Now</span>
                      </div>
                    </a>
                  </div>
                  <div class="tun" style="display:flex; flex-direction: row; flex-wrap: nowrap; justify-content:space-around; align-content:flex-start">
                    <div><b>${element.TenThuoc}</b> <br> ${element.TenNhomThuoc}</div>
                    <div>
                      <a href="single.html?id=${element.id}&trait=${element.TenNhomThuoc}" class="item_add">
                        <p class="number item_price"><i>  </i>${host.toVND(element.GiaBan)}</p>
                      </a>
                    </div>
                  </div>
                  <hr>
                  <div class="clearfix"></div>
                </div>`
    });
    if (html != "")
      bottom_product[0].innerHTML = html + '<div class="clearfix"> </div>'
    else
      bottom_product[0].innerHTML = '<h2>No results.</h2>'
  }
  else {
    showError('Warning', 'Please check you Internet')
  }

}

// Sự kiện thêm vào giò hàng
a_add_to_cart.addEventListener('click', async (event) => {
  event.preventDefault()
  directionLogin()
  showLoading("Data Center", "Adding item in your cart...")
  const response = await axios.post(host.convertAPI('cart/add-item-to-cart'), {
    user_id: user.id,
    drug_id: data.drug_info.id,
    quantity: Number.parseInt(select_number_of_drugs.value)
  })
  console.log(response)
  showSuccess("Success", response.data)
})

// Sự kiện window load
window.addEventListener('load', async () => {
  direction()
  showLoading('Data Center', 'Loading item...')
  await getDrugFromSever()
  console.log(data)
  img_product_detail.setAttribute('src', host.convertImageAPI(data.drug_info.HinhAnh))
  thumb_image.setAttribute('data-thumb', host.convertImageAPI(data.drug_info.HinhAnh))
  h_title.innerHTML = data.drug_info.TenThuoc
  a_number_of_drugs.innerHTML = 'State: ' + `<b>${(data.sum <= 0) ? 'Out of stock' : (data.sum + ' items')}<b>`
  h_price.innerHTML = host.toVND(data.drug_info.GiaBan - data.drug_info.GiaBan * data.drug_info.ChietKhau / 100)
  p_describe.innerHTML = data.drug_info.MoTa
  if (data.sum <= 0) {
    select_number_of_drugs.setAttribute('disabled', '')
    a_add_to_cart.style.pointerEvents = 'none'
    a_add_to_cart.style.backgroundColor = 'grey'
  }
  else {
    select_number_of_drugs.removeAttribute('disabled')
    // a_add_to_cart.style.pointerEvents = 'auto'
    // a_add_to_cart.style.backgroundColor = 'green'
    let html = ''
    for (let i = 1; i <= data.sum; i++)
      html += `<option value="${i}">${i}</option>`
    select_number_of_drugs.innerHTML = html
  }
  await getProductsFromServer();
  closeSwal()
})

function direction() {
  if (sessionStorage.getItem('user') === null) {
    document.getElementById('li-login').style.visibility = "visible";
  }
  else {
    document.getElementById('li-logout').style.visibility = "visible";
  }
}

// Chuyển hướng khi chưa đăng nhập
function directionLogin() {
  const urlParams = getUrlParameters()
  if (sessionStorage.getItem('user') === null)
    window.location.href = `login.html?direction=single.html?id=${urlParams.get('id')}`;
}

// Sự kiện tìm kiếm
form_search.addEventListener('submit', (event) => {
  event.preventDefault()
  window.location.href = 'products.html?search=' + search.value
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
