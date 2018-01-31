describe('Paciente', () => {
    it ('deve calcular o imc', () => {
        let paciente = new Paciente('Edgar', 35, 120, 1.88);
        expect(paciente.imc()).toBe(120 / (1.88 * 1.88 ));
    })

    it ('deve calcular os batimentos', () => {
        let paciente = new Paciente ('Edgar', 35, 20, 1.88);
        expect(paciente.batimentos()).toEqual(35 * 365 * 24 * 60 * 80);
    })
});