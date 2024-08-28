document.addEventListener('DOMContentLoaded', () => {
    buscarUnidades();
});


document.addEventListener('DOMContentLoaded', () => {
    const caminho = window.location.pathname;
    if (caminho === '/localizacao') {
        buscarUnidades();
    } else if (caminho === '/admin_verLocalizacao') {
        buscarUnidadesAdmin();
    }
    else if (caminho === '/localizacao_user') {
        buscarUnidades();
    }
});



async function buscarUnidades() {
    try {
        const response = await fetch('/unidades');
        if (!response.ok) throw new Error('Erro ao buscar unidades');
        
        const { unidades } = await response.json();
        const container = document.getElementById('unidades');
        container.innerHTML = ''; 
        
        unidades.forEach(unidade => {
            const unidadeDiv = document.createElement('article');
            unidadeDiv.classList.add('box_unidade');
            
            unidadeDiv.innerHTML = `
                <div id="conteudo_${unidade.id}">
                    <img src="${unidade.url_img}" height="200" alt="Imagem da unidade">
                </div>
                <h4>${unidade.nome}</h4>
                <p>${unidade.endereco}</p>
                <button id="${unidade.id}button">Ver no mapa</button>
            `;
            
            const botao = unidadeDiv.querySelector('button');
            botao.addEventListener('click', () => toggleView(unidadeDiv, unidade));

            container.appendChild(unidadeDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar unidades:', error);
    }
}

function toggleView(unidadeDiv, unidade) {
    const conteudoDiv = unidadeDiv.querySelector(`#conteudo_${unidade.id}`);
    const botao = unidadeDiv.querySelector('button');

    if (conteudoDiv.innerHTML.includes('<iframe')) {
        conteudoDiv.innerHTML = `<img src="${unidade.url_img}" height="200" alt="Imagem da unidade">`;
        botao.textContent = 'Ver no mapa';
    } else {
        conteudoDiv.innerHTML = `<iframe width="355" height="200" src="${unidade.mapa}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>`;
        botao.textContent = 'Ver imagem';
    }
}


 async function buscarUnidadesAdmin() {
    try {
        const response = await fetch('/unidades');
        if (!response.ok) throw new Error('Erro ao buscar unidades');
        
        const { unidades } = await response.json();
        const container = document.getElementById('unidades');
        container.innerHTML = ''; 
        
        unidades.forEach(unidade => {
            const unidadeDiv = document.createElement('article');
            unidadeDiv.classList.add('box_unidade');
            
            unidadeDiv.innerHTML = `
                <div id="conteudo_${unidade.id}">
                    <img src="${unidade.url_img}" height="200" alt="Imagem da unidade">
                </div>
                <h4>${unidade.nome}</h4>
                <p>${unidade.endereco}</p>
                <button id="${unidade.id}button">Ver no mapa</button>
                <button onclick="removerUnidade('${unidade.id}')"><i class="fa-solid fa-trash"></i></button>
            `;
            
            const botao = unidadeDiv.querySelector(`#${unidade.id}button`);
            botao.addEventListener('click', () => toggleView(unidadeDiv, unidade));

            container.appendChild(unidadeDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar unidades:', error);
    }
}


export{buscarUnidadesAdmin, buscarUnidades}