// Dropdown Toggle
const capsules = document.querySelectorAll(".capsule");

capsules.forEach(capsule => {
  capsule.addEventListener("click", (e) => {
    e.stopPropagation();

    document.querySelectorAll(".drop-down").forEach(menu => {
      if (menu !== capsule.querySelector(".drop-down")) {
        menu.style.display = "none";
      }
    });

    const dropdown = capsule.querySelector(".drop-down");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".drop-down").forEach(menu => {
    menu.style.display = "none";
  });
});

// Heading text changes
const heading = document.getElementById("temp_text");
const listItems = document.querySelectorAll(".choices ul li");

const defaultText = "Where to?";

listItems.forEach(item => {
  item.addEventListener("click", () => {
    const newText = item.getAttribute("data-title");

    if (!newText || newText.toLowerCase() === "search all") {
      heading.textContent = defaultText;

    }
    else {
      heading.textContent = newText;
    }
  });
});

// Slideshow hero section
let slides = document.querySelectorAll(".slide");
let caption = document.getElementById("caption-text");
let index = 0;

let captions = [
  "@John C",
  "@Sarah M",
  "@David K",
  "@Emily R"
];

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === n) ? "block" : "none";
  });
  caption.textContent = captions[n];
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);

}

showSlide(index);
setInterval(nextSlide, 2000);

// Sign in pop up
const modalOverlay = document.getElementById("modalOverlay");
const openModal = document.getElementById("btn-sign-in");
const closeModal = document.querySelector(".close");

openModal.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

// image slider under hero section
const track = document.querySelector('.slider-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const slid = document.querySelectorAll('.img-container');

let ind = 0;
let slideWidth = slid[0].offsetWidth + 12; // initial width
let totalSlides = slid.length;

window.addEventListener('resize', () => {
  slideWidth = slid[0].offsetWidth + 12;
  updateSlide();
});

function updateSlide() {
  track.style.transform = `translateX(-${ind * slideWidth}px)`;
}

next.addEventListener('click', () => {
  if (ind < totalSlides - 1) {
    ind++;
    updateSlide();
  }
});

prev.addEventListener('click', () => {
  if (ind > 0) {
    ind--;
    updateSlide();
  }
});

// Swipe support
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  let moveX = e.touches[0].clientX - startX;

});

track.addEventListener('touchend', (e) => {
  isDragging = false;
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff < -50 && ind < totalSlides - 1) {
    ind++;
    updateSlide();
  } else if (diff > 50 && ind > 0) {
    ind--;
    updateSlide();
  }
});
