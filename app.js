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
addBtn.addEventListener("click", function () {
    var cartSection = document.querySelector(".cart");
    cartSection.classList.remove("cart-shake");
    void cartSection.offsetWidth;
    cartSection.classList.add("cart-shake");
    count++;
    miniCount.textContent = count.toString();
    miniCount.classList.remove("bump");
    void miniCount.offsetWidth;
    miniCount.classList.add("bump");
    countSpan.textContent = count.toString();
    countSpan.classList.remove("bump");
    void countSpan.offsetWidth;
    countSpan.classList.add("bump");
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
