const colors = require('colors');
const [ start, end ] = process.argv.slice(2);

let simpleNumbers = [];

nextPrime:
for (let i = Number(start); i <= Number(end); i++) {

	for (let j = 2; j < i; j++) {
		if (i % j == 0) continue nextPrime;
	}

	simpleNumbers.push(i);
}

if(simpleNumbers.length == 0) {
	console.log(colors.red('Простых чисел в диапазоне нет.'));
}

if((isNaN(parseFloat(start)) && !isFinite(start)) || (isNaN(parseFloat(end)) && !isFinite(end))) {
	const err = new Error('Введено строковое значение, а не числовое! Введите число.');
	console.error(err.message);
} 

let size = 3; //размер подмассива
let subarray = []; //массив в который будет выведен результат.
for (let i = 0; i < Math.ceil(simpleNumbers.length/size); i++){
    subarray[i] = simpleNumbers.slice((i*size), (i*size) + size);
}

subarray.forEach(element => console.log(`${colors.green(element[0])} ${colors.yellow(element[1])} ${colors.red(element[2])}`));