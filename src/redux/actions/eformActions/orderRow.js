
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';

export default function orderRow(sectionID, rowID, valueOrder){

    return (dispatch,getState)=>{

        var eform = getState().eform;
        var templateClone =  Object.assign({},eform.template);

        var row = util.getRow(templateClone,{sectionID,rowID,null});   

        templateClone.sections[sectionID].rows.splice(rowID,1);         

        var rowArr = templateClone.sections[sectionID].rows;
        
        var firstRowArr = rowArr.slice(0,valueOrder);

        firstRowArr.push(row);

        // console.log('firstRowArr', firstRowArr);

        var secondRowArr = rowArr.slice(valueOrder, rowArr.length);

        // console.log('secondRowArr', secondRowArr);

        var totalArr = firstRowArr.concat(secondRowArr);
        // console.log('totalArr', totalArr);

        // for (var i = 0; i < totalArr.length; i++) {
        // 	util.resetRefField(totalArr[i].fields, sectionID, i);
        // }
        

        templateClone.sections[sectionID].rows = totalArr;

        var updatingFields = [];

        // updatingFields.push({sectionID,rowID:null,fieldID:null,value:""});
        updatingFields.push({sectionID,note:"orderRow",null});


        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}
