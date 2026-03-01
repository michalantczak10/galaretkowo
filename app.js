// Tablica koszyka
let cart = [];
// Pobranie elementów z HTML z bezpieczną obsługą null
const addButtons = document.querySelectorAll(".addToCartBtn");
const miniCartElement = document.querySelector(".mini-cart");
const miniCountElement = document.getElementById("miniCount");
const miniTotalElement = document.getElementById("miniTotal");
const cartListElement = document.getElementById("cartList");
// Sprawdzenie czy wszystkie elementy istnieją
if (!miniCartElement || !miniCountElement || !miniTotalElement || !cartListElement) {
    console.error("Nie znaleziono wymaganych elementów DOM");
    throw new Error("Brak wymaganych elementów na stronie");
}
// Przypisanie do zmiennych z pewnymi typami
const miniCart = miniCartElement;
const miniCount = miniCountElement;
const miniTotal = miniTotalElement;
const cartList = cartListElement;
// Funkcja animacji - usuwa klasę, wymusza reflow i dodaje ponownie
const animate = (el, cls) => {
    el.classList.remove(cls);
    void el.offsetWidth; // Wymusza reflow
    el.classList.add(cls);
    // Usunięcie klasy po zakończeniu animacji
    const animationDuration = 500; // 500ms - najdłuższa animacja
    setTimeout(() => {
        el.classList.remove(cls);
    }, animationDuration);
};
// Wyświetlanie listy produktów
function renderMiniCartList() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Koszyk jest pusty";
        empty.classList.add("fade-in");
        cartList.appendChild(empty);
        return;
    }
    cart.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("cart-item", "fade-in");
        const img = document.createElement("img");
        const imgName = item.name.toLowerCase().replace(/ /g, "-");
        img.src = `img/${imgName}.svg`;
        img.alt = item.name;
        img.onerror = () => {
            // Fallback gdy obrazek nie istnieje
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='55' height='55'%3E%3Crect fill='%23ddd' width='55' height='55'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3E?%3C/text%3E%3C/svg%3E";
        };
        const info = document.createElement("div");
        info.classList.add("cart-item-info");
        const name = document.createElement("div");
        name.classList.add("cart-item-name");
        name.textContent = item.name;
        const details = document.createElement("div");
        details.classList.add("cart-item-details");
        details.textContent = `${item.qty} szt. × ${item.price} zł = ${item.qty * item.price} zł`;
        info.appendChild(name);
        info.appendChild(details);
        row.appendChild(img);
        row.appendChild(info);
        cartList.appendChild(row);
    });
    // Podsumowanie całkowite
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const summary = document.createElement("p");
    summary.classList.add("cart-summary", "fade-in");
    summary.textContent = `Razem za wszystko: ${totalPrice} zł`;
    cartList.appendChild(summary);
}
// Przeliczanie koszyka
function renderCart() {
    let totalQty = 0;
    let totalPrice = 0;
    cart.forEach(item => {
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
addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.product;
        const priceStr = btn.dataset.price;
        if (!name || !priceStr) {
            console.error("Brak danych produktu w przycisku");
            return;
        }
        const price = Number(priceStr);
        if (isNaN(price) || price <= 0) {
            console.error("Nieprawidłowa cena produktu");
            return;
        }
        // Szukamy produktu w koszyku
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty++;
        }
        else {
            cart.push({ name, price, qty: 1 });
        }
        renderCart();
    });
});
export {};
//# sourceMappingURL=app.js.map