const { v4: uuid } = require('uuid')

const {
  headers,
  successHandle,
  failHandle
} = require('./response')

const filterUrlId = (req) => {
  const { url } = req
  const cloneUrlAry = [...url.split('/')]
  return cloneUrlAry.pop()
}

const bufferHandle = async (req) => {
  let buffers = []
  for await (const buffer of req) {
    buffers.push(buffer)
  }
  const data = await JSON.parse(Buffer.concat(buffers).toString())
  return data
}

const DB = []

const getList = (res) => {
  successHandle({ res, data: DB })
}

const postItem = async (req, res) => {
  try {
    const data = await bufferHandle(req)
    const { content } = data

    if (!data || !content) return failHandle({ res })

    DB.push({
      id: uuid(),
      content
    })
    successHandle({ res, statusCode: 201, data: DB })
  } catch {
    failHandle({ res, message: '資料錯誤' })
  }
}

const deleteList = (res) => {
  DB.length = 0
  successHandle({ res, data: DB })
}

const deleteItem = (req, res) => {
  const id = filterUrlId(req)
  const deleteIndex = DB.findIndex(item => item.id === id)

  if (!id || deleteIndex < 0) return failHandle({ res, message: '資料錯誤' })

  DB.splice(deleteIndex, 1)
  successHandle({ res, data: DB })
}

const editItem = async (req, res) => {
  const id = filterUrlId(req)
  const editItem = DB.find(item => item.id === id)

  try {
    if (!id || !editItem) throw false

    const data = await bufferHandle(req)
    const { content } = data
    editItem.content = content
    successHandle({ res, data: DB })
  } catch {
    failHandle({ res, message: '資料錯誤' })
  }
}

const options = (res) => {
  res.writeHead(200, headers)
  res.end()
}

const noPage = (res) => {
  failHandle({
    res,
    statusCode: 404,
    message: '頁面不存在'
  })
}

module.exports = {
  getList,
  postItem,
  deleteList,
  deleteItem,
  editItem,
  options,
  noPage
}