const tabs = [...document.querySelectorAll(".tab-button")];
const panels = [...document.querySelectorAll(".info-panel")];
const panelTitle = document.getElementById("panel-title");
const copyButtons = [...document.querySelectorAll("[data-copy]")];
const toast = document.getElementById("toast");

const panelNames = {
  experience: "经历",
  portfolio: "作品集",
  projects: "项目",
  skills: "技能",
};

function activatePanel(panelKey, syncHash = true) {
  if (!panelNames[panelKey]) {
    return;
  }

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.panel === panelKey);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === panelKey);
  });

  panelTitle.textContent = panelNames[panelKey];

  if (syncHash) {
    window.history.replaceState(null, "", `#${panelKey}`);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.panel));
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy || "";

    try {
      await navigator.clipboard.writeText(value);
      showToast("已复制");
    } catch (error) {
      showToast("复制失败");
    }
  });
});

const initialPanel = window.location.hash.replace("#", "");
activatePanel(panelNames[initialPanel] ? initialPanel : "experience", false);

window.addEventListener("hashchange", () => {
  const panel = window.location.hash.replace("#", "");
  activatePanel(panelNames[panel] ? panel : "experience", false);
});
