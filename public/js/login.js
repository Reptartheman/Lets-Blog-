const loginFormHandler = async (event) => {
    event.preventDefault();
   //const button = document.querySelector('.btn');
   const nameEntry = document.querySelector('#user-login');
   const passwordEntry = document.querySelector('#password-login');

  
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ 
            name: nameEntry.value, 
            password: passwordEntry.value
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
   
        } else {
        alert('Login failed');
        }
    }
    //console.log('button clicked!')


document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

