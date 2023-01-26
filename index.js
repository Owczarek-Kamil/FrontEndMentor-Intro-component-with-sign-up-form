// Disable links
document.querySelector('.form__terms-and-services--link').addEventListener('click', (event) => event.preventDefault());

// Get the root element
const root = document.querySelector(':root');

// DOM Elements
const firstNameInput = document.querySelector('input[name="first-name"');
const lastNameInput = document.querySelector('input[name="last-name"');
const emailInput = document.querySelector('input[name="email"');
const passwordInput = document.querySelector('input[name="password"');
const form = document.querySelector('form');
const loaderBackdrop = document.querySelector('.loader-backdrop');
const spinner = document.querySelector('.lds-dual-ring');

const arrayOfInputs = [firstNameInput, lastNameInput, emailInput, passwordInput];

const emailErrorMessageElement = emailInput.parentElement.children[2];
const emailValidationErrorMessage = 'Looks like this is not an email';
const emailLengthValidationErrorMessage = 'Email cannot be empty';

function displayModal() {
	loaderBackdrop.classList.remove('hidden');
	spinner.classList.remove('hidden');
}

function coverFormWindow() {
	loaderBackdrop.classList.add('loader-backdrop--no-opacity');
}

function renderSuccessMessage() {
	document.querySelector('.fade-out').classList.remove('hidden');
	document.querySelector('.success-message-container').classList.remove('hidden');
}

function validateInput(input) {
	if (input.value.trim() === '') {
		if (input === emailInput) emailErrorMessageElement.textContent = emailLengthValidationErrorMessage;
		toggleErrors(input);
		return false;
	}
	return true;
}

function validateEmail(input) {
	const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!input.value.match(validRegex)) {
		emailErrorMessageElement.textContent = emailValidationErrorMessage;
		toggleErrors(input);
		return false;
	}
	return true;
}

function toggleErrors(input) {
	const childElements = [...input.parentElement.children];
	childElements[0].classList.toggle('form__input--invalid');
	childElements[1].classList.toggle('form__error-icon--is-hidden');
	childElements[2].classList.toggle('form__error-message--is-hidden');
}

function hideErrors(input) {
	const childElements = [...input.parentElement.children];
	childElements[0].classList.remove('form__input--invalid');
	childElements[1].classList.add('form__error-icon--is-hidden');
	childElements[2].classList.add('form__error-message--is-hidden');
}

function appendFocusEventListener(input) {
	input.addEventListener('focus', () => {
		if (!input.nextElementSibling.classList.contains('form__error-icon--is-hidden')) {
			toggleErrors(input);
		}
	});
}

function setLoadingTime(milisecons) {
	root.style.setProperty('--loading-time', `${milisecons}ms`);
	return milisecons;
}

arrayOfInputs.forEach((input) => appendFocusEventListener(input));

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();
	arrayOfInputs.forEach((input) => hideErrors(input));

	const validationOfFirstName = validateInput(firstNameInput);
	const validationOfLastName = validateInput(lastNameInput);
	const validationOfEmail = validateInput(emailInput) ? validateEmail(emailInput) : false;
	const validationOfPassword = validateInput(passwordInput);

	if (validationOfFirstName && validationOfLastName && validationOfEmail && validationOfPassword) {
		const loadingTime = setLoadingTime(3000);
		displayModal();
		setTimeout(() => coverFormWindow(), loadingTime);
		setTimeout(() => {
			spinner.remove();
			renderSuccessMessage();
		}, loadingTime + 750); // 750 in this case is a magic number that sync all the events smoothly
	}
});
