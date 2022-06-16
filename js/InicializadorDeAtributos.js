inicializadorDeValoresDosAtributos();
function inicializadorDeValoresDosAtributos(){    
    const selecionaIdAtributos = document.getElementById("atributos");
    const grupoDeIdsDosValoresDeAtributos = ["valorTotalDoAtributo","valorInvestido","valorTotalOutrasOrigens","valorTotalDaMediaBaseAtributo"];    
    for(let contador = 0; contador < grupoDeIdsDosValoresDeAtributos.length; contador++){        
        let selecionaElementosDoId = selecionaIdAtributos.querySelectorAll(`#${grupoDeIdsDosValoresDeAtributos[contador]}`);        
        definiValorInicialDoIdSelecionado(selecionaElementosDoId);
    }    
};

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