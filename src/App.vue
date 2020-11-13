<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>

      <v-btn
        text
        @click="dialogLoginForm.showDialog = !dialogLoginForm.showDialog"
      >
        <span class="mr-2">Login</span>
      </v-btn>

      <v-dialog v-model="dialogLoginForm.showDialog" max-width="40vw">
        <v-card elevation="2" shaped>
          <v-card-title>
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="dialogLoginForm.email" label="Username">
            </v-text-field>
            <v-text-field
              v-model="dialogLoginForm.password"
              label="Password"
              :type="dialogLoginForm.show ? 'text' : 'password'"
              @click:append="dialogLoginForm.show = !dialogLoginForm.show"
            >
            </v-text-field>
            <v-checkbox
              v-model="dialogLoginForm.checkbox"
              label="Login as teacher"
            ></v-checkbox>
          </v-card-text>
          <v-container grid-list-sm>
            <v-btn type="submit">
              Login
            </v-btn>
          </v-container>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    dialogLoginForm: {
      showDialog: false,
      email: "",
      password: "",
      menu: false,
      show: false,
      checkbox: true,
    },
  }),
  created() {
    this.$store.dispatch("getCoursesData");
    this.$store.dispatch("getClassroomsData");
    this.$store.dispatch("getUsersData");
    this.$store.dispatch("getUploadsData");
    this.$store.dispatch("getQuizezData");
  }
};
</script>
<style>
:root {
  --primary: #4697ff;
  --primary-low-opacity: #4697ff6b;
  --background-light: #eceef4;
  --background-white: white;
  --light-text: #afb5c6;
  --dark-text: #282e3c;
}
@font-face {
  font-family: "dancingscript";
  src: url("../src/assets/font-files/dancingscript/dancingscript-variablefont_wght-webfont.woff2")
      format("woff2"),
    url("../src/assets/font-files/dancingscript/dancingscript-variablefont_wght-webfont.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "eliseregular";
  src: url("../src/assets/font-files/eliseregular/elsie-regular-webfont.woff2")
      format("woff2"),
    url("../src/assets/font-files/eliseregular/elsie-regular-webfont.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "robotoregular";
  src: url("../src/assets/font-files/robotoregular/roboto-regular-webfont.woff2")
      format("woff2"),
    url("../src/assets/font-files/robotoregular/roboto-regular-webfont.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
.v-main__wrap {
  background-color: var(--background-light);
}
.v-application--wrap {
  color: var(--dark-text);
}
</style>
