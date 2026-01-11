const addContactModal = document.getElementById("addContactModal");

window.openAddContactModal = function () {
    addContactModal.style.display = "block";
};

window.closeAddContactModal = function () {
    addContactModal.style.display = "none";
};