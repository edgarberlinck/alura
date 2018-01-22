<template>
  <div>
    <h1 v-text="titulo" class="centralizado"></h1>
    <p v-if="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="serach" class="filtro" placeholder="Filtre pelo titulo" v-on:input="filtro = $event.target.value" >

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.alt">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale.animate="1.2" :src='foto.url'></imagem-responsiva>
          <router-link :to="{name: 'alterar', params: { id: foto._id }  }">
            <meu-botao tipo= "button" rotulo= "ALTERAR" confirmar=false />
          </router-link>
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

import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  directives: {
    'meu-transform': transform
  },

  data () {
    return {
      titulo: 'Alurapic',
      fotos: [],
      filtro: '',
      mensagem: ''
    }
  },

  created () {
    this.service = new FotoService(this.$resource);

    this.service.lista().then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
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
        this.service.apaga(foto._id)
          .then(() => {
                this.mensagem = `${foto.titulo} removida com sucesso`;
                let index = this.fotos.indexOf(foto);
                this.fotos.splice(index, 1);
              },
               err => {
                 console.log(err); this.mensagem = err.message
              }
          );
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
