window.addEventListener("DOMContentLoaded", () => {
  // PRELAODER
  setTimeout(() => {
    showPreLoader(true);
  }, 1000);
  closeAlert();
  closeAlertSend();
  AOS.init();
  /**
   * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
   *
   * @private
   * @author Todd Motto
   * @link https://github.com/toddmotto/foreach
   * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
   * @callback requestCallback      callback   - Callback function for each iteration.
   * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
   * @returns {}
   */
  var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
      for (var c in t)
        Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
  };
  var hamburgers = document.querySelectorAll(".hamburger");
  if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
      hamburger.addEventListener(
        "click",
        function () {
          this.classList.toggle("is-active");
        },
        false
      );
    });
  }

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
  const carrousel = new Swiper(".myCarrousel", {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      "@1.50": {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  /*=============================================
  =            CONTENT ANIMATE SLIDER            =
  =============================================*/

  /*=====  End of CONTENT ANIMATE SLIDER  ======*/

  const headerSticky = () => {
    const header = document.getElementById("header");
    const posY = this.window.scrollY;
    const nextSectionY = document.getElementById("que-compramos").offsetTop;

    if (posY > nextSectionY) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  };
  window.addEventListener("scroll", headerSticky);

  /*=============================================
  =            HEADER DESKTOP            =
  =============================================*/

  /*=====  End of HEADER DESKTOP  ======*/

  /*=============================================
  =            HEADER MOBILE            =
  =============================================*/
  const hamburger = document.getElementById("hamburger");
  // const linksa = document.querySelector('.')
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    const linksMenu = document.querySelectorAll(".link-menu");
    console.log(linksMenu);
    linksMenu.forEach((link) => {
      if (hamburger.classList.contains("is-active")) {
        link.classList.remove("fade-out");
        menu.classList.add("show");
        link.classList.add("fade-in");
        console.log("click");
      } else {
        menu.classList.remove("show");
        link.classList.remove("fade-in");
        link.classList.add("fade-out");
      }
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-active");
        menu.classList.remove("show");
        link.classList.add("fade-out");
      });
    });
  };
  hamburger.addEventListener("click", toggleMenu);

  /*=====  End of HEADER MOBILE  ======*/

  /*=============================================
  =            INPUT FILE DISPLAY CONTENT            =
  =============================================*/
  let files = [];
  const containerFiles = document.querySelector(".images");

  const displayContentInputFile = () => {
    const inputFile = document.getElementById("archivo");
    const form = document.getElementById("form-contact");

    inputFile.addEventListener("change", () => {
      // Input FIle
      let file = inputFile.files;

      for (let i = 0; i < file.length; i++) {
        files.push(file[i]);
      }

      // ShowImages;
      showImages();
    });
  };
  displayContentInputFile();

  const showImages = () => {
    let imagesHTML = "";

    files.forEach((file, i) => {
      imagesHTML += `
          <div class="image"   id="${i}" data-target=${i}>
            <div class="d-flex justify-content-center align-items-center image-icon"><i class="fa-solid fa-image"></i></div>
            <p class="openRegular">${file.name}</p>
            <i class="fas fa-times"></i>
          </div>
      `;
    });
    containerFiles.innerHTML = imagesHTML;

    const images = document.querySelectorAll(".image");

    images.forEach((image) => {
      image.addEventListener("click", () => {
        let index = image.dataset.target;
        files.splice(index, 1);
        showImages();
      });
    });
  };



  /*=====  End of INPUT FILE DISPLAY CONTENT  ======*/

  /*=============================================
  =            Formulario             =
  =============================================*/
  const sendFormulario = () => {
    const formulario = document.getElementById("form-contact");
    const alert = document.getElementById("alert");
    const alertSend = document.getElementById("alertSend");
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre");
      const email = document.getElementById("email");
      const telefono = document.getElementById("telefono");
      const mensaje = document.getElementById("mensaje");
      const images = document.getElementById("archivo");

      if(nombre.value.trim() === '' || email.value.trim() === '0' || mensaje.value.trim() === '' || images.value.length <= 0){
        alert.classList.add("show");
        return;
      }

      // FORM DATA
      const datos = new FormData(formulario);
      fetch("mail.php", {
        method: "POST",
        mode: "cors",
        body: datos,
      })
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        if('exito'){
          alertSend.classList.add("show");
          formulario.reset();
          files.splice(0, files.length);
          showImages();
        }
      })

      // sendMail(datos);
    });
  };
  sendFormulario();

  /*=====  End of Formulario   ======*/
});



const showPreLoader = (state) => {
  let preloader = document.querySelector(".preloader");
  if (state === true) {
    preloader.classList.add("fadeOutRight");
  }
};

const closeAlert = () => {
  const alert = document.getElementById("alert");
  const btn = alert.firstElementChild.lastElementChild;

  btn.addEventListener("click", (e) => {
    alert.classList.remove("show", "fadeOut");
  });
  alert.addEventListener("click", (e) => {
    if (e.target.classList[0] === alert.classList[0]) {
      alert.classList.remove("show");
    }
  });
};

const closeAlertSend = () => {
  const alert = document.getElementById("alertSend");
  const btn = alert.firstElementChild.lastElementChild;

  btn.addEventListener("click", (e) => {
    alert.classList.remove("show", "fadeOut");
  });
  alert.addEventListener("click", (e) => {
    if (e.target.classList[0] === alert.classList[0]) {
      alert.classList.remove("show");
    }
  });
};
