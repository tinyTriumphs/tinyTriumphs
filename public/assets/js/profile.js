//TODO: Alex
//


/////SAMPLE FROM MINIPROJECT
const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#child-name').value.trim();
    console.log(name);
    const childBirthDate = document.querySelector('#child-birthdate').value.trim();
    console.log(childBirthDate);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(gender);


    if (name && childBirthDate && gender) {
      const response = await fetch(`/api/children`, {
        method: 'POST',
        body: JSON.stringify({ name, birthdate: childBirthDate, gender
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        });
        console.log(response.body, `
        HERE IS THE RESPONSE BODY
        
        
        `);

    if (response.ok) {
      console.log(childBirthDate);
        // document.location.replace('/api/children');
      } else {
        alert('Failed to create child');
    }
  }
};


  // const delButtonHandler = async (event) => {
  //   console.log(event);
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  //     console.log(id);
  
  //     const response = await fetch(`/api/children/${id}`, {
  //       method: 'DELETE',
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       document.location.replace('/api/children');
  //     } else {
  //       alert('Failed to delete child');
  //     }
  //   }
  // };
  
  
  document
    .querySelector('.new-child-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.project-list')
  //   .addEventListener('click', 'clicked to delete child');
