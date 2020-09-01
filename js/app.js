/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let Ul = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


 function isInDocument(e) {
	var distance = e.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};


function removeSections() {
    for(const section of sections) {
        section.classList.remove("active");
    };
}

function removeNavLinks() {
    const navAnchors = document.querySelectorAll(".nav-links");
    
    for (const navAn of navAnchors) {
        navAn.classList.remove("active-nav");
    };
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


window.addEventListener('load', buildMenu())


function activeSection(e) {
    removeNavLinks();
    e.classList.add("active");
    const navAnchors = document.querySelectorAll(".nav-links");
    for (const navAn of navAnchors) {
            if(navAn.getAttribute('href') == `#${e.getAttribute('id')}`) {
                navAn.classList.add("active-nav");
            }
        };
}




function goTOSection() {
    let navAnchors = document.querySelectorAll(".nav-links");
    for (const navAn of navAnchors){
        navAn.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(navAn.getAttribute('href')).scrollIntoView({
                behavior: 'auto'
            });
        });
    };
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
function buildMenu() {
	for (const section of sections){
	    const listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	
        listItem.innerHTML = `<a href="#${section.getAttribute("id")}" class="nav-links">${section.getAttribute("data-nav")}</a>`;
        Ul.appendChild(listItem);
    };
}

goTOSection();

window.addEventListener('scroll', function (e) {
    for(const section of sections){
        
        if (isInDocument(section)) {
            removeSections();
            activeSection(section);
            
        } else if(window.scrollY==0) {
            removeSections();
            removeNavLinks();
            
        }
    }
    e.preventDefault();
});