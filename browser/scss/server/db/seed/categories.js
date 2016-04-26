var mongoose = require('mongoose'),
  Promise = require('bluebird');

var Category = mongoose.model('Category');
var categories;

function getCategories(){
  var root = '/images/categories/';
  return Promise.join(
        Category.create({
          name: 'Lightsabers',
          description: 'Though it is unknown when the first lightsaber was created, it is known they were in use thousands of years before the First Order-Resistance conflict, in the Great Scourge of Malachor. They were also used in the Battles of Rashfond and the Peacekeeping of Parliock.',
          imageUrl: root + 'lightsabers-category.jpg'
        }),

        Category.create({
          name: 'Blasters',
          description: 'A blaster was a ranged weapon that fired bursts of particle beam energy called blaster bolts from a replaceable power pack.',
          imageUrl: root + 'blasters_category.jpg'
        }),
        Category.create({
          name: 'Jedi',
          description: 'A Jedi was a member of the Jedi Order, who studied, served and used the mystical energies of the Force; usually, the light side of the Force. The weapon of the Jedi was the lightsaber, a weapon with a blade made of pure energy. The Jedi fought for peace and justice in the Galactic Republic, usually against their mortal enemies, the Sith and Dark Jedi, who studied the dark side of the Force',
          imageUrl: root + 'jedi_category.jpg'
        }),
        Category.create({
          name: 'Sith',
          description: 'These Dark Jedi had once been members of the Jedi Order, a monastic Force religion dedicated to peace through the use of the light side of the Force. The Dark Jedi, who refused to rely exclusively on the light side, challenged the Jedi by giving in to the dark side, which started the Hundred-Year Darkness.',
          imageUrl: root + 'sith_category.png'
        })
      )
      .spread(function(lightsabers, blasters, jedi, sith){
        categories = {
          lightsabers: lightsabers,
          blasters: blasters,
          jedi: jedi,
          sith: sith
        };
        return Promise.resolve(categories);

      });

}

module.exports = getCategories;
