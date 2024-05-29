import { fetchWorks } from "./utils";
import type { Work } from "./works";

const createWorkCard = (() => {
  const workCardTemplate = document.querySelector(
    "#work-card-template"
  ) as HTMLTemplateElement;
  const iconTemplate = document.querySelector(
    "#icon-template"
  ) as HTMLTemplateElement;

  return function (work: Work): HTMLElement {
    const workCard = (
      workCardTemplate.content.cloneNode(true) as DocumentFragment
    ).querySelector(".work-card") as HTMLElement;

    workCard.classList.add(work.type);
    workCard.querySelector("h2")!.textContent = work.title;
    workCard.querySelector(".project-type")!.textContent = work.type;
    workCard.querySelector("main>p")!.textContent = work.description!;
    workCard.querySelector(".license>span")!.textContent = work.license!;

    if (work.imageURL) {
      const image = document.createElement("img");
      image.src = work.imageURL;
      workCard.querySelector("header")!.prepend(image);
    }

    const workLinks = [
      { type: "github", url: `https://github.com/haroun-b/${work.repoName}` }
    ];
    if (work.links?.length) {
      workLinks.push(...work.links);
    }

    const linksContainer = workCard.querySelector(".links")!;
    for (const link of workLinks) {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";

      const icon = iconTemplate.content.cloneNode(true) as HTMLElement;
      icon.querySelector("use")!.setAttribute("href", `#${link.type}-icon`);

      a.append(icon);
      linksContainer.append(a);
    }

    const langsRatioEl = workCard.querySelector(".tech-stack>.ratio")!;
    const langsLegendEl = workCard.querySelector(".tech-stack>.legend")!;
    const langsTotal = Object.values(work.languages!).reduce(
      (total, v) => total + v,
      0
    );

    for (const lang in work.languages) {
      const ratio = ((work.languages[lang] / langsTotal) * 100).toFixed(2);

      const ratioEl = document.createElement("span");
      const legendEl = document.createElement("span");

      const langLower = lang.toLowerCase();

      ratioEl.className = langLower;
      ratioEl.style.width = `${ratio}%`;
      langsRatioEl.append(ratioEl);

      legendEl.className = langLower;
      legendEl.textContent = lang;
      legendEl.dataset.ratio = ratio;
      langsLegendEl.append(legendEl);
    }

    return workCard;
  };
})();

async function displayWorks() {
  const workContainers = {
    projects: document.querySelector("#projects>.container")!,
    events: document.querySelector("#events>.container")!
  };

  for (const work of await fetchWorks()) {
    workContainers[work.type === "event" ? "events" : "projects"].append(
      createWorkCard(work)
    );
  }
}

function initTabsAndCheckboxes() {
  const workScreen = document.querySelector("#works") as HTMLElement;
  const tabsInputs = document.querySelectorAll(
    'input[name="tab"]'
  ) as NodeListOf<HTMLInputElement>;

  tabsInputs.forEach((input) => {
    input.addEventListener("change", ({ target }) => {
      workScreen.dataset.tab = (target as HTMLInputElement).value;
    });
  });

  const projectsScreen = document.querySelector("#projects") as HTMLElement;
  const projectsFilterCheckboxes = document.querySelectorAll(
    "#projects>.filters input[type=checkbox]"
  ) as NodeListOf<HTMLInputElement>;

  projectsFilterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;

      projectsScreen.classList[target.checked ? "add" : "remove"](target.name);
    });
  });
}

function initIntersectionObserver() {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList[entry.isIntersecting ? "add" : "remove"]("active");
      (
        document.querySelector(`[href="#${entry.target.id}"]`)!
          .parentNode as HTMLElement
      ).classList[entry.isIntersecting ? "add" : "remove"]("active");
    });
  });
  document
    .querySelectorAll(".screen")
    .forEach((section) => intersectionObserver.observe(section));
}

function updateCopyYear() {
  document.querySelector("#c-year")!.textContent = new Date()
    .getFullYear()
    .toString();
}

function main() {
  updateCopyYear();
  initIntersectionObserver();
  initTabsAndCheckboxes();
  displayWorks();
}
main();
