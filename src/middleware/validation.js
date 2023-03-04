
const datamethods = ['body', 'query', 'params']
export const validation = (schema) => {
  return (req, res, next) => {
    const err = []
    datamethods.forEach((element) => {
      if (schema[element]) {
        const result = schema[element].validate(req[element], {
          abortEarly: false,
        })
        if (result.error) {
          err.push(result.error.details)
        }
      }
    })
    if (err.length) {
      return res.json({ message: 'validation error', err })
    }
    return next()
  }
}
