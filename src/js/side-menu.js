$(function() {
    $('.header__hamburger-menu').click(function(){
        $('.header__main-nav').toggleClass('open');
        $('.slider, .article-container').toggleClass('on-sidebar-open');
        $("body").toggleClass("sidebar-open");
    });
   
});