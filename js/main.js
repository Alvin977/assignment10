let signupBtn = document.getElementById("signupBtn")
let loginBtn = document.getElementById("loginBtn")
let signupName = document.getElementById("signupName")
let signupEmail = document.getElementById("signupEmail")
let signupPass = document.getElementById("signupPass")
let signinEmail = document.getElementById("signinEmail")
let signinPass = document.getElementById("signinPass")
let logoutBtn = document.getElementById("logoutBtn")
let usersList = []
let currentUser= ""
let error = 0
// localstorage check
if (localStorage.getItem("usersList") != null) {
    usersList = JSON.parse(localStorage.getItem("usersList"))
}
if (localStorage.getItem("currentUser") != null) {
    currentUser = localStorage.getItem("currentUser")
    welcomeUser()
}


// signup inputs regex
signupName?.addEventListener("blur", function () {
    var nameRegex = /^[A-Z]{1}[a-z]{2,}[0-9]*$/
    if (nameRegex.test(signupName.value) == false) {
        error += 1
        document.getElementById("nameErr").style.display = "block"
    }
    else {
        document.getElementById("nameErr").style.display = "none"
        error = 0
    }
})
signupEmail?.addEventListener("blur", function () {
    let emailRegex = /^[A-Za-z0-9_]{3,}@[a-z]{3,8}\.com$/
    if (emailRegex.test(signupEmail.value) == false) {
        error++
        document.getElementById("emailErr").style.display = "block"
    }
    else {
        document.getElementById("emailErr").style.display = "none"
        error = 0
    }
})
signupPass?.addEventListener("blur", function () {
    let passRegex = /^[A-Z]{1}[a-z]*[0-9]+[$&+,:;=?@#|'<>.-^*()%!]+/
    if (passRegex.test(signupPass.value) == false) {
        error++
        document.getElementById("passErr").style.display = "block"
    }
    else {
        document.getElementById("passErr").style.display = "none"
        error = 0
    }
})
/***********************/

// adding new user data 

signupBtn?.addEventListener("click", function () {

    if (error == 0) {
        let index = usersList.findIndex(el => {
            return el.name == signupName.value || el.email == signupEmail.value
        })
        if (index == -1) {
            let userData = {
                name: signupName.value,
                email: signupEmail.value,
                pass: signupPass.value,
            }

            usersList.push(userData)
            localStorage.setItem("usersList", JSON.stringify(usersList))
            window.location.href = "index.html"
        }
        else {
            document.getElementById("userExist").style.display = "block"
            
        }
    }
}
)

// login

loginBtn?.addEventListener("click", function () {
    usersList = JSON.parse(localStorage.getItem("usersList"))
     let userArr = usersList.find(el => {
        return el.email == signinEmail.value && el.pass == signinPass.value
    })
 
    if (userArr == undefined) {
        document.getElementById("incorrectErr").style.display = "block"
    }
    else {
        currentUser=userArr.name
        localStorage.setItem("currentUser", currentUser)
        window.location.href = "welcome.html"
       
       
 
    }
})

  

// logout
logoutBtn?.addEventListener("click", function () {
    localStorage.removeItem("currentUser")
    window.location.href = "index.html"
})
function welcomeUser(){
   
    if ( document.getElementById("wlcmUser") != null) {
        document.getElementById("wlcmUser").innerHTML = `welcome ${currentUser}`
    }
    
}
