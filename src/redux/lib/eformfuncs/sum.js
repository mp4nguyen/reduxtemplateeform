
import * as util from '../utilities'

/*
  this function is used to set default value for radio button and textfield/areafield
  if it is the radio button, set checked = true
  otherwise, set it is = value that was setted in the first parameter of function
*/
export default function(fieldsByName,fieldsByRef,template,func,field,updatingFields){
    return new Promise((resolve,reject)=>{
        var params = util.getParams(func);
        var total = 0;
        params.forEach(param=>{
            var inputField;
            if(param.indexOf('field_')>-1){
                inputField = fieldsByRef[param];
                var inputValue = util.getField(template,inputField.fieldPosition).value;
            }else{
                inputField = fieldsByName[param];
            }
            var inputValue = util.getField(template,inputField.fieldPosition).value;
            if(!isNaN(inputValue)){
                total = total + Number(inputValue);
            }
        });
        util.getField(template,field.fieldPosition).value = total;
        //console.log(" SUM is running with total = ",total);
        updatingFields.push(field.fieldPosition);
        resolve(total)
    });

};
