// Selecting DOM elements
const currentTime = document.querySelector("h1"), // Element to display current time
  content = document.querySelector(".content"), // Container for select dropdowns
  selectMenu = document.querySelectorAll("select"), // Select dropdowns for hour, minute, and AM/PM
  setAlarmBtn = document.querySelector("button"), // Button to set/clear alarm
  body = document.querySelector("body"); // Body element

// Initializing variables
let alarmTime, // Variable to store alarm time
  isAlarmSet, // Variable to track if alarm is set or cleared
  ringtone = new Audio("./assets/music/ringtone.mp3"); // Audio element for the alarm ringtone

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

  // Checking if current time matches alarm time
  if (alarmTime === `${h}:${m} ${ampm}`) {
    // Playing alarm ringtone
    ringtone.play();
    // Looping alarm ringtone
    ringtone.loop = true;
    // Changing background color
    body.style.backgroundColor = "red";
    setAlarmBtn.style.backgroundColor = "red";
  }
});

// Function to set/clear alarm
function setAlarm() {
  // Clearing alarm if already set
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    // Resetting background color
    body.style.backgroundColor = "#49eb49";
    setAlarmBtn.style.backgroundColor = "#49eb49";
    return (isAlarmSet = false);
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
  // Setting alarm time
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

// Adding click event listener to set/clear alarm button
setAlarmBtn.addEventListener("click", setAlarm);
