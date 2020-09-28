var Express = require('express')
var Path = require('path')
var Http = require('http')
var Routes = require('./routes')

const app = Express()

const rootPath = Path.join(__dirname, '..', 'dist/')

app.use('/', Express.static(rootPath))
app.use('/', Routes(rootPath))

const port = process.env.PORT || '3000'
app.set('port', port)

const server = Http.createServer(app)

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server Running on port ${port}`))
