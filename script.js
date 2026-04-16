//----------Change suggested order date to +5 days
const nameInput = document.getElementById("reservationName");
const servingSizeInput = document.getElementById("servingSize");
const orderDateInput = document.getElementById("orderDate");
const messageInput = document.getElementById("message");

const setDateConstraintsAndValue = (inputElem) => {
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + 3);
	currentDate.setHours(12, 0, 0, 0);

	const minDate = new Date();
	minDate.setDate(minDate.getDate() + 3); //Order possible min. 3 days from current date
	minDate.setHours(0, 0, 0, 0);

	const maxDate = new Date();
	maxDate.setMonth(maxDate.getMonth() + 6); //Order possible up to 6 months in advance
	maxDate.setHours(0, 0, 0, 0);

	const format = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	inputElem.value = format(currentDate);
	inputElem.min = format(minDate);
	inputElem.max = format(maxDate);
};

setDateConstraintsAndValue(orderDateInput);

//-------------Form submission & reset
const contactForm = document.querySelector("#contact > form");
contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	nameInput.value = "";
	servingSizeInput.value = "";
	setDateConstraintsAndValue(orderDateInput);
	messageInput.value = "";
	alert("Your message")
});
