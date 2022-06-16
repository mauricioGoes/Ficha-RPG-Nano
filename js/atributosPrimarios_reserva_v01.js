inicializadorDeValoresDosAtributos();

function inicializadorDeValoresDosAtributos(){    
    const selecionaIdAtributos = document.getElementById("atributos");
    const grupoDeIdsDosValoresDeAtributos = ["valorTotalDoAtributo","valorInvestido","valorTotalOutrasOrigens","valorTotalDaMediaBaseAtributo"];    
    for(let contador = 0; contador < grupoDeIdsDosValoresDeAtributos.length; contador++){        
        let selecionaElementosDoId = selecionaIdAtributos.querySelectorAll(`#${grupoDeIdsDosValoresDeAtributos[contador]}`);        
        definiValorInicialDoIdSelecionado(selecionaElementosDoId);
    }
}

function definiValorInicialDoIdSelecionado(selecionaElementosDoId){  
    let valorInicialAtributos = 0;  
    for(let contador = 0; contador < selecionaElementosDoId.length; contador++){        
        if(selecionaElementosDoId[contador].id !== "valorInvestido"){
            selecionaElementosDoId[contador].textContent = valorInicialAtributos;            
        } else {
            selecionaElementosDoId[contador].value = valorInicialAtributos;            
        } 
    }
};


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
    let somaTotalDosValoresDoAtributo = somarValoresDoAtributo(valoresRecolhidosDoAtributo);
    atualizarValoresDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput);        
};

function lerValoresDoAtributo(idDoAtributoDoInput){
    // referencia dos ids de valores dos atributos 
    //valorTotalDoAtributo|valorInvestido|valorTotalOutrasOrigens|valorTotalDaMediaBaseAtributo
    const nivelDeAtributo = document.getElementById(idDoAtributoDoInput).parentElement.id;    
    let retemValoresDoAtributo = {valorInvestido:0, valorTotalOutrasOrigens:0, valorTotalDaMediaBaseAtributo:0}    

    if(nivelDeAtributo === "atributosPrimarios"){        
        retemValoresDoAtributo["valorInvestido"] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorInvestido").value;
        retemValoresDoAtributo["valorTotalOutrasOrigens"] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalOutrasOrigens").textContent;                        
    } else if(nivelDeAtributo == "atributosSecundarios" || "atributosTerciarios"){        
        retemValoresDoAtributo["valorInvestido"] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorInvestido").value;
        retemValoresDoAtributo["valorTotalOutrasOrigens"] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalOutrasOrigens").textContent;
        retemValoresDoAtributo["valorTotalDaMediaBaseAtributo"] = document.getElementById(`${idDoAtributoDoInput}`).querySelector("#valorTotalDaMediaBaseAtributo").textContent;        
    } else {
        alert("Erro ao tentar ler valores do atributo!");
    }
    
    return retemValoresDoAtributo;
}

function somarValoresDoAtributo(valoresRecolhidosDoAtributo){
    let valorTotalDoAtributo = parseInt(valoresRecolhidosDoAtributo["valorInvestido"])+parseInt(valoresRecolhidosDoAtributo["valorTotalOutrasOrigens"])+parseInt(valoresRecolhidosDoAtributo["valorTotalDaMediaBaseAtributo"]);
    return valorTotalDoAtributo;
}

function atualizarValoresDoAtributo(somaTotalDosValoresDoAtributo, idDoAtributoDoInput){
    let selecionaAtributo = document.querySelector(`#${idDoAtributoDoInput}`).querySelector("#valorTotalDoAtributo");
    selecionaAtributo.textContent = somaTotalDosValoresDoAtributo;
};