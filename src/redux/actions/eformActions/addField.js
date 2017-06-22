
import * as types from '../../lib/types';

export default function addField(sectionID, rowID, _name, _type){

    // console.log('info >>>>', sectionID, rowID, _name, _type);
    
    return (dispatch,getState)=>{

        console.log('addField enter');
        var eform = getState().eform;

        var templateClone =  Object.assign({},eform.template);

        var section = templateClone.sections[sectionID]; 
        var row = templateClone.sections[sectionID].rows[rowID]; 
        var fields = templateClone.sections[sectionID].rows[rowID].fields;

        var indexSection = section.ref.split("_")[1];
        var indexRow = row.ref.split("_")[1];
        
        var _currentFieldIndex = row.currentFieldIndex;
        row.currentFieldIndex=row.currentFieldIndex+1;

        var _size=2;

        if (_name == "Label" || _name == "Checkbox" || _name == "Radio" || _name == "InputDate") {
            _size = 2;
        }else if(_name == "InputText"){
            _size = 4;
        }else if(_name == "Textarea" || _name == "Table" || _name == "LineChart" || _name == "RecChart"){
            _size = 12;
        }else if(_name == "ESignature" || _name == "ImageDoctor" || _name == "ImagePatient"){
            _size = 6;
        }else{
            _size = 2;
        }

        var _label = '';
        if (_name == "Label") {
            _label="New Label";
        }
       

        var newField = {
                        fieldPosition:  {
                                            fieldID: _currentFieldIndex,
                                            rowID: rowID,
                                            sectionID: sectionID
                                        },
                        preCal:'',
                        cal:'',
                        label:_label,
                        labelPrefix:'',
                        labelSuffix:'',
                        name:'',
                        value:null,
                        size: _size,

                        roles : {
                            edit : [
                                {id:1, ref:'edit_ADMIN', value:"yes"},
                                {id:2, ref:'edit_ASSISTANT', value:"yes"},
                                {id:3, ref:'edit_PATIENT', value:"yes"},
                                {id:4, ref:'edit_EXTERTAL_PRACTITIONER', value:"yes"},
                                {id:5, ref:'edit_INTERNAL_PRACTITIONER', value:"yes"},
                                {id:6, ref:'edit_ORGANIZATION', value:"yes"},
                            ],

                            view : {
                                list : [
                                    {id:1, ref:'view_ADMIN', value:"yes"},
                                    {id:2, ref:'view_ASSISTANT', value:"yes"},
                                    {id:3, ref:'view_PATIENT', value:"yes"},
                                    {id:4, ref:'view_EXTERTAL_PRACTITIONER', value:"yes"},
                                    {id:5, ref:'view_INTERNAL_PRACTITIONER', value:"yes"},
                                    {id:6, ref:'view_ORGANIZATION', value:"yes"},
                                ],

                                option : "hide" 
                            }
                        },

                        ref:"field_"+indexSection+"_"+indexRow+'_'+_currentFieldIndex,                        
                        type: _type                        
                    };        

        console.log('fields before',fields);                
        console.log('newField to add',newField); 
        fields.push(newField);
        console.log('fields after',fields); 
        console.log('section after',section); 

        var updatingFields = [];
        // updatingFields.push("addField"); 
        updatingFields.push({sectionID, rowID,null}); 

        dispatch({type: types.ADD_FIELD,templateClone,updatingFields});

    };

}

