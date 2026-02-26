console.log("JS działa!");
var count = 0;
var PRICE = 18;
var totalSpan = document.getElementById("total");
var updateTotal = function () {
    var total = count * PRICE;
    totalSpan.textContent = total.toString();
};
updateTotal();
var countSpan = document.getElementById("count");
var addBtn = document.getElementById("addToCart");
var orderBtn = document.getElementById("orderBtn");
var miniCart = document.querySelector(".mini-cart");
var miniCount = document.getElementById("miniCount");
var miniTotal = document.getElementById("miniTotal");
addBtn.addEventListener("click", function () {
    var cartSection = document.querySelector(".cart");
    cartSection.classList.remove("mini-cart-shake");
    void cartSection.offsetWidth;
    cartSection.classList.add("cart-shake");
    miniCart.classList.remove("mini-cart-shake");
    void miniCart.offsetWidth;
    miniCart.classList.add("mini-cart-shake");
    count++;
    miniCount.textContent = count.toString();
    miniTotal.textContent = (count * PRICE).toString();
    miniCount.classList.remove("bump");
    void miniCount.offsetWidth;
    miniCount.classList.add("bump");
    countSpan.textContent = count.toString();
    countSpan.classList.remove("bump");
    void countSpan.offsetWidth;
    countSpan.classList.add("bump");
    miniTotal.classList.remove("bump");
    void miniTotal.offsetWidth;
    miniTotal.classList.add("bump");
    miniCart.classList.remove("mini-cart-pulse");
    void miniCart.offsetWidth;
    miniCart.classList.add("mini-cart-pulse");
    updateTotal();
});
var addedMsg = document.getElementById("addedMsg");
addedMsg.style.opacity = "1";
setTimeout(function () {
    addedMsg.style.opacity = "0";
}, 600);
orderBtn.addEventListener("click", function () {
    alert("Dziękujemy za zainteresowanie! Zamówienia online będą dostępne wkrótce.");
});
