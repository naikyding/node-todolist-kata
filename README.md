# node-todolist-kata

## [API](https://todo-kata-t8.herokuapp.com/todo)

## Body data (BUFFER) 

**origin**
```js
let data = ''

// buffer
req.on('data', (chunk) => {
  data += chunk
})
// done
req.on('end', () => {

})
```

**async / await**
```js
const bufferHandle = async (req) => {
  let buffers = []
  for await (const buffer of req) {
    buffers.push(buffer)
  }
  const data = await JSON.parse(Buffer.concat(buffers).toString())
  return data
}
```