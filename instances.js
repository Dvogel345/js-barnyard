const { Animal, Dog, Cat, Pig, Sheep, Chicken, Bull } = require('./classes')
const Monique = new Sheep({name: "Monique", color: "grey"})
const Spike = new Dog({name: "Spike", color: "spotted", stuffInBelly: ['garbage','dog food']})
const Leo = new Cat({name: "Leo", color: "tortoiseshell"})
const Lawrence = new Cat({name: 'Lawrence', color: "gray"})
const Laura = new Pig({name: 'Laura', color: 'pink', stuffInBelly: ['slop'], filthiness: 3})
const Sal = new Sheep({name: 'Sal', color: 'white'})
const Perry = new Bull({name: 'Perry', color: 'reddish'})
const Tina = new Chicken({name: 'Tina', color: 'orangey'})
const Pia = new Chicken({name: 'Pia', color: 'black'})
const Tim = new Pig({name: 'Tim', color: "black and white"})
const animals = [Monique,Spike,Leo,Lawrence,Laura,Sal,Perry,Tina,Pia,Tim]

module.exports = {
    Monique,Spike,Leo,Lawrence,Laura,Sal,Perry,Tina,Pia,Tim,animals
}