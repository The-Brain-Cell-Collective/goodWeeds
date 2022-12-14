//* Login form
const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    console.log('*************login form!!!****************')
    // Gather the data from the form elements on the page
    const userName = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(userName, password);

    if (userName && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/strains');
      } else {
        // document.location.replace('/login');
        alert('Failed to log in');
      }
    }
  };

//* Signup form
  const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(email);
    console.log(password);

    if (firstName && lastName && username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);

      if (response.ok) {
        alert('Successfully signed up. Please login.');
        document.location.replace('/login');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);