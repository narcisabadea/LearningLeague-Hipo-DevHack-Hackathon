<template>
  <v-container>
       <div class="title">Tests</div>

       
  </v-container>
</template>

<script>
  export default {
    name: 'Tests',
    data: () => ({
 
    }),
    computed: {
      getQuizList() {
      return this.$store.getters.quizezData;
    },
    }
  }
</script>

<style scoped>
.title {
  font-family: "dancingscript" !important;
  font-size: 2rem !important;
  padding-bottom: 5px;
  font-weight: bold;
}
</style>

