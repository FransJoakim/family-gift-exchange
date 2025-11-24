function generateMatrix(people, giftsPerPerson = 3) {
  const n = people.length;

  if (giftsPerPerson >= n) {
    throw new Error("giftsPerPerson must be less than the number of people");
  }

  // We will assign in a fixed rotation pattern.
  // For each person i, they give to the next k people in a circular list.
  // 0 → 1 → 2 → 3 → 4 → (back to 0)
  const givesTo = {};
  const receivesFrom = {};

  people.forEach((p) => {
    givesTo[p] = [];
    receivesFrom[p] = [];
  });

  for (let i = 0; i < n; i++) {
    for (let k = 1; k <= giftsPerPerson; k++) {
      const giver = people[i];
      const receiver = people[(i + k) % n]; // wrap around in a circle

      givesTo[giver].push(receiver);
      receivesFrom[receiver].push(giver);
    }
  }

  return { givesTo, receivesFrom };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function generateRandomMatrix(people, giftsPerPerson = 3) {
  const shuffledPeople = [...people];
  shuffle(shuffledPeople);
  return generateMatrix(shuffledPeople, giftsPerPerson);
}

/* Example output matrix:
Birgit gives to: Franz, Aurora, Patric
Franz gives to: Aurora, Patric, Frans Joakim
Aurora gives to: Patric, Frans Joakim, Birgit
Patric gives to: Frans Joakim, Birgit, Franz
Frans Joakim gives to: Birgit, Franz, Aurora
*/
