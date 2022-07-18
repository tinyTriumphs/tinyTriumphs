const childDate = document.querySelectorAll(".child-date");
console.log(childDate);

for (var i=0; i < childDate.length; i++) {
    // childDate[i].innerText;
    var correctedDate = moment(childDate[i].innerText).format("LL");
    childDate[i].innerText = "";
    childDate[i].innerText = correctedDate;
}