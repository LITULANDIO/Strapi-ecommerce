<template>
<BasicLayout>
  <div class="login">
    <h1>Iniciar sesión</h1>
    <form class="ui form" @submit.prevent="login">
      <div class="field">
        <input 
          type="text" 
          placeholder="Nombre de usuario" 
          v-model="formData.identifier"
          :class="{error: formError.identifier}"/>
      </div>
      <div class="field">
        <input 
          type="password" 
          placeholder="Contraseña" 
          v-model="formData.password"
          :class="{error: formError.password}">
      </div>
      <button type="submit" class="ui button fluid primary">Entrar</button>
    </form>
  <router-link to="/register">
    Crear cuenta
  </router-link>
  </div>
</BasicLayout>
</template>

<script>
import { ref } from "vue";
import * as Yup from "yup";
import BasicLayout from "@/components/layouts/BasicLayout"

export default {
    name: 'Login',
    components:{
        BasicLayout
    },
    setup(){
      let formData = ref({});
      let formError = ref({});
      let loading = ref(false);

      const shemaForm = Yup.object().shape({
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
      })

      const login = async () =>{
        formError.value = {};
        try{
          await shemaForm.validate(formData.value, { abortEarly: false })
          console.log(shemaForm)
        }catch(error){
          error.inner.forEach((err) =>{
            formError.value[err.path] = err.message
          })
        }
      }

      return{
        formData,
        formError,
        loading,
        login
      }
    }

}
</script>

<style lang="scss" scoped>
.login{
  text-align: center;
  > h2{
    margin: 50px 0 30px 0;
  }

  .ui.form{
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;
    input.error{
      border-color: #faa;
      background-color: #ffeded;
      }
  }
}

</style>