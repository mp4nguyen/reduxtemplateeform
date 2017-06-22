
import * as types from '../../lib/types';
import * as util from '../../lib/utilities';
import {printRequest,postRequest,getRequest} from '../../lib/request';

export default function createTemplate(dataTemplate){

    return (dispatch,getState)=>{

        postRequest('/eformtemplate/create',{name:dataTemplate, userUID: "f88209a6-d0ba-49fa-b1e9-cbb37a9e4108"}).then(responseCreate => {    
            getRequest('/eformtemplate/listTemplate').then(responseList => {                                        
                console.log('list after create new template', responseList);

                dispatch({type: types.GET_LIST_TEMPLATE_FROM_SERVER,payload: responseList.data.data});

            },function(err){
                console.log('err',err);
            });               
        },function(err){
            console.log('err create Template',err)
        });    
    };

}
