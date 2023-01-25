//var request = require('request');
const request = require("request-promise");
module.exports =async function (context, req) {
  try{
    context.log('iNext API Trigered');
    var header=req.headers['key'];  
    var URL=req.headers['url'];
    var id=context.bindingData.id;
    var lang=req.query.language;
    var NewTerm=req.query.NewTerm;

    context.log(id)
     
    context.log('Callingobject fun')
    var FormRequestObject=GETTerms(URL,header,"post",req.body,id,NewTerm,lang)
    
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

function GETTerms(URL,header,Type="GET",body=null,id=null,NewTerm,lang) {
    console.log(Type)
    //context.log('GetTerms started')    
     URL=URL+'/contentmoderator/lists/v1.0/termlists/'+id+'/terms/'+NewTerm+'?'+lang

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
    