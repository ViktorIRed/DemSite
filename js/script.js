new Swiper(".image-slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  autoplay: {
    delay: 3000,
  },

  grabCursor: true,
  slidesPerView: 1.2,
  centeredSlides: true,
  initialSlide: 0,
  loop: true,
  speed: 1500,
  spaceBetween: 50,
});

document.addEventListener("DOMContentLoaded", async function () {
  const wrapper = document.getElementById("swiper-works");

  try {
    const response = await fetch(API_URL('pages/works'));
    if (!response.ok) throw new Error("Не удалось загрузить изображения");
    const images = await response.json();

    wrapper.innerHTML = "";

    images.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = "image/img/works-images/" + item.image;
      img.alt = "Фото работы";

      slide.appendChild(img);
      wrapper.appendChild(slide);
    });

    new Swiper(".custom-gallery-slider", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      pagination: {
        el: ".custom-gallery-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".custom-gallery-button-next",
        prevEl: ".custom-gallery-button-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 500,
    });

  } catch (err) {
    console.error("Ошибка загрузки изображений:", err);
  }
});

function toggleMenu() {
  const menu = document.getElementById("burgerMenu");
  menu.classList.toggle("active");
}

function closeMenu() {
  const menu = document.getElementById("burgerMenu");
  menu.classList.remove("active");
}

function handleMenuItemClick(href) {
  closeMenu();
  window.location.href = href;
}

function toggleFooterColumn(element) {
  const column = element.parentElement;
  column.classList.toggle("open");

  const arrow = column.querySelector(".mobile-arrow");
  if (arrow) {
    if (column.classList.contains("open")) {
      arrow.style.transform = "rotate(180deg)";
    } else {
      arrow.style.transform = "rotate(0deg)";
    }
  }
}
