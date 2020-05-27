import userEvents from './user/user.events'
import naEvents from './napravlenie/na.events'

export default (ctx) => {
  userEvents(ctx)
  naEvents(ctx)
}
