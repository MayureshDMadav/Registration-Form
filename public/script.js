const showBtn = document.querySelector("#basic-addon2");
const inputPass = document.querySelector("input[name='password']");

showBtn &&
  showBtn.addEventListener("click", () => {
    if (inputPass.getAttribute("type") === "text") {
      inputPass.setAttribute("type", "password");
      showBtn.innerHTML = "show";
    } else {
      showBtn.innerHTML = "hide";
      inputPass.setAttribute("type", "text");
    }
  });

setTimeout(() => {
  if (
    window.location.pathname.includes("/login") ||
    window.location.pathname.includes("/resgistration")
  ) {
    const errorContainer = document.querySelector("#error-container");
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  }
}, 2500);

if (sessionStorage.getItem("logged_in")) {
  fetch("/allowUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ log: true }),
  });
} else {
  fetch("/allowUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ log: false }),
  });
}

const removeSession = () => {
  sessionStorage.removeItem("logged_in");
  fetch("/allowUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ log: false }),
  });
  window.location.replace("/");
};
