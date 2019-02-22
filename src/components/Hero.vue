<template>
  <div id="hero">
    <nav
      class="navbar is-fixed-top is-transparent"
      style="box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2);"
    >
      <div class="navbar-brand">
        <a class="navbar-item" v-smooth-scroll="{duration: 1000}" href="#hero">Viktor Kostraba</a>
        <div
          class="navbar-burger burger"
          onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');"
          data-target="navbarExampleTransparentExample"
        ></div>
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="navbar-item underline" v-smooth-scroll="{duration: 1000}" href="#about">About</a>
            <a
              class="navbar-item underline"
              v-smooth-scroll="{duration: 1000}"
              href="#skills"
            >Skills</a>
            <!-- <a
              class="navbar-item underline"
              v-smooth-scroll="{duration: 1000}"
              href="#experience"
            >Experience</a>-->
            <a
              class="navbar-item underline"
              v-smooth-scroll="{duration: 1000}"
              href="#projects"
            >Projects</a>
            <a
              class="navbar-item underline"
              v-smooth-scroll="{duration: 1000}"
              href="#contact"
            >Contact</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="hero">
      <div id="container"></div>
      <div class="overlay" id="overlay">
        <div class="homeContent">
          <a
            href="mailto:viktorkostraba@gmail.com"
            class="bold-tag tag is-light-dark w300 is-size-8"
          >viktorkostraba@gmail.com</a>
          <h1 class="w300 is-size-2">Viktor Kostraba</h1>
          <h1 class="w300 is-size-5">Webgl 2d | 3d Developer</h1>
        </div>
        <a class="scroll-down" v-smooth-scroll="{duration: 1000}" href="#about"></a>
      </div>
    </div>
  </div>
</template>

<script>
import App3D from "../app/App3D";

export default {
  methods: {},
  mounted() {
    new App3D();
    var container = document.getElementById("overlay");
    container.style.width = window.innerWidth + "px";
    container.style.height = window.innerHeight + "px";
    window.addEventListener(
      "resize",
      function() {
        container.style.width = window.innerWidth + "px";
        container.style.height = window.innerHeight + "px";
      },
      false
    );
  }
};
</script>

<style scoped>
.scroll-down {
  opacity: 1;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -16px;
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid #ffffff;
  background-size: 14px auto;
  border-radius: 50%;
  z-index: 2;
  -webkit-animation: bounce 2s infinite 2s;
  animation: bounce 2s infinite 2s;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  transform: scale(1);
}

.scroll-down:before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid #ffffff;
  border-width: 0px 0 2px 2px;
}

@keyframes bounce {
  0%,
  100%,
  20%,
  50%,
  80% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  60% {
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
  }
}

.homeContent {
  position: relative;
  top: 30vh;
  left: 10vw;
}
#container {
  position: absolute;
}
.round {
  width: 190px;
  border-radius: 50%;
}
.hero {
  position: relative;
  display: block;
  overflow: hidden;
}

.overlay {
  position: relative;
  display: block;
  overflow: hidden;
}

h1 {
  color: white;
}

.underline {
  display: inline;
  position: relative;
  overflow: hidden;
}
.underline:after {
  content: "";
  position: absolute;
  z-index: -1;
  right: 0;
  left: 150px;
  width: 0;
  bottom: -5px;
  height: 7px;
  transition-property: width;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}
.underline:hover:after,
.underline:focus:after,
.underline:active:after {
  left: 0px;
  right: auto;
  width: 100%;
}

#nav-toggle-state {
  display: none;
}

#nav-toggle-state:checked ~ .nav-menu {
  display: block;
}
</style>
