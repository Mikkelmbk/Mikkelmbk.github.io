let URLparams = new URLSearchParams(window.location.search);
let projectWrapperInnerElem = document.querySelector('.project__wrapper-inner');
console.log('projectWrapperInnerElem: ', projectWrapperInnerElem);



if (URLparams.get('id') != null || URLparams.get('id') != "") {

    fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/projects/${URLparams.get('id')}`)
        .then((res) => {
            return res.json()
        })
        .then((project) => {
            console.log('project: ', project);
            let projectTitleElem = document.querySelector('.project__title');
            let projectTeamContentElem = document.querySelector('.project__team-content');
            let projectGoalContentElem = document.querySelector('.project__goal-content');
            let projectDurationContentElem = document.querySelector('.project__duration-content');
            let projectAboutContentElem = document.querySelector('.project__about-content');
            let projectTechnologiesContentElem = document.querySelector('.project__technologies-content');
            let projectChallengesContentElem = document.querySelector('.project__challenges-content');
            let projectProcessContentElem = document.querySelector('.project__process-content');
        


            projectTitleElem.innerHTML = project.title;
            projectTeamContentElem.innerHTML = project.details.team;
            projectGoalContentElem.innerHTML = project.details.goal;
            projectDurationContentElem.innerHTML = project.details.duration;
            projectAboutContentElem.innerHTML = project.details.about;
            projectTechnologiesContentElem.innerHTML = project.details.technologies;
            projectChallengesContentElem.innerHTML = project.details.challenges;
            projectProcessContentElem.innerHTML = project.details.process;
            


            loadingOverlayElem.classList.add('display-none');
            projectWrapperInnerElem.classList.remove('invisible');
        })
}
