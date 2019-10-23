$(function() {
    $('.hamburger-menu').click(function(){
        $('.main-nav').toggleClass('open');
        $("body").toggleClass("sidebar-open");
    });
   
});