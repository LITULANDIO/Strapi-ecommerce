<template>
  <div class="cart-header" @click="closeCart">
      <h2>Carrito</h2>
      <i class="close icon" />
  </div>
</template>

<script>
export default {
    name: 'CartHeader',
    props:{
        closeCart:{
            type: Function
        }
    },
    setup(props, {emit}){

       
        return{
        }
    }

}
</script>

<style lang="scss" scoped>

.cart-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8em;
    border-bottom: solid black;
    padding: 10px 20px;
    p, i{
        margin: 0;
    }
    i:hover{
        cursor: pointer;
    }
}
</style>