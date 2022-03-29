const {
  getList,
  postItem,
  deleteList,
  deleteItem,
  editItem,
  options,
  noPage
} = require('./handler')

const serverListener = (req, res) => {
  const { url, method } = req

  if (url === '/todo' && method === 'GET') getList(res)
  else if (url === '/todo' && method === 'POST') postItem(req, res)
  else if (url === '/todo' && method === 'DELETE') deleteList(res)
  else if (url.startsWith('/todo/') && method === 'DELETE') deleteItem(req, res)
  else if (url.startsWith('/todo/') && method === 'PATCH') editItem(req, res)
  else if (method === 'OPTIONS') options(res)
  else {
    noPage(res)
  }
}

module.exports = serverListener