

document.addEventListener("DOMContentLoaded", function() {
    let warning = document.getElementById("warningApi");
    if(localStorage.getItem("theWarningIsHidden")==="true"){
        warning.style.setProperty("display", "none", "important"); // AI again... i spent too much time trying to fix it by myself... !important...... :/
        console.log("true");
    } else {
        warning.style.setProperty("display", "block");
        console.log("false");
    }
});