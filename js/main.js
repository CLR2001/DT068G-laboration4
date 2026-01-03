"use strict";

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------- Variables ------------------------------- */
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalExitButton = document.querySelector(".modal-button");
  const loginButton = document.querySelector(".login-button");
  const fileButton = document.querySelector("#form-file-button");
  const sendMessageButton = document.querySelector("#form-submit-button");
  const hamburgerButton = document.querySelector(".hamburger-button");
  
  /* ---------------------------- Hamburger button ---------------------------- */
  hamburgerButton.addEventListener('click', hamburgerMenu, false);

  window.addEventListener('resize', function(){
    if(window.innerWidth > 991){
      header.classList.remove('hamburger-open');
      header.style.paddingRight = `0`;
      main.inert = false;
      footer.inert = false;
      body.classList.remove("no-scroll");
    }
}, false);

  /* --------------------------- Close modal buttons -------------------------- */
  modal.addEventListener('click', (event) => {
    if(event.target === modal){
      closeModal();
    }
  }, false);
  modalExitButton.addEventListener('click', closeModal, false);

  /* ------------------------------ Login button ------------------------------ */
  if(loginButton){
    loginButton.addEventListener('click', () => {
      modalContent.innerHTML = "Denna funktion är inte tillgänglig för tillfället.";
      modalPopUp();
    }, false);
  }

  /* ----------------------------- Contact buttons ---------------------------- */
  if(fileButton){
    fileButton.addEventListener('click', () => {
      modalContent.innerHTML = "Denna funktion är inte tillgänglig för tillfället.";
      modalPopUp();
    }, false);
  }
  if(sendMessageButton){
    sendMessageButton.addEventListener('click', (event) => {
      event.preventDefault();
      sendMessage();
    })
  }
});

/* ----------------------- Function for hamburger menu ---------------------- */
function hamburgerMenu(){
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  header.classList.toggle("hamburger-open");
  if(header.classList.contains("hamburger-open")){
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    header.style.paddingRight = `${scrollbarWidth}px`;
    main.inert = true;
    footer.inert = true;
  }
  else{
    header.style.paddingRight = `0`;
    main.inert = false;
    footer.inert = false;
  }
  body.classList.toggle("no-scroll");
}

/* ----------------------- Function for a modal window ---------------------- */
function modalPopUp(){
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const modal = document.querySelector(".modal");
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.paddingRight = `${scrollbarWidth}px`;
  body.classList.add("no-scroll");
  modal.style.display = "grid";
  header.inert = true;
  main.inert = true;
  footer.inert = true;
  console.log("Modal opened");
}

/* ------------------------- Function to close modal ------------------------ */
function closeModal(){
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  if(!header.classList.contains("hamburger-open")){
    body.classList.remove("no-scroll");
    body.style.paddingRight = "0";
  }
  header.inert = false;
  main.inert = false;
  footer.inert = false;
  console.log("Modal closed");
}

/* ------------ Function to send message and control user inputs ------------ */
function sendMessage(){
  const modalContent = document.querySelector(".modal-content");
  const contactForm = document.querySelector(".contact-form");
  const firstNameInput = document.querySelector("#first-name");
  const emailInput = document.querySelector("#email");
  const contactTextarea = document.querySelector("#contact-textarea");
  const errorList = document.querySelector(".error-list");
  let inputs = 0;
  const requiredInputs = 3;
  console.log(inputs);
  
  errorList.innerHTML = "";
  if(firstNameInput.value === ""){
    let error = document.createElement("li");
    error.innerHTML = "Förnamn måste anges"
    errorList.append(error);
    console.log("User didn't input first name");
  }
  else{
    inputs++;
  }
  if(emailInput.value === ""){
    let error = document.createElement("li");
    error.innerHTML = "E-post måste anges"
    errorList.append(error);
    console.log("User didn't input email");
  }
  else{
    inputs++;
  }
  if(contactTextarea.value === ""){
    let error = document.createElement("li");
    error.innerHTML = "Meddelande måste anges"
    errorList.append(error);
    console.log("User didn't input message");
  }
  else{
    inputs++;
  }

  console.log(inputs);
  
  if(inputs === requiredInputs){
    modalContent.innerHTML = "Ditt meddelande har skickats.";
    modalPopUp();
    contactForm.reset();
    console.log("User sent message");
  }
}