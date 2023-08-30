export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
}

function handleEscape({ key }) {
  if (key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
}

export function handleOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.currentTarget);
  }
}

//target is the element on which the event happened
//currentTarget is the modal
//if they are the same then we should close the modal
export function closeModalOnRemoteClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.target);
  }
}
