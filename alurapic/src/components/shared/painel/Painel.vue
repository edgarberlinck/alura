<template>
    <div class="painel">
        <h2 class="painel-titulo">{{ titulo }}</h2>
        <div class="painel-conteudo">
            <slot></slot>
        </div>
    </div> 
</template>

<script>
export default {
  props: ['titulo']
}
</script>

<style scoped>
.painel {
    padding: 0 auto;
    border: solid 1px grey;
    display: inline-block;
    margin: 5px;
    max-width: 200px;
    min-height: 250px;
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

.imagem-responsiva {
    width: 100%;
}
</style>
