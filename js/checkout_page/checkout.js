// Plugin
import * as host from '../config/host.js'
import { closeSwal, showError, showLoading, showSuccess, showWarning } from '../plugin/sweet_alert.js';


// Khai báo
var user = JSON.parse(sessionStorage.getItem('user'))
var cart = {}
var transports = []
var h_header_cart = document.getElementById('h-header-cart')
var content = document.getElementById('content')
var form_search = document.getElementById('form-search')
var sp_total = document.getElementById('sp-total')
var sp_discount = document.getElementById('sp-discount')
var li_total = document.getElementById('li-total')
var select_transport_unit = document.getElementById('select-transport-unit')
var purchase_order = document.getElementById('purchase-order')

// Lấy cart thừ server
async function getCartFromServer() {
  const response = await axios.post(host.convertAPI('cart/get-cart'), {
    user_id: user.id
  })
  if (response.status == 200) {
    cart = response.data
    console.log(cart)
  }
  else {
    showWarning('Warning', 'Please check your internet')
  }
}

// Lấy danh sách đơn vị cận chuyển từ server
async function getTransportUnitFromServer() {
  const response = await axios.post(host.convertAPI('unit/get-transport-unit'))
  if (response.status == 200) {
    transports = response.data
  }
  else {
    transports = []
  }
}

// Sự kiện windowloaded

window.addEventListener('load', async () => {
  showLoading('Data Center', 'Loading checkout...')
  await getCartFromServer()
  if (cart.length <= 0) {
    purchase_order.style.backgroundColor = 'grey'
    purchase_order.style.pointerEvents = 'none'
    select_transport_unit.setAttribute('disabled', '')
    closeSwal()
    return;
  }
  await getTransportUnitFromServer()
  h_header_cart.innerHTML = `My Shopping Bag (${cart.length})`
  let html = ''
  let total = 0
  let discount = 0
  cart.forEach(element => {
    html += `
          <div class="cart-header header${element.drug_id}">
            <div class="close1 close-${element.drug_id} "  onclick="ale('${host.convertAPI('cart/remove-item-in-cart')}', 'header${element.drug_id}', '${element.id}')"> </div>
            <div class="cart-sec simpleCart_shelfItem">
              <div class="cart-item cyc">
                <img src="${host.convertImageAPI(element.HinhAnh)}" class="img-responsive" alt="" />
              </div>
              <div class="cart-item-info">
                <h3><a href="#">${element.TenThuoc}</a><span>Model No: ${element.drug_id}</span></h3>
                <ul class="qty">
                  <li>
                    <p>Price : ${host.toVND(element.GiaBan)}</p>
                  </li>
                  <li>
                    <p>Qty : ${element.quantity}</p>
                  </li>
                </ul>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>`
    total += element.GiaBan * element.quantity
    discount += element.ChietKhau * element.GiaBan / 100
  })
  content.innerHTML = html
  sp_total.innerHTML = host.toVND(total)
  li_total.innerHTML = host.toVND(total - discount)
  if (discount > 0)
    sp_discount.innerHTML = host.toVND(discount)

  html = '<option value="0">- - -</option>'
  transports.forEach(element => {
    html += `<option value="${element.id}">${element.TenDonViVanChuyen}</option>`
  })
  select_transport_unit.innerHTML = html
  closeSwal()
})

// Sự kiện đặt hàng
purchase_order.addEventListener('click', async (event) => {
  event.preventDefault()
  showLoading('Data Center', 'Purchasing...')
  await getCartFromServer()
  if (select_transport_unit.value == '0') {
    showWarning('Warning', 'Please select the transport unit')
  }
  else {
    const response = await axios.post(host.convertAPI('bill/add-bill'), {
      user_id: user.id,
      cart: JSON.stringify(cart),
      transport_unit_id: select_transport_unit.value
    })
    if (response.status == 200 && response.data == "success") {
      showSuccess('Success', 'Purchased successfully')
    }
    else {
      showError('Error', 'Please check your internet or contact with Admin')
    }
  }
})

// Sự kiện tìm kiếm
form_search.addEventListener('submit', (event) => {
  event.preventDefault()
  window.location.href = 'products.html?search=' + search.value
})




