const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart-drawer');
const cartClose = document.querySelector('.cart-close');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');
const emptyCartMessage = '<p class="empty-cart">Seu carrinho está vazio.</p>';
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('[data-close-modal="true"]');
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterStatus = document.querySelector('.newsletter-status');
const contactForm = document.querySelector('.contact-form');
const modalForm = document.querySelector('.modal-form');
const modalTriggerButtons = document.querySelectorAll('[data-open-modal="true"]');
const revealItems = document.querySelectorAll('.reveal');
const faqItems = document.querySelectorAll('.faq-item');
const whatsappNumber = '551637024131';

let cart = [];

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function parseCurrency(value) {
  return Number(
    value
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  );
}

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

function updateCartUI() {
  if (!cartCount || !cartItemsContainer || !totalPrice) return;

  cartCount.textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));

  if (!cart.length) {
    cartItemsContainer.innerHTML = emptyCartMessage;
    totalPrice.textContent = 'R$ 0,00';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = formatCurrency(total);

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.quantity}x · ${formatCurrency(item.price)}</p>
          </div>
          <button type="button" data-remove-name="${item.name}">Remover</button>
        </div>
      `
    )
    .join('');
}

function addToCart(name, price) {
  const currentItem = cart.find((item) => item.name === name);

  if (currentItem) {
    currentItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartUI();
  openCart();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartUI();
}

function sendToWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

function validateField(input) {
  if (!input.checkValidity()) {
    input.setAttribute('aria-invalid', 'true');
    return false;
  }

  input.setAttribute('aria-invalid', 'false');
  return true;
}

function showFormStatus(element, message, hasError = false) {
  element.textContent = message;
  element.classList.toggle('error', hasError);
}

function openModal() {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

if (cartButton) {
  cartButton.addEventListener('click', () => {
    if (!cartDrawer) return;
    const isOpen = cartDrawer.classList.contains('is-open');
    if (isOpen) {
      closeCart();
      return;
    }
    openCart();
  });
}

if (cartClose) {
  cartClose.addEventListener('click', closeCart);
}

document.addEventListener('click', (event) => {
  if (!cartDrawer || !cartButton) return;

  const clickedInsideCart = cartDrawer.contains(event.target);
  const clickedCartButton = cartButton.contains(event.target);

  if (!clickedInsideCart && !clickedCartButton && cartDrawer.classList.contains('is-open')) {
    closeCart();
  }
});

const finishOrderButton = document.querySelector('.finish-order');

if (finishOrderButton) {
  finishOrderButton.addEventListener('click', () => {
    if (!cart.length) {
      showFormStatus(document.querySelector('.form-status'), 'Seu carrinho está vazio. Adicione ao menos um item.', true);
      openCart();
      return;
    }

    const summary = cart
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(', ');
    const total = formatCurrency(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    sendToWhatsApp(`Olá! Gostaria de finalizar o pedido com: ${summary}. Total estimado: ${total}.`);
  });
}

if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-name]');
    if (!button) return;
    removeFromCart(button.dataset.removeName);
  });
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.dataset.name;
    const priceElement = card.querySelector('.promo-price');
    const price = parseCurrency(priceElement.textContent);
    addToCart(name, price);
  });
});

document.querySelectorAll('.buy-now').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.dataset.name;
    sendToWhatsApp(`Olá! Estou interessado no produto ${name}. Gostaria de mais informações e preço.`);
  });
});

document.querySelectorAll('.service-button').forEach((button) => {
  button.addEventListener('click', () => {
    const service = button.dataset.service;
    sendToWhatsApp(`Olá! Quero saber mais sobre o serviço de ${service}.`);
  });
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    faqItems.forEach((faqItem) => {
      const faqButton = faqItem.querySelector('.faq-question');
      const faqAnswer = faqItem.querySelector('.faq-answer');
      faqButton.setAttribute('aria-expanded', 'false');
      faqItem.classList.remove('is-open');
      faqAnswer.style.maxHeight = null;
    });

    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      item.classList.add('is-open');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

if (newsletterForm) newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  if (!validateField(emailInput)) {
    emailInput.focus();
    showFormStatus(newsletterStatus, 'Informe um e-mail válido para receber as ofertas.', true);
    return;
  }

  showFormStatus(newsletterStatus, 'E-mail cadastrado com sucesso!');
  newsletterForm.reset();
});

if (contactForm) contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = contactForm.querySelectorAll('input, textarea');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  const status = contactForm.querySelector('.form-status');

  if (!isValid) {
    showFormStatus(status, 'Preencha todos os campos corretamente.', true);
    return;
  }

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  showFormStatus(status, 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
  sendToWhatsApp(`Olá! Meu nome é ${name}. ${message}`);
  contactForm.reset();
});

if (modalForm) modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('modal-name');
  const emailInput = document.getElementById('modal-email');

  if (!validateField(nameInput) || !validateField(emailInput)) {
    return;
  }

  const status = document.querySelector('.modal-status');
  showFormStatus(status, 'Cadastro confirmado! Você receberá ofertas exclusivas.', false);
  modalForm.reset();
  setTimeout(() => {
    closeModal();
  }, 1200);
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

modalTriggerButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCart();
    closeModal();
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px 120px' }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

updateCartUI();
