$(document).ready(function(){
    $(".nav-item.dropdown").hover(function(){
        $(".dropdown-menu").show(300);
    },
    function(){
        $(".dropdown-menu").hide(300);
    });
});