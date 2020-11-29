'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => { //스크롤이 될 때마다 얼마만큼의 값을 가지는지
    console.log(window.scrollY);
    console.log(`navbarheight: ${navbarHeight}`);
    if(window.screenY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
});

//scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu')
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if (link == null){
        return;
    }

console.log(event.target.dataset.link);
const scrollTo =document.querySelector(link);
scrollTo.scrollIntoView({behavior: 'smooth'});
});