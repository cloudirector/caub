const backwardsBtn = document.getElementById("backwardsBtn");
const forwardsBtn = document.getElementById("forwardsBtn");
const bypassiBtn = document.getElementById("bypassiBtn");
const genBtn = document.getElementById("genBtn");

// const savedTheme = localStorage.getItem("theme");

// if (savedTheme) {
//   setTheme(savedTheme);
// } else {
//   setTheme("dark");
// }

// function setTheme(theme) {
//   document.documentElement.setAttribute("data-theme", theme);
//   if (theme === "dark") {
//     lightIcon.classList.add("hidden");
//     darkIcon.classList.remove("hidden");
//   } else {
//     lightIcon.classList.remove("hidden");
//     darkIcon.classList.add("hidden");
//   }
//   localStorage.setItem("theme", theme);
// }

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

function gen() {
  try {
    var networks = document.querySelector("input").value;
    networks = networks.replace(/(?<=[+-]..){/g, "");
    networks = networks.replace(/(?<=})[^{\]}]*(?={.."C)/g, ",");
    networks = networks.substring(networks.indexOf("{"));
    networks = networks.substring(0, networks.lastIndexOf("}") + 1);
    networks = JSON.parse("[" + networks + "]");
    var onc = {
      Type: "UnencryptedConfiguration",
      NetworkConfigurations: [],
    };
    networks.forEach(function (network) {
      if (!network.WiFi || !network.Connectable) return;
      onc.NetworkConfigurations.push({
        GUID: network.GUID,
        Metered: true,
        Name: network.Name,
        Type: "WiFi",
        WiFi: {
          AutoConnect: true,
          SSID: network.Name,
          Security: "None",
        },
      });
    });
    if (!onc.NetworkConfigurations[0]) return;
    var link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([JSON.stringify(onc)]));
    link.download = network.Name + "_caub.onc";
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
    alert("caub ran into an error, check console logs");
  }
}

backwardsBtn.addEventListener("click", () => {
  showTab("tab1");
});

forwardsBtn.addEventListener("click", () => {
  showTab("tab2");
});

bypassiBtn.addEventListener("click", () => {
  // Link goes here
  const url = "https://google.com";
  window.open(url);
});

genBtn.addEventListener("click", () => {
  gen();
});
