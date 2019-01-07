const longTime = 1000;
const mediumTime = 500;
const shortTime = 200;

module.exports = {
  'Get Demo Flight': browser => {
    // JFK
    // YUL
    // Feb 04 2018

    const origin = 'JFK';
    const destination = 'LAX';

    const clearKeyStrokes = Array(30);
    for (let i = 0; i < clearKeyStrokes.length; i++) {
      clearKeyStrokes[i] = browser.Keys.BACK_SPACE;
    }

    browser
      .url('https://www.westjet.com/en-ca/book-trip/flight')
      .pause(longTime);
    browser.expect.element('body').to.be.present.before(longTime);
    browser.expect.element('#book-flight-form').to.be.present.before(longTime);
    browser.expect.element('#origin-search').to.be.present.before(longTime);

    browser
      .useXpath()
      .click('//*[@id="book-flight-form"]/div[7]') // click on origin
      .useCss()
      .pause(mediumTime) // not a good selector
      .setValue('#origin-search', clearKeyStrokes) // clear the default value
      .pause(mediumTime)
      .setValue('#origin-search', origin) // set to origin
      .pause(mediumTime)
      .useXpath()
      .click('//*[@id="origin-picker"]/span/div/div') // choose the first value
      .useCss()
      .pause(mediumTime)
      .setValue('#destination-search', destination) // set to origin
      .pause(mediumTime)
      .useXpath()
      .click('//*[@id="destination-picker"]/span/div/div/div') // choose the first value
      .useCss()
      .pause(mediumTime); // not a good selector;;

    browser.pause(longTime * 4);

    browser.end();
  },
};
