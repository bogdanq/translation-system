const fs = require("fs");
const readline = require("readline");
const { createEvent, createStore } = require("effector");

const reset = createEvent();
const setWords = createEvent();
const matchesWords = createStore([]);

matchesWords.on(setWords, (state, word) => [...state, word]).reset(reset);

const file = "./file.txt";

const rl = readline.createInterface({
  input: fs.createReadStream(file),
  output: process.stdout,
  terminal: false,
});

let prev = "";

function getDiffSource(lineWithTrim) {
  if (lineWithTrim.match(/diff/)) {
    prev = lineWithTrim;
    return lineWithTrim;
  }

  return prev;
}

rl.on("line", function (line) {
  const result = line
    .split("")
    .filter((i) => i !== "\u0000")
    .join("");

  const diffSoure = getDiffSource(result);

  if (result[0] === "+" && result.match(/__/)) {
    const [matches] = result.match(/("(.*?)")/);

    setWords({ word: matches, source: diffSoure });
  }
});

rl.on("close", () => {
  // тут сохранить массив слов в бд
  console.log("close", matchesWords.getState());

  reset();
  prev = "";
});

fs.unlink("./target.txt", function (err) {});
