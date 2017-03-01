var client=require ('./connection.js');

/*
The  function is created to use the Bulk API of elasticsearch
The Bulk API allows us to make multiple Rest Requests like
create, index , update or delete in a single step. Each request
is handled independently. It is very useful api to handle large dataset
@index : group of documents live
@type :  type of documents or schema
@data : original dataset
*/
const bulkIndex = function bulkIndex(index, type, data) {
   // Creating the bulk requests for execution
   let bulkBody = [];

// action description for each data item
   data.forEach(item => {
     bulkBody.push({
       index: {
         _index: index,
         _type: type,
         _id: item.id
       }
     });

     bulkBody.push(item);
   });
/* call the elasticsearch and report the response of Successfully indexed
 Requests
*/
   client.bulk({body: bulkBody})
   .then(response => {
     let errorCount = 0;
     response.items.forEach(item => {
       if (item.index && item.index.error) {
         console.log(++errorCount, item.index.error);
       }
     });
     console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
   })
   .catch(console.err);
 };
 /*
 Indices is used to check whether bulkIndex is created Successfully or not
 */
 const indices = function indices() {
    return client.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
  };

 module.exports = {
     bulkIndex: bulkIndex,
	   indices:   indices
   };
