# Getting WestJet Flight Information

## Configuring the Environment

```bash
git clone https://github.com/samuelstevens/gordian-coding-challenge.git
cd gordian-coding-challenge
npm install
```

Firefox is required to run the browser automation tool. It is entirely free and can be downloaded [here](https://www.mozilla.org/en-US/firefox/new/).

## Running the Program

The wrapper file requires command line arguments to run properly, and in a specific order.

### Example Commands

```bash
node wrapper.js YUL YYZ 3543 2019-02-06T06:30

node wrapper.js YYZ LAX 1100 2019-02-06T09:45

node wrapper.js MCO YYZ 1227 2019-01-10T21:25
```

### Command Format

```bash
node wrapper.js <origin_code> <destination_code> <flight_number> <date_string>
```

All of the input must be provided in the exact format described, especially the date_string (YYYY-MM-DDTHH:MM).

### Output

In nightwatch.json, change `"output": false,` to `"output": true,` to see the Nightwatch output.
