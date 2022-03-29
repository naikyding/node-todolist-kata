
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Content-Length, X-Request-With, Authorization',
  'Content-Type': 'application/json'
}

const successHandle = ({
  res,
  status = 'Success',
  statusCode = 200,
  message = '操作成功',
  data
}) => {
  res.writeHead(statusCode, headers)
  res.end(JSON.stringify({
    status,
    message,
    data
  }))
}

const failHandle = ({
  res,
  status = 'Fail',
  statusCode = 400,
  message = '操作失敗',
  data
}) => {
  res.writeHead(statusCode, headers)
  res.end(JSON.stringify({
    status,
    message,
    data
  }))
}

module.exports = {
  headers,
  successHandle,
  failHandle
}