import { data } from "./data.js";

const modal = document.getElementById("dish-modal");
const modalImg = modal.querySelector("img");
const modalName = modal.querySelector("h2");
const modalPrice = modal.querySelector(".price");
const modalDescription = modal.querySelector(".description");
const modalIngredients = modal.querySelector(".ingredients");

export const openDishModal = (dishObj) => {
    modalImg.src = `../assets/images/slideshow/${dishObj.filename}`;
    modalImg.alt = dishObj.name;
    modalName.textContent = dishObj.name;
    modalPrice.textContent = dishObj.price;
    modalDescription.textContent = dishObj.description;
    modalIngredients.textContent = dishObj.ingredients;

    modal.showModal();
};

export const initModal = () => {

};