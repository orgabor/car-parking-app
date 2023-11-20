<script setup>
import { onBeforeUnmount } from "vue";
import { useLogin } from "@/stores/login";
import PasswordWithTextSwitcher from "@/components/PasswordWithTextSwitcher.vue";
const store = useLogin();
onBeforeUnmount(store.resetForm);
</script>
 
<template>
    <form @submit.prevent="store.handleSubmit" novalidate>
        <div class="flex flex-col mx-auto md:w-96 w-full">
            <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
            <div class="flex flex-col gap-2 mb-4">
                <label for="email" class="required">Email</label>
                <input v-model="store.form.email" id="email" name="email" type="text" class="rounded form-input" autofocus
                    autocomplete="email" required :disabled="store.loading" />
                <ValidationError :errors="store.errors" field="email" />
            </div>
            <PasswordWithTextSwitcher v-model="store.form.password" id="password" name="password" :disabled="store.loading"  formLabel="Password"/>
            <ValidationError :errors="store.errors" field="password" />
            <div class="flex flex-col gap-2">
                <label class="flex gap-2 items-center hover:cursor-pointer">
                    <input v-model="store.form.remember" type="checkbox" class="w-4 h-4" :disabled="store.loading" />
                    <span class="select-none">Remember me</span>
                </label>
            </div>

            <div class="border-t h-[1px] my-6"></div>

            <div class="flex flex-col gap-2">
                <button type="submit" class="btn btn-primary" :disabled="store.loading">
                    <IconSpinner class="animate-spin" v-show="store.loading" />
                    Login
                </button>
            </div>
        </div>
    </form>
</template>


