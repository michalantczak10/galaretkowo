console.log("JS działa!");

let count = 0;
const PRICE = 18;

// Pobranie elementów
const addBtn = document.getElementById("addToCart") as HTMLButtonElement;
const orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;

const miniCart = document.querySelector(".mini-cart") as HTMLElement;
const miniCount = document.getElementById("miniCount") as HTMLElement;
const miniTotal = document.getElementById("miniTotal") as HTMLElement;

// Uniwersalna funkcja animacji
const animate = (el: HTMLElement, cls: string) => {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
};

// Kliknięcie "Dodaj do koszyka"
addBtn.addEventListener("click", () => {
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
orderBtn.addEventListener("click", () => {
  alert("Dziękujemy za zainteresowanie! Zamówienia online będą dostępne wkrótce.");
});
