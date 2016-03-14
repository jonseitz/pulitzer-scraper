#pulitzer-scraper

Digging through the new pulitzer.org site, I found the API used to pull winners by year or category. Calls are based on a term id (tid), a three digit number that corresponds to a specific category. I wrote a quick node-based scraper to pull together a list of all the Pulitzer prize winners in a single CSV file.

Running the app requirees 44 separate API calls. Use responsibly.

##To run:

Clone repo:

`git clone https://github.com/jonseitz/pulitzer-scraper.git`

`cd pulitzer-scraper`

Install dependencies:

`npm install`

run app:

`node app`

##Pulitzer API endpoints

### GET winners in a given Category
`http://www.pulitzer.org/cms/api/1/winners/cat/ [tid] /raw.json`

The `tid` range for categories goes from **204** _("Public Service")_ - **225** _("Music")_. 

_Full list TK._


### GET winners for a given year
`http://www.pulitzer.org/cms/api/1/winners/year/ [tid] /raw.json`

The `tid` range for years goes from **105** _(2015)_ - **203** _(1917)_. 


### Get term information
`http://www.pulitzer.org/cms/api/1/term/ [tid] /raw.json`

Enter any `tid` to translate the category or year id into a real category.

_FYI: `tid` values above 225 appear to be categories or tags. The highest value I found is 549, which is "Alaska"._ 