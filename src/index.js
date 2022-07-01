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
const resultForAnimEl = document.getElementById("result-for-anim");
const resultForImagesEl = document.getElementById("result-for-images");

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

const appDescriptionEl = document.getElementById("app-description");
const appDescriptionBtn = document.getElementById("app-description-button");

const appAndroidEl = document.getElementById("app-android");
const appAndroidBtn = document.getElementById("app-android-button");

const appIOSEl = document.getElementById("app-ios");
const appIOSBtn = document.getElementById("app-ios-button");

const appClientEl = document.getElementById("app-client");
const appClientBtn = document.getElementById("app-client-button");

const animLinkEl = document.getElementById("anim-link");
const animLinkBtn = document.getElementById("anim-link-button");

const aniClientEl = document.getElementById("anim-client");
const aniClientBtn = document.getElementById("anim-client-button");

const imagesClientEl = document.getElementById("images-client");
const imagesClientBtn = document.getElementById("images-client-button");

const imagesContainer = document.getElementById("container-images");

//vars
const projectCategoriesEl = document.getElementById("categories");

//trigger
indexTextareaEl.addEventListener("input", refresh);

//dummy paste
// indexTextareaEl.innerText = imagesHtmlDummy;

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

    case typeOfInput.ANIM_PROJECT:
      showAndRefreshAnimInput(textInput);
      break;

    case typeOfInput.IMAGES_PROJECT:
      showAndRefreshImagesInput(textInput);
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

  const regex = /href=".+" class/gm;
  result = valueToSearchFromIndex.match(regex);

  if (!result || result.length === 0) return "";
  result = result[0];
  result = result.substring(6, 16);

  if (!result.startsWith("en")) {
    result = result.substring(0, 7);
  } else {
    result = result.substring(3, 10);
  }

  return result.trim();
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
function extractAppDescription(valueToSearchFromIndex) {
  let result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<!--lewa-->"),
    valueToSearchFromIndex.indexOf("<!--end container-->")
  );

  const regex = /hero-heading.+/gm;
  result = result.match(regex)[0];

  console.log(result);

  result = result.substring(14, result.length);

  return result.trim();
}
function extractAppAndroidLink(valueToSearchFromIndex) {
  const regex =
    /<a href=".+"><img src="images\/buttons_01-min.png" alt="Android" \/><\/a>/gm;
  let result = valueToSearchFromIndex.match(regex)[0];
  result = result.substring(9, result.indexOf(`">`));
  return result;
}
function extractAppIOSLink(valueToSearchFromIndex) {
  const regex =
    /<a href=".+"><img src="images\/buttons_02-min\.png" alt="IOS" \/><\/a>/gm;
  let result = valueToSearchFromIndex.match(regex)[0];
  result = result.substring(9, result.indexOf(`">`));
  return result;
}
function extractAppClient(valueToSearchFromIndex) {
  const regex = /<h4>.+<\/h4>/gm;
  let result = valueToSearchFromIndex.match(regex)[0];
  result = result.substring(4, result.length - 5);
  return result;
}

//anim extract
function extractAnimLink(valueToSearchFromIndex) {
  let result = valueToSearchFromIndex.substring(
    valueToSearchFromIndex.indexOf("<iframe"),
    valueToSearchFromIndex.indexOf("</iframe>")
  ); //?

  result = result.substring(
    result.indexOf(`src=`) + 5,
    result.indexOf(`" frame`)
  ); //?

  return result;
}

//logic rest
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
    if (
      appPart.includes("AR application") ||
      appPart.includes("Aplikacja AR")
    ) {
      return typeOfInput.APP_PROJECT;
    }
  }

  // anim html
  if (inputText.includes(`video-responsive`)) {
    return typeOfInput.ANIM_PROJECT;
  }

  // images html
  if (inputText.includes(`<div class="img-gallery">`)) {
    return typeOfInput.IMAGES_PROJECT;
  }

  return result;
}

