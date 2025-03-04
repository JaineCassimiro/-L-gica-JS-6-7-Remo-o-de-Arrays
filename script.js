// Lista de compras
let listaCompras = [];

// Função para adicionar item
function adicionarItem() {
    let item = document.getElementById("item").value;
    let categoria = document.getElementById("categoria").value;
    let preco = parseFloat(document.getElementById("preco").value) || 0;
    let peso = parseFloat(document.getElementById("peso").value) || 0;

    if (item.trim() === "") {
        alert("Por favor, insira um item válido.");
        return;
    }

    listaCompras.push({ item, categoria, preco, peso });
    atualizarLista();
}

// Atualizar a lista na tela
function atualizarLista() {
    let listaDiv = document.getElementById("lista");
    listaDiv.innerHTML = "";
    let totalPreco = 0;
    let totalPeso = 0;

    let categorias = {};
    listaCompras.forEach(({ item, categoria, preco, peso }) => {
        if (!categorias[categoria]) {
            categorias[categoria] = [];
        }
        categorias[categoria].push(`${item} - R$${preco.toFixed(2)} (${peso}kg)`);
        totalPreco += preco;
        totalPeso += peso;
    });

    for (let cat in categorias) {
        let p = document.createElement("p");
        p.innerHTML = `<strong>${cat}:</strong> ${categorias[cat].join(", ")}`;
        listaDiv.appendChild(p);
    }

    document.getElementById("orcamento").textContent = `Total Gasto: R$ ${totalPreco.toFixed(2)}`;
    document.getElementById("pesoTotal").textContent = `Peso Total: ${totalPeso.toFixed(2)} kg`;
}

// Remover item da lista
function removerItem() {
    if (listaCompras.length === 0) {
        alert("A lista está vazia!");
        return;
    }

    let itemRemover = prompt("Digite o nome do item que deseja remover:");

    let index = listaCompras.findIndex(({ item }) => item.toLowerCase() === itemRemover.toLowerCase());
    
    if (index !== -1) {
        listaCompras.splice(index, 1);
        atualizarLista();
        alert(`"${itemRemover}" foi removido da lista!`);
    } else {
        alert(`Não foi possível encontrar "${itemRemover}" na lista.`);
    }
}

// Limpar toda a lista
function limparLista() {
    listaCompras = [];
    atualizarLista();
}