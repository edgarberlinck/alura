class Consulta {
    constructor (paciente, procedimentos, particular, retorno) {
        this.paciente = paciente; 
        this.procedimentos = procedimentos; 
        this.particular = particular; 
        this.retorno = retorno;    
    }

    preco () {
        if(this.retorno) return 0;

            let precoFinal = 0;

            this.procedimentos.forEach(procedimento => {
                if("raio-x" === procedimento) precoFinal += 55;
                else if("gesso" === procedimento) precoFinal += 32;
                else precoFinal += 25;
            });

            if(this.particular) precoFinal *= 2;

            return precoFinal;
    }
}