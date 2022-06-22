let lerBtnPericias = document.querySelector("#btnAdicionarPericias");
lerBtnPericias.addEventListener("click", function(){
    console.log("Botão Pericias Clicado!");
    adicionaPericiasALista();
});

function adicionaPericiasALista(){
    const selecionaIdListaDePericias = document.querySelector("#listaDePericias");
    const periciaEscrita = escreverPericia();    
    let escreverHtmlItemPericia = periciaHtml(periciaEscrita);
    renderHtmlPericia(selecionaIdListaDePericias, escreverHtmlItemPericia);

}

function escreverPericia(){
    let pericia = {
        id:0,
        nome:"Combate Corpo a Corpo(Laminas)",
        atributoBase:"atributoAtaque",
        atributoBaseValorTotal:0,
        pontosInverstidos:0,
        valorTotalDaPericia:0
    }
    return pericia;
};

function periciaHtml(periciaEscrita){
    let elementoPericia = document.createElement("li");
    elementoPericia.innerHTML = `
    <div class="row">        
            <span id="nome" class="col-3">${periciaEscrita.nome}</span>
            <span id="atributoBase" class="col-3">${periciaEscrita.atributoBase}</span>            
            <span id="valorAdicional" class="col-2"><input type="number" id="valorInvestidoPericia"></span>
            <span id="valorTotal" class="col-2">${periciaEscrita.valorTotalDaPericia}</span>
            <span class="col-1"><button id="apagaPericia">Apagar</button></span>
        </div>
    `;
    return elementoPericia;
};

function renderHtmlPericia(selecionaIdListaDePericias, escreverHtmlItemPericia){
    selecionaIdListaDePericias.append(escreverHtmlItemPericia);
    console.log("render rodou!");

}