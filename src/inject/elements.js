function Sidebar() {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");
  return sidebar;
}

function Buttons(sortedBlocks) {
  const buttonContainer = document.createElement("header");
  buttonContainer.classList = "button-container";

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

  return buttonContainer;
}
