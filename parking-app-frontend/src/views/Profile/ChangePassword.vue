<script setup>
import { onBeforeUnmount } from "vue";
import { useChangePassword } from "@/stores/changePassword";
import PasswordWithTextSwitcher from "@/components/PasswordWithTextSwitcher.vue";
const store = useChangePassword();

onBeforeUnmount(store.resetForm);
</script>
 
<template>
    <form @submit.prevent="store.updatePassword">
        <div class="flex flex-col mx-auto md:w-96 w-full">
            <h1 class="text-2xl font-bold mb-4 text-center">Change password</h1>
            <div class="alert alert-success mb-4" v-show="store.status">
                {{ store.status }}
            </div>
            <PasswordWithTextSwitcher v-model="store.form.current_password" id="current_password" name="current_password" formLabel="Current Password" :disabled="store.loading" />
            <ValidationError :errors="store.errors" field="current_password" />
            <PasswordWithTextSwitcher v-model="store.form.password" id="password" name="password" formLabel="New Password" :disabled="store.loading" />
            <ValidationError :errors="store.errors" field="password" />
            <PasswordWithTextSwitcher v-model="store.form.password_confirmation" id="password_confirmation" name="password_confirmation" formLabel="Confirm New Password" :disabled="store.loading" />
            <div class="border-t h-[1px] my-6"></div>

            <button type="submit" class="btn btn-primary" :disabled="store.loading">
                <IconSpinner class="animate-spin" v-show="store.loading" />
                Update password
            </button>
        </div>
    </form>
</template>