const healthQuotes = [
  "The greatest wealth is health...",
  "Your health is an investment, not an expense...",
  "The first wealth is health...",
  "Take care of your body. It's the only place you have to live...",
  "Health is not valued till sickness comes...",
  "Let food be thy medicine, and medicine be thy food...",
  "Your body hears everything your mind says...",
  "Healthy living is a journey, not a destination...",
  "A healthy outside starts from the inside...",
  "Good health is not something we can buy...",
];

let i = 0;
const q = document.getElementById("rotating-quote");

function rotateQuote() {
  q.style.opacity = "0";

  setTimeout(() => {
    i = (i + 1) % healthQuotes.length;
    q.textContent = healthQuotes[i];
    q.style.opacity = "1";
  }, 500);
}

if (q) {
  q.textContent = healthQuotes[0];
  setInterval(rotateQuote, 6000);
}
