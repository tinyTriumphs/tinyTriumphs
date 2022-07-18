//converts child's birthdate formate to Month, DD YYYY
const childDate = document.querySelectorAll(".child-date");
const singleChildDate = document.querySelector(".single-child-date");

//for children.handlebars
for (var i=0; i < childDate.length; i++) {
    // childDate[i].innerText;
    var correctedDate = moment(childDate[i].innerText).format("LL");
    childDate[i].innerText = "";
    childDate[i].innerText = correctedDate;
}

//for childid.handlebars
if (singleChildDate) {
var correctedDate = moment(singleChildDate.innerText).format("LL");
singleChildDate.innerText = "";
singleChildDate.innerText = correctedDate;
}