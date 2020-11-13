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

    <v-row  v-if="upload">
      <v-col cols="3">
        <v-subheader>Add a description for your file</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field counter maxlength="60"></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="upload" class='btn-container'>
      <v-btn>Save</v-btn>
    </v-row>



  </v-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "Search",
  data: () => ({
    upload: false,
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
  methods: {
    uploadSuccess: function(file, response) {
      console.log(file, response);
    },
  },
};
</script>

<style scoped>
.bar-container {
  display: flex;
  margin-bottom: 30px ;
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
</style>
