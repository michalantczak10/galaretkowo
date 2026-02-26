var count = 0;
var PRICE = 18;
var cart = [
    { name: "Galaretka wieprzowa", price: 18, qty: 2 },
    { name: "Galaretka drobiowa", price: 20, qty: 1 },
    {
        name: "Galaretka wieprzowa - DLA MIĘSOŻERCÓW (SAMO MIĘSO)",
        price: 20,
        qty: 2,
    },
    {
        name: "Galaretka drobiowa - DLA MIĘSOŻERCÓW (SAMO MIĘSO)",
        price: 22,
        qty: 1,
    },
];
// Pobranie elementów
var addBtn = document.getElementById("addToCart");
var orderBtn = document.getElementById("orderBtn");
var miniCart = document.querySelector(".mini-cart");
var miniCount = document.getElementById("miniCount");
var miniTotal = document.getElementById("miniTotal");
// Uniwersalna funkcja animacji
var animate = function (el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
};
// Kliknięcie "Dodaj do koszyka"
addBtn.addEventListener("click", function () {
    count++;
    // Aktualizacja danych
    miniCount.textContent = count.toString();
    miniTotal.textContent = (count * PRICE).toString();
    // Animacje
    animate(miniCount, "bump");
    animate(miniTotal, "bump");
    animate(miniCart, "mini-cart-shake");
    animate(miniCart, "mini-cart-pulse");
});
// Kliknięcie "Zamów"
orderBtn.addEventListener("click", function () {
    alert("Dziękujemy za zainteresowanie! Zamówienia online będą dostępne wkrótce.");
});
