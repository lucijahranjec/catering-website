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
	alert("Your message");
});

//-------------Name input validation
nameInput.addEventListener("input", (e) => {
	const target = e.target;
	const isInvalidChar = /[^a-zA-Z\s]/.test(target.value);

	if (isInvalidChar) {
		target.setCustomValidity("Only letters and spaces are allowed");
		target.reportValidity(); //Show errors
	} else {
		target.setCustomValidity(""); //Clear errors
	}
});

//--------------Slideshow
const slideContainer = document.getElementById("slide-container");
const prevBtn = slideContainer.querySelector(".prev");
const nextBtn = slideContainer.querySelector(".next");
const thumbnailContainer = document.getElementById("thumbnail-container");
const slideCaption = slideContainer.querySelector("h3.slide-caption");
let slidesNodeList, thumbnailsNodeList;

const imagesArr = [
	{ filename: "dish1.jpeg", alt: "Bean & Corn Curry" },
	{ filename: "dish2.jpeg", alt: "Baked Pear with Toasted Almond Slivers" },
	{ filename: "dish3.jpeg", alt: "Fig Granola" },
	{ filename: "dish4.jpeg", alt: "Hummus" },
	{ filename: "dish5.jpeg", alt: "Clams & Garlic Bruschette" },
	{ filename: "dish6.jpeg", alt: "Lentil Stew with Sprouts" },
	{ filename: "dish7.jpeg", alt: "Fresh Coconut & Pistachio Granola" },
	{ filename: "dish8.jpeg", alt: "Fig Compote & Pecan Cream" },
	{ filename: "dish9.jpeg", alt: "Crowned steak" },
	{ filename: "dish10.jpeg", alt: "Strawberry, Pecan, Figs & Spinach Salad" },
	{ filename: "dish11.jpeg", alt: "Cauliflower steak & cashew hummus" },
	{ filename: "dish12.jpeg", alt: "Mint-Cashew Icecream" },
	{ filename: "dish13.jpeg", alt: "Chickpea & Walnut Pie" },
];

const loadImage = (obj) => {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", () => {
			reject(new Error(`Failed to load: ${obj.filename}`));
		});

		img.src = `./assets/images/slideshow/${obj.filename}`;
		img.alt = obj.alt;
	});
};

const createSlidesAndThumbnails = async () => {
	try {
		const loadedImages = await Promise.allSettled(
			imagesArr.map((obj) => loadImage(obj)),
		);
		const filteredImages = loadedImages
			.filter((img) => img.status === "fulfilled")
			.map((img) => img.value);

		filteredImages.forEach((loadedImg, i) => {
			const obj = imagesArr[i];

			const slide = document.createElement("div");
			slide.className = "slide";
			if (i === 0) slide.classList.add("active");

			const imgNumText = document.createElement("div");
			imgNumText.className = "img-number";
			imgNumText.textContent = `${i + 1} / ${imagesArr.length}`;

			const slideImg = loadedImg.cloneNode(true);
			slide.append(imgNumText, slideImg);
			slideContainer.insertBefore(slide, prevBtn);

			const thumbnail = loadedImg.cloneNode(true);
			thumbnail.className = "thumbnail";
			thumbnail.dataset.thumbIndex = i;
			thumbnail.alt = `Thumbnail for ${thumbnail.alt}`;
			if (i === 0) thumbnail.classList.add("active");

			// thumbnail.addEventListener("click", () => currentSlide(i + 1));
			thumbnailContainer.append(thumbnail);
		});

		slidesNodeList = document.querySelectorAll(".slide");
		thumbnailsNodeList = document.querySelectorAll(".thumbnail");

	} catch (error) {
		console.error("Error loading images: ", error);
	}
};

createSlidesAndThumbnails();
let currentSlideIndex = 0;

const showSlides = (newIndex) => {
	//User reached end, jump to beginning
	if (newIndex > slidesNodeList.length - 1) {
		newIndex = 0;
	}

	//User reached beginning, jump to end
	if (newIndex < 0) {
		newIndex = slidesNodeList.length - 1;
	}

	slidesNodeList[currentSlideIndex].classList.remove("active");
	thumbnailsNodeList[currentSlideIndex].classList.remove("active");

	slidesNodeList[newIndex].classList.add("active");
	thumbnailsNodeList[newIndex].classList.add("active");

	currentSlideIndex = newIndex;
};

prevBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	showSlides(currentSlideIndex - 1);
});

nextBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	showSlides(currentSlideIndex + 1);
});

thumbnailContainer.addEventListener("click", (e) => {
	e.stopPropagation();
	showSlides(e.target.dataset.thumbIndex);
})