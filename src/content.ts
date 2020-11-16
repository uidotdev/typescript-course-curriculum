import { getStories, getUser, getItem, Story, User } from "./api";
import { createStory } from "./createStory";
import { renderUser } from "./renderUser";
import { renderLoader } from "./renderLoader";
import { renderComments } from "./renderComments";

// This replaces browser routes
let contentState: "top" | "new" | "user" | "comments" = "top";
let username: string;
let storyId: number;

async function renderPage(mainContent: HTMLElement) {
  mainContent.innerHTML = "";
  mainContent.appendChild(renderLoader());

  if (contentState === "top" || contentState === "new") {
    const stories = await renderStories(contentState);
    mainContent.innerHTML = "";
    const postsContainer = document.createElement("ul");
    mainContent.appendChild(postsContainer);
    stories.forEach((story) => {
      if (story) {
        postsContainer.appendChild(story);
      }
    });
  }

  if (contentState === "user") {
    mainContent.innerHTML = "";
    mainContent.appendChild(await renderUser(username));
  }
  if (contentState === "comments") {
    mainContent.innerHTML = "";
    mainContent.appendChild(await renderComments(storyId));
  }
}

async function renderStories(which: "top" | "new") {
  const posts = await getStories(which);
  const stories = posts.map(createStory);
  return stories;
}
export function renderContent(mainContent: HTMLElement) {
  renderPage(mainContent);

  document.addEventListener("topLink", () => {
    contentState = "top";
    renderPage(mainContent);
  });
  document.addEventListener("newLink", () => {
    contentState = "new";
    renderPage(mainContent);
  });

  document.addEventListener("comments", (event) => {
    const { story } = (event as CustomEvent<{ story: number }>).detail;
    contentState = "comments";
    storyId = story;
    renderPage(mainContent);
  });
  document.addEventListener("user", (event) => {
    const { user } = (event as CustomEvent<{ user: string }>).detail;
    contentState = "user";
    username = user;
    renderPage(mainContent);
  });
}
