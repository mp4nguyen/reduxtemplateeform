
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

export default function doubleSection(sectionIDOrigin){

    
    return (dispatch,getState)=>{

        var eform = getState().eform;

        var templateClone =  Object.assign({},eform.template);

        var section = templateClone.sections[sectionIDOrigin];        
        
        var newSection = goClone(section);

        console.log('newSection', newSection, sectionIDOrigin);
        
        var firstSectionArr = templateClone.sections.slice(0,sectionIDOrigin + 1);

        console.log('firstSectionArr 1', firstSectionArr);

        firstSectionArr.push(newSection);

        console.log('firstSectionArr 2', firstSectionArr);

        var secondSectionArr = templateClone.sections.slice(sectionIDOrigin + 1, templateClone.sections.length);

        console.log('secondRowArr', secondSectionArr);

        var totalArr = firstSectionArr.concat(secondSectionArr);

        templateClone.sections=totalArr;

        console.log('totalArr', totalArr, templateClone.sections);

        // for (var i = sectionIDOrigin + 1; i < templateClone.sections.length; i++) {
        //     for (var j = 0; j < templateClone.sections[i].rows.length; j++) {
        //          templateClone.sections[i].rows[j].ref = 'row_'+i+'_'+j;
        //          util.resetRefField(templateClone.sections[i].rows[j].fields, i, j);
        //      } 
        // }

        templateClone.currentSectionIndex = templateClone.currentSectionIndex + 1        

        var updatingFields = [];
        updatingFields.push("doubleSection"); 

        dispatch({type: types.ADD_ROW,templateClone,updatingFields});

    };

}
