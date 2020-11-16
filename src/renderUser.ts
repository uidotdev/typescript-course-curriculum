import { getItem, getUser } from "./api";
import { createStory } from "./createStory";
import { renderLoader } from "./renderLoader";
import { formatDate } from "./utils/formatDate";

export async function renderUser(username: string) {
  const user = await getUser(username);
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  const userTitle = document.createElement("h1");
  userTitle.classList.add("header");
  userTitle.innerText = user.id;
  userContainer.appendChild(userTitle);

  const userInfo = document.createElement("p");
  userInfo.classList.add("meta-info");
  userInfo.appendChild(document.createTextNode("joined "));
  const date = document.createElement("strong");
  date.innerText = formatDate(new Date(user.created * 1000));
  userInfo.appendChild(date);
  userInfo.appendChild(document.createTextNode(" has "));
  const karma = document.createElement("strong");
  karma.innerText = user.karma.toLocaleString();
  userInfo.appendChild(karma);
  userInfo.appendChild(document.createTextNode(" karma"));
  userContainer.appendChild(userInfo);

  const userAbout = document.createElement("p");
  userAbout.innerHTML = user.about || "";
  userContainer.appendChild(userAbout);

  const postsHeader = document.createElement("h2");
  postsHeader.classList.add("posts-header");
  postsHeader.innerText = "Posts";
  userContainer.appendChild(postsHeader);

  const postsContainer = document.createElement("ul");
  userContainer.appendChild(postsContainer);
  postsContainer.appendChild(renderLoader());

  handlePosts(postsContainer, user.submitted);

  return userContainer;
}

async function handlePosts(
  postsContainer: HTMLUListElement,
  postIds: number[]
) {
  const posts = await Promise.all(postIds.slice(0, 30).map(getItem));
  const stories = posts.map(createStory);
  postsContainer.innerHTML = "";
  stories.forEach((story) => {
    if (story) {
      postsContainer.appendChild(story);
    }
  });
}
