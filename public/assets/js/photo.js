// const childCards = $('#newid');
const photoUpload = $('#photo-upload')

const newFormHandler = async (event) => {
    event.preventDefault();
    
    var uploadButtonClicked = $(event.target);
    currentInput = uploadButtonClicked.parent()[0];
    console.log('it was clicked');
    console.log(currentInput);
    await alert(currentInput)


    // $('#child-photo-upload').attr('src', 'new');
}


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


photoUpload.on("click", ".newclass", newFormHandler);