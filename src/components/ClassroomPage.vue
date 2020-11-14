<template>
  <v-container>
    <div class="title">Classroom details</div>
    <div class="content">
      <div class="video-chat">
        <div class="video">video</div>
        <div class="chat">
          <div>old messages</div>
          <div class="new-comment">new</div>
        </div>
      </div>
      <div class="files">
        <div class="button-add"></div>
        <div class="files">
                <vue-dropzone
      v-if="upload"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      id="dropzone"
      v-on:vdropzone-success="uploadSuccess"
    >
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">
          ...or click to select a file from your computer
        </div>
      </div>
    </vue-dropzone>

    <v-row v-if="upload">
      <v-col cols="3">
        <v-subheader>Add a description for your file</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          counter
          maxlength="250"
          v-model="fileDescription"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="upload">
      <v-radio-group v-model="typeUpload">
        <v-radio label="Public" value="public"></v-radio>
        <v-radio
          label="For other teachers and students"
          value="student"
        ></v-radio>
        <v-radio label="Just for other teachers" value="professor"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row v-if="upload" class="btn-container">
      <v-btn @click="uploadDocument">Save</v-btn>
    </v-row>
          <div v-if="filteredItems.length > 0">
            <div
              v-for="(item, index) in filteredItems"
              :key="index"
              class="result-item"
            >
              <v-card v-if="!upload">
                <v-row class="card-container">
                  <v-col md="10">
                    <v-card-title class="item-name">
                      {{ item.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ item.description }}
                    </v-card-subtitle>
                    <v-card-text>
                      <div v-if="item.userId">
                        Uploaded by {{ getUserName(item.userId) }}
                      </div>
                    </v-card-text>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn
                      class="download-btn"
                      fab
                      x-small
                      @click="downloadDoc(item, index)"
                    >
                      <v-icon dark>
                        mdi-download
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
          <div v-if="filteredItems.length <= 0">
            No items found
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import firebase from "../plugins/firebase";
export default {
  name: "ClassroomPage",
  data() {
    return {
      id: this.$route.params.id,
      classroomDetails: "",
      upload: false,
      fileDescription: "",
      fileDetails: "",
      typeUpload: "",
      inputData: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 100,
        addRemoveLinks: true,
        maxFiles: 1,
      },
    };
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  created() {
    this.classroomDetails = Object.values(
      this.$store.getters.classroomsData
    ).filter((item) => item.key === this.id)[0];
  },
  computed: {
    getDocumentList() {
      return this.$store.getters.uploadsData;
    },
    filteredItems() {
      return Object.values(this.getDocumentList).filter(
        (item) =>
          item.name.toLowerCase().includes(this.inputData.toLowerCase()) ||
          item.description.toLowerCase().includes(this.inputData.toLowerCase())
      );
    },
    userDetails() {
      return this.$store.getters.userDetails;
    },
    usersData() {
      return this.$store.getters.usersData;
    },
  },
  methods: {
    uploadSuccess: function(file) {
      this.fileDetails = file;
      console.log(file);
    },
    getUserName(userId) {
      return this.usersData
        ? this.usersData.filter((item) => item.key === userId)[0].name
        : "";
    },
    uploadDocument() {
      const selectedFile = this.fileDetails;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.ImageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.ImageUrl = selectedFile;
      const storageRef = firebase
        .storage()
        .ref("Documents/" + this.fileDetails.name);
      const uploadTask = storageRef.put(selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("succes");
          var downloadURL = uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              firebase
                .database()
                .ref("uploads/")
                .push({
                  downloadLink: downloadURL,
                  description: this.fileDescription,
                  name: this.fileDetails.name,
                  dateUpload: new Date(),
                  userId: this.userDetails.name,
                  downloads: 0,
                  type: this.typeUpload,
                  downloadsProfessors: 0,
                  downloadsStudents: 0,
                });
              console.log("File available at", downloadURL);
            });
          this.Image = downloadURL;
        }
      );
    },
    downloadDoc(item, index) {
      firebase
        .database()
        .ref("uploads/" + index)
        .update({
          downloads: item.downloads ? item.downloads + 1 : 1,
        });
      if (this.userDetails && this.userDetails.type) {
        if (this.userDetails.type === "professor") {
          firebase
            .database()
            .ref("uploads/" + index)
            .update({
              downloadsProfessors: item.downloadsProfessors
                ? item.downloadsProfessors + 1
                : 1,
            });
        }
        if (this.userDetails.type === "student") {
          firebase
            .database()
            .ref("uploads/" + index)
            .update({
              downloadsStudents: item.downloadsStudents
                ? item.downloadsStudents + 1
                : 1,
            });
        }
      }

      window.open(item.downloadLink, "_blank");
    },
  },
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
