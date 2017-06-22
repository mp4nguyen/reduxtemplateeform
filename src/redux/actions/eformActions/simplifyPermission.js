import {toastr} from 'react-redux-toastr'
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';
import diff from 'deep-diff';


var connectToServerAt;
var startEditAt;


export default function simplifyPermission(sectionID, rowID, fieldID, fieldParam, isDelete, orderField, valueOrder){
    
    return (dispatch,getState)=>{
        
        var eform = getState().eform;
        var updatingFields = [];
        var templateClone =  Object.assign({},eform.template);
        var sections = templateClone.sections;
        
        for (var i = 0; i < sections.length; i++) {
            var rows = sections[i].rows;
            for (var j = 0; j < rows.length; j++) {
                var fields = rows[j].fields;
                var mainRoles = {};
                if (fields.length>0) {

                    for (var f = 0; f < fields.length; f++) {
                        if(fields[f].type == 'eform_input_check_label') {
                           delete fields[f]['roles'];
                        }
                    }    

                    for (var k = 0; k < fields.length; k++) {
                        
                        var isDifferent = 0;
                        if (fields[k].roles && fields[k].roles.view && fields[k].roles.view.list && fields[k].roles.edit) {
                            mainRoles = fields[k].roles;
                            for (var m = k+1; m < fields.length; m++) {
                                if (fields[m].roles && fields[m].roles.view && fields[m].roles.view.list && fields[m].roles.edit) {
                                    if (fields[m].type !='eform_input_check_label') {
                                        var differentValue = null;
                                        differentValue = diff(mainRoles, fields[m].roles);
                                        if (differentValue) {                                                                            
                                            isDifferent =1;
                                            break;
                                        }
                                    }
                                }                                
                            }
                            if (isDifferent == 0) {
                                rows[j].roles = mainRoles;
                                for (var n = 0; n < fields.length; n++) {
                                    delete fields[n]['roles'];
                                }
                            }else{
                                delete rows[j]['roles'];
                            }
                            break;
                        }    
                    
                    }   

                                
                }                                                
            }            
        }

        for (var i = 0; i < sections.length; i++) {
            rows = sections[i].rows;
            var mainRoles = {};
            if (rows.length>0) {
                console.log('rows.length >>>>', rows.length);
                for (var k = 0; k < rows.length; k++) {
                    
                    var isDifferent = 0;
                    if (rows[k].roles && rows[k].roles.view && rows[k].roles.view.list && rows[k].roles.edit) {
                        mainRoles = rows[k].roles;
                        if (rows.length > 1) {
                            for (var m = k+1; m < rows.length; m++) {
                                if (rows[m].roles && rows[m].roles.view && rows[m].roles.view.list && rows[m].roles.edit) {
                                    var differentValue = null;
                                    differentValue = diff(mainRoles, rows[m].roles);
                                    if (differentValue) {                                                                            
                                        isDifferent =1;
                                        break;
                                    }
                                }                                
                            }
                            if (isDifferent == 0) {
                                
                                if (sections[i].roles) {
                                    sections[i].roles = mainRoles;    
                                }else{
                                    sections[i]["roles"] = mainRoles;    
                                }

                                for (var n = 0; n < rows.length; n++) {
                                    delete rows[n]['roles'];
                                }
                            }else{
                                delete sections[i]['roles'];
                            }
                            break;    
                        }else{
                            console.log('vo vo vo mainRoles', mainRoles, 'i>>',i, 'sections[i]',sections[i], 'rows[k]',rows[k], 'k>>>', k);
                            
                            if (sections[i].roles) {
                                console.log('vo if 1');
                                sections[i].roles = mainRoles;    
                            }else{
                                console.log('vo if 2');
                                sections[0]['roles'] = mainRoles;    
                            }
                            
                            delete rows[0]['roles'];
                            console.log('sections[i] 2', sections[i], 'i 2>>',i, 'rows[k] 2',rows[k], 'k 2>>>', k);
                        }
                        
                    }    
                
                }                    
            }              
        }

        for (var k = 0; k < sections.length; k++) {
            var isDifferent = 0;
            var mainRoles = {};
            if (sections[k].roles && sections[k].roles.view && sections[k].roles.view.list && sections[k].roles.edit) {
                mainRoles = sections[k].roles;
                for (var m = k+1; m < sections.length; m++) {
                    if (sections[m].roles && sections[m].roles.view && sections[m].roles.view.list && sections[m].roles.edit) {
                        var differentValue = null;
                        differentValue = diff(mainRoles, sections[m].roles);
                        if (differentValue) {                                                                            
                            isDifferent =1;
                            break;
                        }
                    }                                
                }
                if (isDifferent == 0) {
                    templateClone.roles = mainRoles;
                    for (var n = 0; n < sections.length; n++) {
                        delete sections[n]['roles'];
                    }
                }else{
                    if (!templateClone.roles) {
                        delete templateClone['roles'];    
                    }                    
                }
                break;
            }    
        }
    
        updatingFields.push("simplifyPermission");

        toastr.success('Executed successfully !')

        dispatch({type: types.UPDATE_FIELD,templateClone,updatingFields});
    };
    


}
