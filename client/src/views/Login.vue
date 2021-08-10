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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import BasicLayout from "@/components/layouts/BasicLayout";
import { loginApi } from "../api/user";
import { setTokenApi, getTokenApi } from "../api/token";

export default {
    name: 'Login',
    components:{
        BasicLayout
    },
    setup(){
      let formData = ref({});
      let formError = ref({});
      let loading = ref(false);
      const router = useRouter();
      const token = getTokenApi();

      onMounted(() =>{
        if(token) return router.push("/")
      })

      const shemaForm = Yup.object().shape({
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
      })

      const login = async () =>{
        formError.value = {};
        try{
          await shemaForm.validate(formData.value, { abortEarly: false })
          console.log(shemaForm)
          try{
            const response = await loginApi(formData.value);
            if(!response?.jwt) throw "El usuario o contraseña no son válidos"
            console.log(response)
            router.push("/")
            setTokenApi(response.jwt);
          }catch(error){
            console.error(`Error formData: ${error}`)
          }
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