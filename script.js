// Слайдер
const heroSection = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-content h1');
const heroText = document.querySelector('.hero-content p');

const slides = [
{
  bg: "url('img/banner.jpg')",
  title: "Custom PC builds for any need",
  text: "Gaming, design, or office — we’ll create your ideal setup."
},
{
  bg: "url('img/hero1.jpg')",
  title: "PC assembly and sales in Uzbekistan",
  text: "Over 19 years of experience. Professional approach. Full warranty."
},
{
  bg: "url('img/hero2.jpg')",
  title: "Warranty, delivery, and support",
  text: "Complete service and free consultations."
},
{
  bg: "url('img/hero4.jpg')",
  title: "Warranty, delivery, and support",
  text: "Complete service and free consultations."
},
{
  bg: "url('img/hero3.jpg')",
  title: "Custom PC builds for any need",
  text: "Gaming, design, or office — we’ll create your ideal setup."
},
{
  bg: "url('img/hero5.jpg')",
  title: "Warranty, delivery, and support",
  text: "Complete service and free consultations."
}
];

const heroContent = document.querySelector('.hero-content');
setTimeout(() => {
  heroContent.classList.add('show');
}, 300);

let currentSlide = 0;
let fading = false;

const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', () => {
navMenu.classList.toggle('active');
});

setInterval(() => {
    if (fading) return;
    fading = true;

    heroSection.style.opacity = 0;

    setTimeout(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${slides[currentSlide].bg}`;
        heroTitle.textContent = slides[currentSlide].title;
        heroText.textContent = slides[currentSlide].text;

        heroSection.style.opacity = 1;
        setTimeout(() => fading = false, 500);
    }, 300);
}, 4000);
// Анимация при прокрутке
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('show');
});
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (name != '' && phone != '') {
      const telegramBotToken = "7942895492:AAGwAUQWDEvFoBftGyCxaKdCp-seDLgWOKE";
      const chatId = "-1002691405251";

      const text = `📥 Новое сообщение с сайта\n\n👤 Имя: ${name}\n📧 Телефон: ${phone}\n📝 Сообщение: ${message}`;

      fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            alert("Message sent! We will contact you shortly.");
            document.getElementById("contactForm").reset();
          } else {
            alert("Error sending message. Please try again later.");
          }
        })
        .catch(error => {
          console.error("Error: ", error);
          alert("Connection error. Please try again later.");
        });
    }
    else alert('Fill in all fields!');
  });


// document.addEventListener('DOMContentLoaded', ()=>{
// });


document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.product-img-slider');
  
  sliders.forEach(slider => {
    // Создаем точки-индикаторы
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    const images = slider.getAttribute('data-images').split(',');
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
    
    slider.appendChild(dotsContainer);
    
    // Инициализация слайдера
    let currentIndex = 0;
    slider.style.backgroundImage = `url(${images[currentIndex]})`;
    
    // Функция для смены изображения
    function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      slider.style.opacity = 0;
      
      setTimeout(() => {
        slider.style.backgroundImage = `url(${images[currentIndex]})`;
        slider.style.opacity = 1;
        
        // Обновляем активную точку
        const dots = slider.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
      }, 300);
    }
    
    // Запускаем интервал для автоматической смены
    const intervalId = setInterval(changeImage, 3000);
    
    // Клик по точкам для ручной смены
    const dots = slider.querySelectorAll('.slider-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        clearInterval(intervalId);
        currentIndex = parseInt(this.dataset.index);
        slider.style.opacity = 0;
        
        setTimeout(() => {
          slider.style.backgroundImage = `url(${images[currentIndex]})`;
          slider.style.opacity = 1;
          
          dots.forEach(d => d.classList.remove('active'));
          this.classList.add('active');
          
          // Перезапускаем интервал
          intervalId = setInterval(changeImage, 2000);
        }, 2000);
      });
    });
  });
});