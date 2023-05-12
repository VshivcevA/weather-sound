import { mocks } from "./mocks";
import renderCard from "./renderCard";
renderCard(mocks);

document.addEventListener("DOMContentLoaded", () => {
  const body: HTMLBodyElement = document.querySelector(".body")!;
  const cardList = document.querySelectorAll(".card__item");
  const audio = document.getElementById("audio") as HTMLAudioElement;
  const input = document.getElementById("input") as HTMLInputElement;
  const pauseIcon: string = "./assets/img/icons/pause.svg";

  let currentPlay = "";

  input.addEventListener("input", () => {
    audio.volume = +input.value / 100;
  });

  cardList.forEach((card) => {
    card.addEventListener("click", () => {
      body.style.backgroundImage = "url('./assets/img/" + card.id + "-bg.jpg')";
      if (currentPlay !== card.id) {
        changeAudioSrc(card);
        audio.play();
        resetIcon();
        changeIcon(card);
      } else {
        if (audio.paused) {
          audio.play();
          changeIcon(card);
        } else {
          audio.pause();
          resetIcon();
        }
      }
      currentPlay = card.id;
    });
  });
  function resetIcon() {
    cardList.forEach((card) => {
      const icon: HTMLImageElement | null = card.querySelector(".card__icon")!;
      icon.src = "./assets/img/icons/" + card.id + ".svg";
    });
  }

  function changeAudioSrc(card: Element) {
    return (audio.src = "./assets/sounds/" + card.id + ".mp3");
  }
  function changeIcon(card: Element) {
    const icon: HTMLImageElement | null = card.querySelector(".card__icon")!;
    icon.src = pauseIcon;
  }
});
