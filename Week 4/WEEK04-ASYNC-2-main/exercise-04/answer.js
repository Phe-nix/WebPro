// ข้อ4.1
async function getAllUser() {
    //TODO
    // 1. ให้ใช้ Try Catch
    // 2. เรียกใช้ฟังก์ชัน ApiDelay()
    // 3. หากเรียกฟังก์ชันสำเร็จให้ (status: 200) ให้นำ message แสดงในกล่องข้อความ
    // 4. หากเรียกฟังก์ชันไม่สำเร็จ (message: "SERVER ERROR") ให้นำ message แสดงในกล่องข้อความ

    let txt = document.getElementById('TA')
    try {
        let n = await ApiDelay()
        txt.textContent = n.message;
    } catch (error) {
        console.log("Error")
        console.error(error);
        txt.textContent = error;
    }
}

// ข้อ 4.2 
async function checkAuth(password) {
    realpass = 'In4matioN';
    if (password == realpass) {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        return (await response.json())[0].url;
    }
    else {
        throw new Error('รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง');
    }
}

async function fetchData(password) {
    let img = document.getElementById('cat');
    try {
        let n = await checkAuth(password)
        img.src = n;
    } catch (error) {
        alert(error);
    }
}


/* 
    Function สำหรับ TA กับ อาจารย์
    นักศึกษากรุณา อย่าแก้ไข
*/

async function ApiDelay() {
    return new Promise(resolve => {
        setTimeout(() => resolve(_fakeAPI()), 2000)
    })
}

async function _fakeAPI() {
    const user = ["Bank", "Mac", "Takai", "Fluke"]

    if (Math.floor(Math.random() * 3) === 1) {
        throw new Error("SERVER ERROR")
    }

    return {
        status: 200,
        message: user[Math.floor(Math.random() * 4)]
    }
}
