console.log('client side js file is loaded changed')
fetch('http://localhost:3000/weather?address=Mardan%20pakistan').then(response => {
    response.json().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    })
});
 
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading ........';
    messageTwo.textContent = '';

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
                console.log(data);
            }
        })
    });
    console.log(location);
})