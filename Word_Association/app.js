const scoreDisplay = document.querySelector('#score-display');
const questionDisplay = document.querySelector('#question-display');

const questions = [
	{
		quiz: ['value', 'estimate', 'evaluate'],
		options: ['jury', 'assess'],
		correct: 2,
	},
	{
		quiz: ['foreign', 'national', 'ethnic'],
		options: ['mad', 'exotic'],
		correct: 2,
	},
	{
		quiz: ['assume', 'insight', 'weather'],
		options: ['forecast', 'subtainable'],
		correct: 1,
	},
	{
		quiz: ['fast', 'quick', 'prompt'],
		options: ['charity', 'rapid'],
		correct: 2,
	},
	{
		quiz: ['close', 'near', 'next'],
		options: ['trace', 'adjacent'],
		correct: 2,
	},
];

let score = 0;
let clicked = [];
scoreDisplay.textContent = score;

const populateQustions = () => {
	questions.forEach((question) => {
		const questionBox = document.createElement('div');
		questionBox.classList.add('question-box');

		const logoDisplay = document.createElement('h1');
		logoDisplay.textContent = '❃';
		questionBox.append(logoDisplay);

		question.quiz.forEach((tip) => {
			const tipText = document.createElement('p');
			tipText.classList.add('question--text');
			tipText.textContent = tip;
			questionBox.append(tipText);
		});

		const questionButtons = document.createElement('div');
		questionButtons.classList.add('question-buttons');
		questionBox.append(questionButtons);

		question.options.forEach((option, optionIndex) => {
			const questionButton = document.createElement('button');
			questionButton.classList.add('question-button');
			questionButton.textContent = option;

			questionButton.addEventListener('click', () =>
				checkAnswer(questionBox, questionButton, option, optionIndex + 1, question.correct)
			);
			questionButtons.append(questionButton);
		});

		const anwerDisplay = document.createElement('div');
		anwerDisplay.classList.add('answer-display');

		questionBox.append(anwerDisplay);
		questionDisplay.append(questionBox);
	});
};

populateQustions();

function checkAnswer(questionBox, questionButton, option, optionIndex, correctAnswer) {
	console.log('option', option);
	console.log('optionIndex', optionIndex);

	if (optionIndex === correctAnswer) {
		score++;
		scoreDisplay.textContent = score;
		addResult(questionBox, 'Correct!', 'correct');
	} else {
		score--;
		scoreDisplay.textContent = score;
		addResult(questionBox, 'Wrong!', 'wrong');
	}
	clicked.push(option);
	console.log('clicked', clicked);
	questionButton.disabled = clicked.includes(option);
}

function addResult(questionBox, answer, className) {
	const answerDisplay = questionBox.querySelector('.answer-display')
	answerDisplay.classList.remove('wrong')
  answerDisplay.classList.remove('correct')
  answerDisplay.classList.add(className)
  answerDisplay.textContent = answer;
}
