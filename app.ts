console.log("JS działa!");
let count = 0;

const countSpan = document.getElementById("count") as HTMLSpanElement;
const addBtn = document.getElementById("addToCart") as HTMLButtonElement;
const orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;

addBtn.addEventListener("click", () => {
  const cartSection = document.querySelector(".cart") as HTMLElement;
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
