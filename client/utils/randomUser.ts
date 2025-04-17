import axios from "axios";

// Predefined pool of good comments (each with at least 10 words)
const comments = [
  "Absolutely loved the experience. I can't wait to watch more!",
  "Great content with stunning visuals and a gripping storyline throughout.",
  "The characters were well developed and the plot kept me hooked.",
  "Impressive work! Every detail was carefully crafted and fun to watch.",
  "A must-watch for anime lovers. It exceeded all my expectations.",
  "From start to finish, it was an emotional and visual rollercoaster.",
  "The voice acting and animation quality were both top notch here.",
  "Truly unique and beautifully animated. I’m recommending it to everyone!",
  "It’s rare to find something so engaging and well put together.",
  "Such a beautiful story told with excellent pacing and stunning visuals.",
];

function getRandomComment() {
  return comments[Math.floor(Math.random() * comments.length)];
}

export async function getRandomUsers() {
  const res = await axios.get('https://randomuser.me/api/?results=3');
  const users = res.data.results;

  return users.map((user: any) => ({
    name: `${user.name.first} ${user.name.last}`,
    photo: user.picture.medium,
    comment: getRandomComment(),
  }));
}
