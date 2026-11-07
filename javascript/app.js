const collapseButton = document.querySelector("#collapse");

collapseButton.addEventListener("click", () => {
  const isExpanded = collapseButton.getAttribute("aria-expanded") === "true";

  document.body.classList.toggle("sidebar-collapsed", isExpanded);
  collapseButton.setAttribute("aria-expanded", String(!isExpanded));
  collapseButton.setAttribute(
    "aria-label",
    isExpanded ? "Expand sidebar" : "Collapse sidebar",
  );
});

const themeButtons = [
  document.querySelector("#theme-toggle"),
  document.querySelector("#mode-toggle"),
].filter(Boolean);
const themeIcon = document.querySelector("#mode-icon");
const themeColorMeta = document.querySelector("#theme-color-meta");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    const label = button.querySelector("span");
    if (label) {
      label.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
  });

  if (themeIcon) {
    themeIcon.src = isDark ? "/img/icon-sun.svg" : "/img/icon-moon.svg";
  }
  if (themeColorMeta) {
    themeColorMeta.content = isDark ? "#101a2d" : "#f8fafc";
  }
}

setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });
});

// 3. Grab the container from your HTML page
const container = document.querySelector("#product-results") || document.body;

// 4. Loop through the array and build your HTML structure dynamically
products.forEach((product) => {
  const cardHTML = `
        <div class="product-card" id="card-${product.id}">
          <div class="product-image-container">
            <img class = "image" src="${product.image}" alt="${product.productTitle}">
            <!-- Floating heart icon will sit here via CSS --> 
          </div>
          <div class="product-details">
            <span class="brand-name">By ${product.authorName}</span> 
             <span class="product-form-badge">${product.productForm}</span>
            <h2  class="product-title">${product.productTitle}</h2>
            <p class="short-description">${product.shortDescription}</p>
            <ul class="priceTier" type = "circle">
              ${product.priceTiers.map((tier) => `<li class="price">${Object.values(tier)[0]}</li>`).join("")}
            </ul>
          </div>
          <div class="action-buttons-group">
            <a href="${product.reviewUrl}" target = "_blank" rel="noopener noreferrer" class="btn-secondary">Read Article</a>
            <span class="divider-text">or</span>
            <a href="${product.officialSiteUrl}" target ="_blank" rel="noopener noreferrer" class="btn-primary">Visit Official Site</a>
          </div>
          <div class="interaction-footer">
            <button class="favorite-btn" aria-hidden = "true">Add to favorites</button>
            <button class="rate-btn" aria-hidden = "true">Rate this product</button>
          </div>
        </div>
      `;

  // Inject the built card into the page container
  container.innerHTML += cardHTML;
});
