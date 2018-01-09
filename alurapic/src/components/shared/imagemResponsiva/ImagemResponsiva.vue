<template>
  <img class="imagem-responsiva" :src='url'>
</template>

<script>
export default {
  props: ['url']
}
</script>

<style>
  .imagem-responsiva {
      width: 100%;
  }
</style>
