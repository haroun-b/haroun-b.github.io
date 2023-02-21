const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let intervalId = null;


document.querySelector(".cypher").addEventListener("mouseover", event => {
  if (intervalId) return;

  const ogText = event.target.textContent;
  let iteration = 0;

  intervalId = setInterval(() => {
    event.target.textContent = event.target.textContent
      .split("")
      .map((letter, index) => {
        const ogChar = ogText[index];
        if (index < iteration || !alphabet.includes(ogChar.toUpperCase())) {
          return ogChar;
        }

        return alphabet[Math.floor(Math.random() * alphabet.length)];
      })
      .join("");

    if (iteration >= ogText.length) {
      clearInterval(intervalId);
      intervalId = null;
    }

    iteration += 1 / 3;
  }, 30);
});