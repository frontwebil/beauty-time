const openLanguageButton = document.getElementById("open-language");
console.log(openLanguageButton);
const languageMenu = document.getElementById("language-menu");

openLanguageButton.onclick = (e) => {
  languageMenu.classList.toggle("active");
};

// SWIPER SERVICE

let startX = 0;
let endX = 0;
let currentSlideIndexService = 0;
const buttonPrevService = document.querySelector(".controls-service-prev");
const buttonNextService = document.querySelector(".controls-service-next");
const indicatorsService = document.querySelector(".indicators-service");

const slidesService = document.querySelectorAll(".service-slide");
const slidesServiceLength = slidesService.length;

// Dynamically generate indicators

// Function to handle touch start
function handleTouchStartService(event) {
  startX = event.touches[0].clientX; // Get the starting touch point
}

// Function to handle touch end
function handleTouchEndService() {
  const deltaX = endX - startX; // Difference between start and end points

  if (Math.abs(deltaX) > 50) {
    // Minimum distance for swipe
    if (deltaX < 0) {
      nextSlideService(); // Swipe left (show next slide)
    } else {
      prevSlideService(); // Swipe right (show previous slide)
    }
  }
}

// Function to handle touch move
function handleTouchMoveService(event) {
  endX = event.touches[0].clientX; // Update the end touch point
}

// Add event listeners for swipe gestures
slidesService.forEach((slide) => {
  slide.addEventListener("touchstart", handleTouchStartService);
  slide.addEventListener("touchmove", handleTouchMoveService);
  slide.addEventListener("touchend", handleTouchEndService);
});

indicatorsService.innerHTML = Array.from(
  { length: slidesServiceLength },
  (_, i) => {
    return `<span class="indicator ${
      currentSlideIndexService === i ? "active" : ""
    }" data-service="${i}"></span>`;
  }
).join("");

// Function to show the current slide
function showSlideService() {
  slidesService[currentSlideIndexService].classList.add("active");
  updateIndicatorsService();
}

// Function to hide the current slide
function hideSlideService() {
  slidesService[currentSlideIndexService].classList.remove("active");
}

// Initialize the slider
function initializeSliderService() {
  slidesService.forEach((el) => el.classList.remove("active"));
  showSlideService();
}

// Function to go to the next slide
function nextSlideService() {
  hideSlideService();
  currentSlideIndexService++;
  if (currentSlideIndexService >= slidesServiceLength) {
    currentSlideIndexService = 0;
  }
  showSlideService();
}

// Function to go to the previous slide
function prevSlideService() {
  hideSlideService();
  currentSlideIndexService--;
  if (currentSlideIndexService < 0) {
    currentSlideIndexService = slidesServiceLength - 1;
  }
  showSlideService();
}

// Function to update the active state of indicators
function updateIndicatorsService() {
  document.querySelectorAll(".indicator").forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentSlideIndexService);
  });
}

// Function to handle indicator clicks
function handleIndicatorClickService(event) {
  const clickedIndicator = event.target;
  if (clickedIndicator.classList.contains("indicator")) {
    hideSlideService();
    currentSlideIndexService = parseInt(clickedIndicator.dataset.service, 10); // Get the slide index from the indicator
    showSlideService();
  }
}

// Event listeners for navigation buttons
buttonNextService.addEventListener("click", nextSlideService);
buttonPrevService.addEventListener("click", prevSlideService);

// Event listener for indicators
indicatorsService.addEventListener("click", handleIndicatorClickService);

// Initialize slider on load
initializeSliderService();

let currentSlideIndexPersonal = 0;
const buttonPrevPersonal = document.querySelector(".controls-personal-prev");
const buttonNextPersonal = document.querySelector(".controls-personal-next");
const indicatorsPersonal = document.querySelector(".indicators-personal");

const slidesPersonal = document.querySelectorAll(".personal-slide");
const slidesPersonalLength = slidesPersonal.length;

