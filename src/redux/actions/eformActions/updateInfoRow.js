// import calculatingEform from '../../lib/calculatingEform';
// import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

// import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
// import {printRequest,postRequest,getRequest} from '../../lib/request';

export default function updateInfoRow(rowParam){

    return (dispatch,getState)=>{

        var sectionID= rowParam.sectionID;
        var rowID = rowParam.rowID;

        var eform = getState().eform;
        var updatingFields = [];
        var templateClone =  Object.assign({},eform.template);
        
        var section = templateClone.sections[sectionID];
        var row = section.rows[rowID];    

        console.log('rowParam', rowParam, 'row', row);

        if (rowParam.roles) {
            if (row.roles) {
                row.roles = rowParam.roles;
            }else{
                row["roles"] = rowParam.roles;
            }            
        }
        
        // console.log('updateInfoSection', rowParam, section);

        updatingFields.push({sectionID,rowID:rowID,fieldID:null,value:""});

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
    };

}
