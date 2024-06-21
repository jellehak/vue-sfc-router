<template>
    <div v-if="router.props.debug">
        <pre>{{
            {
                path,
                router,
                matched: isPathMatched,
                bind
            }
        }}</pre>
    </div>
    <template v-if="isPathMatched">
        <template v-if="component">
            <component :is="component" v-bind="router.extractVariables(props.path)">
                <slot v-bind="bind"></slot>
            </component>
        </template>
        <template v-if="!component">
            <slot v-bind="bind"></slot>
        </template>
    </template>
</template>

<script setup>
import { computed, inject } from 'vue'

const router = inject('router')

const props = defineProps({
    path: {
        type: String,
        required: true
    },
    component: {
        type: String,
        required: false
    }
})

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

const isPathMatched = computed(() => router.pathMatch(props.path))
const bind = computed(() => ({
    path: props.path,
    params: router.extractVariables(props.path),
    query: extractQuery(router.locationHash.value)
}))
</script>
