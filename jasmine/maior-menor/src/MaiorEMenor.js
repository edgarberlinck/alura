class MaiorEMenor {
    encontra (values) {
        if (!(values instanceof Array)) throw new Error('This input should be an Array')
        if (values.length === 0) return

        let menor = Number.MAX_VALUE;
        let maior = Number.MIN_VALUE;

        values.forEach(v => {
            if (v < menor) menor = v;
            if (v > maior) maior = v;
        });

        this.menor = menor;
        this.maior = maior;
    }

    maior () { return this.maior };
    menor () { return this.menor };
}