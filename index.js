const welcome = 
`
\x1b[3mWelcome to the \x1b[1;32mJavaScript Barnyard! 
\x1b[0;34mPlease play with the animals. Enjoy the fresh air!
\x1b[0mSee README.md or visit https://github.com/jeremyrrose/js-barnyard for directions.
`
console.log(welcome)

const repl = require('repl')
const replServer = repl.start({
    // prompt: "JS Barnyard > "
    prompt: ""
})

const loadContext = (loadInstances=true) => {

    console.log(`Loading REPL context...`)
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
    
    const classes = require('./classes.js')
    for (const [k,v] of Object.entries(classes)) {
        replServer.context[k] = v
    }
    console.log(`Available JS classes: ${Object.keys(classes).map(item => `\x1b[0;34m${item}\x1b[0m`).toString()}`)

    if (loadInstances) {
        const instances = require('./instances.js')
        for (const [k,v] of Object.entries(instances)) {
            replServer.context[k] = v
        }
        console.log(`Available instances: ${Object.keys(instances).map(item => `\x1b[0;34m${item}\x1b[0m`).toString()}`)
    }
    console.log(`\n`)

    replServer.setPrompt("JS Barnyard > ")
    replServer.displayPrompt()
}

loadContext()
replServer.defineCommand('reload', loadContext)
replServer.defineCommand('reloadClasses', () => loadContext(false))