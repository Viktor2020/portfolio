<template>
  <div id="app" v-cloak>
    <Hero></Hero>
    <About></About>
    <Skills></Skills>
    <!-- <Experience></Experience> -->
    <Projects></Projects>
    <Contact></Contact>
  </div>
</template>

<script>
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default {
  name: 'App',
  components: {
    Hero,
    About,
    Skills,
    Experience,
    Projects,
    Contact
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #5055df;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$purple: #6c3483;
$light-blue-green: #5055df;
$light-dark: #8f92eb;
$lighter-dark: #9f9f9f;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  ),
  "purple": (
    $purple,
    $white
  ),
  "light-blue-green": (
    $light-blue-green,
    $white
  ),
  "light-dark": (
    $light-dark,
    $white
  ),
  "lighter-dark": (
    $lighter-dark,
    $white
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "Ubuntu", sans-serif;
}
.w100 {
  font-family: "Lato", sans-serif;
  font-weight: 100;
}

.w300 {
  font-family: "Lato", sans-serif;
  font-weight: 300;
}

.w400 {
  font-family: "Lato", sans-serif;
  font-weight: 400;
}

.bold-tag {
  font-size: 0.8rem;
  font-weight: 500;
}

.underline:after {
  content: " ";
  display: block;
  width: 60px;
  margin: auto;
  margin-top: 0px;
  border: 3px solid $light-blue-green;
}
</style>
