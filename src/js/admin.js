fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/authenticate', {
    "method": "GET",
    "headers": {
        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`
    }
})
    .then((data) => {
        console.log('data: ', data);
        if(data.status === 401){
            window.location.replace(`${window.location.origin}/admin-login/`);
        }
    })
    .catch((err) => {
        console.log('err: ', err);
    })