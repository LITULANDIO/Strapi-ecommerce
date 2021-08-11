<template>
<BasicLayout>
    <h1>view category</h1>
</BasicLayout>
  
</template>

<script>
import  BasicLayout from "@/components/layouts/BasicLayout";
export default {
    name: 'Category',
    components:{
        BasicLayout
    },
    watch:{
        $route(to, from){
            console.log(to)
        }
    }
}
</script>

<style>

</style>