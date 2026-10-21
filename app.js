const collapseButton = document.querySelector("#collapse");

collapseButton.addEventListener("click", () => {
    const isExpanded = collapseButton.getAttribute("aria-expanded") === "true";

    document.body.classList.toggle("sidebar-collapsed", isExpanded);
    collapseButton.setAttribute("aria-expanded", String(!isExpanded));
    collapseButton.setAttribute(
        "aria-label",
        isExpanded ? "Expand sidebar" : "Collapse sidebar"
    );
});