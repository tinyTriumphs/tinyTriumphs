//TODO: Alex
//


/////SAMPLE FROM MINIPROJECT
const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#child-name').value.trim();
    console.log(name);
    const childBirthDate = document.querySelector('#child-birthdate').value.trim();
    console.log(childBirthDate);
    const gender = document.querySelector('input[name="gender"]:checked');
    console.log(gender.value);

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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
};
  
  document
    .querySelector('.new-child-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.project-list')
  //   .addEventListener('click', delButtonHandler);
  