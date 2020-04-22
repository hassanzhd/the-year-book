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
        <button type="submit"><a href="/user/logout">LOGOUT</a></button>
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