function hideAll() {
  hideElement(resultUndefinedEl);
  hideElement(resultNotUnderstandableEl);
  hideElement(resultForIndexEl);
  hideElement(resultForAppEl);
  hideElement(resultForAnimEl);
  hideElement(resultForImagesEl);
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
  //app description
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppDescription,
    appDescriptionEl,
    appDescriptionBtn
  );
  //app android link
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppAndroidLink,
    appAndroidEl,
    appAndroidBtn
  );
  //app iOS link
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppIOSLink,
    appIOSEl,
    appIOSBtn
  );
  //app iOS link
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppClient,
    appClientEl,
    appClientBtn
  );
}
function showAndRefreshImagesInput(textInput) {
  showElement(resultForImagesEl);

  const arrayOfImages = extractAllImagesIntoArrayOfData(textInput);

  let innerHtmlForImages = "";
  arrayOfImages.forEach((img, index) => {
    const imageSourceText = img.imageSrc;
    const imageAltText = img.imageAlt;
    const imageIdNameEl = `image-name-${index + 1}`;
    const imageIdNameBtn = `image-name-${index + 1}-button`;
    const imageIdAltEl = `image-alt-${index + 1}`;
    const imageIdAltBtn = `image-alt-${index + 1}-button`;

    if (imageSourceText !== "ante-logo.png") {
      innerHtmlForImages += `
                  <div class="mt-10 mb-10">
                <p class="font-semibold">
                  Obrazek - ${index + 1}:
                  <br />
                  <span>img: </span>
                  <span
                    id="${imageIdNameEl}"
                    class="px-5 py-1 ml-10 font-normal text-xs text-gray-6 bg-gray-200 rounded-2xl max-w-full"
                    >${imageSourceText}</span
                  >
                  <button
                  type="button"
                  class="text-xs text-white bg-green-600 ml-3 uppercase p-1 rounded-md hover:bg-gray-600"
                  id="${imageIdNameBtn}"
                >
                  kopiuj
                </button>

                </p>

               <p class="font-semibold mt-1">
               <span>alt: </span>
                  <span
                    id="${imageIdAltEl}"
                    class="px-5 py-1 ml-10 font-normal text-xs text-gray-6 bg-gray-200 rounded-2xl max-w-full"
                    >${imageAltText}</span
                  >
                <button
                  type="button"
                  class="text-xs text-white bg-green-600 ml-3 uppercase p-1 rounded-md hover:bg-gray-600"
                  id="${imageIdAltBtn}"
                >
                  kopiuj
                </button>

                </p>

              <p class="font-semibold mt-1">
               <span>isBig: </span>
                  <span
                    id="image-alt-${index + 1}"
                    class="px-5 py-1 ml-10 font-normal text-xs text-gray-6  rounded-2xl max-w-full ${
                      img.imageIsBig ? "bg-red-400" : "bg-gray-200"
                    }"
                    >${img.imageIsBig}</span
                  >
                </p>
              </div>`;
    }
  });

  imagesContainer.innerHTML = innerHtmlForImages;

  arrayOfImages.forEach((img, index) => {
    const imageSourceText = img.imageSrc;
    const imageAltText = img.imageAlt;

    const imageIdAltEl = `image-alt-${index + 1}`;
    const imageIdAltBtn = `image-alt-${index + 1}-button`;

    if (imageSourceText !== "ante-logo.png") {
      //image name
      updateInfoWithCopyToClipboardButton(
        imageSourceText,
        passTextToBeCopied,
        document.getElementById(`image-name-${index + 1}`),
        document.getElementById(`image-name-${index + 1}-button`)
      );

      //image alt
      updateInfoWithCopyToClipboardButton(
        imageAltText,
        passTextToBeCopied,
        document.getElementById(`image-alt-${index + 1}`),
        document.getElementById(`image-alt-${index + 1}-button`)
      );
    }
  });

  // //app image
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractAppImage,
  //   appImageEl,
  //   appImageBtn
  // );
  // //app name
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractAppName,
  //   appNameEl,
  //   appNameBtn
  // );
  // //app description
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractAppDescription,
  //   appDescriptionEl,
  //   appDescriptionBtn
  // );
  // //app android link
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractAppAndroidLink,
  //   appAndroidEl,
  //   appAndroidBtn
  // );
  // //app iOS link
  // updateInfoWithCopyToClipboardButton(
  //   textInput,
  //   extractAppIOSLink,
  //   appIOSEl,
  //   appIOSBtn
  // );
  //images client
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppClient,
    imagesClientEl,
    imagesClientBtn
  );
}

function showAndRefreshAnimInput(textInput) {
  showElement(resultForAnimEl);

  //anim link
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAnimLink,
    animLinkEl,
    animLinkBtn
  );

  //anim client
  updateInfoWithCopyToClipboardButton(
    textInput,
    extractAppClient,
    aniClientEl,
    aniClientBtn
  );
}

function passTextToBeCopied(textToBeCopied) {
  return textToBeCopied;
}

function updateInfoWithCopyToClipboardButton(textInput, callbackFn, el, btn) {
  el.innerHTML = callbackFn(textInput);
  if (btn) {
    btn.addEventListener("click", copyToClipboard.bind(null, el.innerHTML));
  }
}

function extractAllImagesIntoArrayOfData(textInput) {
  let result = [];

  const divWithImagesExtracted = textInput.match(/img-gallery.+div>/gms);

  let divWithImagesArray = [];
  if (divWithImagesExtracted.length > 0) {
    divWithImagesArray = divWithImagesExtracted[0].match(/img.+/gm);
  }

  if (divWithImagesArray && divWithImagesArray.length > 0) {
    divWithImagesArray.forEach((img) => {
      if (img.includes("src") && img.includes("alt")) {
        let imageSrc = /src=.+" /g.exec(img);
        imageSrc = imageSrc[0].substring(12, imageSrc[0].length - 2);

        let imageAlt = /alt=.+"/g.exec(img);
        imageAlt = imageAlt[0].substring(5, imageAlt[0].length - 1);

        let imageIsBig = img.includes(`class="big-img"`);

        result.push({ imageSrc, imageAlt, imageIsBig });
      }
    });
  }
  return result;
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
  extractAppDescription,
  extractAppAndroidLink,
  extractAppIOSLink,
  extractAppClient,
  extractAnimLink,
  extractAllImagesIntoArrayOfData,
  typeOfInput,
};
