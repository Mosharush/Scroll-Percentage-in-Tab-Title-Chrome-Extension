"use strict";

console.log("Scroll Percentage in Tab Title Extension loaded 👍");

const originalTitle = document.title;

function findOutMainContentElement() {
  const scrollTop = window.scrollY;
  const documentHeight = document.body.offsetHeight;
  const containers = document.querySelectorAll(
    "body,main,*[class~='content'],*[class*='Content'],*[class~='article']:first-child,article:first-child"
  );

  let mainContainer = null,
    mainContainerSizes = null;

  for (let x = containers.length - 1; x >= 0; x--) {
    mainContainer = containers[x];
    mainContainerSizes = mainContainer.getBoundingClientRect();
    if (documentHeight / mainContainerSizes.height < 3) {
      break;
    }
  }
  return {
    scrollTop,
    mainContainer,
    mainContainerSizes,
  };
}

let { mainContainer } = findOutMainContentElement();
let observer = new IntersectionObserver((entries, observer) => {
  const { scrollTop, mainContainerSizes } = findOutMainContentElement();

  let docHeight = mainContainerSizes.top + mainContainerSizes.height;
  let winHeight = window.innerHeight;
  let scrollPercent =
    scrollTop > docHeight ? 100 : scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.min(
    Math.max(Math.round(scrollPercent * 100), 0),
    100
  );
  document.title = `(${scrollPercentRounded}%) ${originalTitle}`;
});
mainContainer.querySelectorAll("p").forEach((elem) => {
  observer.observe(elem);
});
