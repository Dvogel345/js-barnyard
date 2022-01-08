const Animal = require('../Animal')

class Crab extends Animal {

    constructor(props) {
        super(props)
        this.bubblesMade = 0,
        this.eggsLayed = 0
    }
        
    layEggs(numberOfEggs) {
        this.eggsLayed += numberOfEggs
        console.log(`${this.name} just layed ${numberOfEggs} eggs. She's layed ${this.eggsLayed} so far!`)
    }

    bubblesMade(numberOfBubbles) {
        this.makeBubbles += numberOfEggs
        console.log(`${this.name} just made ${numberOfBubbles} because she layed ${numberOfEggs} eggs.`)
    }
}

module.exports = Crab