const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");

function openModal(name, phone, address) {
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalPhone").textContent = phone;
    document.getElementById("modalAddress").textContent = address;

    modal.style.display = "block";
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}