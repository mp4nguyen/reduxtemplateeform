
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';

export default function removeTemplate(templateID){

    return (dispatch,getState)=>{

        var eform = getState().eform;
       
        var templateClone =  Object.assign({},eform.template);

        for (var i = 0; i < templateClone.listTemplate.length; i++) {
            if (templateClone.listTemplate[i].ID == templateID) {
                
                templateClone.listTemplate.splice(i,1);

                break;
            } 
        }    
    

        var updatingFields = [];
        updatingFields.push("removeTemplate");        

        dispatch({type: types.REMOVE_TEMPLATE,templateClone,updatingFields});

    };

}
