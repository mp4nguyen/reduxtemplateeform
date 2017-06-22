
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';

export default function removeSection(sectionID){

    return (dispatch,getState)=>{

        var eform = getState().eform;
       
        var templateClone =  Object.assign({},eform.template);

        console.log('sectionID', sectionID);

        templateClone.sections.splice(sectionID,1);

        // for (var i = 0; i < templateClone.sections.length; i++) {
        //     for (var j = 0; j < templateClone.sections[i].rows.length; j++) {
        //          templateClone.sections[i].rows[j].ref = 'row_'+i+'_'+j;
        //          util.resetRefField(templateClone.sections[i].rows[j].fields, i, j);
        //      } 
        // }

        var updatingFields = [];
        updatingFields.push("removeSection");        

        dispatch({type: types.REMOVE_SECTION,templateClone,updatingFields});

    };

}
