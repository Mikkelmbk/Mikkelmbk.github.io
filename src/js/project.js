let URLparams = new URLSearchParams(window.location.search);



if (URLparams.get('id') != null || URLparams.get('id') != "") {
    
    db.collection('projects')
        .where('projectId', '==', parseInt(URLparams.get('id')))
        .get()
        .then((project) => {
            project.forEach((doc) => {
                console.log('doc: ', doc.data());
            })
    
    
        })
}
