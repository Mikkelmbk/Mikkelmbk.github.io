let workProjectWrapperElem = document.querySelector('.work__wrapper-inner');

fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/projects')
    .then((res) => {
        return res.json()
    })
    .then((projects) => {
        projects.forEach((project) => {
        // console.log('project: ', project.image);

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

            workBackgroundImageElem.src = project.image;
            workProjectTitleElem.innerHTML = project.title;
            workGithubLinkElem.href = project.githubRepo;
            workGithubLinkElem.innerHTML = "Github Repo";
            workGithubLinkElem.target = "_blank";
            workDomainLinkElem.href = project.domain;
            workDomainLinkElem.target = "_blank";
            workDomainLinkElem.innerHTML = "Visit Domain";
            workInternalLinkElem.href = `${window.location.origin}/project/?id=${project.projectId}`;
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



