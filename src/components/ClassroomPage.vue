<template>
  <v-container>
    <div class="title">Classroom details</div>
  </v-container>
</template>

<script>
export default {
  name: "ClassroomPage",
  data() {
    return {
      id: this.$route.params.id,
      classroomDetails: ''
    };
  },
    created() {
      this.classroomDetails = Object.values(this.$store.getters.classroomsData).filter(item => item.key === this.id)[0]
    }
};
</script>
<style scoped>
.title {
  font-family: "dancingscript" !important;
  font-size: 2rem !important;
  padding-bottom: 5px;
  font-weight: bold;
}
</style>
