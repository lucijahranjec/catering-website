const hamburgerBtn = document.getElementById("hamburger");
const menu = document.querySelector("header nav");

const toggleMenu = (e) => {
	e.stopPropagation();
	const isMobile = window.matchMedia("(max-width: 720px)").matches;

	if (isMobile) {
		menu.classList.toggle("open");
	}
};

export const initMenu = () => {
    
	hamburgerBtn.addEventListener("click", toggleMenu);
	menu.addEventListener("click", toggleMenu);
	document.addEventListener("click", (e) => {
		if (
			menu.classList.contains("open") &&
			!hamburgerBtn.contains(e.target) &&
			!menu.contains(e.target)
		) {
			menu.classList.remove("open");
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key !== "Tab" && menu.classList.contains("open")) {
			menu.classList.remove("open");
		}
	});
};
