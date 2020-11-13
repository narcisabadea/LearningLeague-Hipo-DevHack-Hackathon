<template>
  <v-container>
    <div class="title">Course details</div>
  </v-container>
</template>

<script>
export default {
  name: "CoursePage",
  data() {
    return {
      id: this.$route.params.id,
      courseDetails: ''
    };
  },
    created() {
      this.courseDetails = Object.values(this.$store.getters.coursesData).filter(item => item.name === this.id)
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
