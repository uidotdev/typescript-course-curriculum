let colorMode = "light";

export function renderLayout() {
  const layout = document.createElement("div");
  layout.id = "layout";
  layout.classList.add("container");

  const nav = document.createElement("nav");
  nav.classList.add("row");
  nav.classList.add("space-between");
  layout.appendChild(nav);

  const navList = document.createElement("ul");
  navList.classList.add("row");
  navList.classList.add("nav");
  nav.appendChild(navList);

  const topItem = document.createElement("li");
  navList.appendChild(topItem);
  const topLink = document.createElement("a");
  topLink.innerText = "Top";
  topLink.classList.add("active");
  topLink.classList.add("nav-link");
  topLink.href = "#";
  topLink.addEventListener("click", () =>
    document.dispatchEvent(new Event("topLink"))
  );
  topItem.appendChild(topLink);

  const newItem = document.createElement("li");
  navList.appendChild(newItem);
  const newLink = document.createElement("a");
  newLink.innerText = "New";
  newLink.classList.add("nav-link");
  newLink.href = "#";
  newLink.addEventListener("click", () =>
    document.dispatchEvent(new Event("newLink"))
  );
  newItem.appendChild(newLink);

  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerText = "🔦";
  darkModeToggle.classList.add("btn-clear");
  darkModeToggle.style.fontSize = "30px";

  darkModeToggle.addEventListener("click", () => {
    if (colorMode === "light") {
      colorMode = "dark";
      document.body.classList.add("dark");
      darkModeToggle.innerText = "💡";
    } else {
      colorMode = "light";
      document.body.classList.remove("dark");
      darkModeToggle.innerText = "🔦";
    }
  });

  nav.appendChild(darkModeToggle);

  const mainContent = document.createElement("main");
  layout.appendChild(mainContent);

  // Add event listeners for updating our styles
  document.addEventListener("topLink", () => {
    newLink.classList.remove("active");
    topLink.classList.add("active");
  });
  document.addEventListener("newLink", () => {
    newLink.classList.add("active");
    topLink.classList.remove("active");
  });

  return { layout, mainContent };
}
