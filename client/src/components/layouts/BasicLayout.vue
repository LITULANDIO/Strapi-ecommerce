<template>
<div class="basic-layout">
    <Menu />
    <div class="ui container">
        <slot />
    </div>
</div>

<Cart />
  
</template>

<script>
import Menu from "../Menu.vue";
import Cart from "../Cart.vue";
export default {
    name: 'BasicLayout',
    components:{
        Menu,
        Cart
    }

}
</script>

<style lang="scss" scoped>




</style>