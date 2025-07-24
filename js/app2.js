const swiper = new Swiper(".swiper-container2", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
  grabCursor: true,
  slidesPerView: 1.2,
  centeredSlides: true,
  initialSlide: 0,
  loop: true,
  speed: 1500,
  spaceBetween: 50,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
document.getElementById("signout").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("authToken");
  location.reload();
});
document.getElementById("signoutMobile").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("authToken");
  location.reload();
});

function toggleAuthButtons() {
  if (localStorage.getItem("authToken")) {
    if (window.innerWidth <= 670) {
      document.getElementById("signinMobile").style.display = "none";
      document.getElementById("signoutMobile").style.display = "block";
      document.getElementById("signin").style.display = "none";
      document.getElementById("signout").style.display = "none";
    } else {
      document.getElementById("signin").style.display = "none";
      document.getElementById("signout").style.display = "block";
      document.getElementById("signinMobile").style.display = "none";
      document.getElementById("signoutMobile").style.display = "none";
    }
  }
}
toggleAuthButtons();
window.addEventListener("resize", toggleAuthButtons);

function getSwiperData() {
  fetch(API_URL("pages/pagesload") + "?list=services", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.list) {
        const wrapper = document.querySelector(
          "#swiper-main-id .swiper-wrapper"
        );
        wrapper.innerHTML = "";

        if (data.list.length <= 0)
          addSlide("Нет доступных услуг", "Извините скоро исправим!");
        for (element of data.list) {
          addSlide(element.name, element.description);
        }
      } else addSlide("Нет доступных услуг", "Извините скоро исправим!");
    });
}
async function getUserData() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    document.getElementById("preloader").style.display = "none";
    document.body.style.overflow = "auto";
    return;
  }
  await fetch(API_URL("user/getRole"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success && data.user.role === "admin") {
        document.getElementById("adminBtn").style.display = "block";
        document.getElementById("adminBtn2").style.display = "block";
      }
    })
    .catch((err) => {
      console.error("Ошибка при получении данных пользователя:", err);
    });
}

async function loadSite() {
  try {
    getSwiperData();
    await getUserData();
  } catch (e) {
    console.log(e);
  } finally {
    document.getElementById("preloader").style.display = "none";
    document.body.style.overflow = "auto";
  }
}

loadSite();

function addSlide(title, description) {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  slide.innerHTML = `
    <div class="service-details">
      <h3 class="service-title">${title}</h3>
      <p class="service-description">${description}</p>
    </div>
  `;

  swiper.appendSlide(slide);
}
