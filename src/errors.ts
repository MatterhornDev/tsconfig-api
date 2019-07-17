const ERRORS = {
  ERR_OPTION_IS_LIST: {
    error: 'Query parameter `option` should not be a list'
  },
  ERR_NO_OPTION_PARAM: {
    error: 'missing `option` query parameter'
  },
  ERR_NO_REQ_URL: {
    error: 'Request object did not contain a URL'
  },
  ERR_OPTION_DOES_NOT_EXIST: {
    error: 'Option is not a tsconfig property'
  }
}

export = ERRORS