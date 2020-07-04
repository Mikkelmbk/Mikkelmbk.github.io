fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/authenticate', {
    "method": "GET",
    "headers": {
        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`
    }
})
    .then((data) => {
        // console.log('data: ', data);
        if (data.status === 401) {
            window.location.replace(`${window.location.origin}/admin-login/`);
        }
    })
    .catch((err) => {
        console.log('err: ', err);
    })


window.addEventListener('hashchange', (e) => {
    // console.log(e);
    let collectionName = e.newURL.split('#!/')[1];

    fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/${collectionName}`)
        .then((res) => {
            return res.json()
        })
        .then((items) => {
            let adminTableContainerElem = document.querySelector('.admin__table-container');
            let adminFormContainerElem = document.querySelector('.admin__form-container');
            adminTableContainerElem.innerHTML = "";
            let adminTableElem = document.createElement('table');
            adminTableElem.classList.add('admin__table');
            adminTableElem.innerHTML = `
            <tr><th>Actions</th><th>Title</th></tr>
            `;
            adminTableContainerElem.appendChild(adminTableElem);

            // console.log('items: ', items);

            items.forEach((item) => {

                let adminTr = document.createElement('tr');
                let adminBtnContainer = document.createElement('td');
                let adminUpdate = document.createElement('button');
                let adminDelete = document.createElement('button');
                let adminTitle = document.createElement('td');


                adminBtnContainer.classList.add('admin__btn-container');
                adminUpdate.innerHTML = "Update";
                adminUpdate.dataset.id = item.docId;
                adminDelete.innerHTML = "Delete";
                adminDelete.dataset.id = item.docId;
                adminDelete.dataset.title = item.title;
                adminTitle.innerHTML = item.title;


                adminTableElem.appendChild(adminTr);
                adminTr.appendChild(adminBtnContainer);
                adminBtnContainer.appendChild(adminUpdate);
                adminBtnContainer.appendChild(adminDelete);
                adminTr.appendChild(adminTitle);

                adminUpdate.addEventListener('click', (e) => {
                    adminFormContainerElem.innerHTML = "";
                    // console.log('e: ', e);
                    let itemToUpdate = items.find(item => item.docId === e.target.dataset.id);
                    // console.log('itemToUpdate: ', itemToUpdate);

                    let adminFormElem = document.createElement('form');
                    adminFormElem.classList.add('admin__form');
                    adminFormContainerElem.appendChild(adminFormElem);


                    let properties = Object.entries(itemToUpdate);
                    // console.log('properties: ', properties);
                    
                    if (itemToUpdate.details) {
                        properties = [...properties, ...Object.entries(itemToUpdate.details)];
                        
                        properties.splice(properties.findIndex(property => property[0] === "details"), 1) // finds the index of the entry with the property name details, and uses that index to splice.  
                    }
                    properties.splice(properties.findIndex(property => property[0] === "docId"), 1);
                    console.log('properties AFTER: ', properties);


                    properties.forEach((property)=>{
                    console.log('property: ', property);
                        
                    })










                })

                adminDelete.addEventListener('click', (e) => {
                    console.log('e: ', e);



                    if (confirm(`Are you sure you want to delete ${e.target.dataset.title} from the ${collectionName.toUpperCase()} list`)) {
                        fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/delete-${collectionName}/${e.target.dataset.id}`, {
                            "method": "DELETE",
                            "headers": {
                                "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`
                            }
                        })
                            .then(() => {
                                window.location.replace(`${window.location.origin}/admin/`);
                            })
                    }


                })

            })


            let adminAddTr = document.createElement('tr');
            let adminAddBtnContainer = document.createElement('td');
            let adminAdd = document.createElement('button');

            adminAddBtnContainer.classList.add('admin__btn-container');
            adminAdd.innerHTML = `Add ${collectionName}`;

            adminTableElem.appendChild(adminAddTr);
            adminAddTr.appendChild(adminAddBtnContainer);
            adminAddBtnContainer.appendChild(adminAdd);


            adminAdd.addEventListener('click', (e) => {
                console.log('e: ', e);

            });






        })
        .catch((err) => {
            console.log('err: ', err);
        })



})


