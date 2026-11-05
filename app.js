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
            <h2 class="product-title">${product.productTitle}</h2>
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
            <button class="favorite-btn">Add to favorites</button>
            <button class="rate-btn" aria-hidden = "true">Rate this product</button>
          </div>
        </div>
      `;

  // Inject the built card into the page container
  container.innerHTML += cardHTML;
});
