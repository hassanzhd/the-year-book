if (
  window.innerWidth <= 768 &&
  window.location.pathname.split("/")[1] === "/batch"
) {
  let container = document.querySelector(".container");
  container.classList.add("container-row");
}

if (
  window.innerWidth <= 768 &&
  window.location.pathname.split("/")[1] === "user"
) {
  let container = document.querySelector(".userEntry");
  container.classList.add("flex-column");
  let imgDiv = document.querySelector(".imgdiv");
  imgDiv.classList.add("user-img-mg");
}