// if(collectionName === "projects"){

//     let adminDomainLabel = document.createElement('label');
//     let adminDomainInput = document.createElement('input');

//     let adminGithubRepoLabel = document.createElement('label');
//     let adminGithubRepoInput = document.createElement('input');

//     let adminImageLabel = document.createElement('label');
//     let adminImageInput = document.createElement('input');

//     let adminTitleLabel = document.createElement('label');
//     let adminTitleInput = document.createElement('input');

//     let adminAboutLabel = document.createElement('label');
//     let adminAboutTextarea = document.createElement('textarea');

//     let adminChallengesLabel = document.createElement('label');
//     let adminChallengesTextarea = document.createElement('textarea');

//     let adminDurationLabel = document.createElement('label');
//     let adminDurationTextarea = document.createElement('textarea');

//     let adminGoalLabel = document.createElement('label');
//     let adminGoalTextarea = document.createElement('textarea');

//     let adminProcessLabel = document.createElement('label');
//     let adminProcessTextarea = document.createElement('textarea');

//     let adminTeamLabel = document.createElement('label');
//     let adminTeamTextarea = document.createElement('textarea');

//     let adminTechnologiesLabel = document.createElement('label');
//     let adminTechnologiesTextarea = document.createElement('textarea');

//     let adminSendUpdateBtn = document.createElement('button');

//     adminDomainLabel.innerHTML = "Domain"
//     adminDomainInput.value = itemToUpdate.domain;

//     adminGithubRepoInput.value = itemToUpdate.githubRepo;
//     adminImageInput.value = itemToUpdate.image.split('/img/')[1];
//     adminTitleInput.value = itemToUpdate.title;
//     adminAboutTextarea.value = itemToUpdate.details.about;
//     adminChallengesTextarea.value = itemToUpdate.details.challenges;
//     adminDurationTextarea.value = itemToUpdate.details.duration;
//     adminGoalTextarea.value = itemToUpdate.details.goal;
//     adminProcessTextarea.value = itemToUpdate.details.process;
//     adminTeamTextarea.value = itemToUpdate.details.team;
//     adminTechnologiesTextarea.value = itemToUpdate.details.technologies;
//     adminSendUpdateBtn.innerHTML = `Update ${itemToUpdate.title}`;



//     adminFormElem.appendChild(adminDomainLabel);
//     adminFormElem.appendChild(adminDomainInput);

//     adminFormElem.appendChild(adminGithubRepoLabel);
//     adminFormElem.appendChild(adminGithubRepoInput);

//     adminFormElem.appendChild(adminImageLabel);
//     adminFormElem.appendChild(adminImageInput);

//     adminFormElem.appendChild(adminTitleLabel);
//     adminFormElem.appendChild(adminTitleInput);

//     adminFormElem.appendChild(adminAboutLabel);
//     adminFormElem.appendChild(adminAboutTextarea);

//     adminFormElem.appendChild(adminChallengesLabel);
//     adminFormElem.appendChild(adminChallengesTextarea);

//     adminFormElem.appendChild(adminDurationLabel);
//     adminFormElem.appendChild(adminDurationTextarea);

//     adminFormElem.appendChild(adminGoalLabel);
//     adminFormElem.appendChild(adminGoalTextarea);

//     adminFormElem.appendChild(adminProcessLabel);
//     adminFormElem.appendChild(adminProcessTextarea);

//     adminFormElem.appendChild(adminTeamLabel);
//     adminFormElem.appendChild(adminTeamTextarea);

//     adminFormElem.appendChild(adminTechnologiesLabel);
//     adminFormElem.appendChild(adminTechnologiesTextarea);

//     adminFormElem.appendChild(adminSendUpdateBtn);



// }


// if(collectionName === "skills"){

// }

