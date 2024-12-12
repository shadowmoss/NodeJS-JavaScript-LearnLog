// 1. 定义变量和函数

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 2. 纯文本字符串

var storyText = `今天气温 34 摄氏度，:insertx:出去遛弯。当走到:inserty:门前时，突然就:insertz:。人们都惊呆了，李雷全程目睹但并没有慌，因为:insertx:是一个 130 公斤的胖子，天气又辣么热。`

var insertX = ["怪兽威利","大老爹","圣诞老人"];

var insertY = [`肯德基`,`迪士尼乐园`,`白宫`];

var insertZ = [`自燃了`,`在人行道化成了一坨泥`,`变成一条鼻涕虫爬走了`];

// 3. 事件监听器和未完成的函数定义

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:',xItem);
    newStory = newStory.replace(':insertx:',xItem);
    newStory = newStory.replace(':inserty:',yItem);
    newStory = newStory.replace(':insertz:',zItem);


  if(customName.value !== '') {
    let name = customName.value;
    newStory = newStory.replace('李雷',name);
  }

  if(document.getElementById("american").checked) {
    let weight = Math.round(300);
    let temperature = Math.round(94);
    newStory = newStory.replace('34 摄氏度',temperature);
    newStory = newStory.replace('130公斤',weight)
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
