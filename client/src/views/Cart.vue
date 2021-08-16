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

      <button class="ui button primary fluid" v-if="products" @click="createOrder">Guardar pedido</button>
      <h3 v-if="!products">No tienes productos en el carrito</h3>
  </BasicLayout>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import jwtDecode from "jwt-decode";
import  BasicLayout from "@/components/layouts/BasicLayout";
import { getProductsCartApi, deleteAllProductCartApi, deleteCardApi } from "../api/card";
import { createOrderApi } from "../api/order";
import { getTokenApi } from "../api/token";


export default {
    name: 'Cart',
    components:{
        BasicLayout
    },
    setup(){

        let products = ref(null);
        const router = useRouter();

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

        const createOrder = async() =>{
            const data = {
                user: getIdUser(),
                totalPayment: getTotal(),
                data: products.value
            }
            try{
                const response = await createOrderApi(data)
                deleteCardApi();
                router.push("/orders")
            }catch(error){
                console.error(`Èrror: ${error}`)
            }
        }

        const getIdUser = () =>{
            const token = getTokenApi(); 
            const { id } = jwtDecode(token);

            return id;
        }

        return{
            products,
            getTotal,
            deleteAllProductCart,
            createOrder
            
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