
async function buscarHistoricoPedidos() {
    const id = localStorage.getItem("cpf");

    if (!id) {
        console.error("cpf não encontrado no localStorage.");
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
            throw new Error('Erro ao buscar o histórico de pedidos');
        }

        const data = await response.json();
        const historico = data.historico;

        console.log(historico); 

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

async function mostrarTudo() {
    try {
        const response = await fetch('/historicoAdmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos');
        }

        const pedidos = await response.json();
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
                const telefone = pedido.telefone_cliente;  // Atualizado
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
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
}

async function mostrarPedidosHoje() {
    try {
        const response = await fetch('/pedidosHoje', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar pedidos: ${response.status} ${errorText}`);
        }

        const pedidosHoje = await response.json(); // Já filtrado na API
        console.log("Pedidos de hoje recebidos:", pedidosHoje);

        const container = document.getElementById('mostrarPedidosAdmin');
        container.innerHTML = ""; // Limpa o conteúdo atual

        if (pedidosHoje.length === 0) {
            container.innerHTML = `
                <article id="Sem_Historico">
                    <h4>Sem pedidos no momento</h4>
                </article>`;
        } else {
            pedidosHoje.forEach(pedido => {
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
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
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


