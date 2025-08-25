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
    try { table.scrollTo({top: table.scrollHeight}); } catch { console.log("eventListener: nothing to scroll")};
});

// document.addEventListener('DOMContentLoaded', () => {

//   // Get all "navbar-burger" elements
//   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

//   // Add a click event on each of them
//   $navbarBurgers.forEach( el => {
//     el.addEventListener('click', () => {

//       // Get the target from the "data-target" attribute
//       const target = el.dataset.target;
//       const $target = document.getElementById(target);

//       // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//       el.classList.toggle('is-active');
//       $target.classList.toggle('is-active');

//     });
//   });

//TODO: finish the bulma burger
const burgerIcon = document.querySelector(`navbar-burger`);
const navbarMenu = document.querySelector(`#navMenu`);
burgerIcon.addEventListener("click", () => {
            navbarMenu.classList.toggle("is-active");
        });
