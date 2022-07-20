// console.log('todos.js is connected!')

// const newFormHandler = async (event) => {
//     event.preventDefault();
//     const devDate = document.querySelector('#dev-milestone-date').value.trim();
//     console.log(devDate);
//     const devID = document.querySelector('#dev-milestone-id').value;
//     console.log(devID);


//     if (name && childBirthDate && gender) {
//       const response = await fetch(`/api/children`, {
//         method: 'POST',
//         body: JSON.stringify({ name, birthdate: childBirthDate, gender
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         });
//         console.log(response.body, `
//         HERE IS THE RESPONSE BODY
        
        
//         `);

//     if (response.ok) {
//       // console.log(childBirthDate);
//         document.location.replace('/api/children');
//       } else {
//         alert('Failed to create child');
//     }
//   }
// };

// document
//     .querySelector('.dev-milestone-form')
//     .addEventListener('click', console.log('button was clicked'));


const devModal = $('.devmodal');
console.log('todos.js connected')

// const photoUpload = $('#photo-upload')

const newFormHandler = async (event) => {
    event.preventDefault();

    event.preventDefault();
    const devDate = document.querySelector('#dev-milestone-date').value.trim();
    const devID = document.querySelector('#dev-milestone-id').value;

    
    var submitButtonClicked = $(event.target);
    var currentInput = submitButtonClicked.parent()[0];
    // const selectedFile = document.getElementById('input').files[0].name;
    // console.log (selectedFile);
    console.log(submitButtonClicked);
    console.log('it was clicked');
    console.log(currentInput);
    console.log(devDate);
    // console.log(devID);

    if (devDate && devID) {
        const response = await fetch(`/api/todos/dev`, {
          method: 'PUT',
          body: JSON.stringify({ devMilestone_dateComplete: devDate, id: devID }),
          headers: {
            'Content-Type': 'application/json',
          },
          });
          console.log(response, `
          
          THIS IS THE RESPONSE ON THE CLIENT
          
          `);
  
      if (response.ok) {
        console.log(response);
        //   document.location.replace('/api/children');
        } else {
          alert('Failed to update devMmilestone');
      }
    }
  };

// document
//     .querySelector('.dev-milestone-form')
//     .addEventListener('click', newFormHandler)

// document
//     devModal.add

devModal.on("click", ".button", newFormHandler);
