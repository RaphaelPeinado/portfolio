// ---------   Abre e fecha Menu no scroll
var ultimaPosicao = 0;

function checkRolagem() {
    var atualPosicao = window.scrollY;

    if(atualPosicao > ultimaPosicao) {
        $('.menu').removeClass('menu--open');
    } else {
        $('.menu').addClass('menu--open');
    }
    ultimaPosicao = atualPosicao;

    document.addEventListener('scroll', checkRolagem);
}


// ---------   Confere a orientação da tela
let myOrientation = window.matchMedia('all and (orientation:landscape)');

function checkOrientantion(myOrientation){
    if (myOrientation.matches){
        if (/Android|iPhone/i.test(navigator.userAgent)) {
            checkRolagem();
        }else{
            $('.menu').addClass('menu--hover');
        }
    }else{
        checkRolagem();
    }
}
// Fica de olho na mudança da orientação
myOrientation.addEventListener('change', checkOrientantion);
// Faz a primeira checagem
checkOrientantion(myOrientation);

// ---------   Confere o tamanho da tela
let myMediaQuery = window.matchMedia('(max-width: 699px)');

function checkWidth(myMediaQuery) {

    if(myMediaQuery.matches) {
        checkRolagem();
       
    } else {
        // chama a função de pra conferir a orientação
        checkOrientantion(myOrientation);
    }
    
}
// Fica de olho na mudança do tamanho
myMediaQuery.addEventListener('change', checkWidth);
// Faz a primeira checagem
checkWidth(myMediaQuery);



// ---------   Bt para ver mais texto perfil
const bt_readPerfil = document.querySelector('.perfil__bt-more');
const aboutPerfil = document.querySelector('.perfil__about');

bt_readPerfil.addEventListener('click', readPerfil);

function readPerfil() {
    bt_readPerfil.classList.toggle('bt-open');
    aboutPerfil.classList.toggle('open');   
}


// ---------   Slider
let i = 0;
let limit = $('.slide__wrap').length;

function btDisabled(){
    if(i == (limit - 1)){
        $('.bt-right').attr("disabled", 'disabled');
    }
    if(i == 0){
        $('.bt-left').attr("disabled", 'disabled');
    }
}
function nextSlide(){
  if(i < (limit - 1)){
    i++;
    let prev = (i - 1);
    let translate = (i * 100);
    $('.slide__wrap').eq(prev).css("transform","translateX(100%)");
    $('.slide__wrap').eq(i).css("transform","translateX(-"+ translate +"%)");
    $('.bt-left').removeAttr("disabled", 'disabled');
    btDisabled();
  }
}
function prevSlide(){
  if(i > 0){
    i--;
    let next = (i + 1);
    let translate = (i * 100);
    $('.slide__wrap').eq(i).css("transform","translateX(-"+ translate +"%)");
    $('.slide__wrap').eq(next).css("transform","translateX(100%)");
    $('.bt-right').removeAttr("disabled", 'disabled');
    btDisabled();
  }
}
// Evento Botão
$('.bt-right').click(nextSlide);
$('.bt-left').click(prevSlide);

// Evento Swipe
var  Swipe  = (function () {
    function  Swipe(element) {
        this.xDown  =  null;
        this.element  =  typeof (element) ===  'string'  ?  document.querySelector(element) :  element;
        this.element.addEventListener('touchstart', function (evt) {
            this.xDown  =  evt.touches[0].clientX;
        }.bind(this), false);
    }

    Swipe.prototype.onLeft  =  function (callback) {
        this.onLeft  =  callback;
        return this;
    };
    Swipe.prototype.onRight  =  function (callback) {
        this.onRight  =  callback;
        return this;
    };

    Swipe.prototype.handleTouchMove  =  function (evt) {
        if (!this.xDown) {
            return;
        }
        var  xUp  =  evt.touches[0].clientX;
        this.xDiff  = this.xDown  -  xUp;

        if (Math.abs(this.xDiff) !==  0) {
            if (this.xDiff  >  2) {
                typeof (this.onLeft) ===  "function"  && this.onLeft();
            } else  if (this.xDiff  <  -2) {
                typeof (this.onRight) ===  "function"  && this.onRight();
            }
        }

        // Reset values.
        this.xDown  =  null;
    };

    Swipe.prototype.run  =  function () {
        this.element.addEventListener('touchmove', function (evt) {
            this.handleTouchMove(evt);
        }.bind(this), false);
    };

    return  Swipe;
}());

var swiper = new Swipe('.slide__wrap');
swiper.onLeft(function() { nextSlide() });
swiper.onRight(function() { prevSlide() });
swiper.run();


// ---------   Vira Card
$(' .bt-turn').click(function(){
    $(this).parent().find('.card__turn').toggleClass('do-flip');
    $(this).toggleClass('do-turn');
});


// ---------   Icones de clima da API
feather.replace();