<template>
    <slot />
</template>

<script setup>
import { computed, reactive, provide, onMounted } from 'vue'
import { extractQuery, extractVariables } from './utils.js'

const props = defineProps({
    debug: {
        type: Boolean,
        default: false
    }
})

function getPathWithoutQuery(path = "") {
    return path.split('?')[0]
}

const router = reactive({
    push(path) {
        window.location.hash = path
    },
    props,
    locationHash: getHash(),
    locationPath: computed(() => getPathWithoutQuery(router.locationHash)),
    pathMatch,
    extractQuery,
    extractVariables (path = "") {
        const pathWithoutQuery = getPathWithoutQuery(router.locationHash)
        return extractVariables(path, pathWithoutQuery)
    },
})

/**
 * Initial location hash
 */
// const locationHash = router.locationHash //ref(window.location.hash.replace('#', ''))

function getHash() {
    return window.location.hash.replace('#', '')
}

provide('router', router)

const route = reactive({
    query: extractQuery(router.locationHash),
})

provide('route', route)

onMounted(() => {
    window.addEventListener('hashchange', () => {
        router.locationHash = window.location.hash.replace('#', '')
        route.query = extractQuery(router.locationHash)
    })
})

/**
 * @example pathMatch('/user/:id', '/user/5') // would yield true
 * @param {*} path 
 */
function pathMatch(path = "", current = router.locationPath) {
    if(path === current) {
        return true
    }
    const string = current
    const pattern = path.replace(/:[^\s/]+/g, '[^/]+')
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(string)
}
</script>
