import dbConfig from '../config/db'
import PouchDB from 'pouchdb'

export default ({ app }, inject) => {
  inject('pouch', new PouchDB(dbConfig.dbName))
}
