<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "@/stores/register";
import PasswordWithTextSwitcher from "@/components/PasswordWithTextSwitcher.vue";
const store = useRegister();
 
onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input"
          autocomplete="name"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>
 
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="store.form.email"
          id="email"
          name="email"
          type="email"
          class="form-input"
          autocomplete="email"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>
 
       <PasswordWithTextSwitcher v-model="store.form.password" id="password" name="password" formLabel="Password" :disabled="store.loading" />
      <ValidationError :errors="store.errors" field="password" />
      <PasswordWithTextSwitcher v-model="store.form.password_confirmation" id="password_confirmation" name="password_confirmation" formLabel="New Password" :disabled="store.loading" />
        <ValidationError :errors="store.errors" field="password" />
      <div class="border-t h-[1px] my-6"></div>
 
      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
          <IconSpinner v-show="store.loading" />
          Register
        </button>
      </div>
    </div>
  </form>
</template>