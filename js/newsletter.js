document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletter-email");
      const email = emailInput.value;

      if (email) {
        const subscribers = JSON.parse(
          localStorage.getItem("subscribers") || "[]"
        );
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem("subscribers", JSON.stringify(subscribers));
          emailInput.value = "";
          alert("Successfully subscribed!");
        } else {
          alert("You are already subscribed to our newsletter.");
        }
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});
