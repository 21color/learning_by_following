const puzzleBorad = document.querySelector('#puzzle');
const solveBtn = document.querySelector('#solve-button');
const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
	const inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'number');
	inputElement.setAttribute('min', '1');
	inputElement.setAttribute('max', '9');
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

const solve = () => {
	const options = {
		method: 'POST',
		url: 'https://solve-sudoku.p.rapidapi.com/',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': '4e7302bee8mshb571af3777e51e4p1163b2jsn985e02d06a82',
			'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com',
		},
		data: '{"puzzle":"2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3"}',
	};

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error.response);
		});
};

solveBtn.addEventListener('click', solve);
