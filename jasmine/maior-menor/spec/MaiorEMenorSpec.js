describe ('Maior e Menor', function () {
    it ('deve entender numeros em ordem não sequencial', function () {
        let obj = new MaiorEMenor();
        obj.encontra([4,6,1,3,9]);
        expect(obj.maior).toEqual(9);
        expect(obj.menor).toEqual(1);
    });
    it ('deve entender numeros em ordem crescente', function () {
        let obj = new MaiorEMenor();
        obj.encontra([1,2,3,4,5,6]);
        expect(obj.maior).toEqual(6);
        expect(obj.menor).toEqual(1);
    });
    it ('deve entender numeros em ordem decrescente', function () {
        let obj = new MaiorEMenor();
        obj.encontra([6,5,4,3,2,1]);
        expect(obj.maior).toEqual(6);
        expect(obj.menor).toEqual(1);
    });
    it ('deve funcionar com apenas 1 elemento', function () {
        let obj = new MaiorEMenor();
        obj.encontra([1]);
        expect(obj.maior).toEqual(1);
        expect(obj.menor).toEqual(1);
    });
    it ('deve dar pau caso não seja passado um array', function () {
        let obj = new MaiorEMenor();
        expect(function () { obj.encontra(1) }).toThrowError(Error);
    });
});