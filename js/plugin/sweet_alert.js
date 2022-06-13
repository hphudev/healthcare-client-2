export function showLoading(title, text, timer = 147698) {
  Swal.fire({
    toast: true,
    title: "Bảo mật",
    background: '#000000',
    color: "#ffffff",
    width: "200px",
    text: "Đang kiểm tra tài khoản",
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