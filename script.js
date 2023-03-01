const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const blob = document.querySelector("#blob");

document.querySelectorAll(".cypher").forEach(element => {
  let intervalId = null;
  element.addEventListener("mouseover", event => {
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
});


document.querySelector("main").addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;

  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000 });
});


const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) console.log(entry.target);
    entry.target.classList[entry.isIntersecting ? "add" : "remove"]("active");
    document
      .querySelector(`[href="#${entry.target.id}"]`)
      .parentNode
      .classList[entry.isIntersecting ? "add" : "remove"]("active");
  });

});
document.querySelectorAll("main>section").forEach(section => intersectionObserver.observe(section));