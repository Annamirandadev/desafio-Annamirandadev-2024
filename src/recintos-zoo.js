class RecintosZoo {
    constructor() {
    
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "MACACO", quantidade: 3, espacoOcupado: 3 }] },
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "GAZELA", quantidade: 1, espacoOcupado: 2 }] },
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "LEAO", quantidade: 1, espacoOcupado: 3 }] }
        ];

        this.animaisHabilitados = {
            "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
            "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
            "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
            "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
            "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        // Validação de entrada
        if (!this.animaisHabilitados[animal]) {
            return { erro: "Animal inválido" };
        }
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, bioma, carnivoro } = this.animaisHabilitados[animal];
        const espacoNecessario = tamanho * quantidade;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const espacoDisponivel = recinto.tamanhoTotal - recinto.animais.reduce((acc, a) => acc + a.espacoOcupado, 0);
            const animaisExistentes = recinto.animais.length;
            const biomaAdequado = bioma.includes(recinto.bioma) || (animal === "HIPOPOTAMO" && recinto.bioma === "savana e rio");

            if (!biomaAdequado) continue;
            
            if (espacoDisponivel < espacoNecessario + (animaisExistentes > 0 ? 1 : 0)) continue;

            const recintoCarnivoro = recinto.animais.some(a => this.animaisHabilitados[a.especie].carnivoro);
            const mesmoTipoCarnivoro = carnivoro && recintoCarnivoro && recinto.animais.every(a => a.especie === animal);
            const macacoSozinho = animal === "MACACO" && animaisExistentes === 0;
            const recintoMacacoComOutros = recinto.animais.some(a => a.especie === "MACACO") && animal !== "MACACO";

            if ((carnivoro && !mesmoTipoCarnivoro) || macacoSozinho || (recintoMacacoComOutros && carnivoro)) continue;

            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario - (animaisExistentes > 0 ? 1 : 0)} total: ${recinto.tamanhoTotal})`);
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
