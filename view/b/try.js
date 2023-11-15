const jokes = document.getElementById('jokes');
const button = document.querySelector('button');

const addNewJoke = async ()=>{
    try {
        const jokeText = await getData();
        console.log(jokeText)
        const newLi = document.createElement('LI');
        newLi.append(jokeText)
        jokes.append(newLi)
    } catch (error) {
        alert('Sorry server got a problem!', error)
    }
}

const getData = async ()=>{
    try {
        const config = { headers: {Accept: "application/json" }}
        const res = await axios.get('https://icanhazdadjoke.com/', config );
        return res.data.joke
    } catch (error) {
        alert('oh no joke available!! sorry!')
    } 
}

button.addEventListener('click', addNewJoke)