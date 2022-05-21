const cardsData = async ():Promise<Object> => {
  const url = './src/data.json';
  const response = await fetch(url, {
    method: 'GET',
  })
  return response.json();
}

const createCard = async ():Promise<void> => {
  const main: HTMLElement = document.querySelector("main")!;
  const data: Array<Object> = await cardsData();
  console.log(await data);
  data.forEach(item => {
    const card: HTMLDivElement = document.createElement("div");
    card.classList.add("container", "secondary-card");
    const illustrationCard: HTMLDivElement = document.createElement("div");
    illustrationCard.classList.add("illustration__card");
    switch (item.title) {
      case 'Work' :
        illustrationCard.setAttribute("id", "work");
        break;
      case 'Play' :
        illustrationCard.setAttribute("id", "play");
        break;
      case 'Study' :
        illustrationCard.setAttribute("id", "study");
        break;
      case 'Exercise' :
        illustrationCard.setAttribute("id", "exercise");
        break;
      case 'Social' :
        illustrationCard.setAttribute("id", "social");
        break;
      case 'Self Care' :
        illustrationCard.setAttribute("id", "selfCare");
        break;
      default:
        console.log("Data Error");
      }
    const contentTop = document.createElement("div");
    contentTop.classList.add("content__top");
    contentTop.appendChild(document.createElement("h2")).textContent = item.title;
    const buttonOption = document.createElement("img");
    buttonOption.src = "./src/images/icon-ellipsis.svg";
    buttonOption.setAttribute('alt', 'options button');
    contentTop.appendChild(buttonOption);
    const contentBottom = document.createElement("div");
    contentBottom.classList.add("content__bottom");
    const hours = document.createElement("p");
    const previous = document.createElement("p");
    hours.textContent = `${item.timeframes.weekly.current} hrs`;
    previous.textContent = `Last Week - ${item.timeframes.weekly.previous} hrs`;
    contentBottom.appendChild(hours);
    contentBottom.appendChild(previous);

    console.log(item);
    main.appendChild(card);
    card.appendChild(illustrationCard);
    card.appendChild(contentTop);
    card.appendChild(contentBottom);
  })
}


createCard();


export {};