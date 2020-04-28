if (
  window.innerWidth <= 768 &&
  window.location.pathname.split("/")[1] === "batch"
) {
  let container = document.querySelector(".container");
  container.classList.add("container-row");
}
