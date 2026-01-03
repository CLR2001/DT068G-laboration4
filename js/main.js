"use strict";

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------- Variables ------------------------------- */
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalExitButton = document.querySelector(".modal-button");
  const contactForm = document.querySelector(".contact-form");
  const fileButton = document.querySelector("#form-file-button");
  const sendMessage = document.querySelector("#form-submit-button");
  
 /* --------------------------- Close modal buttons -------------------------- */
 modal.addEventListener('click', (event) => {
    if(event.target === modal){
      closeModal();
    }
  }, false);
  modalExitButton.addEventListener('click', closeModal, false);

  /* ----------------------------- Contact buttons ---------------------------- */
  if(fileButton){
    fileButton.addEventListener('click', () => {
      modalContent.innerHTML = "Denna funktion är inte tillgänglig för tillfället.";
      modalPopUp();
    }, false);
  }
  if(sendMessage){
    sendMessage.addEventListener('click', (event) => {
      event.preventDefault();
      modalContent.innerHTML = "Ditt meddelande har skickats.";
      modalPopUp();
      contactForm.reset();
      console.log("User sent message");
      
    })
  }
});

/* ----------------------- Function for a modal window ---------------------- */
function modalPopUp(){
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.paddingRight = `${scrollbarWidth}px`;
  body.classList.add("no-scroll");
  modal.style.display = "grid";
  console.log("Modal opened");
}

function closeModal(){
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  body.style.paddingRight = "0";
  body.classList.remove("no-scroll");
  console.log("Modal closed");
}