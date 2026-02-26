console.log("JS działa!");

// Typ pojedynczego produktu w koszyku
interface CartItem {
  name: string;
  price: number;
  qty: number;
}

// Tablica koszyka
let cart: CartItem[] = [];

// Pobranie elementów z HTML
const addButtons = document.querySelectorAll(".addToCartBtn") as NodeListOf<HTMLButtonElement>;
const miniCart = document.querySelector(".mini-cart") as HTMLElement;
const miniCount = document.getElementById("miniCount") as HTMLElement;
const miniTotal = document.getElementById("miniTotal") as HTMLElement;
const cartList = document.getElementById("cartList") as HTMLElement;

// Funkcja animacji
const animate = (el: HTMLElement, cls: string) => {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
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

    // miniaturka
    const img = document.createElement("img");
    img.src = `img/${item.name.toLowerCase().replace(/ /g, "-")}.png`;

    // nazwa + ilość + cena
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

  // podsumowanie
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
    const name = btn.dataset.product!;
    const price = Number(btn.dataset.price);

    // Szukamy produktu bez .find()
    let existing: CartItem | null = null;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        existing = cart[i];
        break;
      }
    }

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
  });
});
