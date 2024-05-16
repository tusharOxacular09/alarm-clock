// Selecting DOM elements
const currentTime = document.querySelector("h1"), // Element to display current time
  content = document.querySelector(".content"), // Container for select dropdowns
  selectMenu = document.querySelectorAll("select"), // Select dropdowns for hour, minute, and AM/PM
  setAlarmBtn = document.querySelector("button"), // Button to set/clear alarm
  body = document.querySelector("body"), // Body element
  ararmListEl = document.getElementById("alarm-lsit-id"); // Alarm list element

// Initializing variables
let alarmTime, // Variable to store alarm time
  isAlarmSet, // Variable to track if alarm is set or cleared
  ringtone = new Audio("./assets/music/ringtone.mp3"); // Audio element for the alarm ringtone

let allAlarmList = []; // Array to store all set alarms

// Function to add alarms to the list
function addAlarmToList(time) {
  const alarmItem = document.createElement("div"); // Create a div for the alarm item
  alarmItem.classList.add("alarm-item"); // Add a class to the alarm item
  alarmItem.innerHTML = `
    <div class="setted-alarm-item">
      <span>${time}</span>
      <button class="delete-btn">Delete</button>
    <div>
  `;
  ararmListEl.appendChild(alarmItem); // Append the alarm item to the alarm list

  // Event listener for the delete button
  const deleteBtn = alarmItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    // Remove the alarm from the list
    ararmListEl.removeChild(alarmItem);
    // Remove the alarm from the array of alarms
    const index = allAlarmList.indexOf(time);
    if (index !== -1) {
      allAlarmList.splice(index, 1);
    }
  });
}

// Populating hour dropdown with options
for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating minute dropdown with options
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populating AM/PM dropdown with options
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Updating current time display every second
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  // Checking if any alarms are triggered
  checkAlarms();
}, 1000);

// Function to set/clear alarm
function setAlarm() {
  // Making it a Pause Button when alarm encountered
  if (
    getComputedStyle(setAlarmBtn).backgroundColor === "rgb(255, 0, 0)" &&
    setAlarmBtn.textContent === "Pause"
  ) {
    // Stop the alarm
    ringtone.pause();
    // Remove the alarm from the array of alarms
    const index = allAlarmList.indexOf(alarmTime);
    if (index !== -1) {
      allAlarmList.splice(index, 1);
    }
    // Changing background color
    body.style.backgroundColor = "#3de63d";
    setAlarmBtn.style.backgroundColor = "#3de63d";
    setAlarmBtn.textContent = "Set Alarm";
    return;
  }

  // Getting selected time for alarm
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  // Validating selected time
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    // Alerting user to select valid time
    return alert("Please, select a valid time to set Alarm!");
  }
  // Adding the alarm time to the array of alarms
  allAlarmList.push(time);
  // Adding the alarm to the list
  addAlarmToList(time);
}

// Function to check if any alarms are triggered
function checkAlarms() {
  const date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    ampm = h >= 12 ? "PM" : "AM";
  const currentTime = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m} ${ampm}`;

  if (allAlarmList.includes(currentTime.trim())) {
    // Playing alarm ringtone
    ringtone.play();
    // Looping alarm ringtone
    ringtone.loop = true;
    // Changing background color
    body.style.backgroundColor = "red";
    setAlarmBtn.style.backgroundColor = "red";
    setAlarmBtn.textContent = "Pause";
    // Removing the triggered alarm from the list
    const index = allAlarmList.indexOf(currentTime);
    if (index !== -1) {
      allAlarmList.splice(index, 1);
      const alarmItem = document.querySelector(
        `.alarm-item span:contains('${currentTime}')`
      ).parentElement;
      ararmListEl.removeChild(alarmItem);
    }
  }
}

// Adding click event listener to set/clear alarm button
setAlarmBtn.addEventListener("click", setAlarm);
