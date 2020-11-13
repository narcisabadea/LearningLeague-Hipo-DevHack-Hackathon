<template>
  <v-container>
    <div class="box-container">
      <div class="box-item" @click="redirect('search')">
        <div class="title">Search / Upload</div>
        <div class="description">search or upload documents</div>
      </div>
      <div class="box-item" @click="redirect('chat')">
        <div class="title">Chat</div>
        <div class="description">chat with other people</div>
      </div>
      <div class="box-item" @click="redirect('classroom')">
        <div class="title">Classroom</div>
        <div class="description">Enter a classroom</div>
      </div>
      <div class="box-item" @click="redirect('courses')">
        <div class="title">Courses</div>
        <div class="description">view courses documentation</div>
      </div>
      <div class="box-item" @click="redirect('tests')">
        <div class="title">Tests</div>
        <div class="description">take tests</div>
      </div>
    </div>
  </v-container>
</template>

<script>
import router from "../plugins/router";
export default {
  name: "HelloWorld",
  data: () => ({}),
  methods: {
    redirect(param) {
      console.log(param);
      router.push("/" + param);
    },
  },
};
</script>

<style scoped>
.box-container {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
.box-item {
  border: 1px solid var(--primary);
  flex: 0 0 25%;
  margin: 10px;
  padding: 30px;
  background-color: var(--background-white);
  flex-flow: column;
  text-align: -webkit-center;
  cursor: pointer;
}
.box-item:hover {
  box-shadow: 0px 2px 10px var(--primary-low-opacity);
}
.description {
  text-align: center;
  color: var(--light-text);
}
.title {
  text-align: -webkit-center;
  padding-bottom: 5px;
  font-family: "dancingscript" !important;
  font-weight: bold;
  font-size: 2rem !important;
}
</style>
