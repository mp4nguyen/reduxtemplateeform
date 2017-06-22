

import * as util from '../utilities'

/*
  this function is used to set value for radio button and textfield/areafield from database through apptInfo object
*/

export default function(field,preCal,apptInfo){

  if(util.getPrefixField(preCal,'CONCAT') > -1){
      if(preCal !== ''){
          var preCalRes = util.getArrayPrecal(7, preCal);
          var value = '';
          var checked = null;
          preCalRes.map(function(preCalResItem){
              var preCalResItemArr = preCalResItem.split('.');
              var responseTemp = null;
              var preCalResItemTemp = '';
              if(preCalResItemArr.length > 1){

                  responseTemp = apptInfo[preCalResItemArr[0]];
                  preCalResItemTemp = preCalResItemArr[1];

                  //console.log('funct concat >>> responseTemp', responseTemp);
                  //console.log('funct concat >>> preCalResItemArr[0]', preCalResItemArr[0]);

              }else{
                  responseTemp = apptInfo;
                  preCalResItemTemp = preCalResItem;
              }

              for(var key in responseTemp){
                  if(key === preCalResItemTemp){
                      if(util.getPrefixField(field.type,'checkbox') > -1){
                          if(field.value === responseTemp[key]){
                              //value = 'yes';
                              checked = true;
                          }else{
                              checked = false;
                          }
                      }
                      else if(util.getPrefixField(field.type,'radio') > -1){
                          if(field.value === responseTemp[key]){
                              //value = responseTemp[key];
                              checked = true;
                          }else{
                              checked = false;
                          }
                      }else{
                          if(responseTemp[key] !== null)
                              value += responseTemp[key]+' ';
                      }
                      break;
                  }
              }
          })

          if (checked!==null) {
              field.checked = checked;
          }
          if(value) {
              field.value = value
          }
      }
  }
};
