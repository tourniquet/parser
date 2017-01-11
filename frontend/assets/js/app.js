const socket = io.sails.connect('http://localhost:1337')

const app = new Vue({
  el: '.container',
  data: {
    items: []
  },
  mounted () {
    socket.get('/', data => this.items = data)
  }
})
