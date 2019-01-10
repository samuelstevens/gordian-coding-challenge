# Read Me

## Configuring the Environment

```bash
git clone https://github.com/samuelstevens/gordian-coding-challenge.git
npm install # automatically installs dev dependencies
```

## Running the Program

The wrapper file requires command line arguments to run properly, and in a specific order.

**Example Command**

```bash
node wrapper.js YUL YYZ 3543 2019-02-06T06:30

node wrapper.js YYZ LAX 1100 2019-02-06T09:45

node wrapper.js MCO YYZ 1227 2019-01-10T21:25
```

**Format**

```bash
node wrapper.js <origin_code> <destination_code> <flight_number> <date_string>
```

All of the input must be provided in the exact format described, especially the date_string (YYYY-MM-DDTHH:MM).
