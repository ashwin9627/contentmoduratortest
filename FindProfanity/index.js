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
    //Form request object
    var FormRequestObject=FormRequestObjectMethod(URL,key,"post",req.body,listid)
    //Trigger API
    var result=await request(FormRequestObject); 
    
    context.res = {
      // status: 200, /* Defaults to 200 */
       headers: {
                'Content-Type': 'application/json'
            },
      body: result
    }; 
  }
  catch(error){
  context.log(error)
  context.res = {
    status: 500,
    headers: {
             'Content-Type': 'application/json'
         },
   body: error.message
 };
  }
}

function FormRequestObjectMethod(URL,key,Type="GET",body=null,listid) {
  try{ 
    //URL=URL+'/contentmoderator/moderate/v1.0/ProcessText/Screen?listId='+listid
    URL=URL+'/contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=True&PII=True&classify=True&listId='+listid
    
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
  catch(error){
  context.log(error)
  return error;
  }
     }
    