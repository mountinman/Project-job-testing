$(function() {
    $('.header__hamburger-menu').click(function(){
        $('.header__main-nav').toggleClass('open');
        $('.slider').toggleClass('gray');
        $("body").toggleClass("sidebar-open");
    });
   
});