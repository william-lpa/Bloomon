
const Output = {
  promptBouquet: (bouquet, randonFlowers) => {
    console.log('Here it follows a new bouquet, enjoy it! :)');
    console.log(bouquet.toString() + randonFlowers);
  },
  promptHalt: () => console.log('Storage is full, application will halt')
}
module.exports = Output;