import userEvents from './user/user.events'
import naEvents from './napravlenie/na.events'
import isEvents from './isledovanie/is.events'

export default (ctx) => {
  userEvents(ctx)
  naEvents(ctx)
  isEvents(ctx)
}
