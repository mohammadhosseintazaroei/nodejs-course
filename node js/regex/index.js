let emailRegex = /^([a-z]+[a-z0-9\.\_]{3,40})(\@)([a-z]{2,8})(\.)([a-z]{2,7})$/igm;
const email = "m.h.tazaroie753@gmail.com";
const phoneNumberRegex = new RegExp("^([a-z]+[a-z0-9\.\_]{3,40})(\@)([a-z]{2,8})(\.)([a-z]{2,7})$" , "ig")
// console.log(emailRegex.test(email));
// console.log(emailRegex.exec(email));
console.log(phoneNumberRegex.test(email));
