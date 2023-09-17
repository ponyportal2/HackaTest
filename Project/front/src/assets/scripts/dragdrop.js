const files_input = document.getElementById('files_input');

let dragdrop_send_prefix = '';

function dropHandler(ev) {
  console.log("File(s) dropped");

  const dataTransfer = new DataTransfer();

  for (let i = 0; i < files_input.files.length; i++)
      dataTransfer.items.add(files_input.files[i]);

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
      //   files_input.files.append(file);
      dataTransfer.items.add(file);
        console.log(`… file[${i}].name = ${file.name}`);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      // .append(file);
      dataTransfer.items.add(file);
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }

  files_input.files = dataTransfer.files;

  if (files_input.files.length > 0)
      document.getElementById('drop-area').classList.add('accepted');
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function clearInputFile(f){
  if(f.value){
      try{
          f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
      }catch(err){ }
      if(f.value){ //for IE5 ~ IE10
          let form = document.createElement('form'),
              parentNode = f.parentNode, ref = f.nextSibling;
          form.appendChild(f);
          form.reset();
          parentNode.insertBefore(f,ref);
      }
  }
}


function send_files(ev) {
  ev.preventDefault();
  console.log('Sending', ev);
  let promises = [];

  // document.getElementById('drop-area').classList.add('loading');

  let popup = document.getElementById('upload-popup');
  popup.classList.add('loading');
  for (let i = 0; i < files_input.files.length; i++) {
      console.log("Send: ", files_input.files[i].name);
      let file = files_input.files[i];
      let formData = new FormData();
      formData.append('file', file);
      formData.append('filename', `${dragdrop_send_prefix}${file.name.split('/').pop()}`);
      formData.append('token', get_auth_token());

      promises += fetch(get_server_ip() + '/api/upload_file', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + get_auth_token() },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
              if (data.status != 'success')
                alert(`Failed to load file: ${file.name}`);
              console.log('Promise ', i, 'done', data);
            });
  }

  console.log('Total promises: ', promises.length);
  Promise.all(promises).then(() => {
    console.log('All promises done!');
    close_dragdrop();
      
    popup.classList.remove('loading'); 
    console.log('Removed ', popup.classList); 
  });
}

function open_dragdrop() {
  document.getElementById('upload-popup')
    .classList.remove('closed');
  
  clearInputFile(document.getElementById('files_input'));
}

function close_dragdrop() {
  document.getElementById('upload-popup')
    .classList.add('closed');

}

/*
let submit_form = document.getElementById('sendForm');
if (submit_form)
submit_form.addEventListener('submit', function(e) {
    e.preventDefault();

    var file = document.getElementById('filePicker').files[0];
    var filename = document.getElementById('fileName').value;
    var authToken = document.getElementById('authToken').value;
    var serverIp = document.getElementById('serverIp').value;
});*/
