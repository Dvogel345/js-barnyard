class Animal {

    static allAnimals = []
    static findName = (str) => this.allAnimals.filter(anim => anim.name.toLowerCase().includes(str.toLowerCase()))
    
    constructor(properties) {
        this.name = properties.name 
        this.color = properties.color
        this.stuffInBelly = Array.isArray(properties.stuffInBelly) ? properties.stuffInBelly : [] // prevents breaking if non-array object passed
        this.position = typeof properties.position == 'number' ? properties.position : 0 // prevents breaking if non-number object passed
        this.friends = []

        // adds this animal to static Animal.allAnimals
        this.constructor.allAnimals.push(this)
    }

    toString() { 
        // overrides default toString behavior
        return `${this.name} the ${this.constructor.name}`
    }

    talk(sound=null) {
        if (sound) {
            console.log(`${this.name} says ${sound}`)
        } else {
            console.log(`${this.name} has nothing to say right now.`)
        }
    }
    
    walk(walk_increment) {
        this.position += walk_increment
        console.log(`${this.name} walked ${walk_increment} steps and is now at position ${this.position}.`)
    }

    run (run_increment) {
        this.position += run_increment
        console.log(`${this.name} ran ${run_increment} steps and is now at position ${this.position}.`)
    }
    
    isHungry() {
        return this.stuffInBelly.length < 4
    }
        
    eat(food) {
        if (this.isHungry()) {
            this.stuffInBelly.push(food)
            console.log(`${this.name} ate ${food}. Yum!`)
        } else {
            console.log(`${this.name} doesn't feel like eating ${food} right now.`)
        }
    }
    
    makeFriends(newFriend) {
        if (
            (
                newFriend.constructor == Animal ||
                newFriend.__proto__.__proto__ && newFriend.__proto__.__proto__.constructor == Animal // ensures that prospective friend is an Animal
            ) && !this.friends.includes(newFriend) // and that the two are not already friends
        ) {
            this.friends.push(newFriend)
            newFriend.friends.push(this)
            console.log(`${this} and ${newFriend} are now friends!`)
        } else if (this.friends.includes(newFriend)) {
            console.log(`${this} and ${newFriend} are already friends.`)
        } else {
            console.log(`${this} cannot be friends with ${newFriend}. :( It's a ${newFriend.constructor.name}!`)
        }
    }
}

module.exports = Animal