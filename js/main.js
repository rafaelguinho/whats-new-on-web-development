const updateButton = document.getElementById("updateDetails");
const dialog = document.getElementById("favDialog");

updateButton.addEventListener("click", function onOpen() {
  if (typeof favDialog.showModal === "function") {
    dialog.showModal();
  } else {
    console.error("Sorry, the <dialog> API is not supported by this browser.");
  }
});

dialog.addEventListener("click", function (event) {
  var rect = dialog.getBoundingClientRect();
  var isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width;
  if (!isInDialog) {
    dialog.close();
  }
});

const multiselect = document.querySelector(".multiselect");
const multiSelectedValuesContainer =
  multiselect.querySelector(".selected-values");
let multiValues = [];

multiselect.addEventListener("click", (e) => {
  const option = e.target.closest("option");
  if (!option) return;

  const newValue = option.value;
  if (multiValues.includes(newValue)) {
    multiRemove(newValue);
  } else {
    multiAdd(newValue);
  }
});

multiselect.addEventListener(
  "click",
  (e) => {
    const removeIcon = e.target.closest(".remove");
    const selectedValue = e.target.closest(".selected-values li");
    if (!removeIcon) return;

    e.stopPropagation();

    multiRemove(selectedValue.textContent);
  },
  true
);

function multiAdd(value) {
  multiValues.push(value);

  multiRefreshSelectedValues();
  multiRefreshOptions();
}

function multiRemove(toRemove) {
  multiValues = multiValues.filter((value) => value !== toRemove);

  multiRefreshSelectedValues();
  multiRefreshOptions();
}

function multiRefreshSelectedValues() {
  multiSelectedValuesContainer.innerHTML = "";

  multiValues.forEach((value) => {
    const label = document.createElement("span");
    label.classList.add("label");
    label.textContent = value;

    const remove = document.createElement("span");
    remove.classList.add("remove");
    remove.innerHTML =
      '<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>';

    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(remove);

    multiSelectedValuesContainer.appendChild(li);
  });
}

function multiRefreshOptions() {
  const options = multiselect.querySelectorAll("option");
  options.forEach((option) => {
    if (multiValues.includes(option.value)) {
      option.setAttribute("selected", "");
    } else {
      option.removeAttribute("selected");
    }
  });
}
