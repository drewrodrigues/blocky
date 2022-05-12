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

  for (const block of calendarBlock) {
    // time block can be formatted with ',' at times. So, we'll just remove the whole section
    // and the calendar section sometimes has 'Calendar: '
    const styledElement = block.parentElement;
    const sanitizedText = block.textContent
      .replace(/.*(am, |pm, )/, "")
      .replace("Calendar: ", "");
    const [title, calendar] = sanitizedText.split(", ");

    if (!title) {
      // we can have a blank -- remove it
      continue;
    }

    if (blocks[title]) {
      blocks[title].count++;
    } else {
      blocks[title] = {
        count: 1,
        calendar,
        style: styledElement?.style.backgroundColor,
      };
    }
  }

  return blocks;
}

function blocksSortedByOccurances(blocks) {
  const keys = Object.keys(blocks);

  keys.sort((a, b) => blocks[b].count - blocks[a].count);

  return keys.map((key) => ({ [key]: blocks[key] }));
}

let selectedButton = null;
let isCreatingEvent = false;
const MODAL_SELECTOR = ".K0f0Xc";

function createEventOnModalOpen() {
  setInterval(() => {
    const container = document.querySelector(MODAL_SELECTOR);
    if (container && selectedButton && !isCreatingEvent) {
      isCreatingEvent = true;
      createEventOnModal(selectedButton.title, selectedButton.calendar);
    }
  }, 100);
}

function insertButtonsInPage(sortedBlocks) {
  const container = document.createElement("aside");
  container.classList.add("container");
  const buttonContainer = document.createElement("header");
  buttonContainer.classList = "button-container";
  container.append(buttonContainer);

  for (const block of sortedBlocks) {
    const title = Object.keys(block)[0];
    const calendar = Object.values(block)[0].calendar;

    const button = document.createElement("button");
    button.classList += "block-button";
    button.onclick = () => {
      selectedButton = {
        calendar,
        title,
      };
      const alreadyActiveButton = document.querySelector(
        ".block-button.active"
      );
      if (alreadyActiveButton) {
        alreadyActiveButton.classList.remove("active");
      }
      button.classList.add("active");
    };
    button.style.backgroundColor = Object.values(block)[0].style;

    const text = document.createElement("span");
    text.textContent = title;
    button.append(text);

    buttonContainer.append(button);
  }

  document.querySelector(".tEhMVd").append(container);
}

async function createEventOnModal(title, calendar) {
  console.log({ title, calendar });
  const titleInput = document.querySelector('[aria-label="Add title"]');
  titleInput.value = title;
  titleInput.click();
  document.querySelector('[data-key="calendar"]').click();
  await sleep(500); // wait for dropdown to open

  const dropdownElements = document.querySelectorAll(
    "div[role='presentation'].OA0qNb.ncFHed .Z7IIl.jT5e9"
  );
  for (const element of dropdownElements) {
    const dropdownText = element.textContent;
    if (dropdownText === calendar) {
      console.log(element);
      element.click();
      await sleep(250);
      // save
      document
        .querySelector("[role='button'].uArJ5e.UQuaGc.Y5sE8d.pEVtpe")
        .click();
      await sleep(250);
      isCreatingEvent = false;
      return;
    }
  }

  isCreatingEvent = false;
  throw new Error("Failed to create block");
}

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(async function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      await sleep(200); // wait for events to be loaded
      const allBlocks = getFullDetailsFromAllBlocks();
      const sortedBlocks = blocksSortedByOccurances(allBlocks);

      await sleep(2000);
      insertButtonsInPage(sortedBlocks);

      createEventOnModalOpen();
    }
  }, 10);
});
