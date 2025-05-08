// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      alert('Thank you! Your message has been received.');
      this.reset();
    } else {
      alert('Something went wrong. Please try again later.');
    }
  });
});

// ✅ Hero image slideshow runs on page load
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide-image');
  if (slides.length === 0) return;

  let currentIndex = 0;
  slides[currentIndex].classList.add('active');

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 4000);
});
