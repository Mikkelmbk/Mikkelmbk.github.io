fetch('https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/authenticate', {
    "method": "GET",
    "headers": {
        "Authorization": `Bearer ${sessionStorage.getItem('idToken')}`
    }
})
    .then((data) => {
        console.log('data: ', data);
        if (data.status === 401) {
            window.location.replace(`${window.location.origin}/admin-login/`);
        }
    })
    .catch((err) => {
        console.log('err: ', err);
    })


window.addEventListener('hashchange', (e) => {
    console.log(e);
    let collectionName = e.newURL.split('#!/')[1];

    fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/${collectionName}`)
        .then((res) => {
            return res.json()
        })
        .then((items) => {
            let adminTableContainerElem = document.querySelector('.admin__table-container');
            adminTableContainerElem.innerHTML = "";
            let adminTableElem = document.createElement('table');
            adminTableElem.classList.add('admin-table');
            adminTableElem.innerHTML = `
            <tr><th>Actions</th><th>Title</th></tr>
            `;
            adminTableContainerElem.appendChild(adminTableElem);
            
            console.log('items: ', items);

            items.forEach((item) => {

                let adminTr = document.createElement('tr');
                let adminBtnContainer = document.createElement('td');
                let adminUpdate = document.createElement('button');
                let adminDelete = document.createElement('button');
                let adminTitle = document.createElement('td');
    
    
                adminBtnContainer.classList.add('gallery-btn-container')
                adminUpdate.innerHTML = "Update";
                adminUpdate.dataset.id = item.docId;
                adminDelete.innerHTML = "Delete";
                adminDelete.dataset.id = item.docId;
                adminTitle.innerHTML = item.title;
    
    
                adminTableElem.appendChild(adminTr);
                adminTr.appendChild(adminBtnContainer);
                adminBtnContainer.appendChild(adminUpdate);
                adminBtnContainer.appendChild(adminDelete);
                adminTr.appendChild(adminTitle);

                adminUpdate.addEventListener('click', (e) => {
                console.log('e: ', e);
                    
                })

                adminDelete.addEventListener('click', (e) => {
                console.log('e: ', e);

                    if(confirm(`Are you sure you want to delete this item from the ${collectionName.toUpperCase()} list`)){
                        fetch(`https://us-central1-mbk-portfolio.cloudfunctions.net/app/api/delete-${collectionName}/${e.target.dataset.id}`, {
                            "method":"DELETE",
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



        })



})


function deleteItem(collectionName, docId) {

}
