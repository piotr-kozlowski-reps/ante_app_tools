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
// //queries
// const indexTextareaEl = document.getElementById("index-textarea");
// const resultUndefinedEl = document.getElementById("result-undefined");
// const resultNotUnderstandableEl = document.getElementById(
//   "result-not-understandable"
// );

// const resultForIndexEl = document.getElementById("result-for-index");

// const projectNameEl = document.getElementById("project-name");
// const projectNameBtn = document.getElementById("project-name-button");

// const projectCityEl = document.getElementById("project-city");
// const projectCityBtn = document.getElementById("project-city-button");

// const projectCountryEl = document.getElementById("project-country");
// const projectCountryBtn = document.getElementById("project-country-button");

// const projectDataEl = document.getElementById("project-data");
// //vars
// const projectCategoriesEl = document.getElementById("categories");

// //trigger
// indexTextareaEl.addEventListener("input", refresh);

// ////logic

// //first refresh on start
// refresh();

// function refresh() {
//   console.log("refresh");
//   hideAll();
//   const textInput = indexTextareaEl.value;

//   //empty result
//   if (textInput.trim() === "") {
//     showElement(resultUndefinedEl);
//   }

//   const currentTypeOfInput = defineTypeOfInput(textInput);

//   switch (currentTypeOfInput) {
//     case typeOfInput.INDEX:
//       showAndRefreshIndexInput(textInput);
//       break;

//     case typeOfInput.EMPTY:
//       break;

//     default:
//       showElement(resultNotUnderstandableEl);
//   }
// }
////--------------------------------------------------------------------------------

//utils
function extractProjectName(valueToSearchFromIndex) {
  return valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<h3>") + 4,
    valueToSearchFromIndex.indexOf("</h3>")
  );
}
function extractProjectCity(valueToSearchFromIndex) {
  let result = "";
  result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<h4>") + 4,
    valueToSearchFromIndex.indexOf("</h4>")
  );
  result = result.substring(result.indexOf("/") + 1, result.indexOf("["));

  return result.trim();
}
function extractProjectCountry(valueToSearchFromIndex) {
  let result = "";
  result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<h4>") + 4,
    valueToSearchFromIndex.indexOf("</h4>")
  );
  result = result.substring(result.indexOf("[") + 1, result.indexOf("]"));

  return result.trim();
}
function extractProjectData(valueToSearchFromIndex) {
  let result = "";
  result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf(`href="`) + 6,
    valueToSearchFromIndex.indexOf(`" class`)
  );
  result = result.substring(0, result.indexOf("__"));

  return result.trim();
}
function extractProjectCategories(valueToSearchFromIndex) {
  let result = "";

  result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<div>"),
    valueToSearchFromIndex.indexOf(">")
  );

  const lookedForCategories = {
    COMPETITION: ` comp`,
    INTERIOR: ` int`,
    EXTERIOR: ` ext`,
    ANIMATION: ` anim`,
    MODEL3D: ` 3dmod`,
    PANORAMA: ` pano`,
    ARAPP: ` arapps`,
  };
  const foundCategories = [];
  lookedForCategories.forEach((cat) => {
    console.log(cat);
  });

  //lista poszukiwanych stringów - mapa klucz/wartość
  //forEach - jeżeli znalazł klucz to wpisz wartość do tablicy
  //forEach po tablicy i wygeneruj listę SPANów do wklejenia jako innerHTML do Noda głównego

  // result = result.substring(0, result.indexOf("__"));

  return result;
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

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => alert("Error when copying text: ", err));
}

function showAndRefreshIndexInput(textInput) {
  showElement(resultForIndexEl);

  //project Name
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectName,
    projectNameEl,
    projectNameBtn
  );
  //project City
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectCity,
    projectCityEl,
    projectCityBtn
  );
  //project Country
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectCountry,
    projectCountryEl,
    projectCountryBtn
  );
  //project Data
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectData,
    projectDataEl,
    null
  );
  //project Categories
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectCategories,
    projectCategoriesEl,
    null
  );
}

function updateInfoWithCopyToClipboardButton(textInput, callbackFn, el, btn) {
  el.innerHTML = callbackFn(textInput);
  if (btn) {
    btn.addEventListener("click", copyToClipboard.bind(null, el.innerHTML));
  }
}

//exports
module.exports = {
  extractProjectName,
  defineTypeOfInput,
  extractProjectCity,
  extractProjectCountry,
  extractProjectData,
  extractProjectCategories,
  typeOfInput,
};
