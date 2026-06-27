import { data } from "./data.js";
import { debounce } from "./utils.js";

const inputField = document.getElementById("searchbar");
const dropdown = document.getElementById("searchbar-dropdown");
let isUserInput = false;
let isNoMatches = false;
let highligtedIndex = -1;
let selectedMatchText = "";
const dropdownElements = [];

const isDropdownOpen = () => dropdown.classList.contains("open");

const resetAndCloseDropdown = () => {
	dropdown.classList.remove("open");
	isUserInput = false;
	highligtedIndex = 0;
	selectedMatchText = "";
	dropdownElements.length = 0;
};

const filterResults = (data, input) => { //Returns an array of matching objects
	const normalizedInput = input.toLowerCase().trim();
	return data.filter((dish) => dish.name.toLowerCase().includes(normalizedInput));
};

const debouncedFilterAndRender = debounce((input) => {
	const matches = filterResults(data, input);
	updateDropdown(matches);
}, 200);

const updateDropdown = (data) => {
	dropdown.replaceChildren(); //Clear matches
	dropdownElements.length = 0; //Empty references
	isNoMatches = data.length === 0;
	const items = isNoMatches ? [{name: "No matches found"}] : data;

	items.forEach((item) => {
		const li = document.createElement("li");
		li.textContent = item.name;
		dropdown.append(li);
		dropdownElements.push(li); //Store element reference for handling keyboard navigation
	});
};

const handleInput = (e) => {
	e.stopPropagation();

	//Don't run handler if user selected a suggestion from dropdown
	if (selectedMatchText) return;

	const input = e.target.value.trim(); //Trim so dropdown doesn't display on whitespace only
	isUserInput = !!input; //Get a boolean value

	if (isUserInput) {
		//Filter and update display
		!isDropdownOpen() && dropdown.classList.add("open");
		debouncedFilterAndRender(input);
		
	} else {
		//Reset if user deleted all input
		resetAndCloseDropdown();
	}
};

const selectDropdownMatch = (match) => {
	selectedMatchText = match;
	inputField.value = match;
	resetAndCloseDropdown();
};

const updateHighlighted = (num) => {
	if (highligtedIndex >= 0) {
		//If element was previously highlighted, remove styling
		dropdownElements[highligtedIndex].classList.remove("highlighted");
	}

	const newIndex = (highligtedIndex += num);
	const totalMatches = dropdownElements.length - 1;

	if (newIndex > totalMatches) {
		//Jump  to begining
		highligtedIndex = 0;
	} else if (newIndex < 0) {
		//Jump to the end
		highligtedIndex = totalMatches;
	} else {
		highligtedIndex = newIndex;
	}
	const newHighlightedElement = dropdownElements[highligtedIndex];
	selectedMatchText = newHighlightedElement.textContent;
	newHighlightedElement.classList.add("highlighted");
};

//INPUT STOPS WORKING AFTER ARROWS NAVIGATE DROPDOWN
const handleDropdownKeyboardNavigation = (e) => {
	e.stopPropagation();

	if (isDropdownOpen() && !isNoMatches) {
		switch (e.key) {
			//Prevent default has to be inside of usecases so that it doesn't block other default behaviours
			case "ArrowUp":
				e.preventDefault();
				updateHighlighted(-1);
				break;

			case "ArrowDown":
				e.preventDefault();
				updateHighlighted(1);
				break;

			case "Enter":
				e.preventDefault();
				selectDropdownMatch(
					dropdownElements[highligtedIndex].textContent,
				);
				break;

			case "Escape":
				e.preventDefault();
				resetAndCloseDropdown();
				break;
		}
	}
};

export const initSearchbar = () => {

	inputField.addEventListener("input", handleInput);

	dropdown.addEventListener("click", (e) => {
		e.stopPropagation();
		const target = e.target;

		if (target.tagName === "LI" && !isNoMatches) {
			selectDropdownMatch(target.textContent);
		}
	});

	document.addEventListener("click", (e) => {
		isDropdownOpen() && resetAndCloseDropdown();
	});
	document.addEventListener("keydown", handleDropdownKeyboardNavigation);
};