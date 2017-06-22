
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';

export default function removeRow(sectionID, rowID){

    return (dispatch,getState)=>{

        var eform = getState().eform;
       
        var templateClone =  Object.assign({},eform.template);

        var section = templateClone.sections[sectionID];

        section.rows.splice(rowID,1);

        // for (var i = 0; i < section.rows.length; i++) {
        // 	util.resetRefField(section.rows[i].fields, sectionID, i);
        // }

        var updatingFields = [];
        // updatingFields.push("removeRow");        
        updatingFields.push({sectionID,note:"removeRow",null});

        dispatch({type: types.REMOVE_ROW,templateClone,updatingFields});

    };

}
