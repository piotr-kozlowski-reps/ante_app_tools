//enum
const typeOfInput = {
  INDEX: "INDEXHTML",
  IMAGES_PROJECT: "IMAGES_PROJECT",
  ANIM_PROJECT: "ANIM_PROJECT",
  PANO_PROJECT: "PANO_PROJECT",
  APP_PROJECT: "APP_PROJECT",
  EMPTY: "EMPTY",
};

////--------------------------------------------------------------------------------
//queries
const indexTextareaEl = document.getElementById("index-textarea");
const resultUndefinedEl = document.getElementById("result-undefined");
const resultNotUnderstandableEl = document.getElementById(
  "result-not-understandable"
);
const resultForIndexEl = document.getElementById("result-for-index");

const projectNameEl = document.getElementById("project-name");

//vars

//trigger
indexTextareaEl.addEventListener("input", refresh);

////logic

//first refresh on start
refresh();

function refresh() {
  console.log("refresh");
  hideAll();
  const textInput = indexTextareaEl.value;

  //empty result
  if (textInput.trim() === "") {
    showElement(resultUndefinedEl);
  }

  const currentTypeOfInput = defineTypeOfInput(textInput);

  switch (currentTypeOfInput) {
    case typeOfInput.INDEX:
      showAndRefreshIndexInput(textInput);
      break;

    case typeOfInput.EMPTY:
      break;

    default:
      showElement(resultNotUnderstandableEl);
  }
}
////--------------------------------------------------------------------------------

//utils
function extractProjectName(valueToSearchFromIndex) {
  return valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<h3>") + 4,
    valueToSearchFromIndex.indexOf("</h3>")
  );
}

function showElement(element) {
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    element.classList.add("block");
  }

  if (
    !element.classList.contains("hidden") &&
    !element.classList.contains("hidden")
  ) {
    element.classList.add("block");
  }
}

function hideElement(element) {
  if (element.classList.contains("block")) {
    element.classList.remove("block");
    element.classList.add("hidden");
  }

  if (
    !element.classList.contains("hidden") &&
    !element.classList.contains("hidden")
  ) {
    element.classList.add("hidden");
  }
}

// function showNoResult(isShow) {
//   if (isShow) {
//     resultUndefinedEl.classList.add("block");
//     resultUndefinedEl.classList.remove("hidden");
//   }
//   if (!isShow) resultUndefinedEl.classList.add("hidden");
//   resultUndefinedEl.classList.remove("block");
// }

function defineTypeOfInput(inputText) {
  let result = "";

  //empty
  if (!inputText || inputText.trim() === "") {
    return typeOfInput.EMPTY;
  }

  // index html
  const firstDiv = inputText.substring(
    inputText.indexOf("<div>"),
    inputText.indexOf(">")
  );

  if (firstDiv) {
    const isContainingDesiredClasses = firstDiv.includes(
      `class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12`
    );
    const isContainingTypesShortcuts =
      firstDiv.includes(` comp`) ||
      firstDiv.includes(` int`) ||
      firstDiv.includes(` ext`) ||
      firstDiv.includes(` anim`) ||
      firstDiv.includes(` 3dmod`) ||
      firstDiv.includes(` pano`) ||
      firstDiv.includes(` arapps`);

    if (isContainingDesiredClasses && isContainingTypesShortcuts)
      return typeOfInput.INDEX;
  }

  return result;
}

function hideAll() {
  hideElement(resultUndefinedEl);
  hideElement(resultNotUnderstandableEl);
  hideElement(resultForIndexEl);
}

function showAndRefreshIndexInput(textInput) {
  console.log("showAndRefreshIndexInput");
  showElement(resultForIndexEl);

  //nazwa projektu
  projectNameEl.value = extractProjectName(textInput);
}

module.exports = {
  extractProjectName,
  defineTypeOfInput,
  typeOfInput,
};
