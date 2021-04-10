//
// bulls_and_cows.js
//

const readlineSync = require('readline-sync');

let stepsLimit = 10;
let gameResult = play();
printResult(gameResult);

function play() {

  printInitialMessage();

  let gameResult = 'lose';
  let generatedNumber = generateNewNumber();
  let generatedNumberLength = generatedNumber.length;

  console.log(`Компьютер загадал число из ${generatedNumberLength} цифр`);

  do {
    let userNumber = readlineSync.question(`Отгадайте его (осталось попыток - ${stepsLimit}): `);
    
    //Проверяем не ошибся ли пользователь при вводе
    //Ошибки: просто нажал Enter; ввел меньше или больше цифр; введ не цифры
    //При обнаружении ошибки выдать предупреждение, иначе перейти к логике игры.
    if (isUserValueCorrect(userNumber, generatedNumberLength)) {
      analyseUserNumber(generatedNumber, userNumber);
    }
    stepsLimit -= 1;
    if (userNumber == generatedNumber) {
      gameResult = 'won';
      break;
    }
  } while ( stepsLimit > 0 )
  return gameResult;
}

function generateNewNumber() {
  let multiplayer = Math.pow(10,Math.floor(Math.random()*4 + 3)); //Умножитель 1000/10000/100000/1000000
  let randNum = Math.random() * 0.9 + 0.1;                        //Случайное число в пределах от 0.1 до 0.9
  return String(Math.floor(randNum * multiplayer));
}

function printInitialMessage() {
  console.log('======================================================================');
  console.log('                            Быки и коровы');
  console.log('======================================================================\n');
}

function isUserValueCorrect(value, maxValue) {
  const msgNumberIsLess    = '\n[WARN] Ваше число меньше чем загадоное компьютером - будьте внимательны\n';
  const msgNumberIsGreater = '\n[WARN] Ваше число больше чем загадоное компьютером - будьте внимательны\n'
  const msgNotANumber      = '\n[WARN] Вы ввели не число - будьте внимательны\n'
  const msgEmpty           = '\n[WARN] Ввод пуст - будьте внимательны\n'

  let msg = '';
  let returnValue = false;
  
  if (value == '')
    msg = msgEmpty;
  else if (isNaN(value))
    msg = msgNotANumber;
  else if (value.length > maxValue) 
    msg = msgNumberIsGreater;
  else if (value.length < maxValue)
    msg = msgNumberIsLess;

  if (msg == '')
    returnValue = true;
  else 
    console.log(msg);

  return returnValue;
}

//Функция отрабатывающая логику игры
function analyseUserNumber(generatedNumber, userNumber) {
  let matched = [];
  let matchedSamePosition = [];
  
  for (let i in userNumber) {
    for (let j in generatedNumber) {
      if(userNumber[i] == generatedNumber[j]){
	if ( i == j) {
          matchedSamePosition.push(userNumber[i]);
	  break;
	}
	else if (userNumber[j] != generatedNumber[j]) {
	  matched.push(userNumber[i]);
        }
      }
    }  
  }
  console.log(`совпавших цифр не на своих местах - ${matched.length} (${matched})  цифр на своих местах - ${matchedSamePosition.length} (${matchedSamePosition})`);
}

function printResult(gameResult) {
  console.log('======================================================================');
  if (gameResult == 'won') {
    console.log('\tПоздравляю - Вы верно угадали число!');
  }
  else {
    console.log("\tНа этот раз не угадали, но всегда можно попробовать еще раз ;)");
  }
  console.log('======================================================================');
}

