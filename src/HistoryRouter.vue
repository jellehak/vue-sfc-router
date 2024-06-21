<template>
    <slot />
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'

const locationHash = ref(window.location.hash.replace('#', ''))

const props = defineProps({
    debug: {
        type: Boolean,
        default: false
    }
})

provide('router', {
    props,
    locationHash,
    pathMatch,
    extractVariables: (path = "") => {
        const pathWithoutQuery = locationHash.value.split('?')[0]
        return extractVariables(path, pathWithoutQuery)
    }
})

onMounted(() => {
    window.addEventListener('hashchange', () => {
        locationHash.value = window.location.hash.replace('#', '')
    })
})

/**
 * @example pathMatch('/user/:id', '/user/5') // would yield true
 * @param {*} path 
 */
function pathMatch(path = "", current = locationHash.value) {
    if (path === '/') {
        return current === '' || current === '#'
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
</script>
