let workProjectWrapperElem = document.querySelector('.work__wrapper-inner');

db.collection('projects').get() // uden doc() hvis du skal hente det hele, husk at forEach.
    .then((projects)=>{
        projects.forEach((project)=>{
            // console.log('project: ', project.data());
            // console.log('project: ', project.id);

            let workProjectContainerElem = document.createElement('div');
            let workBackgroundImageElem = document.createElement('img');
            let workProjectTitleElem = document.createElement('h2');
            let workLinkContainerElem = document.createElement('div');
            let workGithubLinkElem = document.createElement('a');
            let workDomainLinkElem = document.createElement('a');
            let workInternalLinkElem = document.createElement('a');

            workProjectContainerElem.classList.add('work__project-container');
            workBackgroundImageElem.classList.add('work__background-image');
            workProjectTitleElem.classList.add('work__project-title');
            workLinkContainerElem.classList.add('work__link-container');
            workGithubLinkElem.classList.add('work__link');
            workDomainLinkElem.classList.add('work__link');
            workInternalLinkElem.classList.add('work__link');

            workBackgroundImageElem.src = project.data().image;
            workProjectTitleElem.innerHTML = project.data().title;
            workGithubLinkElem.href = project.data().githubRepo;
            workGithubLinkElem.innerHTML = "Github Repo";
            workGithubLinkElem.target = "_blank";
            workDomainLinkElem.href = project.data().domain;
            workDomainLinkElem.target = "_blank";
            workDomainLinkElem.innerHTML = "Visit Domain";
            workInternalLinkElem.href = `${window.location.origin}/project/?id=${project.data().projectId}`;
            workInternalLinkElem.innerHTML = "View Project";

            workProjectWrapperElem.appendChild(workProjectContainerElem);
            workProjectContainerElem.appendChild(workBackgroundImageElem);
            workProjectContainerElem.appendChild(workProjectTitleElem);
            workProjectContainerElem.appendChild(workLinkContainerElem);
            workLinkContainerElem.appendChild(workGithubLinkElem);
            workLinkContainerElem.appendChild(workDomainLinkElem);
            workProjectContainerElem.appendChild(workInternalLinkElem);





          
        })

        workProjectWrapperElem.classList.remove('invisible');

    })


    
// db.collection('users').doc('W2C8Q9RbRh71nCX2KFTN').get() // doc() hvis du kun skal hente et specifikt dokument.
//     .then((users)=>{
//     console.log('users: ', users.data());
        
//     })