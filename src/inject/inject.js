function sleep(duration) {
  console.log("Sleeping for: ", duration);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

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
  return blocks;
}

function blocksSortedByOccurances(blocks) {
  const keys = Object.keys(blocks);

  keys.sort((a, b) => blocks[b].count - blocks[a].count);

  return keys.map((key) => ({ [key]: blocks[key] }));
}

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

function insertAtTopOfModal(containerElement, sortedBlocks) {
  console.log("insertAtTopOfModal");
  console.log(containerElement);

  const buttonContainer = document.createElement("header");
  buttonContainer.classList = "button-container";

  for (const block of sortedBlocks) {
    const blockTitle = Object.keys(block)[0];
    const calendar = Object.values(block)[0].calendar;

    const button = document.createElement("button");
    button.classList += "block-button";
    button.onclick = () => createBlockOnButtonClick(blockTitle, calendar);

    const text = document.createElement("span");
    text.textContent = blockTitle;
    button.append(text);

    buttonContainer.append(button);
  }

  containerElement.prepend(buttonContainer);
}

async function createBlockOnButtonClick(title, calendar) {
  console.log({ title, calendar });
  const titleInput = document.querySelector('[aria-label="Add title"]');
  titleInput.value = title;
  titleInput.click();
  await sleep(5000);
  document.querySelector('[data-key="calendar"]').click();

  const dropdownElements = document.querySelectorAll(".Z7IIl.jT5e9");
  for (const element of dropdownElements) {
    const dropdownText = element.textContent;
    if (dropdownText === calendar) {
      console.log("Found element");
      console.log(element);
      await sleep(5000);
      element.click();
      await sleep(5000);
      // save
      document
        .querySelector("[role='button'].uArJ5e.UQuaGc.Y5sE8d.pEVtpe")
        .click();
      return;
    }
  }

  throw new Error("Failed to create block");
}

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      const allBlocks = getFullDetailsFromAllBlocks();
      const sortedBlocks = blocksSortedByOccurances(allBlocks);
      console.log(sortedBlocks);

      listenForModal().then((container) =>
        insertAtTopOfModal(container, sortedBlocks)
      );
    }
  }, 10);
});
