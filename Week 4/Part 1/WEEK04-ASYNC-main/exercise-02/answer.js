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
    let minute = document.getElementById('setMinute')
    let setSecond = document.getElementById('setSecond')
    let sec = document.getElementById('Time')
    let min = Math.floor(sec.value / 60)
    let mainSec = 0
    minute.innerHTML = min
    setSecond.innerHTML = mainSec
    setInterval(() => { 
        mainSec--
        setSecond.innerHTML = mainSec
        if (mainSec <= 0) {
            mainSec = 60
            min--
            minute.innerHTML = min
        }
        else if (min == 0 && mainSec == 0) {
            clearInterval()
        }
    }, 1000)
}