function handleTouchStartPersonal(event) {
  startX = event.touches[0].clientX;
}

function handleTouchEndPersonal() {
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      nextSlidePersonal();
    } else {
      prevSlidePersonal();
    }
  }
}

function handleTouchMovePersonal(event) {
  endX = event.touches[0].clientX;
}

slidesPersonal.forEach((slide) => {
  slide.addEventListener("touchstart", handleTouchStartPersonal);
  slide.addEventListener("touchmove", handleTouchMovePersonal);
  slide.addEventListener("touchend", handleTouchEndPersonal);
});

indicatorsPersonal.innerHTML = Array.from(
  { length: slidesPersonalLength },
  (_, i) => {
    return `<div class="indicator-personal ${
      currentSlideIndexPersonal === i ? "active" : ""
    }" data-personal="${i}">${i + 1}</div>`;
  }
).join("");

console.log(indicatorsPersonal);

function showSlidePersonal() {
  slidesPersonal[currentSlideIndexPersonal].classList.add("active");
  updateIndicatorsPersonal();
}

function hideSlidePersonal() {
  slidesPersonal[currentSlideIndexPersonal].classList.remove("active");
}

function initializeSliderPersonal() {
  slidesPersonal.forEach((el) => el.classList.remove("active"));
  showSlidePersonal();
}

function nextSlidePersonal() {
  hideSlidePersonal();
  currentSlideIndexPersonal++;
  if (currentSlideIndexPersonal >= slidesPersonalLength) {
    currentSlideIndexPersonal = 0;
  }
  showSlidePersonal();
}

function prevSlidePersonal() {
  hideSlidePersonal();
  currentSlideIndexPersonal--;
  if (currentSlideIndexPersonal < 0) {
    currentSlideIndexPersonal = slidesPersonalLength - 1;
  }
  showSlidePersonal();
}

function updateIndicatorsPersonal() {
  document.querySelectorAll(".indicator-personal").forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentSlideIndexPersonal);
  });
}

function handleIndicatorClickPersonal(event) {
  const clickedIndicator = event.target;
  if (clickedIndicator.classList.contains("indicator-personal")) {
    hideSlidePersonal();
    currentSlideIndexPersonal = parseInt(clickedIndicator.dataset.personal, 10); // Get the slide index from the indicator
    showSlidePersonal();
  }
}

buttonNextPersonal.addEventListener("click", nextSlidePersonal);
buttonPrevPersonal.addEventListener("click", prevSlidePersonal);

indicatorsPersonal.addEventListener("click", handleIndicatorClickPersonal);

initializeSliderPersonal();



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
if(screenWidth < 1000){
  SLIDES_PER_PAGE = 2
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
    slideContent.innerHTML = "";
    slideContent.style.opacity = 0;

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
        <p class="testimonial-slide-rating">${"★ ".repeat(
          review.stars
        )}${"☆ ".repeat(5 - review.stars)}</p>
        <h2 class="testimonial-slide-title">${review.name}</h2>
        <p class="testimonial-slide-text">${truncatedText}</p>
        ${
          isLongText
            ? `<button class="read-more-btn">Читати більше...</button>`
            : ""
        }
        </div>
        <a href="${
          review.link
        }" class="testimonial-slide-link">Відгук з Instagram</a>
      `;

      if (isLongText) {
        const readMoreBtn = block.querySelector(".read-more-btn");
        const textElement = block.querySelector(".testimonial-slide-text");
        let isExpanded = false;

        readMoreBtn.addEventListener("click", () => {
          isExpanded = !isExpanded;
          textElement.textContent = isExpanded ? review.text : truncatedText;
          readMoreBtn.textContent = isExpanded
            ? "Згорнути"
            : "Читати більше...";
        });
      }

      slideContent.appendChild(block);
      requestAnimationFrame(() => {
        slideContent.style.opacity = 1;
      });
    }

    updatePagination(totalSlides);
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
