// Plugin
import * as host from '../config/host.js'
import { closeSwal, showConfirm, showError, showLoading, showSuccess } from '../plugin/sweet_alert.js'

// Khai báo
var bottom_product = document.getElementsByClassName('bottom-product');
var form_search = document.getElementById('form-search')
var search = document.getElementById('search')

// Lấy các params trên url
function getUrlParameters() {
  const queryString = window.location.search;
  // console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  return urlParams;
}

// Lấy các sản phẩm theo trait
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
      html += `	<div class="col-md-6 bottom-cd simpleCart_shelfItem">
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

function direction() {
  if (sessionStorage.getItem('user') === null) {
    document.getElementById('li-login').style.visibility = "visible";
  }
  else {
    document.getElementById('li-logout').style.visibility = "visible";
  }
}

// Sự kiện window load
window.addEventListener('load', () => {
  direction()
  setInterval(async () => {
    getProductsFromServer();
  }, 5000);
  showLoading('Data Center', 'Loading...')
  getProductsFromServer();
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
