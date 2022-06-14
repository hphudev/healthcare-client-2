// https://vapi.vnappmob.com/province.html
const host = 'https://vapi.vnappmob.com/'
const province = 'api/province/'
const district = 'api/province/district/'
const award = 'api/province/ward/'

export async function getProvince(dom_select_province) {
  $.ajax({
    type: "get",
    url: host + province,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      response.results.forEach(element => {
        html += `<option value="${element.province_id}">${element.province_name}</option>`
      });
      dom_select_province.innerHTML = html;
      return response;
    }
  });
}

export async function getDistrict(provinceID, dom_select_district) {
  $.ajax({
    type: "get",
    url: host + district + provinceID,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      response.results.forEach(element => {
        html += `<option value="${element.district_id}">${element.district_name}</option>`
      });
      dom_select_district.innerHTML = html;
    }
  });
}

export async function getWard(districtID, dom_select_award) {
  $.ajax({
    type: "get",
    url: host + award + districtID,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      response.results.forEach(element => {
        html += `<option value="${element.ward_id}">${element.ward_name}</option>`
      });
      dom_select_award.innerHTML = html;
    }
  });
}