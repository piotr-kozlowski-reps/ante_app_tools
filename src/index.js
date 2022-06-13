// const { imagesHtmlDummy, indexHtmlDummy } = require("./dummy.js");

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
const resultForAppEl = document.getElementById("result-for-app");

const projectNameEl = document.getElementById("project-name");
const projectNameBtn = document.getElementById("project-name-button");

const projectCityEl = document.getElementById("project-city");
const projectCityBtn = document.getElementById("project-city-button");

const projectCountryEl = document.getElementById("project-country");
const projectCountryBtn = document.getElementById("project-country-button");

const projectDataEl = document.getElementById("project-data");

const projectIcoEl = document.getElementById("project-ico");
const projectIcoBtn = document.getElementById("project-ico-button");

const appImageEl = document.getElementById("app-image");
const appImageBtn = document.getElementById("app-image-button");

const appNameEl = document.getElementById("app-name");
const appNameBtn = document.getElementById("app-name-button");

//vars
const projectCategoriesEl = document.getElementById("categories");

//trigger
indexTextareaEl.addEventListener("input", refresh);

//dummy paste
indexTextareaEl.innerText = appHtmlDummy;

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

    case typeOfInput.APP_PROJECT:
      showAndRefreshAppInput(textInput);
      break;

    case typeOfInput.EMPTY:
      break;

    default:
      showElement(resultNotUnderstandableEl);
  }
}
////--------------------------------------------------------------------------------

//utils

//index extract
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

  const valueToSearchThrough = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf(`href="`) + 6,
    valueToSearchFromIndex.indexOf(`" class`)
  ); //?

  if (!valueToSearchThrough.startsWith("en")) {
    result = valueToSearchThrough.substring(
      0,
      valueToSearchThrough.indexOf("__")
    );
  } else {
    result = valueToSearchThrough.substring(3, 10);
  }

  return result.trim(); //?
}
function extractProjectCategories(valueToSearchFromIndex) {
  let result = "";

  const stringToHandle = valueToSearchFromIndex.substring(
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
  const foundCategories = []; //?
  for (const key in lookedForCategories) {
    if (stringToHandle.includes(lookedForCategories[key])) {
      foundCategories.push(key);
    }
  }

  foundCategories.forEach((cat) => {
    result += `<span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">${cat}</span></span>`;
  });

  return result;
}
function extractProjectIco(valueToSearchFromIndex) {
  let result = "";
  result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf(`src="images/`) + 12,
    valueToSearchFromIndex.indexOf(`alt="`) - 2
  );

  return result.trim();
}

//app extract
function extractAppImage(valueToSearchFromIndex) {
  let result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<!--lewa-->"),
    valueToSearchFromIndex.indexOf("<!--end container-->")
  );

  result = result.substring(
    result.indexOf(`src="images/`) + 12,
    result.indexOf(`<div class="col-lg-4 equal-height">`)
  );

  result = result.substring(0, result.indexOf(`">`));

  return result;
}
function extractAppName(valueToSearchFromIndex) {
  let result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<!--lewa-->"),
    valueToSearchFromIndex.indexOf("<!--end container-->")
  );

  result = result.substring(
    result.indexOf(`<h2>`) + 4,
    result.indexOf(`<br />`)
  );

  return result.toUpperCase();
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

  // app html
  const appPart = inputText.substring(
    inputText.indexOf("<!--lewa-->"),
    inputText.indexOf("<!--end container-->")
  ); //?
  if (appPart) {
    if (appPart.includes("AR application")) {
      return typeOfInput.APP_PROJECT;
    }
  }

  return result;
}

function hideAll() {
  hideElement(resultUndefinedEl);
  hideElement(resultNotUnderstandableEl);
  hideElement(resultForIndexEl);
  hideElement(resultForAppEl);
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
  //project Ico
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractProjectIco,
    projectIcoEl,
    projectIcoBtn
  );
}

function showAndRefreshAppInput(textInput) {
  showElement(resultForAppEl);

  //app image
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppImage,
    appImageEl,
    appImageBtn
  );
  //app name
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppName,
    appNameEl,
    appNameBtn
  );
  // //project Country
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractProjectCountry,
  //   projectCountryEl,
  //   projectCountryBtn
  // );
  // //project Data
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractProjectData,
  //   projectDataEl,
  //   null
  // );
  // //project Categories
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractProjectCategories,
  //   projectCategoriesEl,
  //   null
  // );
  // //project Ico
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractProjectIco,
  //   projectIcoEl,
  //   projectIcoBtn
  // );
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
  extractProjectIco,
  extractAppImage,
  extractAppName,
  typeOfInput,
};
