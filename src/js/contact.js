let contactFormElem = document.querySelector('.contact__form');



contactFormElem.addEventListener('submit', (e)=> {
    e.preventDefault();

    let validate = true;
    let contactMessageElem = document.querySelector('.contact__message');
    let name = contactFormElem.name;
    let email = contactFormElem.email;
    let phone = contactFormElem.phone;
    let subject = contactFormElem.subject;
    let message = contactFormElem.message;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;


    name.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
    email.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
    phone.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
    subject.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
    message.style.backgroundColor = "rgba(150, 150, 150, 0.226)";


    if(name.value == '' || !isNaN(name.value)){
        validate = false;
        name.style.backgroundColor = "red";
    }

    if(email.value == '' || email.value.match(emailRegex) == null){
        validate = false;
        email.style.backgroundColor = "red";
    }
    
    if(phone.value == '' || isNaN(phone.value) || phone.value.length <= 7){
        validate = false;
        phone.style.backgroundColor = "red";
    }

    if(subject.value == '') {
        validate = false;
        subject.style.backgroundColor = "red";
    }

    if(message.value == '') {
        validate = false;
        message.style.backgroundColor = "red";
    }


    if(validate) {


        fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/send', {
            "method": "POST",
            "headers": {
                "Content-Type":"application/x-www-form-urlencoded"
            },
            "body": `name=${name.value}&email=${email.value}&phone=${phone.value}&subject=${subject.value}&message=${message.value}`
        })
        .then((res) => {
        console.log('res: ', res);
            return res.json()
        })
        .then((data)=> {
        console.log('data: ', data);
        })





    }



})