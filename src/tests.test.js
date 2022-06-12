const {
  extractProjectName,
  defineTypeOfInput,
  typeOfInput,
} = require("./index.js");
// import { extractProjectName } from "./index.js";

describe("tests", () => {
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
  });
});
