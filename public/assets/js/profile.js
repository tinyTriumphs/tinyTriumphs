//TODO: Alex
//


/////SAMPLE FROM MINIPROJECT
const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#child-name').value.trim();
    console.log(name);
    const childBirthDate = document.querySelector('#child-birthdate').value.trim();
    console.log(childBirthDate);
    // const gender = document.querySelector('input[child-gender]:checked').value;

    // const formatedTimestamp = ()=> {
    //   const d = new Date()
    //   const date = d.toISOString().split('T')[0];
    //   const time = d.toTimeString().split(' ')[0];
    //   return `${date} ${time}`};

    if (name && childBirthDate
      ) {
      const response = await fetch(`/api/children`, {
        method: 'POST',
        body: JSON.stringify({ name, birthdate: childBirthDate
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        });
        console.log(response);

    if (response.ok) {
      // console.log(childBirthDate);
        document.location.replace('/api/children');
      } else {
        alert('Failed to create project');
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
  };
  
  document
    .querySelector('.new-child-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.new-project-form')
  //   .addEventListener('click', delButtonHandler);
    // .addEventListener('click', delButtonHandler);