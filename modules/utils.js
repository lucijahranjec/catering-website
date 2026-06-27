export const debounce = (fn, delay) => {
	let timer;

	return (...arg) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...arg), delay);
	};
};

