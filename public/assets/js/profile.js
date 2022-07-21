const newFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#child-name').value.trim();
    const childBirthDate = document.querySelector('#child-birthdate').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value.trim();


    if (name && childBirthDate && gender) {
      const response = await fetch(`/api/children`, {
        method: 'POST',
        body: JSON.stringify({ name, birthdate: childBirthDate, gender
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        });

    if (response.ok) {
        document.location.replace('/api/children');
      } else {
        alert('Failed to create child');
    }
  }
};
  
  
  document
    .querySelector('.new-child-form')
    .addEventListener('submit', newFormHandler);