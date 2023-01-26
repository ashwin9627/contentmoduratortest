//var request = require('request');
const request = require("request-promise");
module.exports =async function (context, req) {
  try{
    context.log('iNext API Trigered');
    var key=req.headers['key'];  
    var URL=req.headers['url'];
    var id=context.bindingData.id;
    var lang=context.bindingData.language;
    var deleteterm=context.bindingData.deleteterm;

    context.log(id)
     
    context.log('Callingobject fun')
    var FormRequestObject=FormRequestObjectMethod(URL,key,"delete",req.body,id,deleteterm,lang)
    
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

function FormRequestObjectMethod(URL,key,Type="GET",body=null,id=null,deleteterm,lang) {
    console.log(Type)
    //context.log('GetTerms started')    
     URL=URL+'/contentmoderator/lists/v1.0/termlists/'+id+'/terms/'+deleteterm+'?language='+lang
    
     var options = {
      'method': Type,
      'url': URL,
      'headers': {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return options;
     }
    