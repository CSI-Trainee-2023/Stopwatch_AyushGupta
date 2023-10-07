let isStarted = false;
let isRunning = false;
let milliSecond =parseInt( 0 + localStorage.getItem("nowMilliSecond"));
let second = parseInt(0 + localStorage.getItem("nowSecond"));
let minute = parseInt( 0 + localStorage.getItem("nowMinute"));
let hour = parseInt(0 + localStorage.getItem("nowHour"));
let timer = false;
let lap = "";
let lapCount = 0;
let record = [];


document.getElementById("lapReset").disabled = true; //Disable Lap button for start

// Print the time of stopwatch (Not Started)
document.getElementById("hour").innerHTML = "00";
document.getElementById("minute").innerHTML = "00";
document.getElementById("second").innerHTML = "00";
document.getElementById("millisecond").innerHTML = "00";

// It starts the stopwatch for first time until reset
function toStart() {
    isRunning = true;
    isStarted = true;
    timer = true;
    document.getElementById("startStopResume").textContent = "Stop"; // change start button to stop
    document.getElementById("lapReset").disabled = false; // enable lap button
    document.getElementById("startStopResume").classList.replace("purple", "red"); //change bgcolor to red
    document.getElementById("startStopResume").classList.replace("blue", "red"); //change bgcolor to red(for debugging in case of wrong resume using shortcut)
    document.getElementById("lapReset").textContent = "Lap"; //change reset button to lap(for debugging in case of wrong resume using shortcut)
    
    timing(); // main watch function
}

// It stops the timer of stopwatch
function toStop() {
    timer = false;
    isRunning = false;
    document.getElementById("startStopResume").textContent = "Resume"; // change stop button to resume
    document.getElementById("startStopResume").classList.replace("red", "blue"); // change color to blue
    document.getElementById("lapReset").textContent = "Reset"; //change button to reset
}

//It resumes the timer of stopwatch
function toResume() {
    isStarted = true;
    timer = true;
    isRunning = true;
    document.getElementById("startStopResume").classList.replace("blue", "red");
    document.getElementById("lapReset").textContent = "Lap"; //change reset button to lap
    document.getElementById("startStopResume").textContent = "Stop";//change resume button to stop
    timing();
}

// Creates laps and store in localstorage as array
function toLap() {
    if (lapCount == 0) {
        document.getElementById("lapHead").innerHTML = "LAPS" + "<br>";//print LAPS for first run
    }
    lapCount++;
    lap = hour + ":" + minute + ":" + second + "." + milliSecond;
    document.getElementById("laps").innerHTML = (lap + "<br>") + document.getElementById("laps").innerHTML;
    //create array for local storage
    record[lapCount-1] = lap;
    stringRecord = JSON.stringify(record);
    window.localStorage.setItem("key", stringRecord);
    window.localStorage.setItem("lapCount", lapCount);
}

//Reset the whole program, clear local, set everything to start point
function toReset() {
    timer = false;
    isStarted = false;
    milliSecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    lapCount = 0;
    document.getElementById("hour").innerHTML = "00";
    document.getElementById("minute").innerHTML = "00";
    document.getElementById("second").innerHTML = "00";
    document.getElementById("millisecond").innerHTML = "00";
    document.getElementById("laps").innerHTML = "";
    document.getElementById("lapHead").innerHTML = "";
    document.getElementById("startStopResume").textContent = "Start";
    document.getElementById("lapReset").textContent = "Lap";
    document.getElementById("lapReset").disabled = true;
    document.getElementById("startStopResume").classList.replace("red", "purple");
    document.getElementById("startStopResume").classList.replace("blue", "purple");
    window.localStorage.clear();
}

// Button for start,stop,resume
function startStopResume() {
    if (isRunning == false && isStarted == false) {
        toStart();
    }
    else if (isRunning == true && isStarted == true) {
        toStop();
    }
    else {
        toResume();
    }
}

//Button for lap,reset
function lapReset() {
    if (isRunning == false) {
        toReset();
    }
    else {
        toLap();
    }
}

// Main Stopwatch timer
// prints the time
// recall it self after every 10 millisecond
// store time into local storage 
function timing() {
    if (timer == true) {
        milliSecond++;
        if (milliSecond == 100) {
            milliSecond = 0;
            second++;
        }
        if (second == 60) {
            second = 0;
            minute++;
        }
        if (minute == 60) {
            second = 0;
            minute = 0;
            hour++;
        }

        if (hour < 10) {
            document.getElementById("hour").innerHTML = "0" + hour;
        }
        else {
            document.getElementById("hour").innerHTML = "" + hour;
        }
        if (minute < 10) {
            document.getElementById("minute").innerHTML = "0" + minute;
        }
        else {
            document.getElementById("minute").innerHTML = "" + minute;
        }
        if (second < 10) {
            document.getElementById("second").innerHTML = "0" + second;
        }
        else {
            document.getElementById("second").innerHTML = "" + second;
            
        }
        if (milliSecond < 10) {
            document.getElementById("millisecond").innerHTML = "0" + milliSecond;
        }
        else {
            document.getElementById("millisecond").innerHTML = "" + milliSecond;
        }

        // storing time into localstorage
        window.localStorage.setItem("nowHour", hour);
        window.localStorage.setItem("nowMinute", minute);
        window.localStorage.setItem("nowSecond", second);
        window.localStorage.setItem("nowMilliSecond", milliSecond);
        setTimeout("timing()", 10);
    }
}

// Keyboard shortcuts for functions
/*
Ctlr + s ->  To Start
Ctlr + x ->  To Stop
Ctlr + p ->  To Resume
Ctlr + r ->  To Reset
Ctlr + l ->  To Lap
*/
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "s") { toStart(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "x") { toStop(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "r") { toReset(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "l") { toLap(); e.preventDefault(); } });
document.addEventListener("keydown", e => { if (e.ctrlKey && e.key.toLowerCase() === "p") { toResume(); e.preventDefault(); } });