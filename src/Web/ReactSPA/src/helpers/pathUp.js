/**
 * Ex: /location01/abc to /location01
 * @param {string} path
 */
const pathUp = path =>
  path.split('/').reduce((newPath, value, index, array) => {
    if (index === array.length - 1) {
      return newPath
    } else {
      return (newPath += `/${value}`)
    }
  })

export default pathUp
