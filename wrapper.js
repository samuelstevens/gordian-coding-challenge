const Nightwatch = require('nightwatch');

const callback = seats => {
  // Can make any call here with the seats object
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
