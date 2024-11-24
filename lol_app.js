document.addEventListener("DOMContentLoaded", () => {
  // 기존 티어 정보
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

  const players = {}; // 플레이어별 점수 데이터 저장

  const tiersContainer = document.getElementById("tiers");

  // 기존 티어 렌더링
  function renderTiers() {
    tiersContainer.innerHTML = ""; // 이전 내용을 지우고 다시 렌더링
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
  }

  renderTiers(); // 초기 렌더링

  // 점수 계산 함수
  function calculateScore(kda, result) {
    let score = 0;

    // 승/패 점수
    if (result === "win") {
      score += 6;
    } else {
      score -= 3;
    }

    // KDA 점수
    if (kda >= 5) {
      score += 10;
    } else if (kda >= 4) {
      score += 6;
    } else if (kda >= 3) {
      score += 2;
    } else if (kda >= 2) {
      score += 0;
    } else if (kda >= 1) {
      score -= 3;
    } else {
      score -= 5;
    }

    return score;
  }

  // 티어 계산 함수
  function assignTier(totalScore) {
    if (totalScore >= 320) return "S+";
    if (totalScore >= 280) return "S";
    if (totalScore >= 240) return "A+";
    if (totalScore >= 200) return "A";
    if (totalScore >= 160) return "B+";
    if (totalScore >= 120) return "B";
    if (totalScore >= 80) return "C+";
    if (totalScore >= 40) return "C";
    return "D";
  }

  // 플레이어 데이터 업데이트 및 티어 갱신
  function updatePlayerTier(playerName, score) {
    // 기존 티어에서 플레이어 제거
    for (const [tier, players] of Object.entries(tiers)) {
      const index = players.indexOf(playerName);
      if (index !== -1) {
        players.splice(index, 1);
        break;
      }
    }

    // 새로운 티어에 플레이어 추가
    const newTier = assignTier(score);
    if (!tiers[newTier]) {
      tiers[newTier] = [];
    }
    tiers[newTier].push(playerName);

    renderTiers(); // 티어 다시 렌더링
  }

  // 폼 제출 이벤트 처리
  document.getElementById("tier-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const kda = parseFloat(document.getElementById("kda").value);
    const result = document.getElementById("result").value;

    // 점수 계산
    const score = calculateScore(kda, result);

    // 플레이어 데이터 업데이트
    if (!players[playerName]) {
      players[playerName] = 0;
    }
    players[playerName] += score;

    updatePlayerTier(playerName, players[playerName]); // 티어 업데이트
  });
});
