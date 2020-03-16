import io from 'socket.io-client'
import guestSocket from './guest/guest.socket'

class Handler {
  constructor(host) {
    // socket сервер
    this.host = host
    // массив хранить подключенные соединения io
    this.sockets = {}
    // массив хранить подключенные комнаты io
    this.joinedRooms = []
    // обработчики socket соединения
    this.handlers = {
      guest: guestSocket
    }
  }
  open({ namespace, options = {}, context = {} }) {
    const socket = io(`${this.host}/${namespace}`, options)
    this.lastNamespace = namespace
    this.sockets[namespace] = socket
    this.handlers[namespace]({ socket, context })
  }

  close(namespace) {
    this.sockets[namespace].close()
  }

  closeLastOpen() {
    this.sockets[this.lastNamespace].close()
  }

  closeAll() {
    let closed = 0
    const namespaces = Object.keys(this.sockets)
    if (Array.isArray(namespaces) && namespaces.length >= 1) {
      namespaces.forEach((namespace) => {
        this.sockets[namespace].close()
        closed = closed + 1
      })
    }
    return closed
  }
  closeAllExcept(exceptSocketNames = []) {
    let closed = 0
    const namespaces = Object.keys(this.sockets)
    if (Array.isArray(namespaces) && namespaces.length >= 1) {
      namespaces.forEach((namespace) => {
        if (!exceptSocketNames.includes(namespace)) {
          this.sockets[namespace].close()
          closed = closed + 1
        }
      })
    }
    return closed
  }

  getOpenedNamespaces() {
    return Object.keys(this.sockets)
  }

  getJoinedRooms() {
    return this.joinedRooms
  }
}

export default ({ host }) => {
  return new Handler(host)
}
