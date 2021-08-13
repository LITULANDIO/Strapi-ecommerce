<template>
<div class="cart-dimmer" :class="{open: showCart}" @click="closeCart"></div>
<div class="cart" :class="{open: showCart}">
  <h2>Cart</h2>
  <button @click="closeCart">Cerrar</button>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    name: 'cart',
    setup(){
        const store = useStore();
        const showCart = computed(() => store.state.showCart);

        const closeCart = () =>{
            store.commit("SET_SHOW_CART", false)
        }

        return{
            showCart,
            closeCart
        }
    }


}
</script>

<style lang="scss" scoped>
.cart-dimmer{
    opacity: 0;
    transition: opacity 0.5 ease;
    &.open{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.8;
    }
}
.cart{
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    height: 100vh;
    background-color: #ffff;
    box-shadow: 0px 0px 26px 5px rgba(0,0,0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.9s ease;
    transform: translateX(150%);
    &.open{
        transform: translateX(0);
    }
}

</style>