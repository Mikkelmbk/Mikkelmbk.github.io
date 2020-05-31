let resumeSkillsListElem = document.querySelector('.resume__skills-list');
let resumeWrapperInnerElem = document.querySelector('.resume__wrapper-inner');

fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/skills')
    .then((res) => {
        return res.json();
    })
    .then((skills) => {

        skills.forEach((skill) => {

            let resumeSkillItemElem = document.createElement('p');

            resumeSkillItemElem.classList.add('resume__skills-skill');

            resumeSkillItemElem.innerHTML = skill.title;

            resumeSkillsListElem.appendChild(resumeSkillItemElem);


        })
        loadingOverlayElem.classList.add('display-none');
        resumeWrapperInnerElem.classList.remove('invisible');

    });
