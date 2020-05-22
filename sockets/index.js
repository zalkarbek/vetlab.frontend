import guestSocket from './guest/guest.socket'
import authorizedSocket from './authorized/authorized.socket'
import io from 'socket.io-client'

class SocketHandler {
  constructor(host) {
    // socket сервер
    this.host = host
    this.socks = {}
    // массив хранить подключенные соединения io
    this.sockets = {}
    // массив хранить подключенные комнаты io
    this.joinedRooms = []
    // обработчики socket соединения
    this.namespaceHandlers = {
      GUEST: guestSocket,
      AUTHORIZED: authorizedSocket
    }
  }
  open({ namespace, options = {}, context = {}, socks }) {
    const socket = io(`${this.host}/${namespace}`, options)
    this.socks = socks
    this.lastNamespace = namespace
    this.sockets[namespace] = socket
    if (this.namespaceHandlers[namespace]) {
      this.namespaceHandlers[namespace]({ socket, context, socks })
    }
  }

  close(namespace) {
    this.sockets[namespace].close()
  }

  closeLastOpen() {
    this.sockets[this.lastNamespace].close()
  }

  // закрыть все namespaces
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

  // закрыть все namespace кроме переданных
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

  getSocks() {
    return this.socks
  }
  getSocksEvents() {
    return this.getSocks().EVENTS
  }
  getSocket(namespace = 'AUTHORIZED') {
    return this.sockets[namespace]
  }
  getAuthorizedSocket() {
    return this.getSocket('AUTHORIZED')
  }
  getGuestSocket() {
    return this.getSocket('GUEST')
  }
}

export default ({ host }) => {
  return new SocketHandler(host)
}
