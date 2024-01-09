const getRadioStations = async (country: string) => {
  const countryName = await country;

  const url = `https://bando-radio-api.p.rapidapi.com/stations/bycountry/${countryName}?hidebroken=true&offset=0&limit=10`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "25da82fdfamsh37df17c7fe82ef4p15bba3jsnbe357327ece7",
      "X-RapidAPI-Host": "bando-radio-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getRadioStations;
