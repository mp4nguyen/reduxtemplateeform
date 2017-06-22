
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';
import * as util from '../../lib/utilities';


var connectToServerAt;
var startEditAt;


export default function updateInfoField(sectionID, rowID, fieldID, fieldParam, isDelete, orderField, valueOrder){

    if (!isDelete) {
        if (!orderField) {
            return (dispatch,getState)=>{
                
                var eform = getState().eform;
                var updatingFields = [];
                var templateClone =  Object.assign({},eform.template);
                
                var field = templateClone.sections[sectionID].rows[rowID].fields[fieldID];

                console.log('fieldParam', fieldParam);

                field.preCal=fieldParam.preCal;
                field.cal=fieldParam.cal;
                field.label=fieldParam.label;
                field.labelPrefix=fieldParam.labelPrefix;
                field.labelSuffix=fieldParam.labelSuffix;
                field.name=fieldParam.name;
                field.value=fieldParam.value;
                field.size=fieldParam.size;

                field.roles=fieldParam.roles;

                updatingFields.push({sectionID,rowID:rowID,fieldID:fieldID,value:""});

                dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
            };
        }else{ // order field
            return (dispatch,getState)=>{
                var eform = getState().eform;
                var templateClone =  Object.assign({},eform.template);

                var field = util.getField(templateClone,{sectionID,rowID,fieldID});   

                templateClone.sections[sectionID].rows[rowID].fields.splice(fieldID,1);         

                var fieldArr = templateClone.sections[sectionID].rows[rowID].fields;
                
                var firstFieldArr = fieldArr.slice(0,valueOrder);

                firstFieldArr.push(field);

                // console.log('firstFieldArr', firstFieldArr);

                var secondFieldArr = fieldArr.slice(valueOrder, fieldArr.length);

                // console.log('secondFieldArr', secondFieldArr);

                var totalArr = firstFieldArr.concat(secondFieldArr);
                // console.log('totalArr', totalArr);

                // for (var i = 0; i < totalArr.length; i++) {
                //     totalArr[i].ref='field_'+sectionID+'_'+rowID+'_'+i
                // }

                templateClone.sections[sectionID].rows[rowID].fields = totalArr;

                var updatingFields = [];

                updatingFields.push({sectionID,rowID:rowID,fieldID:null,value:""});

                dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
            };
        }
    }else{
        return (dispatch,getState)=>{

            var eform = getState().eform;
            var updatingFields = [];
            var templateClone =  Object.assign({},eform.template);
            
            templateClone.sections[sectionID].rows[rowID].fields.splice(fieldID,1);

            // for (var i = 0; i < templateClone.sections[sectionID].rows[rowID].fields.length; i++) {
            //     util.resetRefField(templateClone.sections[sectionID].rows[rowID].fields, sectionID, rowID);
            // }

            updatingFields.push({sectionID,rowID:rowID,fieldID:null,value:""});

            dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
        };
    }


}
