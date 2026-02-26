console.log("JS działa!");
// Tablica koszyka
var cart = [];
// Pobranie elementów z HTML
var addButtons = document.querySelectorAll(".addToCartBtn");
var miniCart = document.querySelector(".mini-cart");
var miniCount = document.getElementById("miniCount");
var miniTotal = document.getElementById("miniTotal");
var cartList = document.getElementById("cartList");
// Funkcja animacji
var animate = function (el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
};
// Wyświetlanie listy produktów
function renderMiniCartList() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        var empty = document.createElement("p");
        empty.textContent = "Koszyk jest pusty";
        empty.classList.add("fade-in");
        cartList.appendChild(empty);
        return;
    }
    cart.forEach(function (item) {
        var row = document.createElement("div");
        row.classList.add("cart-item", "fade-in");
        // miniaturka
        var img = document.createElement("img");
        img.src = "img/".concat(item.name.toLowerCase().replace(/ /g, "-"), ".png");
        // nazwa + ilość + cena
        var info = document.createElement("div");
        info.classList.add("cart-item-info");
        var name = document.createElement("div");
        name.classList.add("cart-item-name");
        name.textContent = item.name;
        var details = document.createElement("div");
        details.classList.add("cart-item-details");
        details.textContent = "".concat(item.qty, " szt. \u00D7 ").concat(item.price, " z\u0142 = ").concat(item.qty * item.price, " z\u0142");
        info.appendChild(name);
        info.appendChild(details);
        row.appendChild(img);
        row.appendChild(info);
        cartList.appendChild(row);
    });
    // podsumowanie
    var totalPrice = cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    var summary = document.createElement("p");
    summary.classList.add("cart-summary", "fade-in");
    summary.textContent = "Razem za wszystko: ".concat(totalPrice, " z\u0142");
    cartList.appendChild(summary);
}
// Przeliczanie koszyka
function renderCart() {
    var totalQty = 0;
    var totalPrice = 0;
    cart.forEach(function (item) {
        totalQty += item.qty;
        totalPrice += item.price * item.qty;
    });
    miniCount.textContent = totalQty.toString();
    miniTotal.textContent = totalPrice.toString();
    // Animacje mini‑koszyka
    animate(miniCount, "bump");
    animate(miniTotal, "bump");
    animate(miniCart, "mini-cart-shake");
    animate(miniCart, "mini-cart-pulse");
    renderMiniCartList();
}
// Obsługa kliknięcia "Dodaj do koszyka"
addButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var name = btn.dataset.product;
        var price = Number(btn.dataset.price);
        // Szukamy produktu bez .find()
        var existing = null;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                existing = cart[i];
                break;
            }
        }
        if (existing) {
            existing.qty++;
        }
        else {
            cart.push({ name: name, price: price, qty: 1 });
        }
        renderCart();
    });
});
