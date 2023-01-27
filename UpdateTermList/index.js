//var request = require('request');
const request = require("request-promise");
module.exports =async function (context, req) {
  try{
    context.log('iNext API Trigered');
    var key=req.headers['key'];  
    var URL=req.headers['url'];
    var id=context.bindingData.id;

    //Form request object
    var FormRequestObject=FormRequestObjectMethod(URL,key,"put",req.body,id)
    

    //API Trigger
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

function FormRequestObjectMethod(URL,key,Type="GET",body=null,id=null) {
    if(id==null)
     URL=URL+'/contentmoderator/lists/v1.0/termlists'
    else
     URL=URL+'/contentmoderator/lists/v1.0/termlists/'+id
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
    