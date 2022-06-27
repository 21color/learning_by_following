const puzzleBorad = document.querySelector('#puzzle');
const solveBtn = document.querySelector('#solve-button');
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'number');
	inputElement.setAttribute('min', '1');
	inputElement.setAttribute('max', '9');
	if (
		((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
		((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
		((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
		((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
		((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
	) {
		inputElement.classList.add('odd-section');
	}

	puzzleBorad.appendChild(inputElement);
}

const joinvalue = () => {
	const inputs = document.querySelectorAll('input');
	inputs.forEach((input) => {
		if (input.value) {
			submission.push(input.value);
		} else {
			submission.push('.');
		}
	});
	console.log(submission);
};

const populateValue = (isSolvable, solution) => {
	const inputs = document.querySelectorAll('input');
	if (isSolvable && solution) {
		inputs.forEach((input, i) => {
			input.value = solution[i];
		});
	}
};
const solve = () => {
	joinvalue();
	const data = submission.join('');
	console.log('data', data);
	const options = {
		method: 'POST',
		url: 'https://solve-sudoku.p.rapidapi.com/',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': './environment.env.RAPID_API_KEY',
			'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
		},
		data: {
			puzzle: data,
		},
	};

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
			populateValue(response.data.solvable, response.data.solution);
		})
		.catch(function (error) {
			console.error(error.response);
		});
};

solveBtn.addEventListener('click', solve);
