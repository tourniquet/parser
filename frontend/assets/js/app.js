const socket = io.sails.connect('http://localhost:1337')

const app = new Vue({
  el: '.container',
  data: {
    items: []
  },
  methods: {
    disable (el) {
      this.items.splice(this.items.indexOf(el), 1)

      const url = `/disable?phone=${el.phone}`
      socket.put(url, (data, jwres) => {
        // where jwres is a JSON WebSocket Response object. Has headers, a body, and a statusCode.
        // http://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-delete
        console.log(data)
        console.log(jwres)
      })
    }
  },
  mounted () {
    socket.get('/', data => this.items = data)
  }
})

// initializing clipboard.js
new Clipboard('.btn')
