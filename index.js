import HashRouter from "./src/HashRouter.vue"
import Route from "./src/Route.vue"
import Redirect from "./src/Redirect.vue"

export default function (Vue) {
    Vue.component('HashRouter', HashRouter)
    Vue.component('Route', Route)
    Vue.component('Redirect', Redirect)
} 

export { HashRouter, Route, Redirect }