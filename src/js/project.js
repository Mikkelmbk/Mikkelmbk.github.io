let URLparams = new URLSearchParams(window.location.search);



if (URLparams.get('id') != null || URLparams.get('id') != "") {

    fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/projects/${URLparams.get('id')}`)
        .then((res) => {
            return res.json()
        })
        .then((project) => {
            let projectTitleElem = document.querySelector('.project__title');
            projectTitleElem.innerHTML = project.title;

        })
}
