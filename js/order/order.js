// Plugin
import * as host from '../config/host.js'
import { closeSwal, showConfirm, showLoading } from '../plugin/sweet_alert.js'
import { getDistrict, getProvince, getWard } from '../plugin/vnappmob.js'
// Khai báo
var user = JSON.parse(sessionStorage.getItem('user'))
var orders = []
var content = document.getElementById('content')
var h_header_cart = document.getElementById('h-header-cart')
var sp_name = document.getElementById('sp-name')
var sp_email = document.getElementById('sp-email')
var li_address = document.getElementById('li-address')
var form_search = document.getElementById('form-search')

// Hàm lấy đơn hàng từ server
async function getBillFromServer() {
  const response = await axios.post(host.convertAPI('bill/get-bills-for-user'), {
    user_id: user.id
  })
  console.log(response)
  orders = response.data
}

// Chuyển dôi state đơn hàng thành tiếng anh
function convertState(state) {
  switch (state) {
    case "Đang chờ":
      return "Waiting..."
      break;
    case "Đang đóng gói":
      return "Packing..."
      break;
    case "Đang vận chuyển":
      return "Shipping..."
      break;
    case "Đã thanh toán":
      return "Paid"
      break;
    default:
      return 'Underfied'
      break;
  }
}

// Chuyển hướng khi chưa đăng nhập
function direction() {
  if (sessionStorage.getItem('user') === null)
    window.location.href = '/login.html?direction=order.html';
  if (sessionStorage.getItem('user') === null) {
    document.getElementById('li-login').style.visibility = "visible";
  }
  else {
    document.getElementById('li-logout').style.visibility = "visible";
  }
}

// Kiểm tra cho phép hủy đơn hàng
function checkCancelOrder(state) {
  return (state === "Đang chờ") ? true : false
}
// Sự kiện tải trang
window.addEventListener('load', async () => {
  direction()
  showLoading('Data Center', 'Loading your orders...')
  sp_name.innerHTML = user.first_name + ' ' + user.last_name
  sp_email.innerHTML = user.email
  let ward = ''
  let province = ''
  let district = ''
  getProvince(null, user.province, (result) => {
    province = result
    getDistrict(user.province, null, user.district, (result) => {
      district = result
      getWard(user.district, null, user.ward, (result) => {
        ward = result
        li_address.innerHTML = `${user.detail_address}, ${ward}, ${district}, ${province}`
      })
    })
  })

  await getBillFromServer()
  h_header_cart.innerHTML = `My Orders (${orders.length})`
  let html = ''
  let html_result = ''
  orders.forEach(order => {
    console.log(order.bill.TinhTrang);
    html = ''
    let sum = 0
    order.detail_bills.forEach(detail_bill => {
      sum += detail_bill.DonGia * detail_bill.SoLuong - detail_bill.DonGia * detail_bill.SoLuong * detail_bill.ChietKhau / 100
      html += ` <div class="cart-sec simpleCart_shelfItem">
                  <div class="cart-item cyc" style="width: 60px;">
                    <img src="${host.convertImageAPI(detail_bill.HinhAnh)}" class="img-responsive" alt="" />
                  </div>
                  <div class="cart-item-info">
                    <h3><a href="single.html?id=${detail_bill.drug_id}">${detail_bill.TenThuoc}</a><span>Model No: ${detail_bill.id}</span></h3>
                    <ul class="qty">
                      <li>
                        <p>Price : ${host.toVND(detail_bill.DonGia)}</p>
                      </li>
                      <li>
                        <p>Qty : ${detail_bill.SoLuong}</p>
                      </li>
                    </ul>
                    <div class="delivery">
                      <p>Subtotal : ${host.toVND(detail_bill.DonGia * detail_bill.SoLuong - detail_bill.DonGia * detail_bill.SoLuong * detail_bill.ChietKhau / 100)}</p>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>`
    });
    html = ` <div class="cart-header">
                📇 Code orders: <strong>UIT-DO-AN-2-${order.bill.id}</strong>
                <br>
                🕠 State: <span style="color: green">${convertState(order.bill.TinhTrang)}</span>
                <br>
                💰 Total: ${host.toVND(sum)}
                <div style="display: flex; justify-content: end" onclick="ale('${host.convertAPI('bill/remove-bill-detailbill-shipping')}', '${order.bill.id}', ${checkCancelOrder(order.bill.TinhTrang)})">
                  <h5 style="color: ${(checkCancelOrder(order.bill.TinhTrang) == true) ? 'orange' : 'green'}; cursor: ${(checkCancelOrder(order.bill.TinhTrang) == true) ? 'pointer' : 'auto'};">${(checkCancelOrder(order.bill.TinhTrang) == true) ? 'Hủy đơn hàng' : '✔️ Đã tiếp nhận'}</h5>
                  <!-- <div id="close" class="close1"></div> -->
                </div>
                ${html}
              </div>`
    html_result += html + '<hr>'
  });
  content.innerHTML = html_result;
  closeSwal()
})

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