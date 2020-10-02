//selecting elements
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const menuToggler = document.querySelector(".menu-toggler");
const topNav = document.querySelector(".top-nav");
const navLink = document.querySelectorAll(".nav-link");
const toTheTopBtn = document.querySelector(".up");

//declaring variable for cursor
let posX = 0;
let posY = 0;
let mouseX = 0;
let mouseY = 0;

//using tweenMax for cursor
TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(cursorFollower, {
      css: {
        left: posX - 20,
        top: posY - 20,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

//cursor click effect
document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 200);
});

//hover effect on portfolio photos
window.addEventListener("mousemove", function (e) {
  const imgs = document.querySelectorAll(".portfolio-img img");
  mouseX = e.pageX;
  mouseY = e.pageY;

  imgs.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      cursorFollower.classList.add("active");
    });
  });

  imgs.forEach((img) => {
    img.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      cursorFollower.classList.remove("active");
    });
  });
});

//navigation toggle function
function navToggler() {
  if (!menuToggler.classList.contains("open")) {
    menuToggler.classList.add("open");
    topNav.classList.add("open");

    gsap.to(".top-nav", 1, { clipPath: "circle(2500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    menuToggler.classList.remove("open");
    topNav.classList.remove("open");

    gsap.to(".top-nav", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

menuToggler.addEventListener("click", navToggler);

//menu link & toggle navigation
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggler.classList.toggle("open");
    topNav.classList.toggle("open");

    gsap.to(".top-nav", 1, { clipPath: "circle(50px at 100% -10%" });
    document.body.classList.remove("hide");
  });
});

//up button
toTheTopBtn.addEventListener("click", () => scrollTo(0, 0));

//GSAP for on page animations
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

//intro colored-slides and text
tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".swipe1", {
  y: "-100%",
  duration: 1.5,
  delay: 1,
});
tl.to(".swipe2", { y: "-100%", duration: 1.5, stagger: 0.25 }, "-=2");
tl.to(".swipe3", { y: "-100%", duration: 1.5 }, "-=2.5");
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");

//page animations with AOS
AOS.init({
  easing: "ease",
  duration: 1800,
  //once: true
});

//scroll animation for LandingText with GSAP
window.addEventListener("scroll", function () {
  let scrollPosition = window.pageYOffset;
  if (scrollPosition < 200) {
    tl.to(
      ".landing-text",

      { y: "0%", scale: 1, opacity: 1 }
    );
    // tl.fromTo(".about", { opacity: 1 }, { opacity: 0 });
  } else if (scrollPosition < 350) {
    tl.fromTo(".landing-text", { y: "0%" }, { y: "175%", scale: 1.1 });
    // tl.fromTo(".about", { opacity: 0 }, { opacity: 1 }, "-=1");
  } else if (scrollPosition < 450) {
    tl.fromTo(
      ".landing-text",
      { y: "0%", opacity: 0 },
      { y: "222%", opacity: 1 }
    );
  } else {
    tl.to(".landing-text", { scale: 1.3, opacity: 0 });
  }
});
