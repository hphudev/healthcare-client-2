export function showLoading(title, text, timer = 147698) {
  Swal.fire({
    toast: true,
    title: title,
    background: '#000000',
    color: "#ffffff",
    width: "300px",
    text: text,
    timer: timer,
    showConfirmButton: false
  });
  Swal.showLoading();
}

export function showSuccess(title, text) {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    timer: 3000
  })
}

export function showToastSuccess(title) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: title,
  })
}

export function showWarning(title, text) {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text
  })
}

export function showError(title, text) {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text
  })
}

export function showInputText(title, inputLabel, inputPlaceholder, callback) {
  Swal.fire({
    title: title,
    inputLabel: inputLabel,
    inputPlaceholder: inputPlaceholder,
    input: 'text',
    padding: '18px',
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: 'Send',
    inputValidator: (value) => {
      if (!value) {
        return 'You need to fill information!'
      }
    }
  }).then((response) => {
    console.log(response);
    if (response.isConfirmed)
      callback(response.value);
  })
}

export function showConfirm(title, text, callback) {
  Swal.fire({
    icon: "question",
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonText: "Confirm"
  }).then((result) => {
    callback(result.isConfirmed)
  })
}
export function closeSwal() {
  Swal.close();
}