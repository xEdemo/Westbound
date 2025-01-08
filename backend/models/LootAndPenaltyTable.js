const lootAndPenaltyTable = {
    Financial: [
      {
        range: [1, 40], // > probability
        loot: { cash: 100, items: ["ledger"] },
        penalty: { fines: 100, arrestChance: 10 }
      },
      {
        range: [41, 70],
        loot: { cash: 500, items: ["stocks", "bond certificates"] },
        penalty: { arrestChance: 50, jailTime: "2 years", fines: 1000 }
      },
      {
        range: [71, 100],
        loot: { cash: 1000, items: ["gold bar", "diamonds"] },
        penalty: { imprisonment: true, jailTime: "5 years", fines: 5000 }
      }
    ],
    Violent: [
      {
        range: [1, 30],
        loot: { items: ["knife"], reputation: 5 },
        penalty: { injury: "minor", arrestChance: 20 }
      },
      {
        range: [31, 70],
        loot: { items: ["gold watch"], reputation: 15 },
        penalty: { injury: "moderate", arrestChance: 50, jailTime: "1 year" }
      },
      {
        range: [71, 100],
        loot: { cash: 500, items: ["diamond ring"], notoriety: 25 },
        penalty: { injury: "severe", jailTime: "5 years", fines: 2000 }
      }
    ],
    Environmental: [
      {
        range: [1, 40],
        loot: { items: ["endangered plant"], researchPoints: 10 },
        penalty: { fines: 500, ecoDamagePoints: 15 }
      },
      {
        range: [41, 70],
        loot: { items: ["rare minerals"], researchPoints: 30 },
        penalty: { arrestChance: 30, fines: 1500, communityServiceHours: 100 }
      },
      {
        range: [71, 100],
        loot: { items: ["ancient artifact"], prestigePoints: 50 },
        penalty: { imprisonment: true, jailTime: "3 years", ecoDamagePoints: 50, fines: 5000 }
      }
    ]
  };
  