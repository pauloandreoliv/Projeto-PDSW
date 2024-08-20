
import { mostrarPopup } from "./popup.js";
async function buscarHistoricoPedidos() {
    const id = localStorage.getItem("cpf");

    if (!id) {
        console.error("cpf não encontrado no localStorage.");
        return;
    }

    try {
        // Realiza a requisição para obter o histórico de pedidos, incluindo o ID na URL
        const response = await fetch(`/historico/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar o histórico de pedidos');
        }

        const data = await response.json();
        const historico = data.historico;

        console.log(historico); // Inspeciona o conteúdo da resposta

        const container = document.getElementById("mostrarPedidos");
        container.innerHTML = ""; // Limpa o conteúdo atual

        if (!Array.isArray(historico) || historico.length === 0) {
            // Se não houver histórico ou se a resposta não for um array, exibe a mensagem
            container.innerHTML = `
                <article id="Sem_Historico">
                    <h4>Você ainda não fez pedidos :(</h4>
                    <h5>Que tal provar algo novo?</h5>
                </article>`;
        } else {
            // Se houver histórico, exibe os pedidos
            historico.forEach(pedido => {
                // Verifica se `valorTotal` e `itens` estão definidos e se `itens` é um array
                const valorTotal = pedido.total || 0;
                const data = pedido.data
                const itens = Array.isArray(pedido.pratos) ? pedido.pratos : [];
                const dataPedido = pedido.data;
                const formadepgmto = pedido.formadepgmto;
                
                const artigoPedido = document.createElement('article');
                artigoPedido.classList.add("box_pedido");
                artigoPedido.innerHTML = `
                    <h5>Data: ${dataPedido}</h5>
                    <p>Pratos: ${itens.map(item => item.nome).join(", ")}</p>
                    <h5>Valor: R$ ${valorTotal.toFixed(2)}</h5>
                    <p>Pagamento: ${formadepgmto}</p>
                `;
                container.appendChild(artigoPedido);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar o histórico de pedidos:", error);
    }
}

// Chama a função ao carregar a página
window.addEventListener('load', buscarHistoricoPedidos);

// Chama a função ao carregar a página
window.addEventListener('load', buscarHistoricoPedidos);

function mostrarTudo () {
    const databaseRef = ref(database, 'pedidos');

    const mostrarPedidos = document.getElementById('mostrarPedidosAdmin');

    mostrarPedidos.innerHTML = "";

    onValue(databaseRef, (snapshot) => {
    
        const pedidos = snapshot.val();

        for (const pedido in pedidos) {

            const dadosPedido = pedidos[pedido];
            const data = dadosPedido.data;
            const itens = dadosPedido.pratos;
            const endereco = dadosPedido.endereco;
            const telefone = dadosPedido.telefone;
            const forma = dadosPedido.formadepgmto;
            const total = dadosPedido.total;

            var pedidoDiv = document.createElement('article')
            pedidoDiv.innerHTML = 
            '<h4>' + endereco +'</h4>'+
            '<ul>'+
            '<li>' + data + '</li>'+
            '<li>'+ telefone + '</li>'+
            '<li>'+ forma + '</li>'+
            '<li>R$'+ total + '</li>'+
            '</ul>'+
            '<h5>Itens:</h5>'+
            '<p>'+ itens + '</p>';
            pedidoDiv.id = pedido;
            pedidoDiv.classList.add("box_pedido");

            mostrarPedidos.appendChild(pedidoDiv);
        }
    });
}

window.addEventListener('load', function() {
    const caminho = window.location.pathname;
    if (caminho === '/pedidos') {
     buscarHistoricoPedidos()
            }
    else if (caminho === '/admin_pedidos') {
        mostrarTudo ();
    }
});

