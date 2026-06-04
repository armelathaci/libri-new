(function () {
  if (location.pathname.indexOf("/libri-new/ng/core-ng") === 0) {
    location.replace("/libri-new/");
    return;
  }

  const content = document.getElementById("content");
  if (content) {
    content.classList.remove("opacity-0");
    content.style.opacity = "1";
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  fetch("./content/pages.json")
    .then((response) => response.ok ? response.json() : [])
    .then((pages) => {
      const currentIndex = pages.findIndex((page) => page.href === currentPage);
      if (currentIndex === -1) {
        return;
      }

      const previousPage = pages[currentIndex - 1];
      const nextPage = pages[currentIndex + 1];
      const nav = document.getElementById("nav-container");
      if (!nav) {
        return;
      }

      nav.innerHTML = `
        <nav class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/95 px-4 py-3 text-sm font-semibold shadow-lg">
          ${previousPage ? `<a class="rounded-full bg-stone-900 px-4 py-2 text-white" href="${previousPage.href}">Previous</a>` : ""}
          <span class="text-stone-700">${currentIndex + 1} / ${pages.length}</span>
          ${nextPage ? `<a class="rounded-full bg-stone-900 px-4 py-2 text-white" href="${nextPage.href}">Next</a>` : ""}
        </nav>
      `;
    })
    .catch(() => {});
}());
