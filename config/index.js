import dotenv from 'dotenv'
import db from './db'
import i18n from './i18n'
import socket from './socket'
dotenv.config()

module.exports = {
  db,
  i18n,
  socket
}
