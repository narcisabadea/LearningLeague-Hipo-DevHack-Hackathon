<template>
  <v-container>
   <div class='box-container'>
     <div class='box-item' @click="redirect('search')">
       Search or upload docs</div>
      <div class='box-item' @click="redirect('chat')">Chat</div>
       <div class='box-item' @click="redirect('classroom')">Classroom</div>
        <div class='box-item' @click="redirect('courses')">Courses</div>
   </div>
  </v-container>
</template>

<script>
import router from "../plugins/router";
  export default {
    name: 'HelloWorld',
    data: () => ({
 
    }),
    methods: {
      redirect(param) {
        console.log(param)
        router.push('/'+param)
      }
    }
  }
</script>

<style scoped>
.box-container {
  display: flex;
}
.box-item {
  border: 1px solid red
}
</style>
