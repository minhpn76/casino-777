export function readStore(name) {
  return new Promise((resolve) => {
    const data = localStorage.getItem(name);
    resolve(data);
  });
}

export function writeStore(name, content) {
  return new Promise((resolve) => {
    localStorage.setItem(name, content);
    resolve();
  });
}

export function getRandomSlots() {
  const randomSlot = () => {
    const min = 1;
    const max = 9;

    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  return [randomSlot(), randomSlot(), randomSlot()];
}

export function getResults(slots) {
  const [a, b, c] = slots;

  // if no match - do not change score || even if 121
  const isNotMatch = (a !== b && b !== c && a !== c) || (a === c && a !== b);

  // if there is a pair - 112 or 122
  const isPair = (a === b && b !== c) || (a !== b && b === c);

  // if 777 (!)
  const isBingo = a === 7 && b === 7 && c === 7;

  // if three in a row (but not 777)
  const isThreeInRow = a === b && b === c;

  if (isNotMatch) {
    return {
      amount: 0,
      text: "Sorry, you lost. Try one more time..."
    };
  }

  if (isPair) {
    return {
      amount: 0.5,
      text: `Congrats! You won $0.5. Keep it going.`
    };
  }

  if (isBingo) {
    return {
      amount: 10,
      text: `Yahooo! Bingo! You won $10! Amazing!`
    };
  }

  if (isThreeInRow) {
    return {
      amount: 5,
      text: `Wow! Three in a row! You won $5. You are so close to success!`
    };
  }

  console.log("Passed slots", slots);

  return {
    amount: 404,
    text: "There is some error. Open Console."
  };
}
