// English/French language switch.
// Loaded in <head> so the saved language is applied before the page renders.
// Elements marked data-lang="en" or data-lang="fr" are shown for that language only (see style.css).
(function () {
  var root = document.documentElement;

  function setLang(lang) {
    root.lang = lang;
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var prefersFrench = (navigator.language || "").toLowerCase().indexOf("fr") === 0;
  setLang(saved === "en" || saved === "fr" ? saved : prefersFrench ? "fr" : "en");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".lang-toggle");
    if (!button) return;

    function updateButton() {
      var french = root.lang === "fr";
      button.textContent = french ? "EN" : "FR";
      button.lang = french ? "en" : "fr";
      button.setAttribute("aria-label", french ? "Switch to English" : "Passer au français");
      button.title = button.getAttribute("aria-label");
    }

    button.addEventListener("click", function () {
      var lang = root.lang === "fr" ? "en" : "fr";
      setLang(lang);
      try { localStorage.setItem("lang", lang); } catch (e) {}
      updateButton();
    });

    updateButton();
    button.hidden = false;
  });
})();
