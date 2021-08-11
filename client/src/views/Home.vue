<template>
  <div class="home">
    <BasicLayout >
      <h2>Últimos productos</h2>
      <div class="ui grid">
        <div 
        class="sixten wide mobile eight wide tablet four wide computer column" 
        v-for="product in products" :key="product.id">

      <Product :product="product"/>
        </div>
      </div>
    </BasicLayout>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "@/components/layouts/BasicLayout";
import { getProductsApi } from "../api/product";
import Product from "@/components/Product";

export default {
  name: "Home",
  components:{
    BasicLayout,
    Product
  },
  setup(){
   let products = ref(null);

        onMounted(() => {
            getProducts();
        })

        const getProducts = async () =>{
            const response = await getProductsApi(20);
            products.value = response;
        }

        return{
            products
        }
  }
}
</script>
