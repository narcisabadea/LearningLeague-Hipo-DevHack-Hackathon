<template>
  <v-container>
    <div class="title">Tests</div>
    <div class="category-title">
      {{ getITCategory[0].category }}
    </div>
    <div class="category-tests">
      <v-card v-for="(item, index) in getITCategory" :key="index">
        <div class="box-item" @click="redirect(item.key)">
          <div class="title">{{ item.name }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </v-card>
    </div>
    <div class="category-title">
      {{ getITSoftwareCategory[0].category }}
    </div>
    <div class="category-tests">
      <v-card v-for="(item, index) in getITSoftwareCategory" :key="index">
        <div class="box-item" @click="redirect(item.key)">
          <div class="title">{{ item.name }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import router from "../plugins/router";
export default {
  name: "Tests",
  data: () => ({}),
  computed: {
    getQuizList() {
      return this.$store.getters.quizezData;
    },
    getITCategory() {
      return this.$store.getters.quizezData.filter(
        (item) => item.category === "IT"
      );
    },
    getITSoftwareCategory() {
      return this.$store.getters.quizezData.filter(
        (item) => item.category === "IT Software & Hardware"
      );
    },
  },
  methods: {
    redirect(key) {
      router.push("/tests/" + key);
    }
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
