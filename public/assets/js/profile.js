//TODO: Alex
//


/////SAMPLE FROM MINIPROJECT
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#child-name').value.trim();
    const childBirthDate = document.querySelector('#child-birthdate').value.trim();
    const gender = document.querySelector('#child-gender').value.trim();
  
    if (name && childBirthDate && gender) {
      const response = await fetch(`/api/children`, {
        method: 'POST',
        body: JSON.stringify({ name, childBirthDate, gender }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  // const delButtonHandler = async (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  // console.log(id);
  //     const response = await fetch(`/api/projects/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to delete project');
  //     }
  //   }
  // };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.new-project-form')
    .addEventListener('click', delButtonHandler);
    // .addEventListener('click', delButtonHandler);
  