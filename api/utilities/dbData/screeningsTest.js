const fs = require("fs");
const auditoria = [
  {
    name: "Queen Salon",
    seats: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: "King Salon",
    seats: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
];
const movies = require("./movieInfoFromDB.json");
const dates = [
  "2022-03-18",
  "2022-03-19",
  "2022-03-20",
  "2022-03-21",
  "2022-03-22",
  "2022-03-23",
  "2022-03-24",
  "2022-03-25",
  "2022-03-26",
  "2022-03-27",
  "2022-03-28",
  "2022-03-29",
  "2022-03-30",
  "2022-03-31",
  "2022-04-01",
  "2022-04-02",
  "2022-04-03",
  "2022-04-04",
  "2022-04-05",
  "2022-04-06",
  "2022-04-07",
  "2022-04-08",
  "2022-04-09",
  "2022-04-10",
];
const startTimes = [
  ["15:10", "18:00", "21:00"],
  ["15:00", "18:00", "21:10"],
  ["15:00", "19:00", "21:00"],
];
const selectRandom = (max) => {
  return Math.floor(Math.random() * max);
};
const screenings = [];
dates.forEach((date) => {
  const times = startTimes[selectRandom(3)];
  times.forEach((time) => {
    screenings.push({
      startTime: date + "T" + time,
    });
  });
});
screenings.forEach((screening, i) => {
  if (
    screening.startTime.includes("21:00") &&
    screenings[i - 1].startTime.includes("19:00")
  ) {
    screenings[i - 1].auditoriumName === "Queen Salon"
      ? (screening.auditoriumName = "King Salon")
      : (screening.auditoriumName = "Queen Salon");
  } else {
    screening.auditoriumName = auditoria[selectRandom(2)].name;
  }
  screening.auditoriumName === "Queen Salon"
    ? (screening.seats = auditoria[0].seats)
    : (screening.seats = auditoria[1].seats);
});
screenings.forEach((screening) => {
  let randomNumber = selectRandom(20);
  screening.movieId = movies[randomNumber].movieId;
  screening.price = movies[randomNumber].price;
});
console.log(screenings);
let data = JSON.stringify(screenings);
fs.writeFileSync("screenings.json", data);
