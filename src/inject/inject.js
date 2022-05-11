function getFullDetailsFromAllBlocks() {
  // '12am to 12:45am, Dad, Calendar: ❤️ Relationships, No location, May 9, 2022'
  const calendarBlock = document.querySelectorAll("div.ynRLnc");
  const blocks = {};
  calendarBlock.forEach((block) => {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const sanitizedText = block.textContent
      .replace(/.*(am, |pm, )/, "")
      .replace("Calendar: ", "");
    const [title, calendar] = sanitizedText.split(", ");

    console.log(sanitizedText);

    if (blocks[title]) {
      blocks[title].count++;
    } else {
      blocks[title] = {
        count: 1,
        calendar,
      };
    }
  });

  console.log(blocks);
}

function insertAtTopOfModal(containerElement) {
  console.log("insertAtTopOfModal");
  console.log(containerElement);

  const buttonContainer = document.createElement("header");
  buttonContainer.style += "display: flex; background: #ccc;";

  const button = document.createElement("button");
  button.textContent = "Some Element";

  buttonContainer.append(button);
  containerElement.prepend(buttonContainer);
}

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      getFullDetailsFromAllBlocks();

      listenForModal().then(insertAtTopOfModal);
    }
  }, 10);
});

function listenForModal() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      console.log("listenForModal");
      const container = document.querySelector(".K0f0Xc");
      if (container) {
        clearInterval(interval);
        resolve(container);
      }
    }, 1000);
  });
}

function _getAllTitles() {
  const possibleBlocks = {};

  const previousTitles = document.querySelectorAll(".FAxxKc");

  for (const titleElement of previousTitles) {
    const title = titleElement.textContent;

    if (possibleBlocks[title]) {
      possibleBlocks[title]++;
    } else {
      possibleBlocks[title] = 1;
    }
  }

  // console.log(possibleBlocks);
}
