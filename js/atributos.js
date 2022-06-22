incluirEntradaDeDadosInput();
function incluirEntradaDeDadosInput (){
    const selecionaIdAtributos = document.getElementById("atributos");
    const selecionaInputDeAtributos = selecionaIdAtributos.querySelectorAll("input[type=number]");
    for(let contador = 0; contador < selecionaInputDeAtributos.length; contador++){
        selecionaInputDeAtributos[contador].addEventListener("input", function (){            
            let inputSelecionadoDoAtributo = selecionaInputDeAtributos[contador];
            calcularValorTotalDoAtributo(inputSelecionadoDoAtributo);
        });
    }   
}

function calcularValorTotalDoAtributo(inputSelecionadoDoAtributo){
    let idDoAtributoDoInput = inputSelecionadoDoAtributo.parentElement.parentElement.id;    
    let valoresRecolhidosDoAtributo = lerValoresDoAtributo(idDoAtributoDoInput);
    let somaTotalDosValoresDoAtributo = somarValoresTotaisDoAtributo(valoresRecolhidosDoAtributo);
    atualizarValorTotalDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput);    
    calcularMediaBaseDoAtributo();    
};

function lerValoresDoAtributo(idDoAtributoDoInput){
    // referencia dos ids de valores dos atributos 
    //valorTotalDoAtributo|valorInvestido|valorTotalOutrasOrigens|valorTotalDaMediaBaseAtributo
    const nivelDeAtributo = document.getElementById(idDoAtributoDoInput).parentElement.id;    
    let retemValoresDoAtributo = [];

    if(nivelDeAtributo === "atributosPrimarios"){        
        retemValoresDoAtributo[0] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorInvestido").value;
        retemValoresDoAtributo[1] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalOutrasOrigens").textContent;                        
    } else if(nivelDeAtributo == "atributosSecundarios" || "atributosTerciarios"){        
        retemValoresDoAtributo[0] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorInvestido").value;
        retemValoresDoAtributo[1] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalOutrasOrigens").textContent;
        retemValoresDoAtributo[2] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalDaMediaBaseAtributo").textContent;        
    } else {
        alert("Erro ao tentar ler valores do atributo!");
    }
    
    return retemValoresDoAtributo;
}

function somarValoresTotaisDoAtributo(valoresRecolhidosDoAtributo){
    let somaDeValores = 0;
    for(let contador = 0; contador < valoresRecolhidosDoAtributo.length; contador++){
        somaDeValores = somaDeValores+parseInt(valoresRecolhidosDoAtributo[contador]);
    }
    let valorTotalDoAtributo = somaDeValores;
    return valorTotalDoAtributo;
}

function atualizarValorTotalDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput){
    let selecionaAtributo = document.querySelector(`#${idDoAtributoDoInput}`).querySelector("#valorTotalDoAtributo");
    selecionaAtributo.textContent = somaTotalDosValoresDoAtributo;    
};

function calcularMediaBaseDoAtributo(){
    let objetosSecTer = identificadorDeAtributosSecTer();    
    let retemValoresTotaisDosAtributosBaseSec = coletaValoresDataMediaDosAtributosSec(objetosSecTer[0]);
    calcularMediaSec(retemValoresTotaisDosAtributosBaseSec);
    let retemValoresTotaisDosAtributosBaseTer = coletaValoresDataMediaDosAtributosTer(objetosSecTer[1]);
    calcularMediaTer(retemValoresTotaisDosAtributosBaseTer);
}

function identificadorDeAtributosSecTer(){
    let selecionaIdAtributos = document.querySelector("#atributos");    
    let retemObjetosSecundarios = selecionaIdAtributos.querySelector("#atributosSecundarios").querySelectorAll("div");
    let retemObjetosTerciarios = selecionaIdAtributos.querySelector("#atributosTerciarios").querySelectorAll("div");
    let retemTodosOsAtributosSecTer = [retemObjetosSecundarios,retemObjetosTerciarios];    
    return retemTodosOsAtributosSecTer;
}

function coletaValoresDataMediaDosAtributosSec(objetosSecTer){
    let coletaValoresTotaisDosAtributosBase = [];
    let tabuladorDosValoresBase = [];
        for(let contador = 0; contador < objetosSecTer.length; contador++){
            let elementosBase = objetosSecTer[contador].getAttribute('data-media-base');
            let separaOsIdsDosAtributosBase = elementosBase.split("|");            
            let identificadorDeIdsAtributosSec = objetosSecTer[contador].id;            
            if(separaOsIdsDosAtributosBase.length === 2){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosSec;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;
                tabuladorDosValoresBase.push([coletaValoresTotaisDosAtributosBase[0],coletaValoresTotaisDosAtributosBase[1],coletaValoresTotaisDosAtributosBase[2]]);            
            } else {
                alert("Erro ao identificar os atributos Base Secundarios");
                return;
            }
        }    
    return tabuladorDosValoresBase;    
};

