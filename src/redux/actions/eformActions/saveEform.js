import {toastr} from 'react-redux-toastr'

import ConvertTemplateToFieldArray from '../../lib/convertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;

export default function saveEform(params){
    console.log('eformActions.saveEform: is running ...... ');

    return (dispatch,getState)=>{
        var eform = getState().eform;
        // var saveStartAt = new Date();

        console.log('eform.template save', eform.template);

        var content = JSON.stringify(eform.template);

        console.log('eformActions.saveEform: content = ',content);
        console.log('params = ',params);

        // "uid": params.templateUID,//"e6b05150-4b5f-468d-ac9e-c456790bc0de",
        // "UserUID": params.userUID,//"ddc9e298-227c-46c0-917b-a350bf9ede6c",

        
        postRequest('/eformtemplate/save',{ uid: params.templateUID, content: content, userUID: params.userUID }).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');
            toastr.success('Saved successfully !')
        });
    };
}
