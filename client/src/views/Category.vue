<template>
<BasicLayout>
    <div class="ui grid">
        <div 
        class="sixten wide mobile eight wide tablet four wide computer column" 
        v-for="product in products" :key="product.id">

      <Product :product="product"/>
        </div>
      </div>
</BasicLayout>
  
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from "vue-router";
import  BasicLayout from "@/components/layouts/BasicLayout";
import { getProductCategory } from "../api/product";
import Product from "@/components/Product";

export default {
    name: 'Category',
    components:{
        BasicLayout,
        Product
    },
    setup(){
        const route = useRoute();
        let products = ref(null);

        onMounted(() => {
          getCategory(route.params.category);  
        })

        const getCategory = async (category) =>{
            const response = await getProductCategory(category);
            products.value = response;
        }

        watch(route, (to, from) =>{
            getCategory(to.params.category)
        });


        return{
            products
        }
    }
}
</script>

<style>

</style>