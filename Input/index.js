const Storage = require('./../StorageCapacity');
const Bouquet = require('./../Models/bouquet');
const Output = require('./../Output');
const bouquetRules = [];

const Input = {
  addFlowerInput: (textInput) => {

    Storage.addFlowerInput(textInput);

    Array.isArray(bouquetRules) &&
      bouquetRules.forEach(bouquet => {
        Storage.canProduceBouquet(bouquet) &&
          Storage.produceBouquet(bouquet);
      });
  },

  assertIfStorageIsFull: () => {
    if (Storage.isFull()) {
      Output.promptHalt();
      return true;
    }
  },

  addBouquetRule: (textInput) => {
    bouquetRules.push(new Bouquet(textInput));
  }
}


module.exports = Input;