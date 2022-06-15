// plugin
import * as host from '../config/host.js'
import { closeSwal, showConfirm, showWarning } from '../plugin/sweet_alert.js'

// Khai báo
var new_product = document.getElementsByClassName('new-product')
var form_search = document.getElementById('form-search')
var search = document.getElementById('search')

// Ẩn hiện nút login, logout
function direction() {
  if(sessionStorage.getItem('user') === null){
    document.getElementById('li-login').style.visibility = "visible";
  }
  else {
    document.getElementById('li-logout').style.visibility = "visible";
  }
}

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

// Sự kiện tải trang
window.addEventListener('load', async () => {
  direction()
  const response = await axios.post(host.convertAPI('drugs/get-top-four-new-drugs'));
  console.log(response);
  if (response.status != 200) {
    showWarning('Warning', 'Please check your Internet');
    return;
  }
  let html = '';
  response.data.forEach(element => {
    html +=
      '<div class="col-md-3 grid-top simpleCart_shelfItem">\
          <a href="single.html?id=' + element.id + '" class="b-link-stripe b-animate-go  thickbox"><img class="img-responsive"\
            src="' + host.convertImageAPI(element.HinhAnh) + '" style="height: 250px; object-fit: cover;" alt="">\
            <div class="b-wrapper">\
              <h3 class="b-animate b-from-left b-delay03 ">\
                <span>' + element.TenThuoc + '</span>\
              </h3>\
            </div>\
          </a>\
          <p><a href="single.html?id=' + element.id + '">' + element.TenThuoc + '</a></p>\
          <a href="single.html?id=' + element.id + '" class="item_add">\
            <p class="number item_price"><i> </i>' + host.toVND(element.GiaBan) + '</p>\
          </a>\
        </div>';
  });
  new_product[0].innerHTML = html
});

// Sự kiện tìm kiếm
form_search.addEventListener('submit', (event) => {
  event.preventDefault()
  window.location.href = 'products.html?search=' + search.value
})