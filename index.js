// const colors = require('colors');
// const [ start, end ] = process.argv.slice(2);

// let simpleNumbers = [];

// nextPrime:
// for (let i = Number(start); i <= Number(end); i++) {

// 	for (let j = 2; j < i; j++) {
// 		if (i % j == 0) continue nextPrime;
// 	}

// 	simpleNumbers.push(i);
// }

// if(simpleNumbers.length == 0) {
// 	console.log(colors.red('Простых чисел в диапазоне нет.'));
// }

// if((isNaN(parseFloat(start)) && !isFinite(start)) || (isNaN(parseFloat(end)) && !isFinite(end))) {
// 	const err = new Error('Введено строковое значение, а не числовое! Введите число.');
// 	console.error(err.message);
// } 

// let size = 3; //размер подмассива
// let subarray = []; //массив в который будет выведен результат.
// for (let i = 0; i < Math.ceil(simpleNumbers.length/size); i++){
//     subarray[i] = simpleNumbers.slice((i*size), (i*size) + size);
// }

// subarray.forEach(element => console.log(`${colors.green(element[0])} ${colors.yellow(element[1])} ${colors.red(element[2])}`));


//Homework 2
// Формат аргумента строка 'день.месяц.год'
'use strict';

const EventEmitter = require('events');
const emitter = new EventEmitter();
class countdownTimer {
	constructor(deadline) {
		this.deadline = deadline;
	}

	evalDeadline() {
		const deadlineArray = this.deadline.split('.');
		const deadlineInSeconds = (new Date(deadlineArray[2], deadlineArray[1] - 1, deadlineArray[0])).getTime() / 1000;
		return deadlineInSeconds;
	}

	substract() {
		const timerInSeconds = Math.floor(Date.now() / 1000) - this.evalDeadline();
		return timerInSeconds;
	}
	start() {
		let timer = setInterval(() => {
			const substract = this.substract();
			if (substract < 0) {
				const days = substract < 0 ? -Math.floor(substract / 60 / 60 / 24) : 0;
				const hours = substract < 0 ? -Math.floor(substract / 60 / 60) % 24 : 0;
				const minutes = substract < 0 ? -Math.floor(substract / 60) % 60 : 0;
				const seconds = substract < 0 ? -Math.floor(substract) % 60 : 0;
				emitter.emit('TimerTick', console.log(`Осталось ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`));
			} else {
				emitter.emit('TimerStop');
				clearInterval(timer);
			}
		}, 1000);
	}
}

new countdownTimer('20.03.2022').start();

emitter.on('TimerTick', () => {
	console.log('Таймер работает');
});

emitter.on('TimerStop', () => {
	console.log('Таймер остановился');
});