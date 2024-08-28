import { mostrarPopup } from "./popup.js";
async function buscarHistoricoPedidos() {
    const id = localStorage.getItem("cpf");
    if (!id) {
        console.error("CPF não encontrado no localStorage.");
        return;
    }

    try {
        const response = await fetch(`/historico/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.clear();
                mostrarPopup("Token Expirado");
                setTimeout(() => { window.location.href = "/entrar"; }, 3000);
                return;
            }    
        }

        const data = await response.json();
        const historico = data.historico;
        const container = document.getElementById("mostrarPedidos");
        container.innerHTML = "";

        if (!Array.isArray(historico) || historico.length === 0) {
            container.innerHTML = `
                <article id="Sem_Historico">
                    <h4>Você ainda não fez pedidos :(</h4>
                    <h5>Que tal provar algo novo?</h5>
                </article>`;
        } else {
            historico.forEach(pedido => {
                const valorTotal = pedido.total || 0;
                const itens = Array.isArray(pedido.pratos) ? pedido.pratos : [];
                const dataPedido = pedido.data;
                const formadepgmto = pedido.formadepgmto;
                const endereco = pedido.endereco

                const artigoPedido = document.createElement('article');
                artigoPedido.classList.add("box_pedido");
                artigoPedido.innerHTML = `
                    <h5>Data: ${dataPedido}</h5>
                    <h6>Endereço: ${endereco}</h6>
                    <p>Pratos: ${itens.map(item => item.nome).join(", ")}</p>
                    <h5>Valor: R$ ${valorTotal.toFixed(2)}</h5>
                    <p>Pagamento: ${formadepgmto}</p>
                `;
                container.appendChild(artigoPedido);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar o histórico de pedidos:", error);
        mostrarPopup("Erro ao buscar o histórico de pedidos.");
    }
}

function mostrarTudo() {
    fetch('/historicoAdmin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())  
    .then(pedidos => {
        const container = document.getElementById('mostrarPedidosAdmin');
        container.innerHTML = "";

        if (!Array.isArray(pedidos) || pedidos.length === 0) {
            container.innerHTML = `
                <article id="Sem_Historico">
                    <h4>Nenhum pedido encontrado</h4>
                </article>`;
        } else {
            pedidos.forEach(pedido => {
                const valorTotal = pedido.total || 0;
                const itens = Array.isArray(pedido.pratos) ? pedido.pratos : [];
                const dataPedido = pedido.data;
                const endereco = pedido.endereco;
                const telefone = pedido.telefone_cliente;  
                const formaDePagamento = pedido.formadepgmto;

                const pedidoDiv = document.createElement('article');
                pedidoDiv.classList.add("box_pedido");

                pedidoDiv.innerHTML = `
                    <h4>${endereco}</h4>
                    <ul>
                        <li>Data: ${dataPedido}</li>
                        <li>Telefone: ${telefone}</li>
                        <li>Forma de Pagamento: ${formaDePagamento}</li>
                        <li>Valor Total: R$ ${valorTotal.toFixed(2)}</li>
                    </ul>
                    <h5>Itens:</h5>
                    <p>${itens.map(item => item.nome).join(", ")}</p>
                `;
                container.appendChild(pedidoDiv);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
    });
}

function mostrarPedidosHoje() {
    fetch('/pedidosHoje', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(pedidosHoje => {
        console.log("Pedidos de hoje recebidos:", pedidosHoje);

        const container = document.getElementById('mostrarPedidosAdmin');
        container.innerHTML = "";

        if (!Array.isArray(pedidosHoje) || pedidosHoje.length === 0) {
            container.innerHTML = `
                <article id="Sem_Historico">
                    <h4>Sem pedidos no momento</h4>
                </article>`;
        } else {
            pedidosHoje.forEach(pedido => {
                const valorTotal = pedido.total || 0;
                const itens = Array.isArray(pedido.pratos) ? pedido.pratos : [];
                const dataPedido = pedido.data || 'Não disponível';
                const endereco = pedido.endereco || 'Não disponível';
                const telefone = pedido.telefone_cliente || 'Não disponível';
                const formaDePagamento = pedido.formadepgmto || 'Não disponível';

                const pedidoDiv = document.createElement('article');
                pedidoDiv.classList.add("box_pedido");

                pedidoDiv.innerHTML = `
                    <h4>${endereco}</h4>
                    <ul>
                        <li>Data: ${dataPedido}</li>
                        <li>Telefone: ${telefone}</li>
                        <li>Forma de Pagamento: ${formaDePagamento}</li>
                        <li>Valor Total: R$ ${valorTotal.toFixed(2)}</li>
                    </ul>
                    <h5>Itens:</h5>
                    <p>${itens.map(item => item.nome).join(", ")}</p>
                `;
                container.appendChild(pedidoDiv);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
       
        document.getElementById('mostrarPedidosAdmin').innerHTML = `
            <article id="Erro">
                <h4>Erro ao carregar pedidos: ${error.message}</h4>
            </article>`;
    });
}


window.addEventListener('load', function() {
    const caminho = window.location.pathname;
    if (caminho === '/pedidos') {
     buscarHistoricoPedidos()
            }
    if (caminho === '/admin_pedidos') {
        mostrarTudo ();
    }
    if(caminho === '/admin_pedidosDiario'){
        mostrarPedidosHoje()
        }
});


