import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/convertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function updateInfoSection(sectionParam){

    return (dispatch,getState)=>{

        var sectionID= sectionParam.sectionID;

        var eform = getState().eform;
        var updatingFields = [];
        var templateClone =  Object.assign({},eform.template);
        
        var section = templateClone.sections[sectionID];    

        if (sectionParam.roles) {
            if (section.roles) {
                section.roles = sectionParam.roles;
            }else{
                section["roles"] = sectionParam.roles;
            }            
        }
        
        // console.log('updateInfoSection', sectionParam, section);

        updatingFields.push({sectionID,rowID:null,fieldID:null,value:""});

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
    };

}
