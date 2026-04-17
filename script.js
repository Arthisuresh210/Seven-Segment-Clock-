const digitMap = {
  0:["a","b","c","d","e","f"],
  1:["b","c"],
  2:["a","b","g","e","d"],
  3:["a","b","g","c","d"],
  4:["f","g","b","c"],
  5:["a","f","g","c","d"],
  6:["a","f","g","c","d","e"],
  7:["a","b","c"],
  8:["a","b","c","d","e","f","g"],
  9:["a","b","c","d","f","g"]
};

class Digit {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = "digit";
    this.segments = {};

    ["a","b","c","d","e","f","g"].forEach(seg => {
      const div = document.createElement("div");
      const type = ["a","d","g"].includes(seg) ? "horizontal" : "vertical";
      div.className = `segment ${type} seg-${seg}`;
      this.el.appendChild(div);
      this.segments[seg] = div;
    });
  }

  setNumber(num) {
    const active = digitMap[num];
    Object.keys(this.segments).forEach(seg => {
      this.segments[seg].classList.toggle("on", active.includes(seg));
    });
  }
}

const clock = document.getElementById("clock");
const digits = [];

for (let i = 0; i < 6; i++) {
  const d = new Digit();
  digits.push(d);
  clock.appendChild(d.el);

  if (i === 1 || i === 3) {
    const colon = document.createElement("div");
    colon.className = "colon";
    colon.textContent = ":";
    clock.appendChild(colon);
  }
}

function updateClock() {
  const now = new Date();

  const time = [
    Math.floor(now.getHours()/10),
    now.getHours()%10,
    Math.floor(now.getMinutes()/10),
    now.getMinutes()%10,
    Math.floor(now.getSeconds()/10),
    now.getSeconds()%10
  ];

  time.forEach((num, i) => digits[i].setNumber(num));
}

updateClock();
setInterval(updateClock, 1000);
