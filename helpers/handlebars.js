const ehbs = require("handlebars");

ehbs.registerHelper("dashboard", (image) => {
  return `
<div class="container">
  <div class="dashboardHeader">
    <img src="data:image/png;base64,${image}">
    <button type="submit"><a href="/user/logout">LOGOUT</a></button>
  </div>
</div>
`;
});
