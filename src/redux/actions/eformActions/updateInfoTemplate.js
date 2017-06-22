
import * as types from '../../lib/types';

export default function updateInfoTemplate(templateID, data){

    return (dispatch,getState)=>{

        console.log('data updateInfoTemplate',data);

        var templateClone = getState().eform.template;
        var updatingFields = [];
        
        
        for (var i = 0; i < templateClone.listTemplate.length; i++) {
            if (templateClone.listTemplate[i].ID == templateID) {
                templateClone.listTemplate[i].Name = data.Name;
                templateClone.listTemplate[i].PrintType = data.PrintType;

                var _roles = data.Roles;
                console.log('_roles>>>>', _roles);
                for (var j = 0; j < _roles.length; j++) {                
                    templateClone.listTemplate[i].Roles[j].RelEFormTemplateRole.Edit = _roles[j].RelEFormTemplateRole.Edit;
                    templateClone.listTemplate[i].Roles[j].RelEFormTemplateRole.View = _roles[j].RelEFormTemplateRole.View;
                    templateClone.listTemplate[i].Roles[j].RelEFormTemplateRole.Print = _roles[j].RelEFormTemplateRole.Print;                    
                }

                break;
            } 
        }    

        updatingFields.push({templateID});

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
    };

}
