"use strict";

/* ---------------------------- Global variables ---------------------------- */
let singleTrip = true;

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------- Variables ------------------------------- */
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalExitButton = document.querySelector(".modal-button");
  const bookingButton = document.querySelector("#book-trip-button");
  
  /* -------------------------- Button functionality -------------------------- */
  bookingButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalContent.innerHTML = 'Din resa är bokad. Hantera den under fliken "Dina bokningar".';
    saveTrip();
  })

  modal.addEventListener('click', (event) => {
    if(event.target === modal){
      closeModal();
    }
  }, false);
  modalExitButton.addEventListener('click', closeModal, false);

  writeTripsAtLoad();
  singleOrRecurringTrip();
});

/* ------- Function to swap between single or recurring booking system ------ */
function singleOrRecurringTrip(){
  const bookingForm = document.querySelector(".booking-form");
  const singleTripButton = document.querySelector("#single-trip-button");
  const recurringTripButton = document.querySelector("#recurring-trip-button");
  const recurringOptions = document.querySelectorAll(".recurring-option");
  const singleOptions = document.querySelectorAll(".single-option");
  const endDateCheckbox = document.querySelector(".end-date-checkbox input");
  const endDate = document.querySelector("#end-date");
  const endDateLegend = document.querySelector("#end-date-string");
  const errorList = document.querySelector(".error-list");

  singleTripButton.addEventListener('click', function() {
    bookingForm.reset();

    singleTripButton.style.border = "none";
    singleTripButton.style.backgroundColor = "white";
    singleTripButton.style.boxShadow = "none";
    recurringTripButton.style.boxShadow = "inset 5px -5px 10px rgba(0, 40, 60, 0.1)";
    recurringTripButton.style.backgroundColor = "#dfdfdf";

    singleOptions.forEach(option => {
      option.style.display = "block";
    })
    recurringOptions.forEach(option => {
      option.style.display = "none";
    })

    singleTrip = true;
    errorList.innerHTML = "";
    console.log("User selected single trips");
  }, false);

  recurringTripButton.addEventListener('click', function() {
    bookingForm.reset();

    recurringTripButton.style.border = "none";
    recurringTripButton.style.backgroundColor = "white";
    recurringTripButton.style.boxShadow = "none";
    singleTripButton.style.boxShadow = "inset -5px -5px 10px rgba(0, 40, 60, 0.1)";
    singleTripButton.style.backgroundColor = "#dfdfdf";

    recurringOptions.forEach(option => {
      option.style.display = "block";
    })
    singleOptions.forEach(option => {
      option.style.display = "none";
    })

    singleTrip = false;
    errorList.innerHTML = "";
    console.log("User selected recurring trips");
    
  }, false);

  endDateCheckbox.addEventListener('click', function() {
    if(endDateCheckbox.checked){
      endDate.style.display = "block";
      endDateLegend.innerHTML = "Slutdatum:";
    }
    else{
      endDate.style.display = "none"
      endDateLegend.innerHTML = "Slutdatum?";
    }
  }, false);
}

/* ------------------------- Function to open modal ------------------------- */
function modalPopUp(){
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.paddingRight = `${scrollbarWidth}px`;
  body.classList.add("no-scroll");
  modal.style.display = "grid";
}

/* ------------------------- Function to close modal ------------------------ */
function closeModal(){
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  body.style.paddingRight = "0";
  body.classList.remove("no-scroll");
}

