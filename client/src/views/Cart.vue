<template>
  <BasicLayout>
      <h1>Carrito</h1>
      <table class="ui celled table" v-if="products">
          <thead>
              <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="product in products" :key="product.id">
                  <td>{{ product.title }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>{{ product.price }} €</td>
                  <td style="text-align: center">
                      <i class="close icon" @click="deleteAllProductCart(product.id)"></i>
                  </td>
              </tr>
              <tr>
                  <td></td>
                  <td>Total:</td>
                  <td colspan="2">{{ getTotal() }} €</td>
              </tr>
          </tbody>
      </table>

      <button class="ui button primary fluid" v-if="products">Guardar pedido</button>
      <h3 v-if="!products">No tienes productos en el carrito</h3>
  </BasicLayout>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import  BasicLayout from "@/components/layouts/BasicLayout";
import { getProductsCartApi, deleteAllProductCartApi } from "../api/card";

export default {
    name: 'Cart',
    components:{
        BasicLayout
    },
    setup(){

        let products = ref(null);

        const getProductsCart = async () =>{
            const response = await getProductsCartApi();
            products.value = response;
        }

        onBeforeMount(() =>{
            getProductsCart();
        })

        const getTotal = () =>{
            let totalTemp = 0;
            products.value.forEach(product => {
                totalTemp += product.price * product.quantity;
            });
            return totalTemp.toFixed(2);
        }

        const deleteAllProductCart = (IdProduct) =>{
            deleteAllProductCartApi(IdProduct);
            getProductsCart();
        }

        return{
            products,
            getTotal,
            deleteAllProductCart
            
        }
    }
}
</script>

<style lang="scss" scoped>
i{
    cursor: pointer;
    &:hover{
        color: red;
    }
}

</style>