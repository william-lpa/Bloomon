const Flower = require('./../Models/flower')
const Output = require('./../Output')

const maximumCapacity = 256;
let currentQuantity = 0;
let flowers = {}; //{a:{flower:{name:'a', size:this.size}, quantity:3}}

const getFlowersFromSize = (bouquetSize) => {
  const predicate = (flower) => flower.getSize() === bouquetSize;

  return Object.keys(flowers)
    .filter(prop => predicate(flowers[prop].flower))
    .reduce((comulative, key) => Object.assign(comulative, { [key]: flowers[key] }), {});
}
const enoughSameSizeFlowers = (flowersSameSizeBouquet, requiredQuantity) => {
  let count = 0;
  Object.keys(flowersSameSizeBouquet).forEach(flowerName => {
    count += flowersSameSizeBouquet[flowerName].quantity
  });
  return count >= requiredQuantity;
}
const takeRemainingSameSizeFlowers = (bouquet) => {
  let remainingFlowers = bouquet.remainingFlowers();
  let randomSameSizeFlowers = '';
  Object.keys(getFlowersFromSize(bouquet.getSize())).forEach(flowerName => {
    const flowerQuantity = flowers[flowerName].quantity;
    if (flowerQuantity > 0) {
      if (flowerQuantity >= remainingFlowers) {
        flowers[flowerName].quantity -= remainingFlowers;
        randomSameSizeFlowers += remainingFlowers + flowerName[0];
        return;
      } else {
        remainingFlowers -= flowerQuantity;
        flowers[flowerName].quantity = 0;
        randomSameSizeFlowers += flowerQuantity + flowerName[0];
      }
    }
  });
  currentQuantity -= bouquet.remainingFlowers();
  return randomSameSizeFlowers;
}
const Storage = {

  getFlowersFromSize: getFlowersFromSize,
  addFlowerInput: (textInput) => {

    if (!textInput || textInput.length !== 2) return; //validation

    const name = textInput[0];
    const size = textInput[1];

    if (size !== 'S' && size !== 'L') return; //validation

    const flower = new Flower(name, size);
    const quantity = flowers[textInput] ? flowers[textInput].quantity + 1 : 1;
    ++currentQuantity;

    flowers[textInput] = { flower, quantity };
  },
  canProduceBouquet: (bouquet) => {
    if (currentQuantity < bouquet.getTotalQuantity())
      return false; // not enough flowers in the storage

    const flowersSameSizeBouquet = getFlowersFromSize(bouquet.getSize());

    if (!enoughSameSizeFlowers(flowersSameSizeBouquet, bouquet.getTotalQuantity()))
      return false;// not enough flowers with the same size of bouquet in the storage

    // check if storage has the required quantity of each flower on the bouquet
    return bouquet.requiredFlowers.every((flowerBouquetObj) => {
      const bouquetFlower = flowerBouquetObj.flower;
      const storageFlower = flowersSameSizeBouquet[bouquetFlower.getName() + bouquetFlower.getSize()];

      if (!storageFlower) return false;

      return storageFlower.quantity >= flowerBouquetObj.quantity ?
        true : false;
    });
  },
  produceBouquet: (bouquet) => {
    bouquet.requiredFlowers.forEach((bouquetFlowerObj) => {
      const flower = bouquetFlowerObj.flower;
      const key = flower.getName() + flower.getSize();
      const quantity = flowers[key].quantity;

      currentQuantity -= bouquetFlowerObj.quantity;
      flowers[key].quantity = quantity - bouquetFlowerObj.quantity;
    });
    const remainingFlowers = takeRemainingSameSizeFlowers(bouquet);
    Output.promptBouquet(bouquet, remainingFlowers)
  },
  isFull: () => currentQuantity === maximumCapacity,
}

module.exports = Storage;