/* ------------- Function to save user trip info to localStorage ------------ */
function saveTrip(){
  const bookingForm = document.querySelector(".booking-form");
  const startPosition = document.querySelector("#start");
  const endPosition = document.querySelector("#end");
  const date = document.querySelector("#date");
  const startDate = document.querySelector("#start-date");
  const endDate = document.querySelector("#end-date");
  const endDateCheckbox = document.querySelector("#end-date-button");
  const time = document.querySelector("#time");
  const message = document.querySelector("#booking-textarea");
  const checkedDays = document.querySelectorAll(".checkbox-day:checked");
  const errorList = document.querySelector(".error-list");
  let inputs = 0;

  /* -------------------- Controls inputs for single trips -------------------- */
  if(singleTrip){
    const requiredInputs = 4;
    errorList.innerHTML = "";
    
    if(startPosition.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Startplats måste anges"
      errorList.append(error);
      console.log("User didn't input start position");
    }
    else{
      inputs++;
    }
    if(endPosition.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Slutplats måste anges"
      errorList.append(error);
      console.log("User didn't input end position");
    }
    else{
      inputs++;
    }
    if(date.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Datum måste anges"
      errorList.append(error);
      console.log("User didn't input date");
    }
    else{
      inputs++;
    }
    if(time.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Tid måste anges"
      errorList.append(error);
      console.log("User didn't input time");
    }
    else{
      inputs++;
    }

    /* ------------------- Saves single trip to local storage ------------------- */
    if(inputs === requiredInputs){
      let singleTripObject = {
        id: Date.now(),
        startPosition: startPosition.value,
        endPosition: endPosition.value,
        date: date.value,
        time: time.value,
        message: message.value,
        isSingle: "yes"
      };
      console.log(singleTripObject);
      let singleTripsList = JSON.parse(localStorage.getItem("singleTripsList")) || [];
      singleTripsList.push(singleTripObject);
      localStorage.setItem("singleTripsList", JSON.stringify(singleTripsList));
      bookingForm.reset();
      inputs = 0;
      modalPopUp();
      writeTrip(singleTripObject);
    }

    else{      
      inputs = 0;
    }
  }

  /* ------------------- Controls inputs for recurring trips ------------------ */
  else{
    const requiredInputs = endDateCheckbox.checked ? 6 : 5;
    errorList.innerHTML = "";
    if(startPosition.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Startplats måste anges"
      errorList.append(error);
      console.log("User didn't input start position");
    }
    else{
      inputs++;
    }
    if(endPosition.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Slutplats måste anges"
      errorList.append(error);
      console.log("User didn't input end position");
    }
    else{
      inputs++;
    }
    if(startDate.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Startdatum måste anges"
      errorList.append(error);
      console.log("User didn't input start date");
    }
    else{
      inputs++;
    }
    if(endDateCheckbox.checked && endDate.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Slutdatum måste anges"
      errorList.append(error);
      console.log("User didn't input end date");
    }
    else if(endDateCheckbox.checked && endDate.value !== ""){
      inputs++;
    }
    if(time.value === ""){
      let error = document.createElement("li");
      error.innerHTML = "Tid måste anges"
      errorList.append(error);
      console.log("User didn't input time");
    }
    else{
      inputs++;
    }
    if(checkedDays.length === 0){
      let error = document.createElement("li");
      error.innerHTML = "Åtminstone en dag måste anges"
      errorList.append(error);
      console.log("User didn't input recurring day/days time");
    }
    else{
      inputs++;
    }

    /* ------------------ Saves recurring trip to local storage ----------------- */
    if(inputs === requiredInputs){
      let recurringTripObject = {
        id: Date.now(),
        startPosition: startPosition.value,
        endPosition: endPosition.value,
        startDate: startDate.value,
        time: time.value,
        message: message.value,
        isSingle: "no"
      };
      if(endDateCheckbox.checked){
        recurringTripObject.endDate = endDate.value;
      }
      let daysIdList = [];
      checkedDays.forEach(day => {
        daysIdList.push(day.id);
      })
      recurringTripObject.days = daysIdList;
      let recurringTripsList = JSON.parse(localStorage.getItem("recurringTripsList")) || [];
      recurringTripsList.push(recurringTripObject);
      localStorage.setItem("recurringTripsList", JSON.stringify(recurringTripsList));
      bookingForm.reset();
      inputs = 0;
      modalPopUp();
      writeTrip(recurringTripObject);
    }
  }
}

/* ----------- Function to delete user trip info from localStorage ---------- */
function deleteTrip(tripObject){
  let singleTripsList = JSON.parse(localStorage.getItem("singleTripsList")) || [];
  let recurringTripsList = JSON.parse(localStorage.getItem("recurringTripsList")) || [];
 
  if(tripObject.isSingle === "yes"){
    const index = singleTripsList.findIndex(item => JSON.stringify(item) === JSON.stringify(tripObject));
    if(index !== -1){
      singleTripsList.splice(index, 1);
    }
    localStorage.setItem("singleTripsList", JSON.stringify(singleTripsList));
  }
  else{
    const index = recurringTripsList.findIndex(item => JSON.stringify(item) === JSON.stringify(tripObject));
    if(index !== -1){
      recurringTripsList.splice(index, 1);
    }
    localStorage.setItem("recurringTripsList", JSON.stringify(recurringTripsList));
  }

  
  
  
}

/* --------------- Function to write user trips to preview box -------------- */
function writeTrip(tripObject){
  const previewBox = document.querySelector(".preview-bookings-box");
  const insertPointSingle = document.querySelector(".recurring-title");
  const modalContent = document.querySelector(".modal-content");
  const singlePlaceholder = document.querySelector(".single-trip-placeholder");
  const recurringPlaceholder = document.querySelector(".recurring-trip-placeholder");
  console.log(tripObject);
  
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