const cardsData = async ():Promise<Object> => {
  const url = './src/data.json';
  const response = await fetch(url, {
    method: 'GET',
  })
  return response.json();
}

cardsData();

export {};