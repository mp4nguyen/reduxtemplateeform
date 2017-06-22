
import * as types from '../../lib/types';

export default function addRow(sectionID){

    
    return (dispatch,getState)=>{

        var eform = getState().eform;

        var templateClone =  Object.assign({},eform.template);

        var section = templateClone.sections[sectionID];
        var sectionRef=section.ref;
        var arrObj = sectionRef.split("_");
        var _currentRowIndex = section.currentRowIndex;
        section.currentRowIndex=section.currentRowIndex+1;

        var newRow = {
                        currentFieldIndex:0,                        
                        ref:"row_"+ arrObj[1]+"_"+_currentRowIndex,
                        size:12,
                        type:"row",
                        fields:[]
        };        

        section.rows.push(newRow);

        var updatingFields = [];
        updatingFields.push({sectionID,null,null}); 

        dispatch({type: types.ADD_ROW,templateClone,updatingFields});

    };

}
