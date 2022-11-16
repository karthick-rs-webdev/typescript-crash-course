const form = document.querySelector(".new-item-form") as HTMLFormElement;
const type = document.querySelector("#type") as HTMLSelectElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;
amount.addEventListener("input", (e: Event) => {
  var regex = /[0-9]|\./;
  if (!regex.test(amount.value)) {
    amount.value = "";
  }
});
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  if (
    !form ||
    !type.value ||
    !tofrom.value ||
    !details.value ||
    !amount.value
  ) {
    return false;
  }
  const li = document.createElement("li");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const ul = document.querySelector("ul")!;
  const detailsDiv = document.createElement("div");
  const btnDiv = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  if (type.value === "invoice") {
    h4.innerText = "Invoice";
    p.innerText = `${tofrom.value} owes $${amount.value} for ${details.value}`;
  } else if (type.value === "payment") {
    h4.innerText = "Payment";
    p.innerText = `${tofrom.value} owed $${amount.value} for ${details.value}`;
  }
  detailsDiv.id = "details-wrapper";
  detailsDiv.append(h4);
  detailsDiv.append(p);
  let t: string = type.value;
  let tf: string = tofrom.value;
  let d: string = details.value;
  let a: string = amount.value;
  editBtn.textContent = "Edit";
  deleteBtn.textContent = "Delete";
  editBtn.addEventListener("click", (e: Event) => {
    li.classList.add("edit-content");
    setTimeout(() => {
      editContent(t, tf, d, a, e.target);
    }, 300);
  });
  deleteBtn.addEventListener("click", (e: Event) => {
    li.classList.add("delete-content");
    setTimeout(() => {
      deleteContent(e.target);
    }, 500);
  });
  btnDiv.append(editBtn);
  btnDiv.append(deleteBtn);
  li.append(detailsDiv);
  li.append(btnDiv);
  li.classList.add("start-append");
  setTimeout(() => {
    li.classList.remove("start-append");
  }, 500);
  ul.prepend(li);
  form.reset();
});

const editContent = (
  t: string,
  tf: string,
  d: string,
  a: string,
  elem: any
) => {
  type.value = t;
  tofrom.value = tf;
  details.value = d;
  amount.value = a;
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  deleteContent(elem);
};

const deleteContent = (elem: any) => {
  elem.parentNode.parentNode.remove();
};
