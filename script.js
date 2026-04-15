//----------Change suggested order date to +5 days
const orderDateInput = document.getElementById("orderDate");

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 3);
currentDate.setHours(12, 0, 0, 0);

const formatTimeForInputValue = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

orderDateInput.value = formatTimeForInputValue(currentDate);

//-----------Set min & max selectable date
const minDate = new Date();
minDate.setDate(minDate.getDate() + 3); //Order possible min. 3 days from current date
minDate.setHours(0, 0, 0, 0);
orderDateInput.min = formatTimeForInputValue(minDate);

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 7); //Order possible up to 6 months in advance
maxDate.setDate(1);
maxDate.setHours(0, 0, 0, 0);
orderDateInput.max = formatTimeForInputValue(maxDate);