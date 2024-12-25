const openLanguageButton = document.getElementById("open-language");
console.log(openLanguageButton);
const languageMenu = document.getElementById("language-menu");

openLanguageButton.onclick = (e) => {
  languageMenu.classList.toggle("active");
};

// SWIPER SERVICE

const services = [
  {
    title: "РУЧНИЙ ТА АПАРАТНИЙ МАСАЖ",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Класичний", "Спортивний", "Оздоровчий", "Лімфодренажний"]
  },
  {
    title: "ОБГОРТАННЯ СКРАБУВАННЯ",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Бандажне пеленання", "Термообгортання", "Кріогенне", "Гіпсотерапія"]
  },
  {
    title: "КОСМЕТОЛОГІЧНІ ПОСЛУГИ",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Чистки", "Пілінги", "Маски", "Пеленання для обличчя"]
  },
  {
    title: "ЛАЗЕРНА ЕПІЛЯЦІЯ РІЗНИХ ЗОН",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Обличчя", "Тіло", "Комплексна епіляція"]
  },
  {
    title: "ВОСКОВА ДЕПІЛЯЦІЯ ШУГАРИНГ",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Депіляція різних зон", "Комплекси", "Електроепіляція"]
  },
  {
    title: "ОФФОРМЛЕННЯ ВІЙ ТА БРІВ",
    description: "Пропонуємо спектр послуг, спрямованих на покращення",
    services: ["Корекція та фарбування", "Ламінування вій/брів", "Проріджування брів", "Вусики"]
  }
];

let SLIDES_PER_PAGE_SERVICE = 4;
const screenWidth1 = window.screen.width;
if (screenWidth1 <= 1320) {
  SLIDES_PER_PAGE_SERVICE = 3;
}
if (screenWidth1 <= 1000) {
  SLIDES_PER_PAGE_SERVICE = 2;
}
if (screenWidth1 <= 665) {
  SLIDES_PER_PAGE_SERVICE = 1;
}

let currentSlideIndexService = 0;
let isAnimating = false;

