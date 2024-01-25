<script setup>
const props = defineProps({
    label: {
        required: true
    },
    type: {
        default: 'info',
        required: false
    }
})

const classForType = {
    info: 'bg-primary-500 bg-opacity-20 text-sm dark:text-primary-100 text-primary-800',
    warning: 'bg-yellow-500 bg-opacity-20 text-sm dark:text-yellow-100 text-yellow-800',
    error: 'bg-negative-500 bg-opacity-20 text-sm dark:text-negative-100 text-negative-800'
}
</script>

<template>
    <span :class="classForType[props.type] + ' text-xs font-medium me-2 px-2.5 py-0.5 rounded'">{{ label }}</span>
</template>