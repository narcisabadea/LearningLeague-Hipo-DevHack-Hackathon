<template>
  <v-container>
    <h1>Search or upload documents</h1>

    <div class="bar-container">
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <v-btn text @click="upload = !upload">
        <span class="mr-2">Upload</span>
      </v-btn>
    </div>

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

    <div
      v-for="(item, index) in filteredItems"
      :key="index"
      class="result-item"
    >
      <v-card v-if="!upload">
        <v-row class="card-container">
          <v-col md="10">
            <v-card-title>
              {{ item.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.description }}
            </v-card-subtitle>
            <v-card-text>
              <div v-if="item.userId">Uploaded by {{ usersData ? usersData[item.userId].name : '' }}</div><div v-if="item.dateUpload"> on {{ item.dateUpload }}</div>
            </v-card-text>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="2">
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              fab
              x-small
              @click="downloadDoc(item, index)"
            >
              <v-icon dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
            <v-btn color="blue-grey" class="ma-2 white--text" fab x-small>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import firebase from "../plugins/firebase";
export default {
  name: "Search",
  data: () => ({
    upload: false,
    fileDescription: "",
    fileDetails: "",
    typeUpload: "",
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 100,
      addRemoveLinks: true,
      maxFiles: 1,
    },
  }),
  components: {
    vueDropzone: vue2Dropzone,
  },
  computed: {
    getDocumentList() {
      return this.$store.getters.uploadsData;
    },
    filteredItems() {
      return this.getDocumentList;
    },
    userDetails() {
      return this.$store.getters.userDetails;
    },
    usersData() {
      return this.$store.getters.usersData;
    }
  },
  methods: {
    uploadSuccess: function(file) {
      this.fileDetails = file;
      console.log(file);
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
.bar-container {
  display: flex;
  margin-bottom: 30px;
}
.dropzone-custom-content {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}
.subtitle {
  color: #314b5f;
}
.btn-container {
  justify-content: center;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropzone-custom-title {
  color: var(--primary);
}
</style>
