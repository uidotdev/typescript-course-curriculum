import { getItem } from "./api";
import { createStory } from "./createStory";
import { formatDate } from "./utils/formatDate";

export async function renderComments(storyId: number) {
  const story = await getItem(storyId);
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments-container");

  const storyMarkup = createStory(story);

  if (storyMarkup) {
    commentsContainer.appendChild(storyMarkup);
  }

  const comments = await Promise.all(
    story.kids.slice(0, 30).map(renderComment)
  );

  comments.forEach((comment) => {
    commentsContainer.appendChild(comment);
  });
  return commentsContainer;
}

async function renderComment(id: number) {
  const story = await getItem(id);
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");

  const commentTagline = document.createElement("p");
  commentTagline.classList.add("meta-info");
  commentTagline.appendChild(document.createTextNode("by "));

  const authorLink = document.createElement("a");
  authorLink.href = "#";
  authorLink.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent<{ user: string }>("user", { detail: { user: story.by } })
    );
  });
  authorLink.innerText = story.by;
  commentTagline.appendChild(authorLink);

  commentTagline.appendChild(
    document.createTextNode(` on ${formatDate(new Date(story.time * 1000))}`)
  );
  commentContainer.appendChild(commentTagline);

  const comment = document.createElement("div");
  comment.classList.add("comment-text");
  comment.innerHTML = story.text;
  commentContainer.appendChild(comment);

  return commentContainer;
}
