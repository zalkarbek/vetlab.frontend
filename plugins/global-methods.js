import GlobalMethods from '../myPlugins/global-methods'

export default (context, inject) => {
  inject('filterArrayItems', GlobalMethods.filterArrayItems)
  inject('filterObjectArray', GlobalMethods.filterObjectArray)
  inject('randomInt', GlobalMethods.randomInt)
  inject('toLowerCase', GlobalMethods.toLowerCase)
}
