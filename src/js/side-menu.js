$(function() {
    $('.header__hamburger-menu').click(function(){
        $('.header__main-nav').toggleClass('open');
        $("body").toggleClass("sidebar-open");
    });
   
});