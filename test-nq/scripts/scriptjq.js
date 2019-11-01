"use strict";

let curItem;
let prevItem;

$(document).ready(function(){
    $(".main-content").children().each(function(){
        $(this).hide();
    });
    
    /** adding event onClick */
    $('.menu-item').each(function(){
        $(this).click(selectMenuItem)
    });
    
    /** Make active first menu item */
    prevItem = null;
    curItem = $('.menu-item').eq(0);
    curItem.addClass('active-item');
    showContent(curItem.attr('content-data'));
})


/** update styles of active item and previous active item */
function selectMenuItem(e){
    prevItem = curItem;
    prevItem.removeClass('active-item');
    
    curItem = $(e.currentTarget);
    
    console.log($(this).index());
    
    curItem.addClass('active-item');
    
    showContent(curItem.attr('content-data'));
}

/** load content from hardcode */
function showContent(pageName){
    console.log(pageName);
    if (prevItem) $('#'+prevItem.attr('content-data')).hide();
    
    $('#'+pageName).show();
    
   /* $('#clickable').ready(function(){
       $('#clickable').on('click', function(){
            alert("clickable is clicked");
       });
    })*/     
}