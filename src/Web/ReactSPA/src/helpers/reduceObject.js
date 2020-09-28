const reduceObject = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      reduceObject(val)
      if (Object.entries(obj).length === 0) delete obj[key]
    } else if (!val) delete obj[key]
  })

export default reduceObject
