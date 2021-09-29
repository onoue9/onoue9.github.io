const startQuizButton = document.querySelector('.start-quiz');


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
  const div = document.querySelectorAll('.alternative');
  div.forEach((item) => {
    if (item.innerText === targetName) { 
      item.className = 'correct-alternative';
    };
    if (item.innerText !== targetName) return section.removeChild(item);
  })
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
  const characterTwo = await getInfo();
  const characterThree = await getInfo();
  const characterFour = await getInfo();
  const alternatives = [`${character.firstName} ${character.lastName}`, `${characterTwo.firstName} ${characterTwo.lastName}`, 
  `${characterThree.firstName} ${characterThree.lastName}`, `${characterFour.firstName} ${characterFour.lastName}`];
  renderAlternative(alternatives);
}

function setQuiz(character) {
  const section = document.querySelector('.picture-quiz');
  const img = document.createElement('img');
  img.src = character.imageUrl;
  img.alt = `${character.firstName} ${character.lastName}`;
  img.className = 'character-picture'
  section.appendChild(img);
  setAlternative(character);
}

async function startQuiz() {
  const section = document.querySelector('.button-quiz');  
  const character = await getInfo();  
  setQuiz(character);
  section.removeChild(section.firstElementChild);
}

startQuizButton.addEventListener('click', startQuiz);

async function fetchInfo() {
  try {
    await getInfo();
  } catch(error) {
    console.log(error)
  }
}

//window.onload = fetchInfo();