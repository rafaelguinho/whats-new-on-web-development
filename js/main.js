const updateButton = document.getElementById('updateDetails');
const dialog = document.getElementById('favDialog');

updateButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
        dialog.showModal();
    } else {
        console.error("Sorry, the <dialog> API is not supported by this browser.");
    }
});

dialog.addEventListener('click', function (event) {
    var rect = dialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        dialog.close();
    }
});