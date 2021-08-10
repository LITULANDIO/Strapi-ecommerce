<template>
<div class="basic-layout">
    <Menu />
    <div class="ui container">
        <slot />
    </div>
</div>
  
</template>

<script>
import Menu from "../Menu.vue";
export default {
    name: 'BasicLayout',
    components:{
        Menu
    }

}
</script>

<style lang="scss" scoped>




</style>