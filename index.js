import HashRouter from "./src/HashRouter.vue"
import Route from "./src/Route.vue"

export default function (Vue) {
    Vue.component('HashRouter', HashRouter)
    Vue.component('Route', Route)
} 

export { HashRouter, Route }