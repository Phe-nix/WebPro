function convertADtoBE(input) {
    // AD คือคริสดศักราย
    // BE คือพุทธศักราช
    //
    // TODO: แปลงปีใน คริสตศักราช เป็น พุทธศักราช เช่น 2000 เป็น "พ.ศ. 2543"
    // โดยให้เติมตัวอักษร พ.ศ. เข้าไปด้านหน้าด้วย
    if (input < 0 || typeof input == "string") {
        return "ไม่ถูกต้อง"
    }
    else {
        let num = input + 543
        return "พ.ศ. " + num
    }
}

function evenOrOdd(input) {
    // TODO: ให้ตรวจสอบว่าตัวเลข input เป็นเลขคู่หรือเลขคี่
    if (input % 2 == 0) {
        return "even"
    }
    else {
        return "odd"
    }
}

function getFullName(input) {
    // TODO: ให้นำคำนำหน้าชื่อ ชื่อต้น นามสกุล มาต่อกัน
    if (input.sex == "male"){
        return "Mr. "+ input.firstName + " " + input.lastName
    }
    else{
        return "Ms. "+ input.firstName + " " + input.lastName
    }
}

function getFirstName(input) {
    // TODO: ให้ทำการตัดนามสกุลออกโดยใช้ indexOf() และ substring()
    // let sub = input.substring(5, 12)
    // if (input.indexOf(" ")){
    //     return sub.substring(0, input.indexOf(" "))
    // }
    // else{
    //     return input.substring(0, 5)
    // }

    let space = input.indexOf(' ')
    return input.substring(space + 1)
}