"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { query } = require("express");

const commonGreetings = ["hi", "hello", "howdy"];
const commonGoodbyes = ["goodbye", "farewell", "adios", "see you", "bye"];
const jokes = [
  "What do you call the 2nd time you ride a bike? Recycling",
  "My son proudly showed me his report card and shouted, 'Dad, I’m so happy! I got a B in reading!' I sighed, 'That’s a D, idiot.'",
  "I didn’t know how much cookies shaped like integers cost, but I crunched the numbers",
];
let botMsg = "";
const getBotMessage = (text) => {
  const userTxt = text.replace(/[!&\/\\#,+()$~%.'":*?<>{}]/g, "");
  console.log(userTxt);
  if (botMsg === "Wanna hear a joke?") {
    if (userTxt === "YES") {
      botMsg = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (userTxt === "NO") {
      botMsg = "Too bad...";
    } else botMsg = "bzzt";
  } else if (commonGreetings.includes(userTxt.toLowerCase())) {
    botMsg = "Hello!";
  } else if (commonGoodbyes.includes(userTxt.toLowerCase())) {
    botMsg = "Goodbye!";
  } else if (userTxt === "something funny") {
    botMsg = "Wanna hear a joke?";
  } else botMsg = "bzzt";
  return botMsg;
};

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to  above this line
  // ---------------------------------
  // add new endpointsmodify here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line
  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const reply = messages[Math.floor(Math.random() * 6)];
    const message = { author: "monkey", text: reply };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.text };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
    console.log(req.query);
  })
  .get("/bot-message", (req, res) => {
    const reply = getBotMessage(req.query.text);
    const message = { author: "bot", text: reply };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
