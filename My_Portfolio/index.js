// For About Me
let aboutMe = document.getElementById("aboutMe");
let len = aboutMe.textContent.length
let skills = ['an Electrical Engineer', 'a Full Stack Developer']
let index = 0;
let stirngIndex = 1;

setInterval(() => {
    const strDecrement = setInterval(() => {
        len = aboutMe.textContent.length;
        if (len == 0) {
            stirngIndex = 1;
            index++;
            if (index == skills.length) {
                index = 0;
            }
            clearInterval(strDecrement);
        } else {
            aboutMe.textContent = stirngDecrement(aboutMe.textContent);
        }
    }, 50);
}, 4500);

setInterval(() => {
    if (len == 0) {
        aboutMe.textContent = stirngIncrement();
    }
}, 40)

function stirngDecrement(text) {
    return text.slice(0, text.length - 1)
}
function stirngIncrement() {
    let val = skills[index].slice(0, stirngIndex);
    stirngIndex++;
    return val;
}

// For Menubar
let onClickLinks = document.getElementById("onClickLinks");
let menubar = document.getElementById("menubar");
check = false;
menubar.addEventListener('click', () => {
    if (!check) {
        onClickLinks.style.visibility = "visible"
        check = !check
    } else {
        onClickLinks.style.visibility = "hidden"
        check = !check
    }
})
menubar.addEventListener('mouseover', () => {
    onClickLinks.style.visibility = "visible"
})
onClickLinks.addEventListener('mouseleave', () => {
    onClickLinks.style.visibility = "hidden"
})


// For authentication
let contactMe = document.getElementById("contactMe");
let fullname = document.getElementById('fullname');
let yourEmail = document.getElementById('yourEmail');
// let yourPassword = document.getElementById('yourPassword');
let projectDetails = document.getElementById("projectDetails");

projectDetails.style.fontSize = "2rem";
projectDetails.style.fontWeight = "bolder";

fullname.addEventListener("blur", () => {
    if (fullname.value.length == 0) {
        fullname.style.borderColor = "black";
    }
})
// yourPassword.addEventListener("blur", () => {
//     if (yourPassword.value.length == 0) {
//         yourPassword.style.borderColor = "black";
//     }
// })

function authentication() {
    if (fullname.value.length > 3) {
        fullname.style.borderColor = "green";
    } else {
        fullname.style.borderColor = "red";
        return false;
    }

    // if (yourPassword.value.length >= 5) {
    //     yourPassword.style.borderColor = "green";
    // } else {
    //     yourPassword.style.borderColor = "red";
    //     return false;
    // }

    if (projectDetails.value.length <= 10) {
        projectDetails.style.borderColor = "red"
        return false;
    } else {
        projectDetails.style.borderColor = "green"
    }

    if (yourEmail.value.indexOf('@')>0 && yourEmail.value.indexOf('.')>0){
        yourEmail.style.borderColor = 'green';
    }else{
        yourEmail.style.borderColor = 'red';
        return false;
    }

    return true;
}

contactMe.addEventListener('submit', (event) => {
    if (authentication()) {
        let url = 'http://localhost:8000/postProject'
        let data = { name: fullname.value, email: yourEmail.value, projectDetails: projectDetails.value };  // add ---> password: yourPassword.value,
        let params = {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(url, params).then(response => response.json()).then(data => {
            fullname.value = "";
            yourEmail.value = "";
            // yourPassword.value = "";
            projectDetails.value = "";
            if (data) {
                let alert = document.getElementById('alert1');
                alert.style.display = "flex";
                setTimeout(() => {
                    closeAlert('alert1');
                }, 5000);
            } else {
                alert = document.getElementById('alert2');
                alert.style.display = "flex";
                setTimeout(() => {
                    closeAlert('alert2');
                }, 5000);
            }
        }
        );
        
    // This part is not recommended. Remove if backend in use
    fullname.value = "";
    yourEmail.value = "";
    // yourPassword.value = "";
    projectDetails.value = "";
    alert = document.getElementById('alert1');
    alert.style.display = "flex";
    setTimeout(() => {
        closeAlert('alert1');
    }, 5000);

    }

    event.preventDefault();
})

// For Alert
function closeAlert(id) {
    let alert_id = document.getElementById(id);
    alert_id.style.display = "none"
}