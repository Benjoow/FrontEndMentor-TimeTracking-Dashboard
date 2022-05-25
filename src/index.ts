const cardsData = async ():Promise<Array<Object>> => {
  const url = './src/data.json';
  const response = await fetch(url, {
    method: 'GET',
  })
  return response.json();
}

const createCards = async (cardsInfo: Array<any>):Promise<void> => {
  const main: HTMLElement = document.querySelector("main")!;
  cardsInfo.forEach(item => {
    const card: HTMLDivElement = document.createElement("div");
    card.classList.add("secondary-container", "secondary-card");
    switch (item.title) {
      case 'Work' :
        card.setAttribute("id", "work");
        break;
      case 'Play' :
        card.setAttribute("id", "play");
        break;
      case 'Study' :
        card.setAttribute("id", "study");
        break;
      case 'Exercise' :
        card.setAttribute("id", "exercise");
        break;
      case 'Social' :
        card.setAttribute("id", "social");
        break;
      case 'Self Care' :
        card.setAttribute("id", "selfCare");
        break;
      default:
        console.log("Data Error");
      }
    const secondaryBottom = document.createElement("div");
    secondaryBottom.classList.add("secondary-card__bottom");
    const contentTop = document.createElement("div");
    contentTop.classList.add("content__top");
    contentTop.appendChild(document.createElement("h2")).textContent = item.title;
    const buttonOption = document.createElement("img");
    buttonOption.src = "./src/images/icon-ellipsis.svg";
    buttonOption.setAttribute('alt', 'options button');
    buttonOption.classList.add("svgColor");
    contentTop.appendChild(buttonOption);
    const contentBottom = document.createElement("div");
    contentBottom.classList.add("content__bottom");
    const hours = document.createElement("p");
    const previous = document.createElement("p");
    hours.textContent = `${item.current}hrs`;
    previous.textContent = `Last Week - ${item.previous}hrs`;
    contentBottom.appendChild(hours);
    contentBottom.appendChild(previous);    

    main.appendChild(card);
    card.appendChild(secondaryBottom);
    secondaryBottom.appendChild(contentTop);
    secondaryBottom.appendChild(contentBottom);
  })
}

const deleteCards = () => {
  const secondaryCards = document.querySelectorAll(".secondary-card");
  secondaryCards.forEach(item => {
    item.remove();
  })
}

const activeMenu = (event: Event) => {
  let activeElement = event.target;
  const menu: NodeListOf<HTMLLIElement> = document.querySelectorAll("#main-card__content-bottom li");
  menu.forEach(item => {
    if(activeElement === item) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  })
}

const sortByTimePeriod = async (period: string): Promise<Array<Object>> => {
  const data: Array<any> = await cardsData();
  const dataSort: { title: string; current: number; previous: number} [] = [];
  data.forEach(item => {
    dataSort.push({ title:    item.title,
                    current:  item.timeframes[period].current,
                    previous: item.timeframes[period].previous
                 })  
  })
  return dataSort;
}

const selectMenu = () => {
  const weeklyButton: HTMLLIElement = document.querySelector('#weeklyButton')!;
  const dailyButton: HTMLLIElement = document.querySelector('#dailyButton')!;
  const monthlyButton: HTMLLIElement = document.querySelector('#monthlyButton')!;

  
  weeklyButton.addEventListener('click', async (event)=> {
    activeMenu(event)
    deleteCards();
    const data =  await sortByTimePeriod("weekly");
    createCards(data);
  })
  dailyButton.addEventListener('click', async (event) => {
    activeMenu(event)
    deleteCards();
    const data = await sortByTimePeriod("daily");
    createCards(data);
  })
  monthlyButton.addEventListener('click', async (event) => {
    activeMenu(event)
    deleteCards();
    const data = await sortByTimePeriod("monthly");
    createCards(data);
  })
}


const initPage = async () => {
  const weeklyButton: HTMLLIElement = document.querySelector('#weeklyButton')!;
  weeklyButton.classList.add("active");
  const data = await sortByTimePeriod("weekly");
  createCards(data);
  selectMenu();
}

initPage();


export {};