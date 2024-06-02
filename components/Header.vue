<template>
  <header class="bg-gradient-to-r from-lightPurple to-beige p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-gray-800 text-2xl font-bold">My Product Store</h1>
      <nav class="flex items-center">
        <ul class="flex space-x-4">
          <li>
            <router-link class="text-gray-800 hover:text-gray-600" to="/">Home</router-link>
          </li>
        </ul>
        <router-link class="text-gray-800 hover:text-gray-600 flex items-center ml-4 position-relative" to="/cart">
          <i class="bi bi-cart h-6 w-6"></i>
          <span
            class="bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs position-absolute top-0 right-0 -mt-1 -mr-1"
            v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    props: {
      cartItemCount: {
        type: Number,
        required: true
      }
    },
  };
</script>
