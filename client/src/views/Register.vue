<template>
<BasicLayout>
  <div class="register">
  <h1>Register</h1>
  <form class="ui form" @submit.prevent="onRegister">
    <div class="field">
      <input 
        type="text" 
        placeholder="Nombre de usuario" 
        v-model="formData.name"
        :class="{error: formError.name}"/>
    </div>
    <div class="field">
      <input 
        type="text" 
        placeholder="Correo electrónico" 
        v-model="formData.email"
        :class="{error: formError.email}"/>
    </div>
    <div class="field">
      <input 
        type="password" 
        placeholder="Contraseña" 
        v-model="formData.password"
        :class="{error: formError.password}"/>
    </div>
    <button type="submit" class="ui button fluid primary">Crear usuario</button>
  </form>
   <router-link to="/login">
    Iniciar sesión
  </router-link>
  </div>
</BasicLayout>
</template>

<script>
import { ref } from 'vue';
import * as Yup from "yup";
import BasicLayout from "@/components/layouts/BasicLayout"

export default {
    name: 'Register',
    components:{
        BasicLayout
    },
    setup(){
      let formData = ref({});
      let formError = ref({});

      const shemaForm = Yup.object().shape({
        name: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
      })

      const onRegister = async () =>{
        formError.value = {};
        try{
          await shemaForm.validate(formData.value, { abortEarly: false });
        }catch(error){
          error.inner.forEach((err) =>{
            formError.value[err.path] = err.message
          })
          console.error(`Error: ${error}`)
        }
      }


      return{
        formData,
        formError,
        onRegister,
      }
    }

}
</script>

<style lang="scss" scoped>

.register{
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