#pulitzer-scraper
Node.js-based app to scrape the Pulitzer Prize winners list

Digging through the new Pulitzer.org, I found the API used to pull winners by year or category. The term id (tid) is a three digit number that corresponds to a specific category. The `API_calls.js` module includes a number of functions to call the APIs, while `app.js` includes a basic app that will produce a `winners.csv` file containing all the winners.

##To run:

Clone repo:

`git clone https://github.com/jonseitz/pulitzer-scraper.git`
`cd pulitzer-scraper`

Install dependencies:

`npm install`

run app:

`node app`

##Pulitzer API endpoints

###Get Winners in a given Category
_http://www.pulitzer.org/cms/api/1/winners/cat/ **[tid]** /raw.json_

The tid range for categories goes from 204 ("Public Service") - 225 ("Music"). 

_Full list TK._


###Get Winners for a given year
_http://www.pulitzer.org/cms/api/1/winners/year/ **[tid]** /raw.json_

The tid range for years goes from 105 _(2015)_ - 203 _(1917)_. 


###Get term information
_http://www.pulitzer.org/cms/api/1/term/ **[tid]** /raw.json_

Enter any tid to translate the category or year id into a real category.