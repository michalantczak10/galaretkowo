console.log("JS działa!");
var count = 0;
var countSpan = document.getElementById("count");
var addBtn = document.getElementById("addToCart");
var orderBtn = document.getElementById("orderBtn");
addBtn.addEventListener("click", function () {
    var cartSection = document.querySelector(".cart");
    cartSection.classList.remove("cart-shake");
    void cartSection.offsetWidth;
    cartSection.classList.add("cart-shake");
    count++;
    countSpan.textContent = count.toString();
    countSpan.classList.remove("bump");
    void countSpan.offsetWidth;
    countSpan.classList.add("bump");
    addBtn.classList.remove("add-press");
    void addBtn.offsetWidth;
    addBtn.classList.add("add-press");
});
var addedMsg = document.getElementById("addedMsg");
addedMsg.style.opacity = "1";
setTimeout(function () {
    addedMsg.style.opacity = "0";
}, 600);
orderBtn.addEventListener("click", function () {
    alert("Dziękujemy za zainteresowanie! Zamówienia online będą dostępne wkrótce.");
});
