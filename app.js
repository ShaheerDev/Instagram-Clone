function work(){
    //Upload file             
            var key = firebase.database().ref("userimg").push().key
            var file = document.getElementById("filebutton").files[0];
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child(key).put(file);

            uploadTask.on('state_changed', function(snapshot){  //Conditions that run when file is being uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  //Progress of upload (0%-100%)
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // When it is paused
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // When it is running
            console.log('Upload is running');
            break;
            }
            }, function(error) {  //If it fails 
            alert(error)
            }, function() {    //If it uploads successfully
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            var imageinfo = {
                imageURL: downloadURL,
                description: document.getElementById("descripton").value,
            }
            firebase.database().ref("userimg" + key).set(imageinfo);
            location.reload();
        });
    });
    }