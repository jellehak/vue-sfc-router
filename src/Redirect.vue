<template>
    <slot/>
</template>

<script setup>
import { onMounted, inject } from 'vue'

const router = inject('router')

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

onMounted(() => {
    router.push(props.to)
})
</script>
