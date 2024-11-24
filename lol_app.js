document.addEventListener("DOMContentLoaded", () => {
  const tiers = {
    "S+": ["하경한"],
    S: ["허상준"],
    "A+": ["하은성", "주현욱", "고성준"],
    A: ["서진석", "저스트웨이"],
    "B+": ["손병무", "김민호", "권예주", "노민혁"],
    B: ["김동욱", "조유상", "김아연"],
    "C+": ["박준형"],
    C: [""],
    D: [""],
    F: ["최@지민"],
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
