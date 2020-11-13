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
    },
  }),
};
</script>
