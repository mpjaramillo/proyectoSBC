class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#defaultView:ImageGrid
SELECT ?item ?itemLabel ?itemDescription ?image WHERE {
  #part1: objects in cases
  {
  ?item wdt:P276             ?case     .
  ?case wdt:P31            wd:Q3561331 .
  
  ?case wdt:P276             ?room     .
  ?room wdt:P31/wdt:P279*  wd:Q180516  . # wd:Q15206795
  
  ?room wdt:P466             ?dep      .
  ?dep  wdt:P361+          wd:Q19675
  }       
  
  OPTIONAL { ?item wdt:P18 ?image } # Optionally with an image

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,fr" }
}`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );
