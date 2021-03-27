# JavaScript Barnyard (React Prep)

Time: 1 hour (plus however long you want to play)

## Classes in JavaScript

JS classes are not too dissimilar from classes in Ruby or Python. If you're familiar with object-oriented programming, you'll see some structures that look pretty familiar.

* The constructor function is called `constructor`... so that's easy. This function runs when a new instance is created and initializes any instance variables.
* `this` is used to tell an object (in this case a class instance) to refer to itself -- not unlike `self` in some other languages.
* `extends` allows classes to inherit from a parent class; `super` can be used within a child class to refer to the parent.
* Method syntax can vary, but all methods in these examples are defined with the following pattern:

```javascript
methodName (arguments) {
    // method logic goes here
}
```

## Props

JS classes can accept positional arguments just fine:

```javascript
class Human {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

const jeremy = new Human('Jeremy', 666)
// jeremy.name will return "Jeremy"; jeremy.age will return 666
```

The classes in this repo, however, are designed to accept a single object as an argument on instantiation -- this is a pattern used in React, and the object is often referred to as "props," which is short for "properties." (In practice, it's not too unlike Python's `kwargs`.) Take a look at the above, refactored to accept props:

```javascript
class Human {
    constructor(props) {
        this.name = props.name
        this.age = props.age
    }
}

const jeremy = new Human({name: 'Jeremy', age: 666})
// jeremy.name will return "Jeremy"; jeremy.age will return 666
```

You can use either method for general JS OOP, but get used to seeing `props` in React.

## OK, what do I do here?

### 1. Scope it out
The files in this repo are designed as modular classes that can be imported into a Node environment. `Animal` is the parent class, and child classes are contained in the `species` directory. Clone this repo and click around in VSCode -- look for at least one example of each concept mentioned above, and try to wrap your head around it.

### 2. Fire it up and play in the barnyard
In your VSCode terminal, start the Node shell by typing `node`. (Make sure you're in the repository directory.) Now let's import some classes and instances from `classes.js` and `instances.js`. Paste these two lines into your running Node shell:

```bash
const { Animal, Dog, Cat, Pig, Sheep, Chicken, Bull } = require('./classes.js')
const { Monique, Spike, Leo, Lawrence, Laura, Sal, Perry, Tina, Pia, Tim, animals } = require('./instances.js')
```

Now all of the above variables should be available to you in your Node shell. Type `animals` and you should see all of the current animals listed in an array. Type an animal's name and you should be able to access the individual object. Now do some stuff!

* Make a new animal instance of whatever type you like. (Check `instances.js` for hints.)
* Look at the methods defined for `Animal` and for each subclass. Make the animals do stuff! Wallow! Eat! Charge! Make friends! Try stuff! Can Laura eat `'a paper bag'`? Can Perry charge `'a truck'`? Can Leo fetch `'the paper'`? Can Spike make friends with `'a fence'`? Can Lawrence eat Pia??? Zoiks!
* Spike is a very friendly dog. Have him try to make friends with everybody: `animals.forEach(animal => Spike.makeFriends(animal))`
* Perry is a very angry bull. Have him try to `charge` everybody by altering the code above.
* Do whatever! Try to break it.

### 3. Make another child class
Create a new subclass of `Animal` in a new file in the `species` directory. Make it whatever you like. Give it some special properties or methods or both. Import the file in your Node shell (example: `const Duck = require('./species/Duck)`) and create a new instance of your `Duck` or `Rabbit` or whatever. See if it can eat some stuff and make some friends!

## Nice work!

If you're comfortable here, then you know slightly _more_ than you need to know about JS OOP in order to get started with React. Great!

## For Teachers and Students: Additional Study Questions

To dig in deeper, start with these study questions. Try to find your own explanation and compare ideas with a peer before revealing the answer!

<details>
<summary>
1) What's going on in instances.js?
</summary>

**Line 1:** The `Animal` class and a number of child classes are imported from `classes.js` via `require`. (They are actually imported into _that_ file from their individual sources.)

**Lines 2 - 11:** The imported classes are used to create new _instances_ of the various imported classes, and each of these is stored as a variable with the same name as the critter.

**Line 12:** Each of the above instances is placed into a new array. (Note: This will place a _reference_ to the original object in the array. `Monique` and `animals[0]` will now both point to the same object.)

**Line 13:** The individual created instances and the array are _exported_ from this file, meaning other files can access them via `require`.

</details>

<details>
<summary>
2) What happens when an Animal eats?
</summary>

The `.eat(food)` method of the `Animal` class follows the folowwing steps:

1) Invokes `this.isHungry()`, which returns a boolean based on whether the animal has fewer than 4 items in the `this.stuffInBelly` array.

2) If the above returns `true`, the `food` argument is placed in `this.stuffInBelly` using `.push`. (This is true regardless of what datatype is provided for `food`! :grimacing: ) The animals name and food eaten are logged to the console.

3) If the animal is not hungry, the animal's name is logged to the console along with a message saying it doesn't want to eat.
</details>

<details>
<summary> 
3) What is the .toString() method? Is it used anywhere?
</summary>

The `Animal` class' `.toString()` method simply returns a string with the instance's `name` property along with `this.constructor.name`, which will be the name of the instance's class. (If a child class `extends` the `Animal` class, that child class' name will be provided here.)

`.toString()` is not _directly_ used in any of this code -- but he method is invoked any time an object is directly converted to a string, as in a literal with backticks and `${}`. This can be seen in the `makeFriends()` method:

```javascript
console.log(`${this} and ${newFriend} are now friends!`)
// produces output like "Pia the Chicken and Spike the Dog are now friends!"
```

If you comment out the `.toString()` method in `Animal`, re-import the objects, and direct two animals to make friends, you will see this instead:
```bash
[object Object] and [object Object] are now friends!
```

(Note: Many datatypes -- `Number`, `Array`, `Object` and more -- actually have a default `.toString()` method that is invoked in the same situations!)

</details>

<details>
<summary>
4) What happens if Lawrence and Pia become friends?
</summary>

Supposing this means we have entered `Lawrence.makeFriends(Pia)` into the REPL, `Lawrence` is an instance of `Cat` and `Pia` is an instance of `Chicken`, both of which inherit from `Animal`.

The `.makeFriends(newFriend)` method of the `Lawrence` object will be invoked. For the `Cat` class, this method is inherited from `Animal`, so the code for the method can be found in `Animal.js`.

This method first checks whether the `newFriend` argument is an instance of `Animal` or a child class of `Animal` by checking `newFriend.constructor` and `newFriend.__proto__.__proto__.constructor`, which returns the parent class. So no, in this system, an `Animal` cannot be friends with `25` or `"a paper bag"`, only with another `Animal`.

Then the method checks whether the two instances are already friends by determining whether a reference to `newFriend` is found in the `this.friends` array.

If the two conditions are met, a reference to `newFriend` is added to `this.friends` -- and a reference to `this` (which will be the current object, in this case `Lawrence`) will be added to `newFriend.friends`. Then an announcement of the new friendship is logged.

If the conditions _aren't_ met, the method checks why. If `this.friends.includes(newFriend)`, then the log explains that the animals are already pals. Otherwise, the method must have failed because of `newFriend`'s type -- the log explains that the animal cannot be friends with a `newFriend.constructor.name`, which will output `newFriend`'s type!


