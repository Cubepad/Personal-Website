function switchFavicons() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const favicon16 = document.getElementById("favicon16");
  const favicon32 = document.getElementById("favicon32");
  const favicon96 = document.getElementById("favicon96");

  if (isDarkMode) {
    favicon16.href = "/logo/favicon/favicon-16.png";
    favicon32.href = "/logo/favicon/favicon-32.png";
    favicon96.href = "/logo/favicon/favicon-96.png";
  } else {
    favicon16.href = "/logo/favicon/light/favicon-light-16.png";
    favicon32.href = "/logo/favicon/light/favicon-light-32.png";
    favicon96.href = "/logo/favicon/light/favicon-light-96.png";
  }
}

switchFavicons();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", switchFavicons);
