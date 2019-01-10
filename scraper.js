/*

  Gets the seats, prices, and availability of WestJet flights.
  Copyright (C) 2019 Samuel R Stevens

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

module.exports = {
  'Get Flight': browser => {
    const { origin } = browser.globals; // YUL
    const { destination } = browser.globals; // YYZ
    const { flightNum } = browser.globals; // 3543
    const { dateString } = browser.globals; // 2019-02-06T06:30
    let time = dateString.substr(11, 5);
    // For some reason, WestJet uses 24 hour time (Canadian?)
    // if (Number(dateString.substr(11, 2)) > 12) {
    //   time = `${Number(dateString.substr(11, 2)) - 12}:${dateString.substr(
    //     14,
    //     2,
    //   )}`;
    // }

    const date = dateString.substr(0, 10); // 2019-02-06

    const url = `https://www.westjet.com/booking/Create.html?lang=en&type=search&origin=${origin}&destination=${destination}&adults=1&children=0&infants=0&outboundDate=${date}&returnDate=&currency=CAD`;

    const seats = [];

    // console.log(url);

    const clearKeyStrokes = Array(30);
    for (let i = 0; i < clearKeyStrokes.length; i++) {
      clearKeyStrokes[i] = browser.Keys.BACK_SPACE;
    }

    let birthdayRequired = null;

    browser
      .url(url)
      .waitForElementPresent('#flightResultsPage')
      .waitForElementPresent('#outboundSearchResultsContent')
      .pause(5000)
      .useXpath()
      .waitForElementVisible(
        `//div[text()[contains(.,'${time}')]]/../../../div[@class='fullDetails']`,
      )
      .useCss()
      .waitForElementNotVisible('#interstitial')
      .useXpath()
      .click(
        `//div[text()[contains(.,'${time}')]]/../../../div[@class='fullDetails']`,
      )
      .waitForElementVisible(`//li[text()[contains(.,'WS ${flightNum}')]]`)
      .waitForElementVisible(
        `//li[text()[contains(.,'WS ${flightNum}')]]/../../../../../../../../div[contains(@class, "flightsSummaryRight")]/flight-details/div/div/fare-box[1]/div/div/div/div[2]/button`,
      )
      .click(
        `//li[text()[contains(.,'WS ${flightNum}')]]/../../../../../../../../div[contains(@class, "flightsSummaryRight")]/flight-details/div/div/fare-box[1]/div/div/div/div[2]/button`,
      )
      .waitForElementVisible('//*[@id="EconoAccept"]')
      .click('//*[@id="EconoAccept"]')
      .waitForElementVisible('//div[@class="od-continue"]')
      .waitForElementVisible('//div[@class="od-continue"]/button')
      .pause(5000)
      .click('//div[contains(@class, "od-continue")]/button')
      .useCss()
      .waitForElementVisible('#div-sign-in-header')
      .useXpath()
      .click('//*[@id="btn-skip-sign-in"]')
      .pause(500)
      .useCss()
      .click('#adult-1-title option[value="MR"]')
      .setValue('#adult-1-firstName', 'John')
      .setValue('#adult-1-lastName', 'Doe');

    browser.useXpath().isVisible('//div[@class="secure-flight"]', result => {
      birthdayRequired = result.value;

      browser.useCss();

      if (birthdayRequired) {
        browser
          .click('#adult-1-day option[value="1"]')
          .click('#adult-1-month option[value="1"]')
          .click('#adult-1-year option[value="1980"]');
      }

      browser
        .setValue('#phone', '5134444444')
        // .pause(100)
        .setValue('#email', 'philliprice006@gmail.com')
        // .pause(100)
        .click('#continue')
        .useXpath()
        .waitForElementVisible('//h1[text()[contains(.,"Seat selection")]]')
        .pause(1500);

      browser.elements('xpath', '//div[contains(@class, "seat")]', result => {
        console.log(result.value.length);
        result.value.map(element => {
          const id = element[Object.keys(element)[0]];
          const seat = { seatNumber: null, price: null, available: true };

          browser.elementIdAttribute(id, 'data-seatnum', seatNum => {
            const { value } = seatNum;
            if (value) {
              seat.seatNumber = value;
            }

            browser.elementIdAttribute(id, 'class', seatClass => {
              const { value } = seatClass;

              if (
                value.includes('blocked') ||
                value.includes('occupied') ||
                value.includes('noseat') ||
                value.includes('lavatory')
              ) {
                seat.available = false;
              } else {
                browser.elementIdClick(id);

                if (value.includes('exit')) {
                  // need to click out of popup
                  browser.useCss().click('#exitRowSeatLightbox0');
                }

                browser.execute(
                  function(data) {
                    return document.getElementsByClassName('feePrice')[0]
                      .innerText;
                  },
                  [],
                  result => {
                    seat.price = result.value;
                  },
                );
              }

              if (seat.seatNumber) {
                seats.push(seat);
              }
            });
          });
        });
      });

      browser.pause(1000, () => {
        browser.globals.finalCallback(seats);
      });

      browser.end();
    });
  },
};
