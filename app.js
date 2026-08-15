// Seleccionamos el contenedor del slider y los elementos del menú
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

// Arreglo con los productos disponibles de la tienda de velas
const products = [
  {
    id: 1,
    title: "VELA FOCO",
    price: 2.99,
    description: "Notas herbales y estimulantes que despejan los pensamientos, potenciando tu concentración y productividad durante las horas de estudio o trabajo.",
    colors: [
      {
        code: "#f5d7b5",
        img: "img/IMG_2884.PNG",
      }
    ],
  },
  {
    id: 2,
    title: "VELA ENERGÍA",
    price: 2.99,
    description: "Una combinación cálida y vibrante que despierta tus sentidos y te inyecta la vitalidad necesaria para arrancar el día con la mejor actitud.",
    colors: [
      {
        code: "#c77a42",
        img: "img/IMG_2885.PNG",
      },
    ],
  },
  {
    id: 3,
    title: "VELA CALMA",
    price: 2.99,
    description: "Tonos suaves y notas florales que ayudan a desacelerar la mente, creando el espacio perfecto para descansar y desconectarte al final del día.",
    colors: [
      {
        code: "#d7c9ee",
        img: "img/IMG_2886.PNG",
      }
    ],
  }
];

// Producto actualmente seleccionado para mostrar en la sección detalle
let choosenProduct = products[0];

// Elementos del producto activo
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductDesc = document.querySelector(".productDesc");
const currentProductTypes = document.querySelectorAll(".type");
const currentProductSizes = document.querySelectorAll(".size");

function animateElement(element, animationName) {
  element.classList.remove(
    "animate__animated",
    "animate__fadeInUp",
    "animate__fadeInDown",
    "animate__zoomIn",
    "animate__pulse"
  );

  void element.offsetWidth;
  element.classList.add("animate__animated", animationName);
}

const productSection = document.querySelector(".product");

if (productSection && "IntersectionObserver" in window) {
  const productObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(productSection, "animate__fadeInUp");
          animateElement(currentProductImg, "animate__zoomIn");
          animateElement(currentProductTitle, "animate__fadeInUp");
          animateElement(currentProductPrice, "animate__fadeInDown");
          animateElement(currentProductDesc, "animate__fadeInUp");
          productObserver.unobserve(productSection);
        }
      });
    },
    { threshold: 0.35 }
  );

  productObserver.observe(productSection);
}

function updateSelectedProduct(index) {
  wrapper.style.transform = `translateX(${-100 * index}vw)`;

  choosenProduct = products[index];

  currentProductTitle.textContent = choosenProduct.title;
  currentProductPrice.textContent = "$" + choosenProduct.price;
  currentProductDesc.textContent = choosenProduct.description;
  currentProductImg.src = choosenProduct.colors[0].img;

  currentProductTypes.forEach((type, typeIndex) => {
    type.classList.toggle("active", typeIndex === index);
    if (typeIndex === index) {
      animateElement(type, "animate__pulse");
    }
  });

  animateElement(currentProductImg, "animate__zoomIn");
  animateElement(currentProductTitle, "animate__fadeInUp");
  animateElement(currentProductPrice, "animate__fadeInDown");
  animateElement(currentProductDesc, "animate__fadeInUp");
}

// Cambia el slide y el producto según el menú seleccionado
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    updateSelectedProduct(index);
  });
});

// Cambia el producto según el tipo de vela seleccionado
currentProductTypes.forEach((type, index) => {
  type.addEventListener("click", () => {
    updateSelectedProduct(index);
  });
});

// Hace que el tamaño seleccionado se destaque visualmente
currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "#2e1d16";
    size.style.color = "white";
  });
});

// Modal del formulario de pago
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});