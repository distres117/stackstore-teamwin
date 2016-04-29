
var categories = require('./categories'),
  Product = require('mongoose').model('Product');

function seed(cat){
    var root = '/images/products/lightsabers/';
    var data = [
     {
       name: 'Standard Single-Blade',
       description: 'The lightsaber, sometimes referred to as a laser sword, was a weapon used by the Jedi and the Sith. Lightsabers consisted of a plasma blade, powered by a kyber crystal and usually emitted from a metallic hilt. It was a weapon that required skill and training, and was greatly enhanced when used in conjunction with the Force. Though also used by the Sith, the lightsaber was synonymous with the Jedi, with some in the galaxy believing only Jedi used lightsabers. \n Available colors: blue, green, purple, red, white',
       price: 199,
       quantity: 10,
       category: [cat.jedi, cat.sith, cat.lightsabers],
       imageUrl: [root + 'single_blade.png'],
       stars: 5
     },
     {
       name: 'Double-bladed',
       description: 'The double-bladed lightsaber,also known as the saberstaff, was a lightsaber variant that featured a blade emitted from both ends.',
       price: 399,
       quantity: 7,
       category: [cat.sith, cat.lightsabers],
       imageUrl: [root + 'double_blade.jpg'],
       stars: 3
     },
     {
       name: 'Lightsaber Pike',
       description: 'The lightsaber pike was a lightsaber variant similar to the double-bladed lightsaber, featuring two rare yellow plasma blades on each side of the staff, that was used by the Jedi Temple Guard.',
       price: 499,
       quantity: 10,
       category: [cat.jedi, cat.lightsabers],
       imageUrl: [root + 'pike.jpg'],
       stars: 2
     },
     {
       name: 'Blaster-Hybrid',
       description: 'Ezras lightsaber was the personal, prototype lightsaber of Ezra Bridger, a Padawan and rebel who lived in the years prior to the Battle of Yavin. Bridger spent several weeks building his lightsaber after receiving a kyber crystal in the Jedi Temple on Lothal.',
       price: 299,
       quantity: 7,
       category: [cat.jedi, cat.blasters, cat.lightsabers],
       imageUrl: [root + 'hybrid.jpg'],
       stars: 2
     },
     {
       name: 'Crossguard',
       description: 'The crossguard lightsaber was an ancient lightsaber design that dated back to the Great Scourge of Malachor. It typically emitted three blades, a primary blade and two raw power vents known as quillons. ',
       price: 399,
       quantity: 5,
       category: [cat.sith, cat.lightsabers],
       imageUrl: [root + 'cross_guard.png'],
       stars: 4
     }
   ];
   console.log('seeding lightsabers...');
   return Product.insertMany(data);

}

module.exports = seed;
