//var request = require('request');
const request = require("request-promise");
module.exports =async function (context, req) {
  try{
    context.log('iNext API Trigered');
    var key=req.headers['key'];  
    var URL=req.headers['url'];
    var listid=req.query.listid; 
    var autocorrect=req.query.autocorrect;
    var pii=req.query.pii;
    var classify=req.query.classify;
    var profanityQuery  
    // if(autocorrect!=null)profanityQuery=profanityQuery+"autocorrect=True" 
    context.log('Callingobject fun')
    var FormRequestObject=FormRequestObjectMethod(URL,key,"post",req.body,listid)
    
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

function FormRequestObjectMethod(URL,key,Type="GET",body=null,listid) {
    console.log(Type)
    //context.log('GetTerms started')    
    URL=URL+'/contentmoderator/moderate/v1.0/ProcessText/Screen?listId='+listid
     //URL=URL+'/contentmoderator/lists/v1.0/termlists/'+id+'/terms?'+lang
    
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
    