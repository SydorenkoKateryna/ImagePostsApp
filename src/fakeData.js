// fake data to create markup and styles

export const FAKEDATA = [
  {
    id: 1,
    image: require("../assets/fakeData/forest.jpg"),
    title: "Ліс",
    comments: 0,
    likes: 153,
    location: {
      country: "Ukraine",
      region: "Ivano-Frankivs'k Region",
    },
    geolocation: {
      latitude: 50.450001,
      longitude: 30.523333,
    },
  },
  {
    id: 2,
    image: require("../assets/fakeData/sunset.jpg"),
    title: "Захід на Чорному морі",
    comments: 3,
    likes: 0,
    location: {
      country: "Ukraine",
      region: "Some Another Region",
    },
    geolocation: {
      latitude: 49.842957,
      longitude: 24.031111,
    },
  },
  {
    id: 3,
    image: require("../assets/fakeData/house.jpg"),
    title: "Старий будиночок у Венеції",
    comments: 50,
    likes: 200,
    location: {
      country: "Italy",
      region: "Some Another Region",
    },
    // geolocation: {
    //   latitude: 0,
    //   longitude: 0,
    // },
  },
];
