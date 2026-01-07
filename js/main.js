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

  writeTripsAtLoad();

}, false);

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
  else{
    scrollTo(errorList);
  }
}

/* --------------- Function to write user trips to preview box -------------- */
function writeTrip(tripObject){
  const previewBox = document.querySelector(".preview-bookings-box");
  const insertPointSingle = document.querySelector(".recurring-title");
  const modalContent = document.querySelector(".modal-content");
  const singlePlaceholder = document.querySelector(".single-trip-placeholder");
  const recurringPlaceholder = document.querySelector(".recurring-trip-placeholder");
  
  if(tripObject.isSingle === "yes"){
    let container = document.createElement("div");
    container.classList.add("trip-container");
    container.classList.add("single-trip-container");

    let item1 = document.createElement("p");
    item1.classList.add("trip-item-location");
    item1.innerHTML = 
    `<span id="trip-start">${tripObject.startPosition}</span>` + 
    `<span class="material-symbols-outlined">east</span>` +
    `<span id="trip-end">${tripObject.endPosition}</span>`;

    let item2 = document.createElement("div");
    let item2sub1 = document.createElement("p");
    item2sub1.textContent = `Tid: ${tripObject.time}`;
    let item2sub2 = document.createElement("p");
    item2sub2.textContent = `Datum: ${tripObject.date}`;
    item2.append(item2sub1, item2sub2);
    item2.classList.add("trip-time-day-item");

    let item3 = document.createElement("button");
    item3.type = "button";
    item3.textContent = "Avboka";
    item3.addEventListener('click', () => {
      container.remove();
      modalContent.innerHTML = 'Din resa är avbokad.';
      if(previewBox.querySelector("div.single-trip-container")){
        singlePlaceholder.style.display = "none";
      }
      else{
        singlePlaceholder.style.display = "block";
      }
      deleteTrip(tripObject)
      modalPopUp();
    }, false);
    
    container.append(item1, item2, item3);
    insertPointSingle.before(container);

    if(previewBox.querySelector("div.single-trip-container")){
      singlePlaceholder.style.display = "none";
    }
  }
  else{
    let container = document.createElement("div");
    container.classList.add("trip-container");
    container.classList.add("recurring-trip-container");

    let item1 = document.createElement("p");
    item1.classList.add("trip-item-location");
    item1.innerHTML = 
    `<span id="trip-start">${tripObject.startPosition}</span>` + 
    `<span class="material-symbols-outlined">east</span>` +
    `<span id="trip-end">${tripObject.endPosition}</span>`;

    let dayList = tripObject.days;
    const dayIdList = ["m", "ti", "o", "to", "f", "l", "s"];
    const dayLetterList = ["M", "T", "O", "T", "F", "L", "S"];
    let item2 = document.createElement("div");
    item2.classList.add("trip-days-item");
    for (let i = 0; i < dayLetterList.length; i++) {
      let box = document.createElement("div");
      box.classList.add("trip-day-box");
      let boxContent = document.createElement("span");
      boxContent.textContent = dayLetterList[i];
      box.append(boxContent);
      if(dayList.includes(dayIdList[i])){
        box.classList.add("trip-day-box-active");
      }
      item2.append(box);
    };

    let item3 = document.createElement("div");
    let item3sub1 = document.createElement("p");
    item3sub1.textContent = `Tid: ${tripObject.time}`;
    let item3sub2 = document.createElement("p");

    if(tripObject.endDate){
      item3sub2.textContent = `Datum: ${tripObject.startDate} - ${tripObject.endDate}`;
    }
    else{
      item3sub2.textContent = `Datum: ${tripObject.startDate} - tillsvidare`;
    }
    item3.append(item3sub1, item3sub2);
    item3.classList.add("trip-time-day-item");

    let item4 = document.createElement("button");
    item4.type = "button";
    item4.textContent = "Avboka";
    item4.addEventListener('click', () => {
      container.remove();
      modalContent.innerHTML = 'Din resa är avbokad.';
      if(previewBox.querySelector("div.recurring-trip-container")){
        recurringPlaceholder.style.display = "none";
      }
      else{
        recurringPlaceholder.style.display = "block";
      }
      deleteTrip(tripObject)
      modalPopUp();
    }, false);

    container.append(item1, item2, item3, item4);
    previewBox.append(container);

    if(previewBox.querySelector("div.recurring-trip-container")){
      recurringPlaceholder.style.display = "none";
    }
  }
}

/* ----------- Function to write user trips to preview box at load ---------- */
function writeTripsAtLoad(){
  let singleTripsList = JSON.parse(localStorage.getItem("singleTripsList"));
  if(singleTripsList){
    singleTripsList.forEach(trip => {
      writeTrip(trip);
    })
  }
  let recurringTripsList = JSON.parse(localStorage.getItem("recurringTripsList"));
  if(recurringTripsList){
    recurringTripsList.forEach(trip => {
      writeTrip(trip);
    })
  }
}

function scrollTo(id){
  id.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}