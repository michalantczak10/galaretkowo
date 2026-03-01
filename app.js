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
// Stałe konfiguracyjne
const STORAGE_KEY = "galaretkowo_cart";
const TOAST_DURATION = 2000;
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
// Funkcja wyświetlania toast notyfikacji
const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast toast-show";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove("toast-show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, TOAST_DURATION);
};
// Funkcja usunięcia produktu z koszyka
const removeItem = (name) => {
    cart = cart.filter(item => item.name !== name);
    renderCart();
    showToast(`${name} usunięty z koszyka`);
};
// Funkcja zmniejszenia ilości
const decreaseQty = (name) => {
    const item = cart.find(i => i.name === name);
    if (item) {
        if (item.qty > 1) {
            item.qty--;
            renderCart();
        }
        else {
            removeItem(name);
        }
    }
};
// Funkcja zwiększenia ilości
const increaseQty = (name) => {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
        renderCart();
    }
};
// Funkcja wyczyszczenia koszyka
const clearCart = () => {
    if (cart.length === 0)
        return;
    if (confirm("Na pewno chcesz wyczyścić cały koszyk?")) {
        cart = [];
        renderCart();
        showToast("Koszyk wyczyszczony");
    }
};
// Funkcja zapisu koszyka do localStorage
const saveCart = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};
// Funkcja załadowania koszyka z localStorage
const loadCart = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            cart = JSON.parse(saved);
        }
        catch (e) {
            console.error("Błąd przy ładowaniu koszyka", e);
            cart = [];
        }
    }
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
        const controls = document.createElement("div");
        controls.classList.add("cart-item-controls");
        // Przycisk minus
        const btnMinus = document.createElement("button");
        btnMinus.className = "cart-btn cart-btn-minus";
        btnMinus.textContent = "−";
        btnMinus.addEventListener("click", () => decreaseQty(item.name));
        // Ilość
        const qtySpan = document.createElement("span");
        qtySpan.className = "cart-item-qty";
        qtySpan.textContent = item.qty.toString();
        // Przycisk plus
        const btnPlus = document.createElement("button");
        btnPlus.className = "cart-btn cart-btn-plus";
        btnPlus.textContent = "+";
        btnPlus.addEventListener("click", () => increaseQty(item.name));
        // Przycisk usuń
        const btnRemove = document.createElement("button");
        btnRemove.className = "cart-btn cart-btn-remove";
        btnRemove.textContent = "✕";
        btnRemove.addEventListener("click", () => removeItem(item.name));
        controls.appendChild(btnMinus);
        controls.appendChild(qtySpan);
        controls.appendChild(btnPlus);
        controls.appendChild(btnRemove);
        info.appendChild(name);
        info.appendChild(details);
        row.appendChild(img);
        row.appendChild(info);
        row.appendChild(controls);
        cartList.appendChild(row);
    });
    // Podsumowanie całkowite
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const summary = document.createElement("div");
    summary.classList.add("cart-summary-total", "fade-in");
    summary.textContent = `Razem w koszyku: ${totalPrice} zł`;
    cartList.appendChild(summary);
    // Przycisk wyczyść koszyk
    const clearBtn = document.createElement("button");
    clearBtn.className = "cart-clear-btn";
    clearBtn.textContent = "Wyczyść koszyk";
    clearBtn.addEventListener("click", clearCart);
    cartList.appendChild(clearBtn);
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
    saveCart();
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
        showToast(`${name} dodany do koszyka!`);
    });
});
// Załaduj koszyk z localStorage przy starcie
loadCart();
renderCart();
export {};
//# sourceMappingURL=app.js.map