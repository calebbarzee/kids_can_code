// Variables to set
const name = "John Doe";
const title = "Welcome to John's Page!";
const favoriteThings = ["Reading", "Playing Soccer", "Coding"];
const backgroundImage = "https://example.com/path-to-background-image.jpg";

// Setting the variables to the webpage
document.getElementById('name').textContent = name;
document.getElementById('title').textContent = title;
document.getElementById('favorites').textContent = "Favorite Things: " + favoriteThings.join(", ");
document.body.style.backgroundImage = `url(${backgroundImage})`;
