const welcome = 
`
\n
Welcome to the JavaScript Barnyard! 
See README.md or visit https://github.com/jeremyrrose/js-barnyard for directions.
\n
`
console.log(welcome)

const repl = require('repl')
const replServer = repl.start({
    prompt: "JS Barnyard > "
})

const classes = require('./classes.js')
for (const [k,v] of Object.entries(classes)) {
    replServer.context[k] = v
}

const instances = require('./instances.js')
for (const [k,v] of Object.entries(instances)) {
    replServer.context[k] = v
}