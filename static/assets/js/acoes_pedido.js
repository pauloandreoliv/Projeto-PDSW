import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { mostrarPopup } from "./popup.js";
import { limparInicial } from "./pedido.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwhBCw983no7qVBlsO7_Dr6YwVDj-wROg",
    authDomain: "desenvolvimentoweb1-7361f.firebaseapp.com",
    projectId: "desenvolvimentoweb1-7361f",
    storageBucket: "desenvolvimentoweb1-7361f.appspot.com",
    messagingSenderId: "346518758393",
    appId: "1:346518758393:web:a97b06e672ddcf37881328",
    databaseURL: "https://desenvolvimentoweb1-7361f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const databaseRef = ref(database, 'pedidos');

function comprar(p_itens, p_total, p_endereco, p_telefone, p_cpf, p_formadepgmto) {
    try {
        const data = new Date();
        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul","ago","set","out","nov","dez"];
        const p_data = ((data.getDate() + " de " + meses[(data.getMonth())] + " de " + data.getFullYear()));
        if(p_endereco == null || p_telefone == null || p_cpf == null) {
            throw new Error("Erro. Entre novamente");
        } else {
            const dados = {
                pratos: p_itens,
                endereco: p_endereco,
                telefone: p_telefone,
                total: p_total,
                formadepgmto: p_formadepgmto,
                cpf: p_cpf,
                data: p_data
            }
    
            push(databaseRef, dados)
            .then(() => {
                mostrarPopup("Pedido realizado");
                limparInicial();
              })
              .catch((error) => {
                mostrarPopup(error.message);
            });
        }
    } catch (error) {
        mostrarPopup(error.message);
    }
}

function mostrar(p_cpf){
    const mostrarPedidos = document.getElementById('mostrarPedidos');

    mostrarPedidos.innerHTML = "";

    onValue(databaseRef, (snapshot) => {
    
        const pedidos = snapshot.val();
        var cont = 0;

        for (const pedido in pedidos) {
            const dadosPedido = pedidos[pedido];
            const cpf = dadosPedido.cpf;
            if(cpf == p_cpf){
                const valor = dadosPedido.total;
                const data = dadosPedido.data;
                const itens = dadosPedido.pratos;

                var pedidoDiv = document.createElement('article')
                pedidoDiv.innerHTML = "<article>" +
                "<h5>R$" + valor +"</h5>"+
                "<h6>" + data +"</h6>"+
                "<p>"+ itens +"</p>"+
                "</article>";
                pedidoDiv.classList.add("box_pedido");
                cont += 1;
                mostrarPedidos.appendChild(pedidoDiv);


            }
        }

        if(cont == 0){
            mostrarPedidos.innerHTML = '<article class="box_pedido">'+
            '<h5>Você ainda não tem um pedido</h5>'+
            '<p>Mas ele irá aparecer aqui quando for concluído. Bora experimentar?</p>'+
          '</article>';
        }
    });
}

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

export { comprar, mostrar, mostrarTudo };