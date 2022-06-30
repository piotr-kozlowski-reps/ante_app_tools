const {
  extractProjectName,
  defineTypeOfInput,
  extractProjectCity,
  extractProjectCountry,
  extractProjectData,
  extractProjectCategories,
  extractProjectIco,
  extractAppImage,
  extractAppDescription,
  extractAppAndroidLink,
  extractAppIOSLink,
  extractAppName,
  extractAppClient,
  extractAnimLink,
  extractAllImagesIntoArrayOfData,
  typeOfInput,
} = require("./index.js");
const {
  appHtmlDummy,
  appHtmlDummy2,
  imagesHtmlDummy,
  indexHtmlDummy2,
  indexHtmlDummy,
  animHtmlDummy,
} = require("./dummy.js");

describe("overall", () => {
  it("defineTypeOfInput", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = defineTypeOfInput(value);
    expect(result).toEqual(typeOfInput.INDEX);

    value = `     `;
    result = defineTypeOfInput(value);
    expect(result).toEqual(typeOfInput.EMPTY);

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;
    result = defineTypeOfInput(value);
    expect(result).toEqual("");

    value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    result = defineTypeOfInput(value);
    expect(result).toEqual("");

    value = appHtmlDummy;
    result = defineTypeOfInput(value);
    expect(result).toEqual(typeOfInput.APP_PROJECT);
  });
});

