import {
        FETCH_PARAMS_FROM_URL,
        FETCH_EFORM_TEMPLATE_FROM_SERVER,
        FETCH_USER_ROLE_FROM_SERVER,
        UPDATE_FIELD,
        ADD_SECTION,
        REMOVE_SECTION,
        DOUBLE_SECTION,
        ADD_ROW,
        REMOVE_ROW,
        ADD_FIELD,
        REMOVE_TEMPLATE,
        GET_LIST_TEMPLATE_FROM_SERVER
      } from '../lib/types';

import clone from 'clone';
import HashMap from 'hashmap'
import * as util from '../lib/utilities';
import eformFuncs from '../lib/eformfuncs';

var peform = {
              template:{},
              updatingFields:[],
              params:{}
            };


let eformReducer = function(eform = peform,action){
  switch(action.type){
    case FETCH_PARAMS_FROM_URL:
      return Object.assign({},eform,{params: action.payload});
    case FETCH_EFORM_TEMPLATE_FROM_SERVER:
      //store all radioGroups to control set check in each group -> to speed up the process as no need to find the fields in the same group
      return Object.assign({},eform,{template: action.payload});
    case GET_LIST_TEMPLATE_FROM_SERVER:    
      return Object.assign({},eform,{template: action.payload});
    case UPDATE_FIELD:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    case ADD_SECTION:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: []});
    case REMOVE_SECTION:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    case DOUBLE_SECTION:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});      
    case ADD_ROW:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    case REMOVE_ROW:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    case ADD_FIELD:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    case REMOVE_TEMPLATE:
      return Object.assign({},eform,{template: action.templateClone, updatingFields: action.updatingFields});
    default:
      console.log('----------default return value');
      return eform;
  }
}

export default eformReducer;
