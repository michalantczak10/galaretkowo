console.log("JS działa!");
let count = 0;
const PRICE = 18;
const totalSpan = document.getElementById("total") as HTMLSpanElement;

const updateTotal = () => {
  const total = count * PRICE;
  totalSpan.textContent = total.toString();
};

updateTotal();

const countSpan = document.getElementById("count") as HTMLSpanElement;
const addBtn = document.getElementById("addToCart") as HTMLButtonElement;
const orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;

const miniCart = document.querySelector(".mini-cart");
const miniCount = document.getElementById("miniCount") as HTMLElement;

addBtn.addEventListener("click", () => {
  const cartSection = document.querySelector(".cart") as HTMLElement;
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

const addedMsg = document.getElementById("addedMsg") as HTMLParagraphElement;

addedMsg.style.opacity = "1";
setTimeout(() => {
  addedMsg.style.opacity = "0";
}, 600);

orderBtn.addEventListener("click", () => {
  alert(
    "Dziękujemy za zainteresowanie! Zamówienia online będą dostępne wkrótce.",
  );
});
