//TODO: Tom

console.log("connected");
///SAMPLE FROM MINI PROJECT////

const loginFormHandler = async (event) => {
    event.preventDefault();
  alert('testing');
    console.log('Testing...');
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("res: ",response);
  
      if (response.ok) {

        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    console.log('name: ' + name + ' email: ' + email + ' password:' + password);
    
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Broken');
        // alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('login-form')
    .addEventListener('submit', ()=>alert('Testing'));
    // .addEventListener('submit', loginFormHandler);

  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  