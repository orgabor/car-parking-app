<script setup>
import { ref } from "vue";
defineProps({
    formLabel: String,
    modelValue: String,
    id: String,
    name: String,
    disabled: Boolean
});

const showPassword = ref(false);
//const emit = defineEmits(['update:modelValue']);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>
<template>
    <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">{{ formLabel }}</label>
        <div class="flex flex-row border rounded bg-gray-100">
            <input  
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
            :id="id" 
            :name="name" 
            :type="showPassword ? 'text' : 'password'"
            class="bg-gray-100 flex-1 w-64" autocomplete="current-password" 
            required 
            :disabled="disabled" 
            />
            <span class="height-auto flex flex-col border rounded items-center bg-gray-100 align-middle"
                @click="togglePasswordVisibility">
                <!-- Replace this with an actual eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" class="w-8 h-8" :class="{ 'hidden': showPassword, 'visible': !showPassword }"
                    className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8" :class="{ 'hidden': !showPassword, 'visible': showPassword }">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

            </span>
        </div>
    </div>
</template>