export function sendEmail(to_email, from_name, to_name, message) {
    emailjs.send('service_u6ssbbs', 'template_kfxfq0l', {
      to_email: to_email,
      from_name: from_name, 
      to_name: to_name,
      message: message
    })
    .then((res) => {
      console.log(res);
    });
}