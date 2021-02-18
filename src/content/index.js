import Vue from "vue";
import AppComponent from "./content.vue";

// Vue.component("app-component", AppComponent);



new Vue({
  el: "#contaniner",
  render: createElement => {
    return createElement(AppComponent);
  }
});
