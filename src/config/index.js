module.exports = {
  success: {
    status: 200,
    message: 'ok'
  },
  notInitial: {
    status: 301,
    message: 'not initial'
  },
  alreadyExist: {
    status: 302,
    message: 'The entity requested to create already exists'
  }
  ,
  wrongConf: {
    status: 401,
    message: 'some config is wrong'
  },
  missConf: {
    status: 402,
    message: 'some config is required'
  },

}