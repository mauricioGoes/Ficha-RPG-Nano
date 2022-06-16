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
    atualizarValoresDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput);
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

function atualizarValoresDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput){
    let selecionaAtributo = document.querySelector(`#${idDoAtributoDoInput}`).querySelector("#valorTotalDoAtributo");
    selecionaAtributo.textContent = somaTotalDosValoresDoAtributo;
};

function calcularMediaBaseDoAtributo(){
    let idsDosAtributosSecTer = identificadorDeAtributosSecTer();    
    let retemObjetosSecTer = lerAtributosSecTer(idsDosAtributosSecTer);       
    let retemValoresTotaisDosAtributosBase = coletaValoresDataMediaDosAtributosSecTer(retemObjetosSecTer);
    console.log(retemValoresTotaisDosAtributosBase);
    return     
}

function identificadorDeAtributosSecTer(){
    let selecionaIdAtributos = document.querySelector("#atributos");    
    let retemObjetosSecundarios = selecionaIdAtributos.querySelector("#atributosSecundarios").querySelectorAll("div");
    let retemObjetosTerciarios = selecionaIdAtributos.querySelector("#atributosTerciarios").querySelectorAll("div");
    let retemTodosOsAtributosSecTer = [retemObjetosSecundarios,retemObjetosTerciarios];
    let retemIdsTodosAtributosSecTer = [];
    for(let contador = 0; contador < retemTodosOsAtributosSecTer.length; contador++){        
        for(let contador2 = 0; contador2 < retemTodosOsAtributosSecTer[contador].length; contador2++){            
            retemIdsTodosAtributosSecTer.push(retemTodosOsAtributosSecTer[contador][contador2].id);
        }
    }
    return retemIdsTodosAtributosSecTer;
}

function lerAtributosSecTer(idsDosAtributosSecTer){
    let ids = idsDosAtributosSecTer;
    let objetosSecTer = [];
    for(let contador = 0; contador < ids.length; contador++){
        let selecionadorDeAtributoSecTer = document.querySelector(`#${ids[contador]}`);
        objetosSecTer.push(selecionadorDeAtributoSecTer);
    }
    return objetosSecTer;
};

function coletaValoresDataMediaDosAtributosSecTer(retemObjetosSecTer){     
    let coletaValoresTotaisDosAtributosBase = [];    
        for(let contador = 0; contador < retemObjetosSecTer.length; contador++){
            let elementosBase = retemObjetosSecTer[contador].getAttribute('data-media-base');
            let separaOsIdsDosAtributosBase = elementosBase.split("|");
            let identificadorDeIdsAtributosSecTer = retemObjetosSecTer[contador].id;
            if(separaOsIdsDosAtributosBase.length == 2){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosSecTer;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;            
            } else if(separaOsIdsDosAtributosBase.length == 3){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosSecTer;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[3] = document.querySelector(`#${separaOsIdsDosAtributosBase[2]}`).querySelector("#valorTotalDoAtributo").textContent;            
            } else {
                alert("Erro ao identificar os atributos Base");
                return;
            }        
        }
    console.log(coletaValoresTotaisDosAtributosBase)
    //return coletaValoresTotaisDosAtributosBase;    
};