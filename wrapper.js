const Nightwatch = require('nightwatch');

const callback = seats => {
  console.log(seats);
};

module.exports = {
  origin: process.argv[2],
  destination: process.argv[3],
  flightNum: process.argv[4],
  dateString: process.argv[5],
  finalCallback: callback,
};

// read the CLI arguments
Nightwatch.cli(function(argv) {
  argv._source = ['scraper.js'];

  // create the Nightwatch CLI runner
  const runner = Nightwatch.CliRunner(argv);

  // setup and run tests
  runner
    .setup()
    .startWebDriver()
    .then(_ => runner.runTests())
    .then(_ => runner.stopWebDriver())
    .catch(err => console.error(err));
});
