type Work = {
  type: "cli" | "web" | "extension" | "event";
  title: string;
  repoName: string;
  imageURL?: string;
  links?: Array<{
    type: "web" | "firefox" | "chrome";
    url: string;
  }>;
  license?: string;
  description?: string;
  languages?: Record<string, number>;
};

const works: Work[] = [
  {
    type: "cli",
    title: "JPEG To XLSX",
    repoName: "jpeg-to-xlsx"
  },
  {
    type: "extension",
    title: "iframe Resizer",
    repoName: "iframe-resizer",
    imageURL:
      "https://raw.githubusercontent.com/haroun-b/iframe-resizer/master/source-code/chrome-extension/icons/iframe-resizer-128.png",
    links: [
      {
        type: "firefox",
        url: "https://addons.mozilla.org/en-US/firefox/addon/iframe-resizer/"
      },
      {
        type: "chrome",
        url: "https://chromewebstore.google.com/detail/iframe-resizer/jdfdmgobnadbdnobioaegopmeooolljo"
      }
    ]
  },
  {
    type: "extension",
    title: "F_U Paste Me",
    repoName: "f_u-paste-me",
    imageURL:
      "https://raw.githubusercontent.com/haroun-b/f_u-paste-me/main/src/icons/f_u-paste-me-128.png",
    links: [
      {
        type: "firefox",
        url: "https://addons.mozilla.org/en-GB/firefox/addon/f_u-paste-me/"
      },
      {
        type: "chrome",
        url: "https://chromewebstore.google.com/detail/fu-paste-me/hfdmdffnljpbadookgmcclooanphdnkl"
      }
    ]
  },
  {
    type: "web",
    title: "PacMan On The Grid",
    repoName: "pacman-on-the-grid",
    imageURL:
      "https://raw.githubusercontent.com/haroun-b/pacman-on-the-grid/f6601efe3d7f1a12e7041775429a488f45f84641/resources/sprites/pacman/pacman-2.svg",
    links: [
      {
        type: "web",
        url: "https://haroun-b.github.io/pacman-on-the-grid"
      }
    ]
  },
  {
    type: "event",
    title: "Intro to JavaScript",
    repoName: "workshop-2404"
  },
  {
    type: "event",
    title: "Intro to WebDev",
    repoName: "intro-to-webdev"
  }
];

export type { Work };
export { works };
