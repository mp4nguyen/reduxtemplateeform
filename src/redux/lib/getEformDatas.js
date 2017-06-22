import {postRequest} from './request';
import * as util from './utilities';

var getOtherEformDatas = function(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas){
    if(eformDataArray.length > eformDataArrayIndex){
        var eformDataObject = eformDataArray[eformDataArrayIndex];
        var reqParam = {
                          "data": {
                            "templateID": eformDataObject.eformTemplateID,
                            "appointmentID": appointmentId
                          }
                        };
                        reqParam

        console.log("eformActions: reqParam = ",reqParam);
        postRequest('/eform/get-eform-data',reqParam).then(eformDataResponse => {
            console.log("eformActions: eformDataResponse = ",eformDataResponse);
            if(eformDataResponse.data && eformDataResponse.data.data && eformDataResponse.data.data.FormData){
                otherEformDatas[eformDataObject.eformName] = util.convertEformDataStringToObjectByName(eformDataResponse.data.data.FormData);
            }
            eformDataArrayIndex++;
            getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId)
        });
    }else{
        resolve('FINISH');
    }
};

export default function(eformDataList,appointmentId,otherEformDatas){

    var propValue;
    var eformDataArray = [];
    var eformDataArrayIndex = 0;
    for(var propName in eformDataList) {
        propValue = eformDataList[propName]
        console.log(propName,propValue);
        eformDataArray.push(propValue);
    }

    return new Promise((resolve,reject)=>{
        getOtherEformDatas(resolve,reject,eformDataArray,eformDataArrayIndex,appointmentId,otherEformDatas)
    });
}
