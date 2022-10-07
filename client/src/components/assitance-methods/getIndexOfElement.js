export default function getIndexOfElement(target, elementClass, elementContainer) {
    let elements = elementContainer.querySelectorAll(`.${elementClass}`);
    let index = 0;
    elements.forEach((element, i) => {
      if (element === target) index = i;
    });
    return index;
}