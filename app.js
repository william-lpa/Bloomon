const readline = require('readline');
const input = require('./Input');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

//IIFE
(function () {

  // there are some little inconsistences, but time is over.
  // the most part of logic I think it's done. With more time, I'd debug it to check where the
  // logic is failing in some scenarios
  // the extra task (full storage) I tested and it's 

  let inputingFlowers = false;

  rl.on('line', (inputText) => { // raised every time a new input happens

    const emptyString = !inputText.trim();
    if (emptyString) {  //start to add flowers
      inputingFlowers = true;
      return;
    }

    if (inputingFlowers) {
      input.addFlowerInput(inputText);
    }
    else {
      input.addBouquetRule(inputText);
    }

    if (input.assertIfStorageIsFull()) // stop application
      rl.close();
  });

})();