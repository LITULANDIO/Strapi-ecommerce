<template>
<BasicLayout>
    <h1>view category</h1>
</BasicLayout>
  
</template>

<script>
import { ref, onMounted } from "vue";
import  BasicLayout from "@/components/layouts/BasicLayout";
import { getProducts } from "../api/product";
export default {
    name: 'Category',
    components:{
        BasicLayout
    },
    watch:{
        $route(to, from){
            console.log(to, from)
        }
    }
}
</script>

<style>

</style>