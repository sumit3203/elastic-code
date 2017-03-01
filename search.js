var client=require ('./connection.js');

/*
The  function is created to use the Search API of elasticsearch
The Search API allows us to search the documents. This function will search
for all the documents
@index : index to search
@body : search query or parameters
*/
const search = function search(index, body) {
  const text=`retrieving all documents (displaying ${body.size} at a time)...`;
    callSearch(index,body,text);
};

const callSearch = function callSearch(index, body, text) {
  console.log(text);
     client.search({index: index, body: body})
     .then(results => {
       console.log(`found ${results.hits.total} items in ${results.took}ms`);
       console.log(`returned article titles:`);
       results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.title}`));
     })
     .catch(console.error);
};


/*
The  function is created to use the Search API of elasticsearch
The Search API allows us to search the documents. This function will search
for all the documents
@index : index to search
@maxSize : maximum documents to search
*/
const searchMatch = function searchMatch(index, maxSize, from, query, minimum_should_match, fuzziness) {
  let body = {
   size: maxSize,
   from: from,
   query: {
     match: {
       title: {
         query: query,
         minimum_should_match: minimum_should_match,
         fuzziness: fuzziness
       }
     }
   }
 };
 console.log(body);
 const text=`retrieving all documents with Match (displaying ${body.size} at a time)...`;
   callSearch(index,body,text);

};

/*
The  function is created to use the suggest API of elasticsearch
The suggest API allows us to get suggestions based on terms. This function will search
for all the documents
@index : index to search
@body : suggestion query or parameters
*/
const suggestTerm = function suggestTerm(index,body) {
  console.log(`retrieving term suggestions for "${body.text}"...`);
  client.suggest({index: index, body: body})
  .then(results => {
    console.log(`suggestions for each term are:`);
    results.titleSuggester.forEach((term, index) => {
      console.log(`term ${++index}: ${term.text}`);
      term.options.forEach((option, index) => console.log(`\t suggestion ${++index}: ${option.text}`));
    });
  })
  .catch(console.error);
};

module.exports = {
    search: search,
    searchMatch: searchMatch,
    suggestTerm:suggestTerm

  };
