// const childCards = $('#newid');
// console.log('photo js connected')

// const photoUpload = $('#photo-upload')

// const newFormHandler = async (event) => {
//     event.preventDefault();
    
//     var uploadButtonClicked = $(event.target);
//     currentInput = uploadButtonClicked.parent()[0];
//     const selectedFile = document.getElementById('input').files[0].name;
//     console.log (selectedFile);
//     console.log('it was clicked');
//     console.log(currentInput);

//     if (currentInput) {
//         const response = await fetch(`/upload`, {
//             method: 'POST',
//             body: 
//         })
//     }


//     $('#child-photo-upload').attr('src', 'new');
// }

// document
//     .querySelector('#photo-upload')
//     .addEventListener('submit', newFormHandler)

// const newFormHandler = async (event) => {
//     event.preventDefault();
//     const name = document.querySelector('#child-name').value.trim();
//     console.log(name);
//     const childBirthDate = document.querySelector('#child-birthdate').value.trim();
//     console.log(childBirthDate);
//     const gender = document.querySelector('input[name="gender"]:checked').value;
//     console.log(gender);

//     // const formatedTimestamp = ()=> {
//     //   const d = new Date()
//     //   const date = d.toISOString().split('T')[0];
//     //   const time = d.toTimeString().split(' ')[0];
//     //   return `${date} ${time}`};

//     if (name && childBirthDate && gender) {
//       const response = await fetch(`/api/children`, {
//         method: 'POST',
//         body: JSON.stringify({ name, birthdate: childBirthDate, gender
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         });
//         console.log(response);

//     if (response.ok) {
//       // console.log(childBirthDate);
//         document.location.replace('/api/children');
//       } else {
//         alert('Failed to create child');
//     }
//   }
// };


// photoUpload.on("click", ".newclass", newFormHandler);

// const image_input = document.querySelector("#image_input");
// var upload_image = "";

// image_input.addEventListener("change", function(){
//     console.log(image_input.value)
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//         uploaded_image = reader.result;
//         document.querySelector("#display_image")
//     })
// })