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

// Heading text changes and placeholder of search bar changes
const heading = document.getElementById("temp_text");
const listItems = document.querySelectorAll(".choices ul li");

const defaultText = "Where to?";
const defaultPlaceholder = "Places to go, things to do, hotels...";

const defaultSearch = document.querySelector(".default-search");
const flightsSearch = document.querySelector(".flights-search");
const searchInput = document.getElementById("search_element");

heading.textContent = defaultText;
searchInput.placeholder = defaultPlaceholder;
defaultSearch.style.display = "block";
flightsSearch.style.display = "none";

listItems.forEach(item => {
  item.addEventListener("click", () => {
    const newText = item.getAttribute("data-title");
    const newPlaceholder = item.getAttribute("data-placeholder");

    // reset visibility
    defaultSearch.style.display = "block";
    flightsSearch.style.display = "none";

    if (!newText || newText.toLowerCase() === "search all") {
      heading.textContent = defaultText;
      searchInput.placeholder = defaultPlaceholder;
    } else {
      heading.textContent = newText;

      if (newText.toLowerCase().includes("flight")) {
        // hide normal search, show flights form
        defaultSearch.style.display = "none";
        flightsSearch.style.display = "block";
      } else {
        searchInput.placeholder = newPlaceholder || defaultPlaceholder;
      }
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

// Login modalOverlay

document.getElementById("btn-log-in").addEventListener("click", () => {
  document.getElementById("login").style.display = "flex";
});

document.querySelector(".closeLogin").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";  // correct
});

window.addEventListener("click", (e) => {
  let loginOverlay = document.getElementById("login");
  if (e.target === loginOverlay) {
    loginOverlay.style.display = "none";
  }
});

// validating the input details //
document.getElementById("enableLogin").addEventListener('click', () => {
  let inputtedEmail = document.getElementById("user_email").value.trim();
  let inputtedPassword = document.getElementById("user_password").value;

  const validUser = localStorage.getItem(inputtedEmail);
  if (!validUser) {
    alert("No account found with this email");
    return;
  }

  const userData = JSON.parse(validUser);
  if (userData.password === inputtedPassword) {
    alert("Login Succesful");

    localStorage.setItem("loggedInUser", inputtedEmail);

    window.location.href = "index.html";
  } else {
    alert("Incorrect password");
  }
});

if (localStorage.getItem("showLoginModal") === "true") {
  document.getElementById("modalOverlay").style.display = "flex";
  localStorage.removeItem("showLoginModal");

  document.querySelector(".close").addEventListener("click", () => {
    let loginDiv = document.getElementById("modalOverlay");
    loginDiv.style.display = "none";
  })

  document.querySelector(".email-btn").addEventListener("click", () => {
    let loginWithEmail = document.getElementById("login");
    let mainModal = document.getElementById("modalOverlay");

    mainModal.style.display = "none";
    loginWithEmail.style.display = "flex";
  });

  document.querySelector(".closeLogin").addEventListener("click", () => {
    let emailLogin = document.getElementById("login");
    emailLogin.style.display = "none";
  });
}


const authButtons = document.getElementById("auth-buttons");
const userDashboard = document.querySelector('.user-dashboard');
const userDashboardBtn = document.getElementById("btn-user-dashboard");
const greetMessage = document.getElementById("greetMessage");

const loggedInUser = localStorage.getItem("loggedInUser");

if (loggedInUser) {
  authButtons.style.display = "none";
  userDashboard.style.display = "flex";

  const userData = JSON.parse(localStorage.getItem(loggedInUser));

  if(greetMessage&& userData.name){
    greetMessage.textContent = `Hello, ${userData.name}`;
  }
}

if(userDashboardBtn){
  userDashboardBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
    
  });
}




// // Get flight overlay
// const flightOverlay = document.getElementById("flightOverlay");

// // Function to open flights modal
// function openFlights() {
//   flightOverlay.style.display = "flex";   // or "block"
//   document.body.style.overflow = "hidden"; // prevent background scroll
// }
// // Function to close flights modal
// function closeFlights() {
//   flightOverlay.style.display = "none";
//   document.body.style.overflow = "auto"; // restore scroll
// }

// // Close when clicking outside modal
// window.addEventListener("click", function (e) {
//   if (e.target === flightOverlay) {
//     closeFlights();
//   }
// });

// function openHomes() {
//   document.getElementById("homesOverlay").style.display = "flex";
// }

// function closeHomes() {
//   document.getElementById("homesOverlay").style.display = "none";
// }


// function openRestaurant() {
//   document.getElementById("restaurantModal").classList.remove("hidden");
// }

// function closeRestaurant() {
//   document.getElementById("restaurantModal").classList.add("hidden");
// }
