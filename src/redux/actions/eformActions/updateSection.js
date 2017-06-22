import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/convertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function updateSection(sectionID,property,value){

    return (dispatch,getState)=>{

        var eform = getState().eform;
        var updatingFields = [];
        var templateClone =  Object.assign({},eform.template);
            //console.log('updateField:new 0. time = ',(new Date()) - updateStartAt ,' ms');
        var section = templateClone.sections[sectionID];

        console.log('updateSection: section = ',section, sectionID);

       
        section[property] = value;
        updatingFields.push({sectionID,rowID:null,fieldID:null,value:""});

         console.log('updatingFields >>>> updateSection = ',updatingFields);
       

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
