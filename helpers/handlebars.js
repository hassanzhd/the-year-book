const ehbs = require("handlebars");

ehbs.registerHelper("dashboard", (image, batch) => {
  let batchElement = "";
  batch.forEach((data) => {
    batchElement += `
    <button class="mg-1"><a href="/batch/${data.name}">${data.name}</a></button>
    `;
  });

  return `
  <div class="container">
    <div class="dashboardHeader">
        <img src="data:image/png;base64,${image}">
        <h1>Home</h1>
        <button type="submit"><a href="/logout">LOGOUT</a></button>
    </div>

    <div class="batchContent">
        <div class="batchHeading">
            <h1><a href="/">Select year book to view:</a></h1>
        </div>
        <div class="batchButtons">
            ${batchElement}
        </div>
    </div>
</div>
  `;
});

ehbs.registerHelper("batchRender", (image, batch, entries) => {
  let entryElement = "";
  entries.forEach((data) => {
    let image = data.image.toString("base64");
    entryElement += `<div class="bookEntry">
    <div class="imgdiv">
        <a href="/user/${data.username}">
        <img src="data:image/png;base64,${image}">
        </a>
    </div>
    <div class="name">
        <h1>${data.username}</h1>
    </div>
</div>`;
  });

  return `<div class="container">
  <div class="dashboardHeader">
      <img src="data:image/png;base64,${image}">
      <h1>Batch: ${batch}</h1>
      <button type="submit"><a href="/logout">LOGOUT</a></button>
  </div>
  <div class="bookContent">
      ${entryElement}
  </div>
</div>`;
});
