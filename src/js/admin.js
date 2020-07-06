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
            adminFormContainerElem.innerHTML = "";
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
                    let itemToUpdate = items.find(item => item.docId === e.target.dataset.id);

                    let adminFormElem = document.createElement('form');
                    adminFormElem.classList.add('admin__form');
                    adminFormContainerElem.appendChild(adminFormElem);


                    let properties = Object.entries(itemToUpdate);
                    if (itemToUpdate.details) {
                        properties = [...properties, ...Object.entries(itemToUpdate.details)];

                        properties.splice(properties.findIndex(property => property[0] === "details"), 1) // finds the index of the entry with the property name details, and uses that index to splice.  
                    }
                    properties.splice(properties.findIndex(property => property[0] === "docId"), 1);


                    properties.forEach((property) => {
                        // console.log('property: ', property);

                        let adminInputElem = document.createElement('textarea');
                        let adminLabelElem = document.createElement('label');
                        adminInputElem.placeholder = property[0];
                        adminInputElem.name = property[0];
                        adminLabelElem.innerHTML = property[0];
                        if (property[0] === "image") {
                            adminInputElem.value = property[1].split('/img/')[1];
                        }
                        else {
                            adminInputElem.value = property[1];
                        }


                        adminFormElem.appendChild(adminLabelElem);
                        adminFormElem.appendChild(adminInputElem);



                    })

                    let adminSubmitButton = document.createElement('button');
                    adminSubmitButton.innerHTML = `Update ${itemToUpdate.title}`;
                    adminFormElem.appendChild(adminSubmitButton);




                    adminFormElem.addEventListener('submit', (e) => {
                        e.preventDefault();

                        if (confirm(`Are you sure you want to update ${itemToUpdate.title} in the ${collectionName} Collection`)) {
                            let validate = true;
                            let validateInputElems = document.querySelectorAll('.admin__form textarea');

                            validateInputElems.forEach((validateInputElem) => {
                                validateInputElem.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
                                if (validateInputElem.value.trim() == "") { // trim to remove whitespace so that the value is infact empty when no words, numbers or symbols are typed.
                                    validate = false;
                                    validateInputElem.style.backgroundColor = "red";
                                }
                            })

                            if (collectionName === "projects" && validate) {


                                fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/update-${collectionName}/${itemToUpdate.docId}`, {
                                    "method": "POST",
                                    "headers": {
                                        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    "body": `domain=${adminFormElem.domain.value.trim()}
                                    &githubRepo=${adminFormElem.githubRepo.value.trim()}
                                    &image=${adminFormElem.image.value.trim()}
                                    &title=${adminFormElem.title.value.trim()}
                                    &about=${adminFormElem.about.value.trim()}
                                    &challenges=${adminFormElem.challenges.value.trim()}
                                    &duration=${adminFormElem.duration.value.trim()}
                                    &goal=${adminFormElem.goal.value.trim()}
                                    &process=${adminFormElem.process.value.trim()}
                                    &team=${adminFormElem.team.value.trim()}
                                    &technologies=${adminFormElem.technologies.value.trim()}`
                                })
                                    .then(() => {
                                        window.location.replace(`${window.location.origin}/admin/`);
                                    })

                            }

                            if (collectionName === "skills" && validate) {

                                fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/update-${collectionName}/${itemToUpdate.docId}`, {
                                    "method": "POST",
                                    "headers": {
                                        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    "body": `title=${adminFormElem.title.value.trim()}
                                    &order=${adminFormElem.order.value.trim()}
                                    `
                                })
                                    .then(() => {
                                        window.location.replace(`${window.location.origin}/admin/`);
                                    })



                            }
                        }

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

                adminFormContainerElem.innerHTML = "";

                let adminFormElem = document.createElement('form');
                adminFormContainerElem.appendChild(adminFormElem);

                adminFormElem.classList.add('admin__form');


                if (collectionName === "projects") {

                    let adminDomainLabel = document.createElement('label');
                    let adminDomainInput = document.createElement('input');

                    let adminGithubRepoLabel = document.createElement('label');
                    let adminGithubRepoInput = document.createElement('input');

                    let adminImageLabel = document.createElement('label');
                    let adminImageInput = document.createElement('input');

                    let adminTitleLabel = document.createElement('label');
                    let adminTitleInput = document.createElement('input');

                    let adminAboutLabel = document.createElement('label');
                    let adminAboutTextarea = document.createElement('textarea');

                    let adminChallengesLabel = document.createElement('label');
                    let adminChallengesTextarea = document.createElement('textarea');

                    let adminDurationLabel = document.createElement('label');
                    let adminDurationTextarea = document.createElement('textarea');

                    let adminGoalLabel = document.createElement('label');
                    let adminGoalTextarea = document.createElement('textarea');

                    let adminProcessLabel = document.createElement('label');
                    let adminProcessTextarea = document.createElement('textarea');

                    let adminTeamLabel = document.createElement('label');
                    let adminTeamTextarea = document.createElement('textarea');

                    let adminTechnologiesLabel = document.createElement('label');
                    let adminTechnologiesTextarea = document.createElement('textarea');

                    let adminAddBtn = document.createElement('button');


                    adminAddBtn.innerHTML = "Add Project";
                    adminDomainLabel.innerHTML = "Domain";
                    adminGithubRepoLabel.innerHTML = "GithubRepo";
                    adminImageLabel.innerHTML = "Image";
                    adminTitleLabel.innerHTML = "Title";
                    adminAboutLabel.innerHTML = "About";
                    adminChallengesLabel.innerHTML = "Challenges";
                    adminDurationLabel.innerHTML = "Duration";
                    adminGoalLabel.innerHTML = "Goal";
                    adminProcessLabel.innerHTML = "Process";
                    adminTeamLabel.innerHTML = "Team";
                    adminTechnologiesLabel.innerHTML = "Technologies";


                    adminDomainInput.name = "domain";
                    adminGithubRepoInput.name = "githubRepo";
                    adminImageInput.name = "image";
                    adminTitleInput.name = "title";
                    adminAboutTextarea.name = "about";
                    adminChallengesTextarea.name = "challenges";
                    adminDurationTextarea.name = "duration";
                    adminGoalTextarea.name = "goal";
                    adminProcessTextarea.name = "process";
                    adminTeamTextarea.name = "team";
                    adminTechnologiesTextarea.name = "technologies";


                    adminFormElem.appendChild(adminDomainLabel);
                    adminFormElem.appendChild(adminDomainInput);

                    adminFormElem.appendChild(adminGithubRepoLabel);
                    adminFormElem.appendChild(adminGithubRepoInput);

                    adminFormElem.appendChild(adminImageLabel);
                    adminFormElem.appendChild(adminImageInput);

                    adminFormElem.appendChild(adminTitleLabel);
                    adminFormElem.appendChild(adminTitleInput);

                    adminFormElem.appendChild(adminAboutLabel);
                    adminFormElem.appendChild(adminAboutTextarea);

                    adminFormElem.appendChild(adminChallengesLabel);
                    adminFormElem.appendChild(adminChallengesTextarea);

                    adminFormElem.appendChild(adminDurationLabel);
                    adminFormElem.appendChild(adminDurationTextarea);

                    adminFormElem.appendChild(adminGoalLabel);
                    adminFormElem.appendChild(adminGoalTextarea);

                    adminFormElem.appendChild(adminProcessLabel);
                    adminFormElem.appendChild(adminProcessTextarea);

                    adminFormElem.appendChild(adminTeamLabel);
                    adminFormElem.appendChild(adminTeamTextarea);

                    adminFormElem.appendChild(adminTechnologiesLabel);
                    adminFormElem.appendChild(adminTechnologiesTextarea);

                    adminFormElem.appendChild(adminAddBtn);


                    adminFormElem.addEventListener('submit', (e) => {
                        e.preventDefault();
                        let validate = true;
                        let tempElems = [...adminFormElem.children]; // change from a HTMLcollection, to an ordinary array using the spread operator, this way i can use forEach, filter etc on the array.
        

                        let elemsToValidate = tempElems.filter((tempElem) => { // remove all the labels and buttons from the array, this way i can forEach on the array which only contains textAreas and Inputs, and validate their inputs.
                            if (tempElem.nodeName !== "LABEL" && tempElem.nodeName !== "BUTTON") {
                                return tempElem;
                            }
                        });

                        elemsToValidate.forEach((elemToValidate) => {
                            elemToValidate.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
                            if (elemToValidate.value.trim() == "") { // trim to remove whitespace so that the value is infact empty when no words, numbers or symbols are typed.
                                validate = false;
                                elemToValidate.style.backgroundColor = "red";
                            }
                        });


                        if(validate){

                            fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/add-${collectionName}`, {
                                "method":"POST",
                                "headers": {
                                    "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`,
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                "body": `domain=${adminFormElem.domain.value.trim()}
                                    &githubRepo=${adminFormElem.githubRepo.value.trim()}
                                    &image=${adminFormElem.image.value.trim()}
                                    &title=${adminFormElem.title.value.trim()}
                                    &about=${adminFormElem.about.value.trim()}
                                    &challenges=${adminFormElem.challenges.value.trim()}
                                    &duration=${adminFormElem.duration.value.trim()}
                                    &goal=${adminFormElem.goal.value.trim()}
                                    &process=${adminFormElem.process.value.trim()}
                                    &team=${adminFormElem.team.value.trim()}
                                    &technologies=${adminFormElem.technologies.value.trim()}`
                            })
                            .then(()=>{
                                window.location.replace(`${window.location.origin}/admin/`);
                            })

                        }

                    })

                }


                if (collectionName === "skills") {
                    let adminOrderLabel = document.createElement('label');
                    let adminOrderInput = document.createElement('input');

                    let adminTitleLabel = document.createElement('label');
                    let adminTitleInput = document.createElement('input');


                    let adminAddBtn = document.createElement('button');


                    adminAddBtn.innerHTML = "Add Skills";
                    adminOrderLabel.innerHTML = "Order";
                    adminTitleLabel.innerHTML = "Title";


                    adminOrderInput.name = "order";
                    adminTitleInput.name = "title";


                    adminFormElem.appendChild(adminOrderLabel);
                    adminFormElem.appendChild(adminOrderInput);

                    adminFormElem.appendChild(adminTitleLabel);
                    adminFormElem.appendChild(adminTitleInput);

                    adminFormElem.appendChild(adminAddBtn);


                    adminFormElem.addEventListener('submit', (e) => {
                        e.preventDefault();
                        let validate = true;
                        let tempElems = [...adminFormElem.children]; // change from a HTMLcollection, to an ordinary array using the spread operator, this way i can use forEach, filter etc on the array.
        

                        let elemsToValidate = tempElems.filter((tempElem) => { // remove all the labels and buttons from the array, this way i can forEach on the array which only contains textAreas and Inputs, and validate their inputs.
                            if (tempElem.nodeName !== "LABEL" && tempElem.nodeName !== "BUTTON") {
                                return tempElem;
                            }
                        });

                        elemsToValidate.forEach((elemToValidate) => {
                            elemToValidate.style.backgroundColor = "rgba(150, 150, 150, 0.226)";
                            if (elemToValidate.value.trim() == "") { // trim to remove whitespace so that the value is infact empty when no words, numbers or symbols are typed.
                                validate = false;
                                elemToValidate.style.backgroundColor = "red";
                            }
                        });


                        if(validate){

                            fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/add-${collectionName}`, {
                                "method":"POST",
                                "headers": {
                                    "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`,
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                "body": `order=${adminFormElem.order.value.trim()}
                                    &title=${adminFormElem.title.value.trim()}
                                    `
                            })
                            .then(()=>{
                                window.location.replace(`${window.location.origin}/admin/`);
                            })

                        }

                    })

                }

            });

        })
        .catch((err) => {
            console.log('err: ', err);
        })



})




