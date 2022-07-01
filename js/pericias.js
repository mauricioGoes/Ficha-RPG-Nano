let lerBtnAddPericias = document.querySelector("#btnAdicionarPericias");
lerBtnAddPericias.addEventListener("click", function(){    
    criadorDeSelecaoDeListaDePericias();    
});

function criadorDeSelecaoDeListaDePericias(){
    let importaGrupoDePericias = grupoDePericias;
    let modeloHtmlSelect = criadorDeModeloHtml();        
    let renderizaGrupoDePericias = rederizadorDeGrupoDeSelecaoDePericias(importaGrupoDePericias);
    let btnAddAListaDePericias = document.querySelector("#btnAddAListaDePericias");
    btnAddAListaDePericias.addEventListener("click", adicionadorDePericias);
}

function criadorDeModeloHtml(){
    let selecionaDoContainerDeListaDeSelecao = document.querySelector("#listaDePericias");    
    let modeloHtml = document.createElement("form");   
    modeloHtml.innerHTML = `
    <select id="listaDeSelecaoDePericias"><select>
    <button id="btnAddAListaDePericias" type="button">Adicionar a Lista</button>
    `;    
    selecionaDoContainerDeListaDeSelecao.append(modeloHtml);    
}

function rederizadorDeGrupoDeSelecaoDePericias(importaGrupoDePericias){
    let grupoDePericias = importaGrupoDePericias;
    let selecionaDeListaDeSelecao = document.querySelector("#listaDeSelecaoDePericias");        
    for(let contador = 0; contador < Object.keys(grupoDePericias).length; contador++){
        let periciaDoGrupo = Object.keys(grupoDePericias)[contador];
        let grupoOptionsPericias = document.createElement("option");
        grupoOptionsPericias.innerHTML = grupoDePericias[`${periciaDoGrupo}`].nome;
        grupoOptionsPericias.setAttribute("value", grupoDePericias[`${periciaDoGrupo}`].id);
        selecionaDeListaDeSelecao.append(grupoOptionsPericias);
    }
}

function adicionadorDePericias(){
    let idDaPericia = document.querySelector("#listaDeSelecaoDePericias").value;
    let selecionaListaDePericias = document.querySelector("#listaDePericiasPlayer");
    let periciaChecada = checadorDeRepeticaoDePericias(idDaPericia);
    if(periciaChecada === "erro"){
        return;
    }else{
        selecionaListaDePericias.append(periciaChecada);
    }    
    leitorDeInputDaPericia(idDaPericia);
}

function checadorDeRepeticaoDePericias(idDaPericia){
    let identificadorDaPericia = idDaPericia;
    let modeloHtmlLi;
    let localizadorDePericia = document.querySelector("#listaDePericiasPlayer").querySelector(`#${identificadorDaPericia}`)?.id;
        
    if(localizadorDePericia === identificadorDaPericia){
        alert("Pericia Ja existe na lista escolha outra.");
        let controle = "erro";
        return controle;
    } else if (localizadorDePericia !== identificadorDaPericia){        
        modeloHtmlLi = criadorDeModeloHtmlLi(idDaPericia);
    } else {
        alert("Um erro ocorreu ao tentar localizar a pericia selecionada.");
        return;
    }
    return modeloHtmlLi;
}

function criadorDeModeloHtmlLi(idDaPericia){
    let periciaAEscrever = grupoDePericias[idDaPericia];
    let valorTotalDoAtributo = document.querySelector(`#${periciaAEscrever.idAtributoBase}`).querySelector("#nomeDoAtributo").textContent;    
    let elementoPericia = document.createElement("li");
    elementoPericia.setAttribute("id", periciaAEscrever.id);
    elementoPericia.innerHTML = `
    <div class="row">        
            <span id="nomeDaPericia" class="col-3">${periciaAEscrever.nome}</span>
            <span id="atributoBase" class="col-3">${valorTotalDoAtributo}</span>            
            <span id="valorAdicional" class="col-2"><input type="number" id="valorInvestidoPericia"></span>
            <span id="valorTotal" class="col-2">0</span>
            <span class="col-1"><button id="apagaPericia">Apagar</button></span>
        </div>
    `;
    return elementoPericia;
}

function leitorDeInputDaPericia(idDaPericia){
    let identificadorPericia = idDaPericia;    
    let identificadorDoInputPericia = document.querySelector("#listaDePericiasPlayer").querySelector(`#${identificadorPericia}`).querySelector("input[type=number]");        
    identificadorDoInputPericia.addEventListener("input", function(){
        console.log("Input da Pericia "+ idDaPericia +" foi ativado");
    });
};