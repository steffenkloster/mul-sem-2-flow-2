let stickies = [];
let lastKnownScrollPosition = 0;
let ticking = false;
const navBar = document.querySelector("nav");

document.addEventListener("scroll", () => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (lastKnownScrollPosition > 0) {
        navBar.classList.add("scrolled");
      } else {
        navBar.classList.remove("scrolled");
      }

      // stickies.forEach((sticky, i) => {
      //   console.log(sticky);
      //   const stickyPosition = sticky.dataset.originalPosition;

      //   if (stickyPosition <= lastKnownScrollPosition) {
      //     const nextSticky = stickies[i + i] ?? null,
      //       nextStickyPosition =
      //         nextSticky.dataset.originalPosition -
      //         sticky.dataset.originalHeight;
      //     sticky.classList.add("fixed");

      //     if (
      //       nextSticky &&
      //       sticky.getBoundingClientRect().top >= nextStickyPosition
      //     ) {
      //       sticky.classList.add("absolute");
      //       sticky.style.top = nextStickyPosition;
      //     }
      //   } else {
      //     const prevSticky = stickies[i - 1] ?? null;

      //     sticky.classList.remove("fixed");

      //     if (
      //       prevSticky &&
      //       lastKnownScrollPosition <=
      //         sticky.dataset.originalPosition - sticky.dataset.originalHeight
      //     ) {
      //       prevSticky.classList.remove("absolute");
      //       prevSticky.setAttribute("style", "");
      //     }
      //   }
      // });

      // Er det samme som:
      // navBar.classList[lastKnownScrollPosition > 0 ? "add" : "remove"]("scrolled");

      ticking = false;
    });

    ticking = true;
  }
});

function selectDish(e, dish) {
  if (dish == "vegetarian") {
    document
      .querySelectorAll(".meat-stuff")
      .forEach((elm) => elm.classList.add("opacity-0"));
  } else {
    document
      .querySelectorAll(".meat-stuff")
      .forEach((elm) => elm.classList.remove("opacity-0"));
  }

  document
    .querySelectorAll(".select-dish")
    .forEach((elm) => elm.classList.remove("selected"));
  e.target.classList.add("selected");
}

function submitForm(e) {
  e.preventDefault();
  const getForm = (elm) => {
    if (elm.tagName === "FORM") {
      return elm;
    }

    getForm(elm.parentElement);
  };

  const form = getForm(e.target);
  form.innerHTML =
    '<div class="lds-ring d-flex w-100 justify-content-center"><div></div><div></div><div></div><div></div></div>';

  setTimeout(
    () =>
      (form.innerHTML =
        "Tak for din henvendelse! Vi vender tilbage til dig hurtigst muligt, hvis vi finder dig vigtig nok."),
    3500
  );
}

// document.querySelectorAll(".fasteheader").forEach((sticky) => {
//   const wrapper = document.createElement("div");
//   wrapper.classList.add("followWrap");
//   sticky.parentNode.insertBefore(wrapper, sticky);
//   wrapper.appendChild(sticky);

//   sticky.dataset.originalPosition = sticky.getBoundingClientRect().top;
//   sticky.dataset.originalHeight = sticky.clientHeight;

//   wrapper.style.height = sticky.clientHeight;

//   stickies.push(sticky);
// });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const scrollTo = urlParams.get("scrollTo");
if (scrollTo) {
  const scrollDiv = document.querySelector(`#${scrollTo}`)?.offsetTop ?? null;
  if (scrollDiv) {
    window.scrollTo({ top: scrollDiv - 80, behavior: "smooth" });
  }
}
