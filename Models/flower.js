function Flower(name, size) { //bL
  this.name = name;
  this.size = size;

  this.getName = () => this.name;
  this.getSize = () => this.size;
}

module.exports = Flower;