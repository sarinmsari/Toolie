<script setup>
import { computed } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Type something...'
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

// Using a computed property with getter/setter is the cleanest 
// way to handle v-model in a child component
const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>

<template>
    <textarea
        v-model="internalValue"
        :placeholder="placeholder"
        class="custom-textarea"
    ></textarea>
</template>

<style scoped>
.custom-textarea {
    width: 100%;
    /* Set a fixed height since you don't need it to grow */
    height: 120px; 
    padding: 12px;
    
    border: 1px solid #cbd5e1; /* slate-300 */
    border-radius: 8px;
    outline: none;
    background: white;
    
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #1e293b; /* slate-800 */
    
    /* Text wrapping fixes */
    white-space: pre-wrap;
    word-break: break-all;
    
    resize: none; /* Prevents user from manual resizing if desired */
}

.custom-textarea:focus {
    border-color: #10b981; /* emerald-500 */
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.custom-textarea::placeholder {
    color: #94a3b8; /* slate-400 */
}
</style>