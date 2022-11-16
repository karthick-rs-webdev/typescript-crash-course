"use strict";
const form = document.querySelector(".new-item-form");
const type = document.querySelector("#type");
const tofrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
amount.addEventListener("input", (e) => {
    var regex = /[0-9]|\./;
    if (!regex.test(amount.value)) {
        amount.value = "";
    }
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form ||
        !type.value ||
        !tofrom.value ||
        !details.value ||
        !amount.value) {
        return false;
    }
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const ul = document.querySelector("ul");
    const detailsDiv = document.createElement("div");
    const btnDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    if (type.value === "invoice") {
        h4.innerText = "Invoice";
        p.innerText = `${tofrom.value} owes $${amount.value} for ${details.value}`;
    }
    else if (type.value === "payment") {
        h4.innerText = "Payment";
        p.innerText = `${tofrom.value} owed $${amount.value} for ${details.value}`;
    }
    detailsDiv.id = "details-wrapper";
    detailsDiv.append(h4);
    detailsDiv.append(p);
    let t = type.value;
    let tf = tofrom.value;
    let d = details.value;
    let a = amount.value;
    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";
    editBtn.addEventListener("click", (e) => {
        li.classList.add("edit-content");
        setTimeout(() => {
            editContent(t, tf, d, a, e.target);
        }, 300);
    });
    deleteBtn.addEventListener("click", (e) => {
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
const editContent = (t, tf, d, a, elem) => {
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
const deleteContent = (elem) => {
    elem.parentNode.parentNode.remove();
};
