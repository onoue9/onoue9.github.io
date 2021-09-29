const startQuizButton = document.querySelector('.start-quiz');
const nextQuizButton = document.createElement('button');
const points = document.querySelector('.points');
nextQuizButton.innerText = 'Next'
let pontos = 0;

function getRandomId() {
  const randomId = Math.floor(Math.random() * 53);
  return randomId;
}

function getInfo() {
  const id = getRandomId();
  return new Promise((resolve, reject) => {
    if (id < 0 || id > 53) {
      reject('ID inválido!');
    } else {
      fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
      .then((response) => {
        response.json()
          .then((data) => { 
          resolve(data);
        })
      })
    }
  })
  
}

function wrongAlternative(targetName) {
  const section = document.querySelector('.alternatives-quiz');
  const div = document.querySelectorAll('.alternative');
  const img = document.querySelector('.character-picture');
  const sectionButton = document.querySelector('.button-quiz');
  sectionButton.appendChild(nextQuizButton);
  div.forEach((item) => {
    if (item.innerText === targetName) { 
      return item.className = 'wrong-alternative';
    }
    if (item.innerText === img.alt) { 
      return item.className = 'correct-alternative';
    };
    return section.removeChild(item);
  })
}

function correctAlternative(targetName) {
  const section = document.querySelector('.alternatives-quiz');
  const sectionButton = document.querySelector('.button-quiz');
  const div = document.querySelectorAll('.alternative');
  sectionButton.appendChild(nextQuizButton);
  div.forEach((item) => {
    if (item.innerText === targetName) { 
      item.className = 'correct-alternative';
    };
    if (item.innerText !== targetName) return section.removeChild(item);
  })
  pontos += 1;
  points.innerText = `Points: ${pontos}`;
}

function clickAlternative(target) {
  const img = document.querySelector('.character-picture');
  return target.target.innerText === img.alt ? correctAlternative(target.target.innerText) : wrongAlternative(target.target.innerText);
}

function renderAlternative(alternatives) {  
  alternatives.forEach((item) => {      
    const div = document.createElement('div');
    div.innerText = `${item}`;
    div.className = 'alternative';
    div.addEventListener('click', clickAlternative);
    const section = document.querySelector('.alternatives-quiz');
    section.appendChild(div);      
  }) 
}

async function setAlternative(character) {
  const characterOne = `${character.firstName} ${character.lastName}`;
  const characterTwo = `${(await getInfo()).firstName} ${character.lastName}`;
  const characterThree = `${character.firstName} ${(await getInfo()).lastName}`;
  const characterFour = `${(await getInfo()).firstName} ${(await getInfo()).lastName}`;
  const alternatives = [characterOne, characterTwo, characterThree, characterFour];
  const array = [];
  for (let index = 0; index < 4; index += 1) {
    let number = Math.floor(Math.random() * alternatives.length);
    array.push(alternatives[number]);
    alternatives.splice(number, 1);    
  }
  renderAlternative(array);
}

function setQuiz(character) {
  const section = document.querySelector('.picture-quiz');
  const img = document.createElement('img');
  const p = document.createElement('p');
  p.innerText = 'Which name of this character ?';
  img.src = character.imageUrl;
  img.alt = `${character.firstName} ${character.lastName}`;
  img.className = 'character-picture'
  section.appendChild(p);
  section.appendChild(img);
  setAlternative(character);
}

async function startQuiz() {
  const section = document.querySelector('.button-quiz');  
  const character = await getInfo();  
  setQuiz(character);  
  section.removeChild(section.firstElementChild);
}

function restartQuiz() {
  const sectionPicture = document.querySelector('.picture-quiz');
  const sectionAlternatives = document.querySelector('.alternatives-quiz');
  const alternatives = document.querySelectorAll('.alternative');
  const correctAlternative = document.querySelector('.correct-alternative');
  const wrongAlternative = document.querySelector('.wrong-alternative');
  sectionPicture.removeChild(sectionPicture.firstElementChild);
  sectionPicture.removeChild(sectionPicture.firstElementChild);
  alternatives.forEach((item) => {
    sectionAlternatives.removeChild(item);
  })
  sectionAlternatives.removeChild(correctAlternative);
  if (wrongAlternative) { sectionAlternatives.removeChild(wrongAlternative); }
  startQuiz();
}

startQuizButton.addEventListener('click', startQuiz);
nextQuizButton.addEventListener('click', restartQuiz);

async function fetchInfo() {
  try {
    await getInfo();
  } catch(error) {
    console.log(error)
  }
}

//window.onload = fetchInfo();