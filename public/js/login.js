const loginFormHandler = async (event) => {
    event.preventDefault();
   //const button = document.querySelector('.btn');
   const name = document.querySelector('#user-login');
   const password = document.querySelector('#password-login');

   if (name && password) {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ name, password}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
   
        } else {
        alert('Login failed');
        }
    }
    console.log('button clicked!')
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

