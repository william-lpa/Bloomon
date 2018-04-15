const Flower = require('./flower')

function Bouquet(rule) { //AS3a4b6k20
  this.design = rule[0];
  this.size = rule[1];
  this.totalQuantity = undefined;
  this.currentQuantity = undefined;
  this.requiredFlowers = []; //[{flower:{name:'a', size:this.size}, quantity:3}]

  this.getDesign = () => this.design;
  this.getSize = () => this.size;
  this.getTotalQuantity = () => this.totalQuantity;
  this.remainingFlowers = () => this.totalQuantity - this.currentQuantity;

  this.extractFlowers = (flowersText) => { // flowers rules, from 3º char 3a4b6k20
    //could be done with regex as well
    this.totalQuantity = +flowersText.split('').reduce((comulative, currentChar, index) => {

      if (!Number.isInteger(+currentChar)) {
        const flower = new Flower(currentChar, this.size);
        this.requiredFlowers.push({ flower, quantity: parseInt(comulative, 10) });
        comulative = ''; //take next quantity and flower
        return comulative;
      }
      return (comulative + currentChar);
    });
  };

  this.countFlowerQuantity = () => {
    this.currentQuantity = this.requiredFlowers.reduce((sum, current) => current.quantity + sum, 0);
  }

  this.extractFlowers(rule.substring(2));
  this.countFlowerQuantity();
}

Bouquet.prototype.toString = function () {//AS3a4b6k20
  let bouquetName = this.getDesign() + this.getSize()

  const flowers = this.requiredFlowers.map(flowerObj => {
    return flowerObj.quantity + flowerObj.flower.getName();
  }).join('');
  return bouquetName + flowers;
}

module.exports = Bouquet;
