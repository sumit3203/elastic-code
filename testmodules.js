 const fs = require('fs');
var bulk=require ('./bulk.js');
var searchapi=require ('./search.js');

  const testIndex = function testIndex() {
    const articlesRaw = fs.readFileSync('data.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed`);
    bulk.bulkIndex('library', 'article', articles);
  };

//testIndex();
 const indices = function testIndices() {
    bulk.indices();
  };

//  testIndices();

// Test Search functionality
const testSearch = function testSearch() {
  let body = {
      size: 20,
      from: 0,
      query: {
        match_all: {}
      }
    };
   searchapi.search('library',body);
 };

 //testSearch();

 // Test Search Match functionality
 const searchMatch = function searchMatch() {
    searchapi.searchMatch('library',20,0,'Quist partiatur',3,2);
  };

//searchMatch();
// Test Suggest Term functionality
const suggestTerm = function suggestTerm() {
  let body = {
    text: 'dolo lore fugi',
    titleSuggester: {
      term: {
        field: 'title'
      }
    }
  };
  searchapi.suggestTerm('library',body);
 };

suggestTerm();
