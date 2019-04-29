// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
const UNCHECKED_IMG = 'images/unchecked.png';
const CHECKED_IMG = 'images/checked.png';

let flag = {'one': false, 'two': false, 'three': false};
let choose = {'one':'', 'two':'', 'three':''};
let count = 0;
//add click event on the pictures
const grids = document.querySelectorAll('.choice-grid div');
for (const grid of grids) {
  grid.addEventListener('click', select);
}

function select(event){
  const qid = event.currentTarget.dataset.questionId;
  const cid= event.currentTarget.dataset.choiceId;
  const checkbox = event.currentTarget.querySelector('.checkbox');
  const div = event.currentTarget;
  const opdivs = div.parentNode.querySelectorAll('div');
  choose[qid] = cid;
  if(flag[qid]===false)
    count++;
  for(const opdiv of opdivs) {
    opdiv.style.opacity = '0.6';
   }
  if(flag[qid]===false) {
    checkbox.src = CHECKED_IMG;
     div.style.backgroundColor = '#cfe3ff';
    div.style.opacity = '1.0'; 
    flag[qid] = true;  
   }
   else if(flag[qid]===true) {
    unselect(event);
    checkbox.src = CHECKED_IMG;
     div.style.opacity = '1.0'; 
     div.style.backgroundColor = '#cfe3ff';
   }
   if(count===3) {
     console.log('choose 3 different section');
     stopselect();
     result();
   }
}
function unselect(event) {
  const checkboxs = event.currentTarget.parentNode.querySelectorAll('.checkbox');
  for(const checkbox of checkboxs) {
    checkbox.src = UNCHECKED_IMG;
    checkbox.parentNode.style.backgroundColor = '#f4f4f4';
  }
  
}

function stopselect() {
  const grids = document.querySelectorAll('.choice-grid div');
  for (const grid of grids) {
    grid.removeEventListener('click', select);
  }
}

function result() {
  console.log(choose['one']);
  console.log(choose['two']);
  console.log(choose['three']);
  //calculate answer
  let answer = choose['one'];
  if(answer===choose['two'] || answer===choose['three']) {
    console.log('ans:'+answer);
    printAns(answer);
  }
  else if(choose['two']===choose['three']) {
    answer = choose['two'];
    console.log('ans:'+answer);
    printAns(answer);
  }
  else if(answer!==choose['two'] && answer!==choose['three']) {
    console.log('ans:'+answer);
    printAns(answer);
  }
  //add resultArea and ready to restart
  const resultArea = document.querySelector('#resultArea');
  resultArea.classList.remove('hidden');
  const restart_button = document.querySelector('button');
  restart_button.addEventListener('click',restart);
}

function restart() {
  console.log('restart');
  const firstQ = document.querySelector('.question-name');
  firstQ.scrollIntoView();
  const resultArea = document.querySelector('#resultArea');
  resultArea.classList.add('hidden');
  reset();
  const grids = document.querySelectorAll('.choice-grid div');
  for (const grid of grids) {
    grid.addEventListener('click', select);
  }
}

function reset() {
  count = 0;
  flag = {'one': false, 'two': false, 'three': false};
  choose = {'one':'', 'two':'', 'three':''};
  const divs = document.querySelectorAll('.choice-grid div');
  for(const div of divs) {
    div.style.opacity = '1.0';
    div.style.backgroundColor = '#f4f4f4';
  } 
  const checkboxs = document.querySelectorAll('.checkbox');
  for(const checkbox of checkboxs) {
    checkbox.src = UNCHECKED_IMG;
  }
}
//mouse on the button change color
const button = document.querySelector('button');
button.addEventListener('mouseover',mouse_on);
button.addEventListener('mouseout',mouse_out);
function mouse_on(event) {
  event.currentTarget.style.backgroundColor = '#e0e0e0';
}
function mouse_out(event) {
  event.currentTarget.style.backgroundColor = '#cecece';
}
//find the answer in constants.js and change textContent in html
function printAns(answer) {
  const TITLE = document.querySelector('#title');
  TITLE.textContent = 'You got: '+RESULTS_MAP[answer].title;
  const RESULT = document.querySelector('#test_result');
  RESULT.textContent = RESULTS_MAP[answer].contents;
}