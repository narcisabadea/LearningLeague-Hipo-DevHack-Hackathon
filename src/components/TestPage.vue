<template>
  <v-container>
      <h1>Test</h1>
      {{ quizData | json }}
  </v-container>
</template>

<script>
  export default {
    name: 'TestPage',
    data() {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      quizData() {
        return this.$store.getters.quizezData.filter(item => item.key === this.id)[0];
      }
    }
  }
</script>

