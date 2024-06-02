<template>
  <div class="mx-auto py-8">
    <Header :cartItemCount="cart.length"/>
    <div class="container mt-3" v-if="product">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4">
          <img :alt="product.name" :src="product.image" class="w-full mb-4 rounded-lg border border-gray-300">
        </div>
        <div class="w-full md:w-1/2 px-4">
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <p class="text-gray-800 text-xl font-bold mb-4">Price: ${{ product.price }}</p>
          <p class="text-gray-800 font-bold mb-2">Category: {{ product.category }}</p>
          <p class="text-gray-800 font-bold mb-2">Color: {{ product.color }}</p>
          <p class="text-gray-800 font-bold mb-2">Material: {{ product.material }}</p>
          <p class="text-gray-800 font-bold mb-2">Dimensions: {{ product.dimensions }}</p>
          <p class="text-gray-800 font-bold mb-2">Weight: {{ product.weight }}</p>
          <p class="text-gray-800 font-bold mb-2">Brand: {{ product.brand }}</p>
          <p class="text-gray-800 font-bold mb-2">Rating: {{ product.rating }} <span
            class="text-yellow-500">&#9733;</span></p>
          <div class="flex items-center mt-4">
            <button @click="addToCart" class="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4">Add to Cart</button>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Product Details</h2>
        <p class="text-gray-700">{{ product.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/Header";

  export default {
    data() {
      return {
        product: null,
        cart: []
      };
    },
    components: {
      Header
    },
    async asyncData({params}) {
      try {
        const productId = params.id;
        const products = Object.values(await import('~/static/products.json'));
        const product = products.find(product => product.id === parseInt(productId));
        return {product};
      } catch (error) {
        console.error('Error fetching product:', error);
        return {product: null};
      }
    },
    methods: {
      addToCart() {
        const existingProduct = this.cart.find(item => item.id === this.product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          this.cart.push({...this.product, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(this.cart)); // Save cart to localStorage
      },
      updateCartCount(count) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
      }
    },
    mounted() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cart = cart;
    }
  };
</script>


<style scoped>
  .container {
    max-width: 1200px;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.25;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }

  button {
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #1c64f2;
  }

  .text-yellow-500 {
    color: #f59e0b;
  }
</style>

