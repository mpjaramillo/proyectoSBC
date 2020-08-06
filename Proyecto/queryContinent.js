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
const sparqlQuery = `SELECT ?continent ?continentLabel ?pic ?poblation ?highestPoint
WHERE
{
  ?continent wdt:P31 wd:Q5107.
  ?continent wdt:P18 ?pic .
  ?continent wdt:P1082 ?poblation .
  ?continent wdt:P610 ?highestPoint .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE], en". }
 
}
ORDER BY xsd:integer(SUBSTR(STR(?continent),STRLEN("http://www.wikidata.org/entity/Q")+1))`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );
