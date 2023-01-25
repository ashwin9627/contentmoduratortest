//var request = require('request');
const request = require("request-promise");
module.exports =async function (context, req) {
  try{
    context.log('iNext API Trigered');
    var header=req.headers['key'];  
    var URL=req.headers['url'];
    var id=context.bindingData.id;

    context.log(id)
     
    context.log('Callingobject fun')
    var FormRequestObject=GETTerms(URL,header,"Get",req.body,id)
    
     var result=await request(FormRequestObject); 
    
    context.log('..............inside request api call........')
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: result
    }; 
  }
  catch(error){
  context.log(error)
  }
}

function GETTerms(URL,header,Type="GET",body=null,id=null) {
    console.log(Type)
    //context.log('GetTerms started')
    if(id==null)
     URL=URL+'/contentmoderator/lists/v1.0/termlists'
    else
     URL=URL+'/contentmoderator/lists/v1.0/termlists/'+id
     var options = {
      'method': Type,
      'url': URL,
      'headers': {
        'Ocp-Apim-Subscription-Key': header,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return options;
     }
    