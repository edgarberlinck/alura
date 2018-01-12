<template>
  <div>
    <h1 v-text="titulo" class="centralizado"></h1>
    <input type="serach" class="filtro" placeholder="Filtre pelo titulo" v-on:input="filtro = $event.target.value" >

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.alt">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform.reverse.animate="45" :src='foto.url'></imagem-responsiva>
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            :confirmacao="true"
            estilo="perigo"
            @botaoAtivado="remove(foto)" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagemResponsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  data () {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: ''
    }
  },

  created () {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log);
  },

  computed: {
    fotosComFiltro () {
      if (this.filtro === "") return this.fotos;

      let exp = new RegExp(this.filtro.trim(), 'i');
      return this.fotos.filter (foto => exp.test(foto.titulo));
    }
  },
  methods: {
    remove(foto) {
        alert('Remover ' + foto.titulo);
    }
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none
  }

  .lista-fotos .lista-fotos-item {
    display: inline;
  }

  .filtro {
    display: block;
    width: 75vw;
    padding: 10px;
    margin-left: 44px;
  }
</style>
