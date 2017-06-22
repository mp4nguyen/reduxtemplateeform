
import * as types from '../../lib/types';


export default function addSection(section){

    // console.log('addSection: will add new section in to the template: ',section);
    return (dispatch,getState)=>{

        var eform = getState().eform;

        var templateClone =  Object.assign({},eform.template);

        console.log('updateSection >>> templateClone', templateClone);

        if (!templateClone.currentSectionIndex || templateClone.currentSectionIndex == 'NaN') {    
            templateClone["currentSectionIndex"]=1;
            templateClone["sections"]=[];
        }

        console.log('updateSection 1 >>> templateClone', templateClone);

        var _currentSectionIndex = templateClone.currentSectionIndex;
        templateClone.currentSectionIndex=templateClone.currentSectionIndex+1;

        var newSection = {
                        isComplete:false,
                        isOpen:true,
                        name: section.name,
                        page:1,
                        ref:"section_"+ _currentSectionIndex,
                        rows:[]
        };

        // console.log('add Section: newSection = ',newSection);

        templateClone.sections.push(newSection);

        dispatch({type: types.ADD_SECTION,templateClone});

    };

}
