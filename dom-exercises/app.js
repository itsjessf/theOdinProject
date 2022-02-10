const container = document.querySelector('#container');

const addParagraph = document.createElement('p');
addParagraph.textContent = 'Hey I am Red!';
addParagraph.style.color = 'red';

const addH3 = document.createElement('h3');
addH3.textContent = 'I am a blue h3!';
addH3.style.color = 'blue';

const addDiv = document.createElement('div');
addDiv.style.borderColor = 'black';
addDiv.style.backgroundColor = 'pink';

const newDivH1 = document.createElement('h1');
const newDivP = document.createElement('p');
newDivH1.textContent = 'Im in a div';
newDivP.textContent = 'Me too!';


addDiv.appendChild(newDivH1);
addDiv.appendChild(newDivP);

container.appendChild(addParagraph);
container.appendChild(addH3);
container.appendChild(addDiv);
container.appendChild(addDiv);

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert("Hello World");
});