const longTime = 1000;
const mediumTime = 500;
const shortTime = 200;

module.exports = {
  'Get Demo Flight': browser => {
    // JFK
    // YUL
    // Feb 06 2018

    const origin = 'YUL';
    const destination = 'LAX';
    const flightNum = '3543';
    const time = '06:30';
    const date = '2019-02-06';

    const url = `https://www.westjet.com/booking/Create.html?lang=en&type=search&origin=${origin}&destination=${destination}&adults=1&children=0&infants=0&outboundDate=${date}&returnDate=&companionvoucher=false&iswestjetdollars=false&promo=&currency=CAD&caller=https%3A%2F%2Fwww.westjet.com%2Fen-ca%2Fbook-trip%2Fflight`;

    console.log(url);

    const clearKeyStrokes = Array(30);
    for (let i = 0; i < clearKeyStrokes.length; i++) {
      clearKeyStrokes[i] = browser.Keys.BACK_SPACE;
    }

    /* browser
      .url('https://www.westjet.com/en-ca/book-trip/flight')
      .pause(longTime)
      .maximizeWindow()
      .waitForElementPresent('body')
      .waitForElementPresent('#book-flight-form')
      .waitForElementPresent('#origin-search')
      .useXpath()
      .getLocationInView('//*[@id="1528138409643"]/section/details/summary')
      .click('//*[@id="book-flight-form"]/div[7]') // click on origin
      .useCss()
      .pause(mediumTime) // not a good selector
      .setValue('#origin-search', clearKeyStrokes) // clear the default value
      .pause(mediumTime)
      .setValue('#origin-search', origin) // set to origin
      .useXpath()
      .waitForElementPresent('//*[@id="origin-picker"]/span/div/div/li')
      .click('//*[@id="origin-picker"]/span/div/div/li') // choose the first value
      .useCss()
      .pause(mediumTime)
      .setValue('#destination-search', clearKeyStrokes) // clear the default value
      .pause(longTime)
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
      .pause(mediumTime);

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
    browser.pause(longTime * 4);

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

    browser.url(url).pause(longTime);

    browser.pause(5000).end();
  },
};
