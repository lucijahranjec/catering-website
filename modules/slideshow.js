const slideContainer = document.getElementById("slide-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const thumbnailContainer = document.getElementById("thumbnail-container");
const slideCaption = document.getElementById("slide-caption");

let slides = [];
let currentSlideIndex = 0;

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

		slides = loadedImages
			.filter((result) => result.status === "fulfilled")
			.map((result, i) => {
				const img = result.value;

				const slide = document.createElement("div");
				slide.className = "slide";
				if (i === 0) slide.classList.add("active");

				const imgNumText = document.createElement("div");
				imgNumText.className = "img-number";
				imgNumText.textContent = `${i + 1} / ${imagesArr.length}`;

				const slideImg = img.cloneNode();
				slide.append(imgNumText, slideImg);
				slideContainer.insertBefore(slide, slideCaption);
				slideCaption.innerText = slideImg.alt;

				const thumbnail = img.cloneNode(true);
				thumbnail.className = "thumbnail";
				thumbnail.dataset.thumbIndex = i;
				thumbnail.alt = `Thumbnail for ${thumbnail.alt}`;
				if (i === 0) thumbnail.classList.add("active");
				thumbnailContainer.append(thumbnail);

				return {
					slide: slide,
					thumbnail: thumbnail,
					alt: img.alt,
				};
			});
	} catch (error) {
		console.error("Error loading images: ", error);
	}
};

const showSlides = (newIndex) => {
	//User reached end, jump to beginning
	if (newIndex > slides.length - 1) {
		newIndex = 0;
	}

	//User reached beginning, jump to end
	if (newIndex < 0) {
		newIndex = slides.length - 1;
	}

	if (!slides.length) {
		console.error("Empty nodeLists in slide toggle");
		return;
	}

	slides[currentSlideIndex].slide.classList.remove("active");
	slides[currentSlideIndex].thumbnail.classList.remove("active");

	slides[newIndex].slide.classList.add("active");
	slides[newIndex].thumbnail.classList.add("active");

	slideCaption.textContent = slides[newIndex].alt;
	currentSlideIndex = newIndex;
};

const handleSlideshowArrowKeys = (e) => {
	switch (e.key) {
		case "ArrowLeft":
			e.preventDefault(); //Prevents potential page scroll
			showSlides(currentSlideIndex - 1);
			break;

		case "ArrowRight":
			e.preventDefault();
			showSlides(currentSlideIndex + 1);
			break;
	}
};

export const initSlideshow = () => {
	createSlidesAndThumbnails();

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

		if (!e.target.classList.contains("thumbnail")) return;
		const index = Number(e.target.dataset.thumbIndex);
		showSlides(index);
	});

	prevBtn.addEventListener("keydown", handleSlideshowArrowKeys);
	nextBtn.addEventListener("keydown", handleSlideshowArrowKeys);
	slideContainer.addEventListener("keydown", handleSlideshowArrowKeys);
	thumbnailContainer.setAttribute("tabindex", "0"); //Makes the element focusable for keydown event
	thumbnailContainer.addEventListener("keydown", handleSlideshowArrowKeys);
};
