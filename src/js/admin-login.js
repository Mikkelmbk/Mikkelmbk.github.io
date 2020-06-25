let formElem = document.querySelector('.admin-login__wrapper-inner form');


formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    let validate = true;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let emailInputElem = document.querySelector('.admin-login__email-input');
    let passwordInputElem = document.querySelector('.admin-login__password-input');
    let errorMessageElem = document.querySelector('.errorMessage');

    emailInputElem.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
    passwordInputElem.style.backgroundColor = "rgba(150, 150, 150, 0.226)";

    if(emailInputElem.value == '' || emailInputElem.value.match(emailRegex) == null){
        validate = false;
        emailInputElem.style.backgroundColor = "red";
    }
    if(passwordInputElem.value == '') {
        validate = false;
        passwordInputElem.style.backgroundColor = "red";
    }

    if(validate) {

        fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/admin-login', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "body":`email=${emailInputElem.value}&password=${passwordInputElem.value}`
        })
        .then((res)=> {
            return res.json();
        })
        .then((data)=> {
        console.log('data: ', data);
        if(data.error) {
            errorMessageElem.innerHTML = data.error.message;
        }
        else {
            sessionStorage.setItem('idToken', data.idToken);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            errorMessageElem.innerHTML = "SUCCESS";
        }
        })
        
    }
    
})

