class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['LEAO'] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) return { erro: "Animal inválido" };
        if (quantidade <= 0) return { erro: "Quantidade inválida" };

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const tamanhoTotalRequerido = tamanho * quantidade;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const { numero, bioma, tamanhoTotal, animaisExistentes } = recinto;
           
            if (!biomas.includes(bioma) && !(animal === 'HIPOPOTAMO' && bioma.includes('savana') && bioma.includes('rio'))) continue;
            
            if (carnivoro && animaisExistentes.some(a => a !== animal)) continue;
            
            let espacoOcupado = animaisExistentes.reduce((acc, a) => acc + this.animais[a].tamanho, 0);
            
            if (animaisExistentes.length > 0 && !carnivoro) espacoOcupado += 1; 

            let espacoLivre = tamanhoTotal - espacoOcupado;
            
            if (espacoLivre < tamanhoTotalRequerido) continue;

            if (animal === 'MACACO' && animaisExistentes.length === 0 && espacoLivre < tamanhoTotalRequerido + 1) continue;

            recintosViaveis.push(`Recinto ${numero} (espaço livre: ${espacoLivre - tamanhoTotalRequerido} total: ${tamanhoTotal})`);
        }

        
        recintosViaveis.sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0], 10);
            const numB = parseInt(b.match(/\d+/)[0], 10);
            return numA - numB;
        });

        
        if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };