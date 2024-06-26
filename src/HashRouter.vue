<template>
    <slot />
</template>

<script setup>
import { computed, reactive, provide, onMounted } from 'vue'


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

/**
 * @example extractVariables('/user/:id', '/user/5') // would yield {id:5}
 * @param {*} path 
 * @param {*} matchedPath 
 */
function extractVariables (path = "", matchedPath = "") {
    const pathSegments = path.split('/')
    const matchedSegments = matchedPath.split('/')
    const variables = {}

    pathSegments.forEach((segment, i) => {
        if (segment.startsWith(':')) {
            const variableName = segment.slice(1)
            const variableValue = matchedSegments[i]
            variables[variableName] = variableValue
        }
    })

    return variables
}

/**
 * @example 
 * extractQuery('#/products/1?price=1&color=green&color=blue') 
 * => 
 * {price: 1, color: ['green', 'blue']}
 */
 function extractQuery(query = "") {
    const queryIndex = query.indexOf('?')
    if (queryIndex === -1) {
        return {}
    }
    const queryString = query.slice(queryIndex + 1)
    const params = new URLSearchParams(queryString)

    const _params = {}
    params.forEach((value, key) => {
        if (_params[key]) {
            if (Array.isArray(_params[key])) {
                _params[key].push(value)
            } else {
                _params[key] = [_params[key], value]
            }
        } else {
            _params[key] = value
        }
    })
    return _params
}
</script>
