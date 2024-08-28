
let botao_close = document.getElementById("botao_close");
if (!(botao_close === null)){ 
    botao_close.onclick = esconderPopup;
}

function esconderPopup() {
    document.getElementById("popup").style.display = "none";
}


function mostrarPopup(erro) {
    document.getElementById("popup").style.display = "block";
    document.getElementById("erro_popup").textContent = erro;

   
    setTimeout(() => {
        esconderPopup();
    }, 3000); 
}

export { mostrarPopup };