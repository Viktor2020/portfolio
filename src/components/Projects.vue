<template>
  <div id="projects">
    <section class="section" style="background: #FAFAFA;">
      <div style="width:100%;">
        <div class="has-text-centered">
          <span class="underline heading is-size-2 w300">Projects</span>
        </div>
        <div class="columns is-multiline center" style="margin-top:0px; ">
          <div v-for="(value) in projects" :key="value.id" v-bind:class="width_class">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <span class="subtitle is-size-4">{{value.name}}</span>
                  <p class="has-text-grey">{{value.desc}}</p>
                  <div class="has-text-centered">
                    <a
                      v-if="value.link"
                      class="button is-outlined"
                      target="_blank"
                      :href="value.link"
                    >View Project</a>
                  </div>
                  <div class="tags" style="margin-top:10px">
                    <span
                      v-for="(value) in value.tech"
                      :key="value.id"
                      class="tag is-light-blue-green bold-tag"
                    >{{value}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import projectsData from "../data/projects.json";
export default {
  data() {
    return {
      width_class: "column is-one-third",
      windowWidth: 0,
      projects: projectsData
    };
  },

  watch: {
    windowWidth(newWidth, oldWidth) {
      if (newWidth < 1151) {
        this.width_class = "column is-half";
      }
      if (newWidth > 1150) {
        this.width_class = "column is-one-third";
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};
</script>

<style scoped>
.center {
  position: relative;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  /* width: 100px; Need a specific value to work */
}

.card {
  border-radius: 3px;
  border-left: 4px solid transparent;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card:hover {
  border-left: 4px solid #161dd2;
  transition: 0.7s ease;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
