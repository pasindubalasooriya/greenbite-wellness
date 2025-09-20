const quotes = [
  "The greatest wealth is health",
  "Your health is an investment, not an expense",
  "The first wealth is health",
  "Take care of your body. It's the only place you have to live",
  "Let food be thy medicine, and medicine be thy food",
  "Healthy living is a journey, not a destination",
  "A healthy outside starts from the inside",
  "Your body hears everything your mind says",
  "Health is not valued till sickness comes",
  "Good health is not something we can buy",
];

const tips = [
  "Drink 8 glasses of water daily to stay hydrated and boost metabolism.",
  "Include colorful vegetables in every meal for a variety of nutrients.",
  "Take a 10-minute walk after each meal to aid digestion.",
  "Practice deep breathing for 5 minutes to reduce stress.",
  "Get 7-9 hours of quality sleep for better recovery and mental clarity.",
  "Stretch for 10 minutes after waking up to improve flexibility.",
  "Replace sugary drinks with green tea or water with lemon.",
  "Take regular breaks from screen time to protect your eyes.",
  "Include protein in your breakfast to stay fuller longer.",
  "Practice mindful eating by avoiding distractions during meals.",
];

function getDailyHealthTip() {
  const today = new Date();
  const day = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const i = day % tips.length;
  return tips[i];
}

document.addEventListener("DOMContentLoaded", () => {
  const tipEl = document.getElementById("health-tip");
  if (tipEl) {
    const dailyTip = getDailyHealthTip();
    tipEl.textContent = dailyTip;
  }
});

let i = 0;
const q = document.getElementById("rotating-quote");

function rotateQuote() {
  q.style.opacity = "0";

  setTimeout(() => {
    i = (i + 1) % quotes.length;
    q.textContent = quotes[i];
    q.style.opacity = "1";
  }, 500);
}

if (q) {
  q.textContent = quotes[0];
  setInterval(rotateQuote, 6000);
}
