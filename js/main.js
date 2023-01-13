const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    const newElement = criaElemento(elemento);
    lista.appendChild(newElement);
})

form.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const itemAtual = {
        "nome": nome.value.toLowerCase(),
        "quantidade": quantidade.value,
    }

    const existe = itens.find(elemento => elemento.nome === nome.value.toLowerCase());
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
        const newElement = criaElemento(itemAtual);
        lista.appendChild(newElement);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))
    return novoItem;
}

function atualizaElemento(itemAtual) {
    document.querySelector("[data-id='" + itemAtual.id + "']").innerHTML = itemAtual.quantidade;
    itens[itens.findIndex(elemento => elemento.id === itemAtual.id)] = itemAtual;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add("botao__excluir");
    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    });
    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}