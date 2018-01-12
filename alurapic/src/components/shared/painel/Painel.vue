<template>
    <div class="painel">
        <h2 class="painel-titulo" @click="visivel = !visivel">{{ titulo }}</h2>
        <transition name="painel-fade">
          <div class="painel-conteudo" v-show="visivel">
              <slot></slot>
          </div>
        </transition>
    </div>
</template>

<script>
  export default {
    props: ['titulo'],
    data () {
      return {
        visivel: true
      }
    }
  }
</script>

<style scoped>
  .painel {
      padding: 0 auto;
      border: solid 1px grey;
      display: inline-block;
      margin: 5px;
      max-width: 200px;
      min-height: 320px;
      height: 100%;
      vertical-align: top;
      text-align: center;
      border-radius: 5px;
  }

  .painel .painel-titulo {
      text-align: center;
      min-height: 50px;
      background: rgba(11, 11, 110, 0.842);
      color: white;
      margin: 0 0 15px 0;
      padding: 10px;
  }

  .painel-fade-enter, .painel-fade-leave-active {
    opacity: 0;
  }
  .painel-fade-enter-active, .painel-fade-leave-active {
    transition: opacity .4s;
  }
</style>

// /*Antes do elemento ser incluido ou removido, o estado atual*/
// .painel-fade-enter { }
// /*Quando o elemento está sendo incluído*/
// .painel-fade-enter-active { }
// /*Quando o elemento está sendo removido*/
// .painel-fade-leave-active { }
