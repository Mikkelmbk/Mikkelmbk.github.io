let resumeSkillsListElem = document.querySelector('.resume__skills-list');
let resumeWrapperInnerElem = document.querySelector('.resume__wrapper-inner');

db.collection('skills').orderBy('order').get() // uden doc() hvis du skal hente det hele, husk at forEach.
    .then((skills)=>{

        skills.forEach((skill)=>{

        let resumeSkillItemElem = document.createElement('p');

        resumeSkillItemElem.classList.add('resume__skills-skill');

        resumeSkillItemElem.innerHTML = skill.data().title;

        resumeSkillsListElem.appendChild(resumeSkillItemElem);
            
          
        })
        resumeWrapperInnerElem.classList.remove('invisible');
        resumeWrapperInnerElem.classList.add('visible');

    })
