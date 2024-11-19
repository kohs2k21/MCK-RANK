document.addEventListener("DOMContentLoaded", () => {
  const tiers = {
    S: ["하은성"],
    "A+": [""],
    A: [""],
    "B+": [""],
    B: [""],
    "C+": [""],
    C: [""],
    D: [""],
    F: [""],
  };

  const tiersContainer = document.getElementById("tiers");

  for (const [tier, items] of Object.entries(tiers)) {
    const tierDiv = document.createElement("div");
    tierDiv.classList.add("tier");

    // 티어에 따라 클래스 추가
    const tierClass = tier.replace("+", "-plus").toLowerCase();
    tierDiv.classList.add(tierClass);

    const tierTitle = document.createElement("h2");
    tierTitle.textContent = `${tier} Rank`;
    tierDiv.appendChild(tierTitle);

    const tierList = document.createElement("ul");
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      tierList.appendChild(listItem);
    });

    tierDiv.appendChild(tierList);
    tiersContainer.appendChild(tierDiv);
  }
});
