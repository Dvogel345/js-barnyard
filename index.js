const welcome = 
`
Welcome to the JavaScript Barnyard! 
Please play with the animals. Enjoy the fresh air!
See README.md or visit https://github.com/jeremyrrose/js-barnyard for directions.
`
console.log(welcome)

const repl = require('repl')
const replServer = repl.start({
    // prompt: "JS Barnyard > "
    prompt: ""
})

const loadContext = () => {

    console.log(`Loading REPL context...\n`)
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
    
    const classes = require('./classes.js')
    for (const [k,v] of Object.entries(classes)) {
        replServer.context[k] = v
    }

    const instances = require('./instances.js')
    for (const [k,v] of Object.entries(instances)) {
        replServer.context[k] = v
    }
    replServer.setPrompt("JS Barnyard > ")
    replServer.displayPrompt()
}

loadContext()
replServer.defineCommand('reload', loadContext)