describe("index", () => {
  it("extractProjectCity", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = extractProjectCity(value);
    expect(result).toEqual("DÜSSELDORF");

    value = `     `;
    result = extractProjectCity(value);
    expect(result).toEqual("");

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
      <div class="box">
        <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
        <div class="more">
          <div class="project">
            <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
              <div class="desc">
                <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                <h4>2002 / tutajcosi %%nnego [NIEMCY]</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    result = extractProjectCity(value);
    expect(result).toEqual("tutajcosi %%nnego");
  });
  it("extractProjectCountry", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = extractProjectCountry(value);
    expect(result).toEqual("NIEMCY");

    value = `     `;
    result = extractProjectCountry(value);
    expect(result).toEqual("");

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
      <div class="box">
        <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
        <div class="more">
          <div class="project">
            <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
              <div class="desc">
                <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                <h4>2002 / tutajcosi %%nnego [NIEM ^&CY sdfvsdf]</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    result = extractProjectCountry(value);
    expect(result).toEqual("NIEM ^&CY sdfvsdf");
  });
  it("extractProjectData", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = extractProjectData(value);
    expect(result).toEqual("2002_06");

    value = `     `;
    result = extractProjectData(value);
    expect(result).toEqual("");

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
      <div class="box">
        <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
        <div class="more">
          <div class="project">
            <a href="1902_30__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
              <div class="desc">
                <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                <h4>2002 / tutajcosi %%nnego [NIEM ^&CY sdfvsdf]</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    result = extractProjectData(value);
    expect(result).toEqual("1902_30");

    value = indexHtmlDummy2;
    result = extractProjectData(value); //?
    expect(result).toEqual("2020_03");
  });
  it("extractProjectCategories", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = extractProjectCategories(value);
    expect(result).toEqual(
      `<span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">COMPETITION</span></span><span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">EXTERIOR</span></span>`
    );

    value = `     `;
    result = extractProjectCategories(value);
    expect(result).toEqual(``);

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext 3dmod arapps">
      <div class="box">
        <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
        <div class="more">
          <div class="project">
            <a href="1902_30__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
              <div class="desc">
                <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                <h4>2002 / tutajcosi %%nnego [NIEM ^&CY sdfvsdf]</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    result = extractProjectCategories(value);
    expect(result).toEqual(
      '<span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">COMPETITION</span></span><span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">EXTERIOR</span></span><span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">MODEL3D</span></span><span class="px-5 py-1 font-normal text-xs text-gray-6 rounded-2xl max-w-full bg-gray-200 ml-2">ARAPP</span></span>'
    );
  });
  it("extractProjectCategories", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    let result = extractProjectIco(value);
    expect(result).toEqual(
      `2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg`
    );

    value = `     `;
    result = extractProjectIco(value);
    expect(result).toEqual(``);

    value = `      <div class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext 3dmod arapps">
      <div class="box">
        <img src="images/dsfvsdf__2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico_asdas.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
        <div class="more">
          <div class="project">
            <a href="1902_30__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
              <div class="desc">
                <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                <h4>2002 / tutajcosi %%nnego [NIEM ^&CY sdfvsdf]</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    result = extractProjectIco(value);
    expect(result).toEqual(
      "dsfvsdf__2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico_asdas.jpg"
    );
  });
  it("extractProjectName", () => {
    let value = `      <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 comp ext">
        <div class="box">
          <img src="images/2002_06__schronisko_mlodziezowe_dusseldorf_niemcy___ico.jpg" alt="06.2002r. Schronisko młodzieżowe, Düsseldorf. Kraj: Niemcy." />
          <div class="more">
            <div class="project">
              <a href="2002_06__schronisko_mlodziezowe_dusseldorf_niemcy.html" class="link">
                <div class="desc">
                  <h3>SCHRONISKO MŁODZIEŻOWE</h3>
                  <h4>2002 / DÜSSELDORF [NIEMCY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    const result1 = extractProjectName(value);
    expect(result1).toEqual("SCHRONISKO MŁODZIEŻOWE");

    value = `	  <div class="box-outer col-lg-3 col-md-3 col-sm-4 col-xs-6 col-xxxs-12 ext int">
        <div class="box">
          <img src="images/2020_03_budynek_mieszkalny_dusseldorf_niemcy_ico.jpg" alt="March, 2020. Residential building, Düsseldorf. Country: Germany." />
          <div class="more">
            <div class="project">
              <a href="en_2020_03_residential_building_dusseldorf_germany.html" class="link">
                <div class="desc">
                  <h3>RESIDENTIAL BUILDING</h3>
                  <h4>2020/ DÜSSELDORF[GERMANY]</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    const result2 = extractProjectName(value);
    expect(result2).toEqual("RESIDENTIAL BUILDING");
  });
});

describe("app", () => {
  it("extractAppImage", () => {
    let value = appHtmlDummy;

    const result1 = extractAppImage(value);
    expect(result1).toEqual("phone_melbeck.png");
  });
  it("extractAppName", () => {
    let value = appHtmlDummy;

    const result1 = extractAppName(value);
    expect(result1).toEqual("VILLA MELBECK");
  });
  it("extractAppDescription", () => {
    let value = appHtmlDummy;

    let result1 = extractAppDescription(value);
    expect(result1).toBe(
      `Mobile application VILLA MELBECK  is a presentation of 3d model with Augmented Reality technology. When you point your mobile phone camera at printed land development plan (available within the application in PDF format), you will see 3dimensional model of provided building.`
    );

    value = appHtmlDummy2;

    result1 = extractAppDescription(value);
    expect(result1).toBe(
      `Aplikacja mobilna RESIDENCE LIVING to prezentacja modelu 3d za pomocą technologii Augmented Reality. Gdy skierują Państwo kamerę swojego telefonu na wydrukowany wcześniej plan zagospodarowania terenu (zawarty w aplikacji w formie PDF'a), pojawi się na ekranie model trójwymiarowy budynku.`
    );
  });
  it("extractAppAndroidLink", () => {
    let value = appHtmlDummy;

    let result1 = extractAppAndroidLink(value);
    expect(result1).toBe(
      `https://play.google.com/store/apps/details?id=com.vf.dus167`
    );

    value = appHtmlDummy2;
    result1 = extractAppAndroidLink(value);
    expect(result1).toBe(
      `https://play.google.com/store/apps/details?id=com.vf.ess54`
    );
  });
  it("extractAppIOSLink", () => {
    let value = appHtmlDummy;

    const result1 = extractAppIOSLink(value);
    expect(result1).toBe(
      `https://apps.apple.com/pl/app/villa-melbeck/id1491022041`
    );
  });
  it("extractAppClient", () => {
    let value = appHtmlDummy;

    let result1 = extractAppClient(value); //?
    expect(result1).toBe(`VIRTUELL FORMAT`);

    value = imagesHtmlDummy;

    result1 = extractAppClient(value); //?
    expect(result1).toBe(`VIRTUELL FORMAT`);
  });

  describe("anim", () => {
    it("extractAnimLink", () => {
      let value = animHtmlDummy;

      const result1 = extractAnimLink(value);
      expect(result1).toEqual("https://www.youtube.com/embed/D4cMDRMeGW0");
    });
  });

  describe("images", () => {
    it("extractImagesClient", () => {
      let value = imagesHtmlDummy;

      const result1 = extractAppClient(value);
      expect(result1).toEqual("VIRTUELL FORMAT");
    });

    it("extracting all images", () => {
      let value = imagesHtmlDummy;
      let result = extractAllImagesIntoArrayOfData(value);
      expect(result).toEqual([
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: true,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_002.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_003.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_001.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_004.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_005.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_006.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_007.jpg",
        },
        {
          imageAlt: "07.2020r. Osiedle mieszkaniowe, Aachen, Niemcy.",
          imageIsBig: false,
          imageSrc: "2020_07_osiedle_mieszkaniowe_aachen_niemcy_008.jpg",
        },
        { imageAlt: "Ante logo", imageIsBig: false, imageSrc: "ante-logo.png" },
      ]);
    });
  });
});
