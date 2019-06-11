const url = require('url')
const data = require('./data.json')

module.exports = (req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  switch (pathname) {
    case `/status`:
      res.end(`I'm running :-)\n`)
      break
    case `/data`:
      res.end(JSON.stringify(tsconfigData[query.option]))
      break
    default:
      res.end(`Bad route\n`)
  }
}