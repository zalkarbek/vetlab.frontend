import db from './db'
import i18n from './i18n'
import socket from './socket'
import dotenv from 'dotenv'
dotenv.config()

module.exports = {
  db,
  i18n,
  socket
}
