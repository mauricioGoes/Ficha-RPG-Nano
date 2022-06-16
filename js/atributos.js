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
    let idsDosAtributosSecTer = identificadorDeAtributosSecTer();    
    let retemObjetosSecTer = lerAtributosSecTer(idsDosAtributosSecTer);       
    let retemValoresTotaisDosAtributosBase = coletaValoresDataMediaDosAtributosSecTer(retemObjetosSecTer);
    criarMediaDosAtributosBaseSecTer(retemValoresTotaisDosAtributosBase);
    //console.log(retemValoresTotaisDosAtributosBase);
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
    let tabuldorDosValoresBase = [];
        for(let contador = 0; contador < retemObjetosSecTer.length; contador++){
            let elementosBase = retemObjetosSecTer[contador].getAttribute('data-media-base');
            let separaOsIdsDosAtributosBase = elementosBase.split("|");
            let identificadorDeIdsAtributosSecTer = retemObjetosSecTer[contador].id;
            if(separaOsIdsDosAtributosBase.length === 2){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosSecTer;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;
                tabuldorDosValoresBase.push([coletaValoresTotaisDosAtributosBase[0],coletaValoresTotaisDosAtributosBase[1],coletaValoresTotaisDosAtributosBase[2]]);            
            } else if(separaOsIdsDosAtributosBase.length === 3){
                coletaValoresTotaisDosAtributosBase[0] = identificadorDeIdsAtributosSecTer;
                coletaValoresTotaisDosAtributosBase[1] = document.querySelector(`#${separaOsIdsDosAtributosBase[0]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[2] = document.querySelector(`#${separaOsIdsDosAtributosBase[1]}`).querySelector("#valorTotalDoAtributo").textContent;
                coletaValoresTotaisDosAtributosBase[3] = document.querySelector(`#${separaOsIdsDosAtributosBase[2]}`).querySelector("#valorTotalDoAtributo").textContent;
                tabuldorDosValoresBase.push([coletaValoresTotaisDosAtributosBase[0],coletaValoresTotaisDosAtributosBase[1],coletaValoresTotaisDosAtributosBase[2],coletaValoresTotaisDosAtributosBase[3]]);            
            }else {
                alert("Erro ao identificar os atributos Base");
                return;
            }
        }    
    return tabuldorDosValoresBase;    
};

function criarMediaDosAtributosBaseSecTer(retemValoresTotaisDosAtributosBase){    
    let valoresIndividuaisMedia = [];
    let mediaDosValoresIndividuais;    
    for(let contador = 0; contador < retemValoresTotaisDosAtributosBase.length; contador++){
        if(retemValoresTotaisDosAtributosBase[contador].length === 3){
            valoresIndividuaisMedia[0] = parseInt(retemValoresTotaisDosAtributosBase[contador][1]);
            valoresIndividuaisMedia[1] = parseInt(retemValoresTotaisDosAtributosBase[contador][2]);
            mediaDosValoresIndividuais = Math.ceil((valoresIndividuaisMedia[0]+valoresIndividuaisMedia[1])/2);            
        }else if(retemValoresTotaisDosAtributosBase[contador].length === 4){
            valoresIndividuaisMedia[0] = parseInt(retemValoresTotaisDosAtributosBase[contador][1]);
            valoresIndividuaisMedia[1] = parseInt(retemValoresTotaisDosAtributosBase[contador][2]);
            valoresIndividuaisMedia[2] = parseInt(retemValoresTotaisDosAtributosBase[contador][3]);
            mediaDosValoresIndividuais = Math.ceil((valoresIndividuaisMedia[0]+valoresIndividuaisMedia[1]+valoresIndividuaisMedia[2])/3);
        }else{
            alert("Não foi possivel identificar corretamente os valores base para calculo.");
            return;
        }        
        atualizarValoresDaMediaBase(mediaDosValoresIndividuais, retemValoresTotaisDosAtributosBase[contador][0]);
        //Necessario reiniciar as funções para o calculo do total dos atributos Secundarios e terciarios
        let valoresRecolhidosDoAtributo = lerValoresDoAtributo(retemValoresTotaisDosAtributosBase[contador][0]);
        let somaTotalDosValoresDoAtributo = somarValoresTotaisDoAtributo(valoresRecolhidosDoAtributo);
        atualizarValorTotalDoAtributo(somaTotalDosValoresDoAtributo, retemValoresTotaisDosAtributosBase[contador][0]);   
    }
    
};
function atualizarValoresDaMediaBase(valorDaMedia, idDoAtributo){
    let selecionaMediaBaseAtributo = document.querySelector(`#${idDoAtributo}`).querySelector("#valorTotalDaMediaBaseAtributo");
    selecionaMediaBaseAtributo.textContent = valorDaMedia;
};