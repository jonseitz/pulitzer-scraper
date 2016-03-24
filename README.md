#pulitzer-scraper

Digging through the new pulitzer.org site, I found the API used to pull winners by year or category. Calls are based on term id (tid), a three digit number that corresponds to a specific category. I wrote a quick node-based scraper that pulls together lists of all the Pulitzer prize winners and finalists in separate CSV files, as well as a list of all the revisions to categories over the years.

_NOTE: Running the app requires 205 separate API calls to the Pulitzer site. Use responsibly._

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

The `tid` range for current categories goes from **204** _("Public Service")_ - **225** _("Music")_:

* 204: Public Service
* 205: Breaking News Reporting
* 206: Investigative Reporting
* 207: Explanatory Reporting
* 208: Local Reporting
* 209: National Reporting
* 210: International Reporting
* 211: Feature Writing
* 212: Commentary
* 213: Criticism
* 214: Editorial Writing
* 215: Editorial Cartooning
* 216: Breaking News Photography
* 217: Feature Photography
* 218: Drama
* 219: Fiction
* 220: History
* 221: _Blank_
* 222: Biography or Autobiography
* 223: General Nonfiction
* 224: Poetry
* 225: Music

Deprecated/Special categories are in a separate range from **260** _(Special Awards & Citations)_ - **278** _(Beat Reportting)_: 


* 260: Special Awards and Citations
* 261: Novel
* 262: _Blank_
* 263: Correspondence
* 264: Explanatory Journalism
* 265: General News Reporting
* 266: Local General or Spot News Reporting
* 267: Local Investigative Specialized Reporting
* 268: Local Reporting - Edition time
* 269: Local Reporting - No edition time
* 270: Newspaper History Award
* 271: Photography
* 272: Reporting
* 273: Specialized Reporting
* 274: Spot News Photography
* 275: Spot News Reporting
* 276: Telegraphic Reporting - International
* 277: Telegraphic Reporting - National
* 278: Beat Reporting

### GET finalists in a given category

`http://www.pulitzer.org/cms/api/1/finalist/ [tid] /all/raw.json`

_`tid` ranges mirror those above._

### GET winners for a given year
`http://www.pulitzer.org/cms/api/1/winners/year/ [tid] /raw.json`

The `tid` range for years goes from **105** _(2015)_ - **203** _(1917)_. 


### GET finalists for a given year

`http://www.pulitzer.org/cache/api/1/finalist/all/ [tid] /raw.json`

_`tid` ranges mirror those above._

### Get term information
`http://www.pulitzer.org/cms/api/1/term/ [tid] /raw.json`

Enter any `tid` to translate the category or year id into a real category.

_FYI: `tid` values above 278 appear to be categories or tags. The highest value I found is 549, which is "Alaska"._ 