var $cronometro = document.querySelector('#cronometro');
var $iniciar = document.querySelector('#iniciar');
var $pausar = document.querySelector('#pausar');
var $zerar = document.querySelector('#zerar');
$iniciar.addEventListener('click',iniciar);
$pausar.addEventListener('click',pausar);
$zerar.addEventListener('click',zerar);


var intervalo = null;
var msClickIniciar = 0;
var rodando = false;
var msTempoDecorrido = 0;
var msClickIniciarPausar = 0;

function iniciar(){
    if(rodando) return 
    msClickIniciar = Date.now();
    iniciarCronometro();
    rodando = true;
}
function pausar(){
    if(!$cronometro.value) return;
    if(rodando){
        clearInterval(intervalo);
        msClickIniciarPausar = Date.now();
        msTempoDecorrido += (msClickIniciarPausar - msClickIniciar );
        $pausar.textContent = 'Continuar';

    }else{
        $pausar.textContent = 'Pausar';
        msClickIniciar = Date.now();
        iniciarCronometro(msTempoDecorrido);
    };
    rodando = !rodando;
}
function iniciarCronometro(tempoDecorrido){
    var _ms = tempoDecorrido || 0;
    intervalo = setInterval(function(){
        var msAgora = Date.now();
        var diferenca = msAgora - msClickIniciar;
        $cronometro.value = formataMs(diferenca + _ms);
    },100)
}
function zerar(){
    msClickIniciar = 0;
    msTempoDecorrido = 0;
    msClickIniciarPausar = 0;
    rodando = false;
    clearInterval(intervalo);
    $cronometro.value = '';
}
function formataMs(ms){
    const MINUTO = 60 * 1000;
    if(ms < 1000){
        return ms
    }else if(ms < MINUTO){
        var s = parseInt(ms/1000);
        var c = ms - (s * 1000);
        return s + ":" + c;
    }else{
        var m = parseInt(ms / (MINUTO ));
        var s = parseInt((ms/1000) - (m * 60));
        var c = ms - (s * 1000) - (m * MINUTO);

        return  m+":"+ s +":"+ c;
    }
}