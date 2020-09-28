var Path = require('path')

module.exports = rootPath => {
  const router = require('express').Router()

  router.get('*', (_req, res) => {
    const route = Path.join(rootPath, 'index.html')
    res.sendFile(route)
  })

  return router
}
