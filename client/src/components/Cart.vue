<template>
    <div class="cart-dimmer" :class="{open: showCart}" @click="closeCart"></div>
        <div class="cart" :class="{open: showCart}">
        <CartHeader :closeCart="closeCart"/>
        <CartBody :products="products" :reloadCartFn="reloadCartFn"/>
        <CartFooter :products="products" :closeCart="closeCart" v-if="products"/>
    </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { getProductsCartApi } from "../api/card";
import CartHeader from "@/components/CartHeader";
import CartBody from "@/components/CartBody";
import CartFooter from "@/components/CartFooter";

export default {
    name: 'cart',
    components:{
        CartHeader,
        CartBody,
        CartFooter
    },
    setup(){
        const store = useStore();
        const showCart = computed(() => store.state.showCart);
        let products = ref(null);
        let reloadCart = ref(false);

        const getProductsCart = async () =>{
            const response = await getProductsCartApi();
            products.value = response;
        }

        const reloadCartFn = () =>{
            reloadCart.value = !reloadCart.value;
        }

        watchEffect(() =>{
            showCart.value;
            reloadCart.value;
            getProductsCart();
        })

        const closeCart = () =>{
            store.commit("SET_SHOW_CART", false)
        }

        return{
            showCart,
            closeCart,
            products,
            reloadCartFn
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