import calculatingEform from '../../lib/calculatingEform';
import ConvertTemplateToFieldArray from '../../lib/ConvertTemplateToFieldArray';

import * as util from '../../lib/utilities';
import * as types from '../../lib/types';
import {printRequest,postRequest,getRequest} from '../../lib/request';


var connectToServerAt;
var startEditAt;


/*
  the timer is used to save the data of the users after 2' user stop typing
*/
var timer;
var startTimer = function(getState){
    clearTimeout(timer);
    timer = setTimeout(()=>{

        console.log('start timer...............................................');
        var eform = getState().eform;
        console.log('eform.template save', eform.template);
        var content = JSON.stringify(ConvertTemplateToFieldArray(eform.template));

        postRequest('/eform/update2',{data:{ID: eform.params.EFormDataID, userUID: eform.params.userUID, content: content}}).then(eformData => {
            // console.log('eformActions.saveEform: eformData = ',eformData);
            // console.log('----------------------------------->Save time = ',(new Date() - saveStartAt),' ms <------------------------------');

        });


    }, 2000);
};
var stopTimer = function(){
    clearTimeout(timer);
};

export default function onMyBlur(){
    console.log('onblur is running...... timer = ',timer);
    return (dispatch,getState)=>{};
}
