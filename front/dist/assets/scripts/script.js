const filenames=["2c32c35da827fad015c4664c699edd07.webp","7692ca2a02e9f6c6e6dbfb4d5ea1b073.webp","838343ddbe7b4fe946152e3c0cd552d9.webp","9140b5aa24b8474c8870bd70017e24f3.webp","98_9j3cdC1w.webp","9KxPXaSBW9Q.webp","9eO6maQiFGo.webp","9fbdd26407902676b370d3efb789dde9.webp"];function createElementFromHTML(e){var s=document.createElement("div");return s.innerHTML=e.trim(),s.firstChild}const files_elem=document.getElementById("files");filenames.forEach((e=>{let s=`<div class="file image" style="background-image: url(assets/images/fileimg/${e});"></div>`;console.log(s),files_elem.appendChild(createElementFromHTML(s))}));let anim_going=!1;function userpanel_click(){if(anim_going)return;const e=document.getElementById("user-dropdown"),s=document.getElementById("user-dropdown-close-area");e.classList.contains("closing")?(e.classList.remove("closing"),e.classList.remove("closed"),s.classList.remove("closed")):(e.classList.add("closing"),s.classList.add("closed"),anim_going=!0,setTimeout((()=>{e.classList.add("closed"),anim_going=!1}),100))}function userpanel_close(){anim_going||userpanel_click()}