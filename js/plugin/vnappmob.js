// https://vapi.vnappmob.com/province.html
const host = 'https://vapi.vnappmob.com/'
const province = 'api/province/'
const district = 'api/province/district/'
const award = 'api/province/ward/'

export async function getProvince(dom_select_province = null, id_province = null, callback = null) {
  $.ajax({
    type: "get",
    url: host + province,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      let name_required = ''
      response.results.forEach(element => {
        html += `<option value="${element.province_id}">${element.province_name}</option>`
        if (id_province === element.province_id)
          name_required = element.province_name
      });
      if (dom_select_province != null)
        dom_select_province.innerHTML = html;
      if (callback != null) {
        callback(name_required)
      }
      return response;
    }
  });
}

export async function getDistrict(provinceID, dom_select_district = null, id_district = null, callback = null) {
  $.ajax({
    type: "get",
    url: host + district + provinceID,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      let name_required = ''
      response.results.forEach(element => {
        html += `<option value="${element.district_id}">${element.district_name}</option>`
        if (id_district === element.district_id) {
          name_required = element.district_name
        }
      });
      if (dom_select_district != null)
        dom_select_district.innerHTML = html;
      if (callback != null) {
        callback(name_required)
      }
    }
  });
}

export async function getWard(districtID, dom_select_award = null, id_ward = null, callback = null) {
  $.ajax({
    type: "get",
    url: host + award + districtID,
    success: await function (response) {
      let html = `<option value="0">---</option>`;
      let name_required = ''
      response.results.forEach(element => {
        html += `<option value="${element.ward_id}">${element.ward_name}</option>`
        if (id_ward === element.ward_id)
          name_required = element.ward_name
      });
      if (dom_select_award != null)
        dom_select_award.innerHTML = html;
      if (callback != null) {
        callback(name_required)
      }
      }
  });
}