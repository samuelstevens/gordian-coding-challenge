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
  'Get Demo Flight': browser => {
    const { origin } = browser.globals; // YUL
    const { destination } = browser.globals; // YYZ
    const { flightNum } = browser.globals; // 3543
    const { dateString } = browser.globals; // 2019-02-06T06:30
    const time = dateString.substr(11, 5); // 06:30
    const date = dateString.substr(0, 10); // 2019-02-06

    const url = `https://www.westjet.com/booking/Create.html?lang=en&type=search&origin=${origin}&destination=${destination}&adults=1&children=0&infants=0&outboundDate=${date}&returnDate=&currency=CAD`;

    const seats = [];

    console.log(url);
    console.log('');

    const clearKeyStrokes = Array(30);
    for (let i = 0; i < clearKeyStrokes.length; i++) {
      clearKeyStrokes[i] = browser.Keys.BACK_SPACE;
    }

    /* browser
      .url('https://www.westjet.com/en-ca/book-trip/flight')
      .pause(1000)
      .maximizeWindow()
      .waitForElementPresent('body')
      .waitForElementPresent('#book-flight-form')
      .waitForElementPresent('#origin-search')
      .useXpath()
      .getLocationInView('//*[@id="1528138409643"]/section/details/summary')
      .click('//*[@id="book-flight-form"]/div[7]') // click on origin
      .useCss()
      .pause(500) // not a good selector
      .setValue('#origin-search', clearKeyStrokes) // clear the default value
      .pause(500)
      .setValue('#origin-search', origin) // set to origin
      .useXpath()
      .waitForElementPresent('//*[@id="origin-picker"]/span/div/div/li')
      .click('//*[@id="origin-picker"]/span/div/div/li') // choose the first value
      .useCss()
      .pause(500)
      .setValue('#destination-search', clearKeyStrokes) // clear the default value
      .pause(1000)
      .setValue('#destination-search', 'L')
      .pause(50)
      .setValue('#destination-search', 'A')
      .pause(50)
      .setValue('#destination-search', 'X')
      .pause(50)
      .useXpath()
      .waitForElementPresent('//*[@id="destination-picker"]/span/div/div/li')
      .click('//*[@id="destination-picker"]/span/div/div/li')
      .useCss()
      .pause(500);

    browser
      .click('#depart')
      .waitForElementVisible('#depart-picker')
      .pause(1000)
      .waitForElementVisible('#depart-picker')
      .pause(1000)
      .elements('css selector', '.dw-cal-day-fg', result => {
        result.value.map((element, err) => {
          browser.elementIdAttribute(
            element.ELEMENT,
            'innerText',
            attribute => {
              if (attribute.value == day) {
                browser.elementIdClick(element.ELEMENT);
              }
            },
          );
        });
      });
    browser.pause(1000 * 4);

    browser.useXpath();

    browser.getAttribute(
      '//*[@id="mobile-submit"]/div/input',
      'class',
      result => {
        console.log(result);

        if (result.value === 'tab-panel-exit-control') {
          browser.click('//*[@id="mobile-submit"]/div').useCss();
        }
      },
    );
    browser.getAttribute(
      '//*[@id="tablet-submit"]/div/input',
      'class',
      result => {
        console.log(result);

        if (result.value === 'tab-panel-exit-control') {
          browser.click('//*[@id="tablet-submit"]/div').useCss();
        }
      },
    );
    browser.getAttribute(
      '//*[@id="desktop-submit"]/div/input',
      'class',
      result => {
        console.log(result);

        if (result.value === 'tab-panel-exit-control') {
          browser.click('//*[@id="desktop-submit"]/div').useCss();
        }
      },
    );
    browser.click('//*[@id="desktop-submit"]');
    browser.click('//*[@id="mobile-submit"]');
    browser.click('//*[@id="tablet-submit"]');

    browser.pause(5000); */

    browser
      .url(url)
      .waitForElementPresent('#flightResultsPage')
      .waitForElementPresent('#outboundSearchResultsContent')
      .pause(5000);

    browser
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
      .waitForElementVisible('//div[contains(@class, "od-continue")]/button')
      .pause(6000) // should just wait until '//div[contains(@class, "od-continue")]/button' is enabled (within classname)
      .click('//div[contains(@class, "od-continue")]/button')
      .pause(3000)
      .click('//*[@id="btn-skip-sign-in"]')
      .pause(500)
      .useCss()
      .click('#adult-1-title option[value="MR"]')
      .pause(100)
      .setValue('#adult-1-firstName', 'John')
      .pause(100)
      .setValue('#adult-1-lastName', 'Doe')
      .pause(100)
      .setValue('#phone', '5134444444')
      .pause(100)
      .setValue('#email', 'philliprice006@gmail.com')
      .pause(100)
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

            if (value.includes('blocked') || value.includes('occupied')) {
              seat.available = false;
            } else {
              browser.elementIdClick(id);

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
      seats.forEach(seat => {
        if (seat.available) {
          console.log(
            `Seat ${seat.seatNumber} is available for an additional fee of ${
              seat.price
            }.`,
          );
        } else {
          console.log(`Seat ${seat.seatNumber} is not available.`);
        }
      });
    });

    browser.end();
  },
};
