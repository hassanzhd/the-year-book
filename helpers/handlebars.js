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
    <div class="mainHeader">
        <img src="data:image/png;base64,${image}">
        <h1>Home | <a id="main" href="/settings"> Settings</a></h1>
        <button type="submit"><a href="/logout">LOGOUT</a></button>
    </div>

    <div class="mainContent">
        <div class="mainHeading">
            <h1><a href="/">Select year book to view:</a></h1>
        </div>
        <div class="mainContentButtons">
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
        <a href="/user/${data.id}">
        <img src="data:image/png;base64,${image}">
        </a>
    </div>
    <div class="name">
        <h1>${data.username}</h1>
    </div>
</div>`;
  });

  return `<div class="container">
  <div class="mainHeader">
      <img src="data:image/png;base64,${image}">
      <h1><a id="main" href="/">Home</a> | Batch: ${batch} | <a id="main" href="/settings"> Settings</a></h1>
      <button type="submit"><a href="/logout">LOGOUT</a></button>
  </div>
  <div class="bookContent">
      ${entryElement}
  </div>
</div>`;
});

ehbs.registerHelper("registerRender", (batch) => {
  let optionElement = "";
  batch.forEach((data) => {
    optionElement += `<option value="${data.name}">${data.name}</option>
    `;
  });

  return `<div class="container">
  <div class="registerHeading">
      <h1>Register at <a href="/">THE YEAR BOOK.</a></h1>
  </div>
  <div class="mg-1 center">
      <form class="mg-1 registerForm" action="/register" enctype="multipart/form-data" method="POST">
          <div class="mg-1 center">
              <label class="font-medium" for="username">Name:</label>
              <input class="bottom-border" type="text" name="username">
          </div>
          <div class="mg-1 center">
              <label class="font-medium" for="password">Password:</label>
              <input class="bottom-border" type="password" name="password">
          </div>
          <div class="mg-1 center">
              <label class="font-medium" for="batch">Batch:</label>
              <select name="batch">
                ${optionElement}
              </select>
              </div>
          <div class="mg-1 center">
              <label class="font-medium" for="email">Email: (nu email-id)</label>
              <input class="bottom-border" type="text" name="email">
          </div>
          <div class="mg-1 center">
              <label class="font-medium" for="bio">A short message :</label>
              <input class="bottom-border" type="text" name="bio">
          </div>
          <div class="mg-1 center">
              <label class="font-medium" for="bio">Select your year book image:</label>
              <input class="pad-1 font-medium" type="file" name="image">
          </div>
          <div class="mg-1 center">
              <button>Register</button>
          </div>
      </form>
  </div>
</div>`;
});

ehbs.registerHelper("updateInfoRender", (user, image, batch) => {
  let optionElement = "";
  batch.forEach((data) => {
    if (data.name.toString() === user.batch) {
      optionElement += `<option value="${data.name}" selected>${data.name}</option>
    `;
    } else {
      optionElement += `<option value="${data.name}">${data.name}</option>
      `;
    }
  });

  return `<div class="container">
    <div class="mainHeader">
        <img src="data:image/png;base64,${image}">
        <h1> <a id="main" href="/"> Home</a> | Update info</h1>
        <button type="submit"><a href="/logout">LOGOUT</a></button>
    </div>
    <div class="mg-1 center">
        <form class="mg-1 registerForm" action="/updateInfo/${user.id}?_method=PUT" enctype="multipart/form-data" method="POST">
            <div class="mg-1 center">
                <label class="font-medium" for="username">Name:</label>
                <input class="bottom-border" type="text" name="username" value="${user.username}">
            </div>
            <div class="mg-1 center">
                <label class="font-medium" for="batch">Batch:</label>
                <select name="batch">
                  ${optionElement}
                </select>
                </div>
            <div class="mg-1 center">
                <label class="font-medium" for="bio">A short bio :</label>
                <input class="bottom-border" type="text" name="bio" value="${user.bio}">
            </div>
            <div class="mg-1 center">
                <label class="font-medium" for="bio">Select your year book image:</label>
                <input class="pad-1 font-medium" type="file" name="image">
            </div>
            <div class="mg-1 center">
                <button>Update</button>
            </div>
        </form>
    </div>
  </div>`;
});
