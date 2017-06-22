
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';

function goClone (source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i=0; i<source.length; i++) {
            clone[i] = goClone(source[i]);
        }
        return clone;
    } else if (typeof(source)=="object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goClone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}

export default function copyRow(sectionID, rowIDOrigin, isLast){

    
    return (dispatch,getState)=>{

        var eform = getState().eform;

        var templateClone =  Object.assign({},eform.template);

        var section = templateClone.sections[sectionID];        
        
        var newRow = goClone(section.rows[rowIDOrigin]);

        console.log('newRow', newRow, sectionID, rowIDOrigin, isLast);

        if (isLast) {
            util.resetRefField(newRow.fields, sectionID, section.currentRowIndex);  
            section.rows.push(newRow); 
        }else{
            // util.resetRefField(newRow.fields, sectionID, rowIDOrigin + 1);  
            // section.rows.push(newRow); 

            var firstRowArr = section.rows.slice(0,rowIDOrigin + 1);

            // console.log('firstRowArr 1', firstRowArr);

            firstRowArr.push(newRow);

            // console.log('firstRowArr 2', firstRowArr);

            var secondRowArr = section.rows.slice(rowIDOrigin + 1, section.rows.length);

            // console.log('secondRowArr', secondRowArr);

            var totalArr = firstRowArr.concat(secondRowArr);

            section.rows=totalArr;

            // console.log('totalArr', totalArr, section.rows);

            // for (var i = 0; i < section.rows.length; i++) {
            //     util.resetRefField(section.rows[i].fields, sectionID, i);
            // }
        }

        section.currentRowIndex = section.currentRowIndex + 1        

        var updatingFields = [];
        // updatingFields.push("copyRow"); 
        updatingFields.push({sectionID,note:"copyRow",null});

        dispatch({type: types.ADD_ROW,templateClone,updatingFields});

    };

}
