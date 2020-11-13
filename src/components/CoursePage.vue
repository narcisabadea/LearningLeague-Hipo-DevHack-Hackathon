<template>
  <v-container>
    <div class="title">Course details</div>

    <v-card v-if="courseDetails.length > 0">
      <v-row class="card-container">
        <v-col md="10">
          <v-card-title class="item-name">
            {{ courseDetails[0].name }}
          </v-card-title>
          <v-card-subtitle>
            {{ courseDetails[0].description }}
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row class="btn-container">
        <v-btn
          class="add-btn"
          @click="showForm = !showForm"
          v-if="getUserDetails.name === courseDetails[0].userId"
          >Add chapter</v-btn
        >
      </v-row>

      <div v-if="showForm">
        <v-row>
          <v-col md="10">
            <v-text-field v-model="chapterDetails.title" label="Chapter title">
            </v-text-field>
            <v-text-field
              v-model="chapterDetails.theory"
              label="Chapter theory"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="btn-container">
          <v-btn class="add-btn" @click="saveChapter">Save</v-btn>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "../plugins/firebase";
export default {
  name: "CoursePage",
  data() {
    return {
      id: this.$route.params.id,
      courseDetails: "",
      addChapter: false,
      showForm: false,
      chapterDetails: {
        title: "",
        theory: "",
      },
    };
  },
  computed: {
    getUserDetails() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
    saveChapter() {
      firebase
        .database()
        .ref("courses/")
        .push({
          title: this.chapterDetails.title,
          theory: this.chapterDetails.theory,
        })
        .then(() => {
          this.showForm = false;
        });
    },
  },
  created() {
    this.courseDetails = Object.values(this.$store.getters.coursesData).filter(
      (item) => item.name === this.id
    );
  },
};
</script>
<style scoped>
.title {
  font-family: "dancingscript" !important;
  font-size: 2rem !important;
  padding-bottom: 30px;
  font-weight: bold;
}
.btn-container {
  justify-content: center;
}
.add-btn {
  background-color: var(--primary) !important;
  color: var(--light-text);
  margin-bottom: 20px;
}
.item-name {
  color: var(--dark-text) !important;
  margin-bottom: 10px;
}
</style>
