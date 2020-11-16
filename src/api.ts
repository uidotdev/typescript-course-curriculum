const TOP_POSTS_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const NEW_POSTS_URL = "https://hacker-news.firebaseio.com/v0/newstories.json";
const USER_URL_BASE = "https://hacker-news.firebaseio.com/v0/user/";
const STORY_URL_BASE = "https://hacker-news.firebaseio.com/v0/item/";

function getStoryUrl(story: number) {
  return `${STORY_URL_BASE}${story}.json`;
}
function getUserUrl(username: string) {
  return `${USER_URL_BASE}${username}.json`;
}

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  text: string;
  type: "story" | "comment" | "job" | "poll";
  url: string;
}

export interface User {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}

let itemCache: { [itemId: number]: Story } = {};

export async function getItem(id: number): Promise<Story> {
  if (itemCache[id]) return itemCache[id];
  const item = await (await fetch(getStoryUrl(id))).json();
  itemCache[id] = item;
  return item;
}

export async function getStories(which: "top" | "new") {
  const url = which === "top" ? TOP_POSTS_URL : NEW_POSTS_URL;

  const postIDs: number[] = await (await fetch(url)).json();

  return Promise.all(postIDs.slice(0, 30).map(getItem));
}

export async function getComments(storyId: number) {
  const story = await getItem(storyId);

  const comments = story.kids.slice(0, 30).map((id) => getItem);
  return Promise.all(comments);
}

let userCache: { [username: string]: User } = {};

export async function getUser(username: string) {
  if (userCache[username]) return userCache[username];
  const user: User = await (await fetch(getUserUrl(username))).json();
  userCache[username] = user;
  return user;
}
