const express = require('express'); // importing a CommonJS module
const hubsRouter = require('./hubs/hubs-router.js');
const helmet = require('helmet')
const gate = require('./auth/gate-middleware')

const server = express();

// Global: Custom middle ware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);
  next();
}



// Setup middle ware to be used
server.use(logger)
server.use(express.json());
server.use(helmet())

server.get('/free', (req, res) => {
  res.statuts(200).json({welcome: 'Web 22 Developers!!'})
})

server.get('/paid', gate, (req, res) => {
  res.status(401).json({message: 'The gate has opened'})
})

// Add middle ware to the entire route instead of in the file
server.use('/api/hubs', gate, hubsRouter);

function addName (req, res, next) {
  const name = "billy";
  req.name = name
  next();
}


server.get('/', addName, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

// Error handling ALWAYS comes last in the server file
server.use(errorHandler)

// Error Handling middle ware
function errorHandler(error, req, res, next){
  res.status(401).json({message: "you shall not pass from error handler"})
}

module.exports = server;
