document.addEventListener("DOMContentLoaded", function() {
    try { let warning = document.getElementById("warningApi");
    if(localStorage.getItem("theWarningIsHidden")==="true"){
        warning.style.setProperty("display", "none", "important"); // AI again... i spent too much time trying to fix it by myself... !important...... :/
        console.log("true");
    } else {
        warning.style.setProperty("display", "block");
        console.log("false");
    } } catch { console.log("eventListener: warningAPI not found");}

    let table = document.getElementById("scroll");
    table.scrollTo({top: table.scrollHeight});
});

//TODO: scroll for classes, not ID's?
function tableScroller() {
  console.log("SCROLLLL!!!");
  let table = document.getElementById("scroll");
  table.scrollTo({top: table.scrollHeight});
}