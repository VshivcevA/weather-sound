import { IItem } from "./mocks";

const cardList = document.querySelector(".card__list") as HTMLElement;

const path = "./assets/img/icons/";
const imgFormat = ".svg";
function createCard(card: IItem) {
  const cardItem = document.createElement("li");
  cardItem.classList.add("card__item", "card__item--" + card.type);
  cardItem.id = card.type;
  const cardImg = document.createElement("img");
  cardImg.classList.add("card__icon");
  cardImg.src = path + card.type + imgFormat;
  cardItem.append(cardImg);
  cardList.append(cardItem);
}
export default function renderCard(data: IItem[]) {
  cardList.innerHTML = "";
  data.forEach((card: IItem) => {
    createCard(card);
  });
}
