# Coding Challenge Notes

From Stephen

1. Takes inputs for a one way flight (Departure time, from airport code, to airport code, flight number). E.x. 2018-12-30T11:11, JFK to YVR, WS123 (note this is not a real westjet flight, you’ll need to get a real one)
2. Retrieve the seats and prices from www.westjet.com for that specific 1 way flight's seatmap.
3. Print out all of the seats on the plane, indicate whether they are available and if available what is the price.

## Breaking the Problem Down

**Input**

- Need to use text input to get
  - departure time (2018-12-30T11:11)
    - What time format is this?
  - from airport code (JFK)
  - to airport code (YVR)
  - flight number (WS123)

**API**

- Need to use WestJet's API
- only a 1 way flight

**UPDATE:** No WestJet API - need to use web scraping API, maybe BeautifulSoup, Selenium, Nightwatch.js?

**Webscraping**

- WestJet's search URLs don't contain the airport codes, and rely on cookies/sessions to maintain information. This means that we can't construct a URL from the input and then scrape the HTML returned.
- BeautifulSoup doesn't let us manipulate a page, only read data from it. We need to be able to programmatically search for a particular flight.
- Nightwatch lets us do that. We'll need to write (at minimum) a portion of the code in Javascript to manipulate the website.
- Might want to use Python and BeautifulSoup to read the data afterwards,

**Booking Steps**

1. https://www.westjet.com/en-ca/book-trip/flight

- From
- To
- Depart

2. https://www.westjet.com/booking/Create.html?lang=en&uuid=*a43ce514-0186*#flight-search-results/0

- Find the time on the page
- Open the flight details
- Check the flight number
- Click on the corresponding booking button (has a price on it ending in CAD)

3. https://www.westjet.com/booking/Create.html?lang=en&uuid=*a43ce514-0186*#review-itinerary

- Wait some time
- Click continue

4. https://www.westjet.com/booking/Create.html?lang=en&uuid=*a43ce514-0186*#guest-info

- Click close
- Title: "Mr."
- First name: "John"
- Last name: "Doe"
- Day: 1
- Month: Jan
- Year: 1990
- Phone: 5134444444 (Blake Maislin)
- Email: philliprice006@gmail.com (spammer)
- _maybe_ click "continue" on seat selection dialogue -> means we can't pick seats

**URL**
https://www.westjet.com/booking/Create.html?lang=en&type=search&origin=YUL&destination=LAX&adults=1&children=0&infants=0&outboundDate=2019-02-06&returnDate=&companionvoucher=false&iswestjetdollars=false&promo=&currency=CAD&caller=https%3A%2F%2Fwww.westjet.com%2Fen-ca%2Fbook-trip%2Fflight

_uuids_

- 64d0c039-07af
- 679dba89-d3b1
- 983806d1-4672
- b15200a6-17ca

**Output**

- Print out all the seats on the plane
  - Is any particular seat available
  - How much does the seat cost?