function calcularMediaSec(retemValoresTotaisDosAtributosBaseSec){
    let valoresIndividuaisBase = [];
    let mediaDosValoresBase;
    for (contador = 0; contador < retemValoresTotaisDosAtributosBaseSec.length; contador++){
        valoresIndividuaisBase[0] = parseInt(retemValoresTotaisDosAtributosBaseSec[contador][1]);
        valoresIndividuaisBase[1] = parseInt(retemValoresTotaisDosAtributosBaseSec[contador][2]);
        mediaDosValoresBase = Math.ceil((valoresIndividuaisBase[0]+valoresIndividuaisBase[1])/2);
        atualizarValoresDaMediaBase(mediaDosValoresBase, retemValoresTotaisDosAtributosBaseSec[contador][0]);
        //Necessario atualizar os valores totais dos atributos secundarios
        let valoresRecolhidosDoAtributo = lerValoresDoAtributo(retemValoresTotaisDosAtributosBaseSec[contador][0]);
        let somaTotalDosValoresDoAtributo = somarValoresTotaisDoAtributo(valoresRecolhidosDoAtributo);
        atualizarValorTotalDoAtributo(somaTotalDosValoresDoAtributo, retemValoresTotaisDosAtributosBaseSec[contador][0]);
    };
};

function coletaValoresDataMediaDosAtributosTer(objetosSecTer){
    let coletaValoresTotaisDosAtributosBase = [];
    let tabuladorDosValoresBase = [];
        for(let contador = 0; contador < objetosSecTer.length; contador++){
            let elementosBase = objetosSecTer[contador].getAttribute('data-media-base');
            let separaOsIdsDosAtributosBase = elementosBase.split("|");            
            let identificadorDeIdsAtributosTer = objetosSecTer[contador].id;            
            if(separaOsIdsDosAtributosBase.length === 3){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosTer;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[3] = document.querySelector(`#${separaOsIdsDosAtributosBase[2]}`).querySelector("#valorTotalDoAtributo").textContent;
                tabuladorDosValoresBase.push([coletaValoresTotaisDosAtributosBase[0],coletaValoresTotaisDosAtributosBase[1],coletaValoresTotaisDosAtributosBase[2],coletaValoresTotaisDosAtributosBase[3]]);            
            } else {
                alert("Erro ao identificar os atributos Base Secundarios");
                return;
            }
        }    
    return tabuladorDosValoresBase;    
};

function calcularMediaTer(retemValoresTotaisDosAtributosBaseTer){
    let valoresIndividuaisBase = [];
    let mediaDosValoresBase;
    for (contador = 0; contador < retemValoresTotaisDosAtributosBaseTer.length; contador++){
        valoresIndividuaisBase[0] = parseInt(retemValoresTotaisDosAtributosBaseTer[contador][1]);
        valoresIndividuaisBase[1] = parseInt(retemValoresTotaisDosAtributosBaseTer[contador][2]);
        valoresIndividuaisBase[2] = parseInt(retemValoresTotaisDosAtributosBaseTer[contador][3]);
        mediaDosValoresBase = Math.ceil((valoresIndividuaisBase[0]+valoresIndividuaisBase[1]+valoresIndividuaisBase[2])/3);
        atualizarValoresDaMediaBase(mediaDosValoresBase, retemValoresTotaisDosAtributosBaseTer[contador][0]);
        //Necessario atualizar os valores totais dos atributos secundarios
        let valoresRecolhidosDoAtributo = lerValoresDoAtributo(retemValoresTotaisDosAtributosBaseTer[contador][0]);
        let somaTotalDosValoresDoAtributo = somarValoresTotaisDoAtributo(valoresRecolhidosDoAtributo);
        atualizarValorTotalDoAtributo(somaTotalDosValoresDoAtributo, retemValoresTotaisDosAtributosBaseTer[contador][0]);
    };
};

function atualizarValoresDaMediaBase(valorDaMedia, idDoAtributo){
    let selecionaMediaBaseAtributo = document.querySelector(`#${idDoAtributo}`).querySelector("#valorTotalDaMediaBaseAtributo");
    selecionaMediaBaseAtributo.textContent = valorDaMedia;    
};