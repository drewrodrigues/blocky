function Sidebar() {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");
  return sidebar;
}

function Section(title, subtitle) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("section");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.classList = "section-title";
  sectionElement.append(titleElement);

  const subtitleElement = document.createElement("h3");
  subtitleElement.textContent = subtitle;
  subtitleElement.classList = "section-subtitle";
  sectionElement.append(subtitleElement);

  return sectionElement;
}

function GeneratedBlocks(sortedBlocks) {
  const sectionElement = Section(
    "Generated Blocks",
    "Click on a block then your calendar to create a block"
  );

  const buttonContainer = document.createElement("header");
  buttonContainer.classList = "button-container";
  sectionElement.append(buttonContainer);

  for (const block of sortedBlocks) {
    const title = Object.keys(block)[0];
    const calendar = Object.values(block)[0].calendar;

    const button = document.createElement("button");
    button.classList += "block-button";
    button.onclick = () => {
      const buttonAlreadyActive = button.classList.contains("active");
      if (buttonAlreadyActive) {
        selectedButton = null;
        button.classList.remove("active");
      } else {
        selectedButton = {
          calendar,
          title,
        };
        const alreadyActiveButton = document.querySelector(
          ".block-button.active"
        );
        if (alreadyActiveButton) {
          alreadyActiveButton.classList.remove("active");
          alreadyActiveButton.style.boxShadow = "";
        }
        button.classList.add("active");
        button.style.boxShadow = `0 0 20px 5px ${button.style.backgroundColor}`;
      }
    };
    button.style.backgroundColor = Object.values(block)[0].style;

    const text = document.createElement("span");
    text.textContent = title;
    button.append(text);

    buttonContainer.append(button);
  }

  return sectionElement;
}
