import { timeTrackingData, timeDataSort } from './interface';


const cardsData = async ():Promise<Array<timeTrackingData>> => {
  const url = '/data.json';
  const response = await fetch(url, {
    "method": 'GET',
  })
  return response.json();
}

const createCards = async (cardsInfo: Array<timeDataSort>):Promise<void> => {
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
    contentTop.appendChild(document.createElement("h1")).textContent = item.title;
    const buttonOption = document.createElement("img");
    const imgURL = new URL('/icon-ellipsis.svg', import.meta.url).href;
    buttonOption.src = imgURL;
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

const updateCards = (period: string ,data: Array<timeDataSort>) => {
  const current = document.querySelectorAll(".content__bottom :first-child");
  const previous = document.querySelectorAll(".content__bottom :not(:first-child)");

  let previousSentence;

  switch (period) {
    case 'weekly':
      previousSentence = 'Last Week';
      break;
    case 'monthly':
      previousSentence = 'Last Month';
      break;
    case 'daily':
      previousSentence = 'Yesterday';
      break;
    default:
      previousSentence = 'unknown period';
  }
  
  for (let i = 0; i < current.length; i++) {
    current[i].textContent = data[i].current + "hrs";
    previous[i].textContent = previousSentence + " - " + data[i].previous + "hrs";
  }
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

const sortByTimePeriod = async (period: string): Promise<Array<timeDataSort>> => {
  const data: timeTrackingData[] = await cardsData();
  let dataSort: { title: string; current: number; previous: number } [] = [];
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
    const data =  await sortByTimePeriod("weekly");
    updateCards("weekly", data);
  })
  dailyButton.addEventListener('click', async (event) => {
    activeMenu(event)
    const data = await sortByTimePeriod("daily");
    updateCards("daily", data);
  })
  monthlyButton.addEventListener('click', async (event) => {
    activeMenu(event)
    const data = await sortByTimePeriod("monthly");
    updateCards("monthly", data);
  })
}


const initPage = async () => {
  const weeklyButton: HTMLLIElement = document.querySelector('#weeklyButton')!;
  weeklyButton.classList.add("active");
  const data: timeDataSort[] = await sortByTimePeriod("weekly");
  createCards(data);
  selectMenu();
}

initPage();


export {};