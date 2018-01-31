describe ('Consulta', () => {
    it ('não deve cobrar por retorno', () => {
        let paciente = new Paciente('Edgar', 35, 120, 1.88);
        let consulta = new Consulta(paciente, [], true, true);
        expect(consulta.preco()).toEqual(0);
    });

    it ('deve cobrar 25 por cada procedimento', () => {
        let paciente = new Paciente('Edgar', 35, 120, 1.88);
        let procedimentos = ['proc1', 'proc2'];
        let consulta = new Consulta(paciente, procedimentos, false, false);
        expect(consulta.preco()).toEqual(procedimentos.length * 25);
    })
    
    it ('deve cobrar o dobro se for particular', () => {
        let paciente = new Paciente('Edgar', 35, 120, 1.88);
        let procedimentos = ['proc1', 'proc2'];
        let consulta = new Consulta(paciente, procedimentos, true, false);
        expect(consulta.preco()).toEqual(procedimentos.length * 25 * 2);
    })

    it ('deve cobrar o dobro se for particular, mesmo com procedimentos especiais', () => {
        let paciente = new Paciente('Edgar', 35, 120, 1.88);
        let procedimentos = ['proc1', 'proc2', 'raio-x'];
        let consulta = new Consulta(paciente, procedimentos, true, false);
        expect(consulta.preco()).toEqual((55 + 25 + 25) * 2);
    })
});