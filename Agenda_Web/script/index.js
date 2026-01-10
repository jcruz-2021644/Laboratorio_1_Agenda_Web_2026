const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");

window.openModal = function (name, phone, address, photo) {

    document.getElementById("modalName").textContent = name;
    document.getElementById("modalPhone").textContent = phone;
    document.getElementById("modalAddress").textContent = address;

    const img = document.getElementById("modalPhoto");
    img.src = photo;
    img.alt = "Foto de " + name;

    modal.style.display = "block";
};

closeBtn.onclick = () => modal.style.display = "none";
