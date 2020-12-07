'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => { //스크롤이 될 때마다 얼마만큼의 값을 가지는지
    console.log(window.scrollY);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
      } else {
        navbar.classList.remove('navbar--dark');
      }
    });

//scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

//Navbar toggle button
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Contact Me button scrolling
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//transparent home 
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});


//show arrow up 
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
  });


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

    //Remove selection from the previous item 
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
      projects.forEach(project => {
        console.log(project.dataset.type);
        if (filter === '*' || filter === project.dataset.type) {
          project.classList.remove('invisible');
        } else {
          project.classList.add('invisible');
        }
      });
      projectContainer.classList.remove('anim-out');
    }, 300);
  });
//     for(let project of projects){
//     } forEach랑 동일한 말

//     let project;
//     for(let i = 0; i < projects.length ; i++) {
//         project = projects[i];
//     } forEach랑 동일한 말
// }


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
  }


//1. 모든 섹션 요소들을 가지고 온다.
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
  ];
  const sections = sectionIds.map(id => document.querySelector(id));
  const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
  );

  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  }

//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 스크롤링이 아래로 되어서 페이지가 올라옴
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };

//3. 두번째를 이용해서 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 1) browser 안에 section이 존재. browser화면상 보여지는 것이 밖으로 나가는 경우에 callback함수가 호출됨.
// 2) 그러면 그 다음 인덱스를 선택 a+1. 요소가 나가면 entry요소에 get BoundingClientRect안에 y좌표는 -가 됨.
// 3) 아래에 있는 섹션이 밑으로 빠져나가는 경우에는 y값이 +가 됨.이 때에는 -1이 된 인덱스를 찾아주면 됨.

window.addEventListener('scroll', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === 
               document.body.clientHeight
    ){
        selectedNavIndex = navItems.length - 1;
    }
    selectedNavItem(navItems[selectedNavIndex]);
});

const observer = new IntersectionObserver(observercallback, observerOptions);
sections.forEach(section => observer.observe(section));







