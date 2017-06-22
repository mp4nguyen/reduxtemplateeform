
import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function getListEformTemplateFromServer(params){


    return dispatch => {

        var template={};
        template['arrViewRoleCode'] = [];
        template['arrEditRoleCode'] = [];
        template['listTemplate'] = [];

        getRequest('/eformtemplate/getUserRoles').then(response => {
            console.log('response', response);
            var arrRole = response.data.data;
            var arrViewRoleCode = [];
            var arrEditRoleCode = [];
            var arrPrintRoleCode =[];

            if (arrRole.length>0) {
                for (var i = 0; i < arrRole.length; i++) {
                    arrViewRoleCode.push({'code':'view_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode, 'ID': arrRole[i].ID});
                    arrEditRoleCode.push({'code':'edit_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode, 'ID': arrRole[i].ID});
                    arrPrintRoleCode.push({'code':'print_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode, 'ID': arrRole[i].ID});
                }    
            }
            
            template.arrViewRoleCode = arrViewRoleCode;
            template.arrEditRoleCode = arrEditRoleCode;
            template.arrPrintRoleCode = arrPrintRoleCode;

            getRequest('/eformtemplate/listTemplate').then(responseList => {                    
                console.log("formlist._serverListForm ===============> response = ",responseList);

                template.listTemplate = responseList.data.data;

                console.log('template after get list', template);

                dispatch({type: types.GET_LIST_TEMPLATE_FROM_SERVER,payload: template});

            },function(err){
                console.log('err',err);
            });               
            
        });

        console.log('getListEformTemplateFromServer >>> : ',template);
                
            
    };
}
