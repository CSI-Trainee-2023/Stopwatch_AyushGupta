let hr = 0 + localStorage.getItem("nowHour");
let min = 0 + localStorage.getItem("nowMinute");
let sec = 0 + localStorage.getItem("nowSecond");
let milliSec = 0 + localStorage.getItem("nowMilliSecond");

if (localStorage.length != 0) {
    isStarted = true;

    document.getElementById("startStopResume").textContent = "Resume"; // change start to resume button
    document.getElementById("lapReset").textContent = "Reset";// change lap to button
    document.getElementById("startStopResume").classList.replace("purple", "blue");// change purple of  start to blue
    document.getElementById("lapReset").disabled = false; // enable lap/reset button
    
    // prints the previous data
    if (hour < 10) {
        document.getElementById("hour").innerHTML = "0" + parseInt(hr);
    }
    else {
        document.getElementById("hour").innerHTML = parseInt(hr);
    }

    if (minute < 10) {
        document.getElementById("minute").innerHTML = "0" + parseInt(min);
    }
    else {
        document.getElementById("minute").innerHTML = parseInt(min);
    }

    if (second < 10) {
        document.getElementById("second").innerHTML = "0" + parseInt(sec);
    }
    else {
        document.getElementById("second").innerHTML = parseInt(sec);
    }

    if (milliSecond < 10) {
        document.getElementById("millisecond").innerHTML = "0" + parseInt(milliSec);
    }
    else {
        document.getElementById("millisecond").innerHTML = parseInt(milliSec);
    }

    // Checks localstorage for laps, if any then print the laps
    lapCount = parseInt(0 + localStorage.getItem("lapCount"));
    if (lapCount != 0) {
        document.getElementById("lapHead").innerHTML = "LAPS" + "<br>";
        restringRecord = window.localStorage.getItem("key");
        record = JSON.parse(restringRecord);
    }
    else {
        record = [];
    }
}
//traverse the local storage for laps
for (let i = 0; i < lapCount; i++) {
    document.getElementById("laps").innerHTML = (record[i] + "<br>") + document.getElementById("laps").innerHTML;
}