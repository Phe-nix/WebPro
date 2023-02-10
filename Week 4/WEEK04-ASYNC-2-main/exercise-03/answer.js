// ข้อ 3.1
function getDogDemo(url) {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  setTimeout(() => {
    getAPI('https://dog.ceo/api/breeds/image/random', (res) => {
      const dogImg = document.getElementById("dogImg")
      const dogTime = document.getElementById("dogTime")
      dogTime.textContent = ''
      dogImg.src = res.message
    }, (err) => {
      console.log(err)
    })

  }, 10000)

}
// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')

  const rainbow = document.getElementById("rainbow")
  setTimeout(() => {
    // STATE 1
    res = getResult()
    console.log(res)
    if (res.status === 'success') {
      rainbow.classList.add('has-text-success')
    }
    else {
      rainbow.classList.add('has-text-danger')
      rainbow.textContent = 'STATE 1';
      console.log('error')
    }

    console.log('STATE 1')
    setTimeout(() => {
      // STATE 2 
      if (rainbow.classList.contains('has-text-danger')) {
        rainbow.classList.remove('has-text-danger')
      }
      else {
        rainbow.classList.remove('has-text-success')
        rainbow.textContent = 'STATE 1';
      }

      res = getResult()
      console.log(res)
      if (res.status === 'success') {
        rainbow.classList.add('has-text-success')
      }
      else {
        rainbow.classList.add('has-text-danger')
        console.log('error')
      }
      console.log('STATE 2')
      setTimeout(() => {
        // STATE 3
        if (rainbow.classList.contains('has-text-danger')) {
          rainbow.classList.remove('has-text-danger')
        }
        else (rainbow.classList.remove('has-text-success'))
        res = getResult()
        console.log(res)
        if (res.status === 'success') {
          rainbow.classList.add('has-text-success')
        }
        else {
          rainbow.classList.add('has-text-danger')
          console.log('error')
        }
        console.log('STATE 3')
      }, 2000)

    }, 2000)
  }, 2000)
}

function getResult() {
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if (num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  } else {
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
async function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้
  let txt = document.getElementById("result")
  // let promise = new Promise((resolve, reject) => {
  //   if (num % 2 === 0) {
  //     let success = 'success : ' + num + ' is even number'
  //     resolve(success)
  //   }
  //   else {
  //     let error = new Error('Error : ' + num + ' is not even number')
  //     reject(error)
  //   }
  // })
  // promise.then((res) => {
  //   txt.innerHTML = res
  // }
  // ).catch((err) => {
  //   txt.innerHTML = err
  // }
  // )

  const fu = async () => {
    if (num % 2 === 0) {
           return success = 'success : ' + num + ' is even number'
         }
         else {
           return error = new Error('Error : ' + num + ' is not even number')
         }
  }

  try{
    let n = fu();
    console.log(n)
    txt.innerHTML = n
  }
  catch(err){
    txt.innerHTML = err
  }
}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  let promise = new Promise((resolve, reject) => {
    if (delay < 500) {
      let pass = "task " + id + ": " + delay + " ms ... PASS!";
      resolve(pass)
    }
    else {
      let fail = "task " + id + ": " + delay + " ms ... NOTPASS!";
      reject(fail)
    }
  })
  // return promise
  return promise;
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  setTimeout(() => {
    task(1).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    task(2).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    task(3).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    task(4).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  })
}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  let promise = new Promise((resolve, reject) => {
    if (password === 'Cisco') {
      let pass = getAPI('https://api.thecatapi.com/v1/images/search', (res) => {
        console.log(res)
        alert('รหัสผ่านถูกต้อง')
        resolve(res)
      })

    }
    else {
      alert('รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง')
      reject(false)
    }
  })

  return promise;
}

function fetchData(password) {
  let img = document.getElementById('cat')
  checkAuth(password).then((res) => {
    console.log(res)
    img.src = res[0].url
  }).catch((err) => {
    console.log(err)
  })

}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
