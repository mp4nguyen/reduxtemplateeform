
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

export default function orderSection(sectionID, valueOrder){

    console.log('valueOrder enter ', valueOrder);

    return (dispatch,getState)=>{

        var eform = getState().eform;
        var templateClone =  Object.assign({},eform.template);

        var section = goClone(templateClone.sections[sectionID]);   

        templateClone.sections.splice(sectionID,1);         

        var sectionArr = templateClone.sections;
        
        var firstSectionArr = sectionArr.slice(0,valueOrder);        

        // console.log('firstSectionArr 1 ', sectionID, valueOrder);

        firstSectionArr.push(section);

        // console.log('firstSectionArr 2 ', firstSectionArr);

        var secondSectionArr = sectionArr.slice(valueOrder, sectionArr.length);

        // console.log('secondSectionArr', secondSectionArr);

        var totalArr = firstSectionArr.concat(secondSectionArr);
        // console.log('totalArr', totalArr);

        templateClone.sections = totalArr;

        // for (var i = valueOrder; i < templateClone.sections.length; i++) {
        //     for (var j = 0; j < templateClone.sections[i].rows.length; j++) {
        //          templateClone.sections[i].rows[j].ref = 'row_'+i+'_'+j;
        //          util.resetRefField(templateClone.sections[i].rows[j].fields, i, j);
        //      } 
        // }
    
        var updatingFields = [];

        // updatingFields.push({sectionID,rowID:null,fieldID:null,value:""});
        updatingFields.push("orderSection");

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});

    };

}

