import dbConfig from '../config/db'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'

export default ({ app }, inject) => {
  PouchDB.plugin(PouchDBFind)
  const pouchDB = new PouchDB(dbConfig.dbName)
  inject('pouch', pouchDB)
  return pouchDB
}
