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
const route = inject('route')

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

const isPathMatched = computed(() => router.pathMatch(props.path))
const bind = computed(() => ({
    path: props.path,
    params: router.extractVariables(props.path),
    query: route.query,
}))
</script>