function initServiceSlider() {
  const slidesContainer = document.querySelector(".service-slides");
  const buttonPrevService = document.querySelector(".controls-service-prev");
  const buttonNextService = document.querySelector(".controls-service-next");
  const indicatorsService = document.querySelector(".indicators-service");

  // Додаємо CSS стилі для анімації
  const style = document.createElement('style');
  style.textContent = `
  min-width: 100%;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out; 
  flex-shrink: 0;
  opacity: 0; 
  visibility: hidden;  
  position: absolute;  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  `;
  document.head.appendChild(style);

  function createServiceBlock(service) {
    return `
      <div class="service-block">
        <div>
          <h2 class="service-block-title">${service.title}</h2>
          <p class="service-block-text">${service.description}</p>
          <div class="service-block-info">
            ${service.services.map(item => `
              <div class="service-block-row">
                <div class="service-block-row-img">
                  <img src="icons/arrow-right.svg" alt="" />
                </div>
                <div class="service-block-row-text">${item}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <a class="service-block-link" href="https://n799265.alteg.io/company/751395/personal/select-services?fbclid=PAZXh0bgNhZW0CMTEAAabLqiHtKzMhRhWUXYwmBI1UVrGu612jHFCzv3q1JPzuc6nMSlVEcItK5vg_aem_g_cQ2HMUZu5LZUieFuT7xA&o=">
          <p class="service-block-link-text">Переглянути все та ціни</p>
          <img src="icons/chevron-right.svg" alt="">
        </a>
      </div>
    `;
  }

  function updateSlides() {
    if (isAnimating) return;
    isAnimating = true;

    const totalSlides = Math.ceil(services.length / SLIDES_PER_PAGE_SERVICE);
    
    // Знаходимо поточний активний слайд
    const currentSlide = slidesContainer.querySelector('.service-slide.active');
    
    // Створюємо та додаємо новий слайд
    const newSlide = document.createElement("div");
    newSlide.className = "service-slide";
    
    const serviceBlocks = document.createElement("div");
    serviceBlocks.className = "service-blocks";
    
    const startIdx = currentSlideIndexService * SLIDES_PER_PAGE_SERVICE;
    const endIdx = Math.min(startIdx + SLIDES_PER_PAGE_SERVICE, services.length);
    
    const slideContent = services.slice(startIdx, endIdx)
      .map(service => createServiceBlock(service))
      .join('');
    
    serviceBlocks.innerHTML = slideContent;
    newSlide.appendChild(serviceBlocks);
    
    // Додаємо новий слайд
    if (currentSlide) {
      slidesContainer.appendChild(newSlide);
      
      // Чекаємо один кадр перед додаванням класу active
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newSlide.classList.add('active');
          currentSlide.classList.remove('active');
          
          // Чекаємо завершення анімації
          setTimeout(() => {
            currentSlide.remove();
            isAnimating = false;
          }, 500); // Час має відповідати тривалості transition у CSS
        });
      });
    } else {
      slidesContainer.appendChild(newSlide);
      requestAnimationFrame(() => {
        newSlide.classList.add('active');
        isAnimating = false;
      });
    }
    
    updatePagination(totalSlides);
  }

  function updatePagination(totalSlides) {
    indicatorsService.innerHTML = "";
    
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `indicator-service${i === currentSlideIndexService ? ' active' : ''}`;
      dot.dataset.service = i;
      indicatorsService.appendChild(dot);
    }
  }

  function nextSlide() {
    const totalSlides = Math.ceil(services.length / SLIDES_PER_PAGE_SERVICE);
    if (currentSlideIndexService < totalSlides - 1 && !isAnimating) {
      currentSlideIndexService++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndexService > 0 && !isAnimating) {
      currentSlideIndexService--;
      updateSlides();
    }
  }

  // Touch events
  let startX, endX;
  
  function handleTouchStart(event) {
    if (!isAnimating) {
      startX = event.touches[0].clientX;
    }
  }

  function handleTouchMove(event) {
    if (!isAnimating) {
      endX = event.touches[0].clientX;
    }
  }

  function handleTouchEnd() {
    if (!endX || isAnimating) return;
    
    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Event Listeners
  buttonNextService.addEventListener("click", nextSlide);
  buttonPrevService.addEventListener("click", prevSlide);
  
  indicatorsService.addEventListener("click", (event) => {
    const clickedIndicator = event.target;
    if (clickedIndicator.classList.contains("indicator-service") && !isAnimating) {
      const newIndex = parseInt(clickedIndicator.dataset.service, 10);
      if (newIndex !== currentSlideIndexService) {
        currentSlideIndexService = newIndex;
        updateSlides();
      }
    }
  });

  slidesContainer.addEventListener("touchstart", handleTouchStart);
  slidesContainer.addEventListener("touchmove", handleTouchMove);
  slidesContainer.addEventListener("touchend", handleTouchEnd);

  // Initial render
  updateSlides();
}

document.addEventListener("DOMContentLoaded", initServiceSlider);

// PERSONAL SLIDER
const personal = [
  {
    name: "майстер Юлія",
    img: "img/personal/1.svg",
    days: "пн/ср/пт/нд",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування"
    ]
  },
  {
    name: "майстер Світлана",
    img: "img/personal/2.svg",
    days: "пн-сб",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування",
      "Тейпування"
    ]
  },
  {
    name: "майстер Катерина",
    img: "img/personal/3.svg",
    days: "пн/вт/ср/пт",
    time: "з 09:00 до 20:00",
    services: [
      "Воскова депіляція шугаринг",
      "Електроепіляція"
    ]
  },
  {
    name: "майстер Тетяна",
    img: "img/personal/4.svg",
    days: "вт/чт/сб/нд",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування",
      "Доглядові (косметологічні) процедури"
    ]
  },
  {
    name: "майстер Олена",
    img: "img/personal/5.svg",
    days: "пн-нд",
    time: "з 09:00 до 20:00",
    services: [
      "Лазерна епіляція різних зон",
      "Лазерна косметологія",
      "Апаратний масаж",
      "Обгортання та скрабування, тейпування",
    ]
  },
  {
    name: "масажист В’ячеслав",
    img: "img/personal/6.svg",
    days: "вт/чт/нд",
    time: "Під запис",
    services: [
      "Ручний та апаратний масаж",
      "Обгортання та скрабування"
    ]
  },
  {
    name: "масажист Костянтин",
    img: "img/personal/7.svg",
    days: "вт/чт/нд",
    time: "з 09:00 до 21:00",
    services: [
      "Ручний масаж",
      "Spa-обгортання та скрабування"
    ]
  },
  // Додайте інших майстрів аналогічно
];

let SLIDES_PER_PAGE_PERSONAL = 3;
const screenWidth12 = window.screen.width;
if(screenWidth12 <= 1265){
  SLIDES_PER_PAGE_PERSONAL = 2;
}
if(screenWidth12 <= 850){
  SLIDES_PER_PAGE_PERSONAL = 1;
}

let currentSlideIndexPersonal = 0;

function initPersonalSlider() {
  const slidesContainer = document.querySelector(".personal-slides");
  const buttonPrevPersonal = document.querySelector(".controls-personal-prev");
  const buttonNextPersonal = document.querySelector(".controls-personal-next");
  const indicatorsPersonal = document.querySelector(".indicators-personal");
  
  function createPersonalBlock(person) {
    return `
      <div class="personal-block">
        <div class="personal-block-top">
          <img src="${person.img}" alt="" class="personal-block-top-img">
          <div class="personal-block-top-text">
            <h2 class="personal-block-top-text-title">${person.name}</h2>
            <div class="personal-block-top-text-row">
              <p class="personal-block-top-text-row-title">День</p>
              <p class="personal-block-top-text-row-decription">${person.days}</p>
            </div>
            <div class="personal-block-top-text-row">
              <p class="personal-block-top-text-row-title">Час (під запис)</p>
              <p class="personal-block-top-text-row-decription">${person.time}</p>
            </div>
          </div>
        </div>
        <div class="personal-block-info">
          ${person.services.map(service => `
            <div class="personal-block-info-text">${service}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function updateSlides() {
    const totalSlides = Math.ceil(personal.length / SLIDES_PER_PAGE_PERSONAL);
    const currentSlide = document.querySelector('.personal-slide.active');
    
    // Create new slide
    const newSlide = document.createElement("div");
    newSlide.className = "personal-slide";
    
    const startIdx = currentSlideIndexPersonal * SLIDES_PER_PAGE_PERSONAL;
    const endIdx = Math.min(startIdx + SLIDES_PER_PAGE_PERSONAL, personal.length);
    
    const slideContent = personal.slice(startIdx, endIdx)
      .map(person => createPersonalBlock(person))
      .join('');
    
    newSlide.innerHTML = slideContent;
    
    // Add new slide to container
    const slidesContainer = document.querySelector(".personal-slides");
    
    if (currentSlide) {
      // Fade out current slide
      currentSlide.style.opacity = "0";
      currentSlide.style.visibility = "hidden";
      
      // Wait for fade out animation
      setTimeout(() => {
        currentSlide.remove();
        slidesContainer.appendChild(newSlide);
        
        // Trigger reflow
        void newSlide.offsetWidth;
        
        // Add active class to trigger fade in
        newSlide.classList.add('active');
      }, 200);
    } else {
      slidesContainer.appendChild(newSlide);
      setTimeout(() => {
        newSlide.classList.add('active');
      }, 0);
    }
    
    updatePagination(totalSlides);
  }

  function updatePagination(totalSlides) {
    indicatorsPersonal.innerHTML = "";
    
    if (totalSlides <= 5) {
      for (let i = 0; i < totalSlides; i++) {
        addPageButton(i);
      }
    } else {
      if (currentSlideIndexPersonal > 2) {
        addPageButton(0);
        addEllipsis();
      }

      for (
        let i = Math.max(0, currentSlideIndexPersonal - 1);
        i <= Math.min(totalSlides - 1, currentSlideIndexPersonal + 1);
        i++
      ) {
        addPageButton(i);
      }

      if (currentSlideIndexPersonal < totalSlides - 3) {
        addEllipsis();
        addPageButton(totalSlides - 1);
      }
    }
  }

  function addPageButton(pageNum) {
    const button = document.createElement("div");
    button.className = `indicator-personal${pageNum === currentSlideIndexPersonal ? ' active' : ''}`;
    button.dataset.personal = pageNum;
    button.textContent = pageNum + 1;
    indicatorsPersonal.appendChild(button);
  }

  function addEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "pagination-ellipsis";
    indicatorsPersonal.appendChild(span);
  }

  function nextSlide() {
    const totalSlides = Math.ceil(personal.length / SLIDES_PER_PAGE_PERSONAL);
    if (currentSlideIndexPersonal < totalSlides - 1) {
      currentSlideIndexPersonal++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndexPersonal > 0) {
      currentSlideIndexPersonal--;
      updateSlides();
    }
  }

  // Touch events
  let startX, endX;
  
  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    endX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (!endX) return;
    
    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Event Listeners
  buttonNextPersonal.addEventListener("click", nextSlide);
  buttonPrevPersonal.addEventListener("click", prevSlide);
  
  indicatorsPersonal.addEventListener("click", (event) => {
    const clickedIndicator = event.target;
    if (clickedIndicator.classList.contains("indicator-personal")) {
      currentSlideIndexPersonal = parseInt(clickedIndicator.dataset.personal, 10);
      updateSlides();
    }
  });

  slidesContainer.addEventListener("touchstart", handleTouchStart);
  slidesContainer.addEventListener("touchmove", handleTouchMove);
  slidesContainer.addEventListener("touchend", handleTouchEnd);

  // Initial render
  updateSlides();
}

document.addEventListener("DOMContentLoaded", initPersonalSlider);

// Testimonials
const reviews = [
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 4",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 5",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 6",
    text: "Et harum quidem rerum facilis est et expedita distinctio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 7",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта 8",
    text: "Temporibus autem quibusdam et aut officiis debitis aut",
    stars: 4,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта9",
    text: "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    stars: 3,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },
  {
    name: "Ім’я клієнта10",
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor",
    stars: 5,
    link: "https://www.instagram.com/massage.kyiv.bt?igsh=NTM1azhtdDN6YnZs",
  },

];
let SLIDES_PER_PAGE = 3;
// Ваш код для роботи з відгуками
const screenWidth = window.screen.width
if(screenWidth < 1100){
  SLIDES_PER_PAGE = 2
}
if(screenWidth < 665){
  SLIDES_PER_PAGE = 1
}
const MAX_TEXT_LENGTH = 123;
let currentSlide = 0;

function init() {
  const slidesContainer = document.querySelector(".testimonials-slides");
  const prevButton = document.querySelector(".controls-testimonials-prev");
  const nextButton = document.querySelector(".controls-testimonials-next");
  const indicators = document.querySelector(".indicators-testimonials");

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  function updateSlides() {
    const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
    const slideContent = document.querySelector(".testimonial-slide");
    
    // Приховуємо поточний контент
    slideContent.style.opacity = "0";
    
    setTimeout(() => {
      slideContent.innerHTML = "";
      
      const startIdx = currentSlide * SLIDES_PER_PAGE;
      const endIdx = Math.min(startIdx + SLIDES_PER_PAGE, reviews.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        const review = reviews[i];
        const block = document.createElement("div");
        block.className = "testimonial-slide-block";
        
        const isLongText = review.text.length > MAX_TEXT_LENGTH;
        const truncatedText = truncateText(review.text, MAX_TEXT_LENGTH);
        
        block.innerHTML = `
          <div class="">
            <p class="testimonial-slide-rating">${"★ ".repeat(review.stars)}${"☆ ".repeat(5 - review.stars)}</p>
            <h2 class="testimonial-slide-title">${review.name}</h2>
            <p class="testimonial-slide-text">${truncatedText}</p>
            ${isLongText ? `<button class="read-more-btn">Читати більше...</button>` : ""}
          </div>
          <a href="${review.link}" class="testimonial-slide-link">Відгук з Instagram</a>
        `;
        
        if (isLongText) {
          const readMoreBtn = block.querySelector(".read-more-btn");
          const textElement = block.querySelector(".testimonial-slide-text");
          let isExpanded = false;
          
          readMoreBtn.addEventListener("click", () => {
            isExpanded = !isExpanded;
            textElement.textContent = isExpanded ? review.text : truncatedText;
            readMoreBtn.textContent = isExpanded ? "Згорнути" : "Читати більше...";
          });
        }
        
        slideContent.appendChild(block);
      }
      
      // Показуємо новий контент
      requestAnimationFrame(() => {
        slideContent.style.opacity = "1";
      });
      
      updatePagination(totalSlides);
    }, 250);
  }
  
  // Оновлюємо обробники подій для кнопок
  function initButtons(prevButton, nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
      }
    });
  
    nextButton.addEventListener("click", () => {
      const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlides();
      }
    });
  }
  function updatePagination(totalSlides) {
    indicators.innerHTML = "";

    // Add page numbers
    if (totalSlides <= 5) {
      for (let i = 0; i < totalSlides; i++) {
        addPageButton(i, totalSlides);
      }
    } else {
      if (currentSlide > 2) {
        addPageButton(0, totalSlides);
        indicators.appendChild(createEllipsis());
      }

      for (
        let i = Math.max(0, currentSlide - 1);
        i <= Math.min(totalSlides - 1, currentSlide + 1);
        i++
      ) {
        addPageButton(i, totalSlides);
      }

      if (currentSlide < totalSlides - 3) {
        indicators.appendChild(createEllipsis());
        addPageButton(totalSlides - 1, totalSlides);
      }
    }
  }

  function addPageButton(pageNum, totalSlides) {
    const button = document.createElement("button");
    button.textContent = pageNum + 1;
    button.className = pageNum === currentSlide ? "active" : "";
    button.addEventListener("click", () => {
      currentSlide = pageNum;
      updateSlides();
    });
    indicators.appendChild(button);
  }

  function createEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "pagination-ellipsis";
    return span;
  }

  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides();
    }
  });

  nextButton.addEventListener("click", () => {
    const totalSlides = Math.ceil(reviews.length / SLIDES_PER_PAGE);
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlides();
    }
  });

  updateSlides();
}

document.addEventListener("DOMContentLoaded", init);
