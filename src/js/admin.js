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
                                if (validateInputElem.value.trim() == "") {
                                    validate = false;
                                    validateInputElem.style.backgroundColor = "red";
                                }
                            })

                            if (collectionName === "projects" && validate) {


                                fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/update-${collectionName}/${itemToUpdate.docId}`, {
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

                            if (collectionName === "skills" && validate) {

                                fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/update-${collectionName}/${itemToUpdate.docId}`, {
                                    "method":"POST",
                                    "headers": {
                                        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`,
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    "body": `title=${adminFormElem.title.value.trim()}
                                    &order=${adminFormElem.order.value.trim()}
                                    `
                                })
                                .then(()=>{
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
                console.log('e: ', e);

            });






        })
        .catch((err) => {
            console.log('err: ', err);
        })



})




