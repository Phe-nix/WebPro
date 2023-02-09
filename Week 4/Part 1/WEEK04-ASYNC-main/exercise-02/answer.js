// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    if (window.confirm('ยืนยันไหมครับ?')) {
        callback('ยืนยันจ้า')
    }
    else {
        callback('ไม่ดีกว่า')
    }
}


// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    let start = document.getElementById('start')
    let process = document.getElementById('process')
    let end = document.getElementById('end')
    setTimeout(() => {
        start.innerHTML = 'Program started'
    }, 0)
    setTimeout(() => {
        process.innerHTML = 'Hello World'
    }, 2000)
    setTimeout(() => {
        end.innerHTML = 'Program ended'
    }, 3000)
}


// ข้อ 2.3
function stopTime() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setInterval()
    let setMinuteElement = document.getElementById("setMinute");
    let setSecondElement = document.getElementById("setSecond");
    let timeElement = document.getElementById("Time");
    let setMinute = Math.floor(timeElement.value / 60);
    let mainSec = timeElement.value % 60;
    const setSecond = setInterval(timer, 1000);


    function timer() {
        if (setMinute <= 0 && mainSec <= 0) {
            console.log("Time is up");
            setMinuteElement.innerHTML = '00';
            setSecondElement.innerHTML = '00';
            clearInterval(setSecond);
        }
        if (mainSec == 0) {
            setMinute--;
            mainSec = 60;
        }
        else{
            setMinuteElement.innerHTML = setMinute;
            setSecondElement.innerHTML = mainSec;
            mainSec--;
        }
    }
}
