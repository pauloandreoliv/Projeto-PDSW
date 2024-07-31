const local_torre = '<div style="width: 355px;position: relative;"><iframe width="355" height="200" src="https://maps.google.com/maps?width=355&amp;height=200&amp;hl=en&amp;q=R.%20Jos%C3%A9%20Bonif%C3%A1cio%2C%20130%20-%20Torre+(Tropical%20Torre)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a href="http://www.googlemapsgenerator.com/en/">googlemapsgen (en)</a> & <a href="https://nouc.se/">sms lån utan uc</a></small></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div><br />';
const local_bv = '<div style="width: 355px;position: relative;"><iframe width="355" height="200" src="https://maps.google.com/maps?width=355&amp;height=200&amp;hl=en&amp;q=Avenida%20Boa%20Viagem%2C%20201%2C%20Boa%20Viagem%2C%20Recife%2C%20PE+(Tropical%20Torre)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a href="http://www.googlemapsgenerator.com/ja/">Googlemapsgenerator.com/ja/</a> & <a href="https://nouc.se/">https://nouc.se/</a></small></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div><br />';
const local_cd = '<div style="width: 355px;position: relative;"><iframe width="355" height="200" src="https://maps.google.com/maps?width=355&amp;height=200&amp;hl=en&amp;q=Avenida%20Carlos%20de%20Lima%20Cavalcante%2C%201001%2C%20Casa%20Caiada%2C%20Olinda%2C%20PE+(Tropical%20Torre)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a href="http://www.googlemapsgenerator.com/en/">googlemapsgen (en)</a> & <a href="https://nouc.se/">Lån utan uc</a></small></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div><br />';
const local_janga = '<div style="width: 355px;position: relative;"><iframe width="355" height="200" src="https://maps.google.com/maps?width=355&amp;height=200&amp;hl=en&amp;q=Avenida%20Dr.%20Cl%C3%A1udio%20Jos%C3%A9%20Gueiros%20Leite%2C%20207%2C%20Janga%2C%20Paulista%2C%20PE+(Tropical%20Torre)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a href="http://www.googlemapsgenerator.com/en/">googlemapsgen (en)</a> & <a href="https://snabblån-utan-uc.se/">snabblån utan uc direkt utbetalning</a></small></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div><br />';

const img_torre = '<img src="https://i.imgur.com/0EBmyDD.jpg" height="200" alt="Imagem da unidade">';
const img_bv = '<img src="https://i.imgur.com/5rcsCae.jpg" height="200" alt="Imagem da unidade">';
const img_cd = '<img src="https://i.imgur.com/DnVixtv.jpg" height="200" alt="Imagem da unidade">';
const img_janga = '<img src="https://i.imgur.com/9SZJDUB.png" height="200" alt="Imagem da unidade">';

const botao_torre = document.getElementById('torrebutton');
const botao_bv = document.getElementById('bvbutton');
const botao_cd = document.getElementById('cdbutton');
const botao_janga = document.getElementById('jangabutton');

const conteudo_torre = document.getElementById('torrevisao_unidade');
const conteudo_bv = document.getElementById('bvvisao_unidade');
const conteudo_cd = document.getElementById('cdvisao_unidade');
const conteudo_janga = document.getElementById('jangavisao_unidade');

var torre_imgouiframe = false;
var bv_imgouiframe = false;
var cd_imgouiframe = false;
var janga_imgouiframe = false;

botao_torre.addEventListener('click', (event) => {
	
    event.preventDefault();
    
    conteudo_torre.innerHTML = '';

    if (torre_imgouiframe == false){
        conteudo_torre.innerHTML = local_torre;
        torre_imgouiframe = true;
        botao_torre.textContent = "Ver imagem";
    } else {
        conteudo_torre.innerHTML = img_torre;
        torre_imgouiframe = false;
        botao_torre.textContent = "Ver no mapa";
    }
});

botao_bv.addEventListener('click', (event) => {
	
    event.preventDefault();

    conteudo_bv.innerHTML = '';

    if (bv_imgouiframe == false){
        conteudo_bv.innerHTML = local_bv;
        bv_imgouiframe = true;
        botao_bv.textContent = "Ver imagem";
    } else {
        conteudo_bv.innerHTML = img_bv;
        bv_imgouiframe = false;
        botao_bv.textContent = "Ver no mapa";
    }
});

botao_cd.addEventListener('click', (event) => {
	
    event.preventDefault();

    conteudo_cd.innerHTML = '';

    if (cd_imgouiframe == false){
        conteudo_cd.innerHTML = local_cd;
        cd_imgouiframe = true;
        botao_cd.textContent = "Ver imagem";
    } else {
        conteudo_cd.innerHTML = img_cd;
        cd_imgouiframe = false;
        botao_cd.textContent = "Ver no mapa";
    }
});

botao_janga.addEventListener('click', (event) => {
	
    event.preventDefault();

    conteudo_janga.innerHTML = '';

    if (janga_imgouiframe == false){
        conteudo_janga.innerHTML = local_janga;
        janga_imgouiframe = true;
        botao_janga.textContent = "Ver imagem";
    } else {
        conteudo_janga.innerHTML = img_janga;
        janga_imgouiframe = false;
        botao_janga.textContent = "Ver no mapa";
    }
});