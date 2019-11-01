"use strict";


/** hardcode for all pages */
const mainContent = [
    "",
    "<h3>Summary</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Peers</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Exchange</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p><img src='./assets/logo.png' alt='NEWS DIRECT'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Block Trades</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Media Covarage</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Previous</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Charts</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>",
    
    "<h3>Contacts</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>"
    
];


/** save all menu items in array */
const menuItems = document.querySelectorAll('.menu-item');

/** Make active first menu item */
let curItem = menuItems[0];
curItem.classList.add('active-item');

/** adding event onClick */
menuItems.forEach(item => {
    item.addEventListener('click', selectMenuItem);
});

/** update styles of active item and previous active item */
function selectMenuItem(e){
    let target = e.target.parentElement;
    if (target === curItem) return;

    if (target.attributes["content-data"]){                            target.classList.add('active-item');
        curItem.classList.remove('active-item');
        curItem = target;
        showContent(curItem.attributes["content-data"].nodeValue);
    }
}

/** load content from hardcode */
function showContent(n){
    let container = document.querySelector('.main-content');
    container.innerHTML = mainContent[n];
}