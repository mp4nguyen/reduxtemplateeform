// import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';
// import transformEformData from '../../lib/transformEformData';


import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


export default function fetchEformTemplateFromServer(params){


    return dispatch => {

        connectToServerAt = new Date();

        console.log('eformActions.fetchEformTemplateFromServer is running; params = ',params);
        console.log('eformActions.fetchEformTemplateFromServer is running; connectToServerAt = ',connectToServerAt);

        //https://dev1.redimed.com.au:3065/eform/load-detail-eform
        var reqParam = {
            "uid": params.templateUID,//"e6b05150-4b5f-468d-ac9e-c456790bc0de",
            "UserUID": params.userUID,//"ddc9e298-227c-46c0-917b-a350bf9ede6c",
        };

        var radioGroups={};
        //store all calculate during input the value of the fields -> to speed up the process as no need to find the fields when calculating
        // var fieldsByName = {};
        // var fieldsByRef = {};
        // var trigerFields = {};

        // var otherEformDatas = {};//to store data of other eformdata
        // var eformDataFields = [];//to store all fields need data from orther eforms
        // var eformDataList = {};//to store eform name

       
        //postRequest('/eform/load-detail-eform',reqParam).then(eformResponse => {
        postRequest('/eformtemplate/detail',reqParam).then(eformResponse => {
            console.log(' eformResponse = ',eformResponse);

            var _userRole={};

            var template='';

            if(eformResponse && eformResponse.data && eformResponse.data.data && eformResponse.data.data.EFormTemplateData){
                // console.log('eformResponse.data.data.EFormTemplateData.TemplateData', eformResponse.data.data.EFormTemplateData.TemplateData);
                template = JSON.parse(eformResponse.data.data.EFormTemplateData.TemplateData);

                if (!template.hasOwnProperty("currentSectionIndex"))  {

                    if (template.sections) {
                        template["currentSectionIndex"] = template.sections.length;

                        for (var i = 0; i < template.sections.length; i++) {
                            template.sections[i]["isOpen"]=true;
                            template.sections[i]["roles"]={};
                            if (template.sections[i].rows && template.sections[i].rows.length > 0) {
                                template.sections[i]["currentRowIndex"]=template.sections[i].rows.length;
                                for (var j = 0; j < template.sections[i].rows.length; j++) {
                                    template.sections[i].rows[j]["roles"]={};
                                    if (template.sections[i].rows[j].fields && template.sections[i].rows[j].fields.length > 0) {
                                        template.sections[i].rows[j]["currentFieldIndex"]=template.sections[i].rows[j].fields.length;                                    
                                    }else{
                                        template.sections[i].rows[j]["currentFieldIndex"]=0;                                    
                                    }                                
                                }
                            }else{
                                template.sections[i]["currentRowIndex"]=0;
                            }
                        }    
                    }

                }

                if (!template.hasOwnProperty("roles"))  {
                    template["roles"] = {};
                }

                template.eformName = eformResponse.data.data.Name;
                template['arrViewRoleCode'] = [];
                template['arrEditRoleCode'] = [];
                template['listTemplate'] = [];
                // console.log('eformResponse',eformResponse);

                getRequest('/eformtemplate/getUserRoles').then(response => {
                    console.log('response', response);
                    var arrRole = response.data.data;
                    var arrViewRoleCode = [];
                    var arrEditRoleCode = [];
                    // var arrPrintRoleCode =[];

                    if (arrRole.length>0) {
                        for (var i = 0; i < arrRole.length; i++) {
                            arrViewRoleCode.push({'code':'view_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode});
                            arrEditRoleCode.push({'code':'edit_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode});
                            // arrPrintRoleCode.push({'code':'edit_'+arrRole[i].RoleCode, 'value':false, 'item': arrRole[i].RoleCode});
                        }    
                    }
                    
                    template.arrViewRoleCode = arrViewRoleCode;
                    template.arrEditRoleCode = arrEditRoleCode;
                    // template.arrEditRoleCode = arrPrintRoleCode;

                    

                    dispatch({type: types.FETCH_EFORM_TEMPLATE_FROM_SERVER,payload: template});                            

                });

                console.log('fetchEformTemplateFromServer >>> eformTemplateDataJSON: ',template);
                
            }

        });
    };
}
