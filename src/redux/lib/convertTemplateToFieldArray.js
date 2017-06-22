import moment from 'moment';
import clone from 'clone';
import * as util from './utilities';
import eformFuncs from './eformfuncs';

export default function ConvertTemplateToFieldArray(template,isPrint) {

  var startAt = new Date();
  var fields = [];
  for(var section_index = 0; section_index < template.sections.length; section_index++){
      var section = template.sections[section_index];
      var isSaveSection = true;
      //console.log(" * transformEformData: section = ",section);

      if(section.viewType == 'dynamic'){
          if(section.isShow){
              var pureField = {
                                ref: section.ref,
                                isShow: section.isShow,
                                checked: null,
                                name: section.name,
                                type: 'section',
                                value: null,
                                moduleID: section.moduleID,
                                roles: section.roles
                              };
              fields.push(pureField);
          }else{
              var isSaveSection = false;
          }
      }else{
          fields.push({
                        ref: section.ref,
                        isComplete: section.isComplete,
                        isOpen: section.isOpen,
                        checked: null,
                        name: section.name,
                        type: 'section',
                        value: null,
                        moduleID: section.moduleID,
                        roles: section.roles
                      });
      }

      for(var row_index = 0; row_index < section.rows.length && isSaveSection ; row_index++){
          var row = section.rows[row_index];
          //console.log("    - transformEformData: row = ",row);
          for(var field_index = 0; field_index < row.fields.length; field_index++){

              var field = row.fields[field_index];

              if(field.type == "eform_input_text" ||
                    field.type == "eform_input_check_radio" ||
                    field.type == "eform_input_check_checkbox" ||
                    field.type == "eform_input_textarea" ||
                    field.type == "eform_input_date"
                  ){
                  var pureField = {
                                    checked: field.checked,
                                    name: field.name,
                                    ref: field.ref,
                                    type: field.type,
                                    value: field.value,
                                    moduleID: section.moduleID
                                  };
                  fields.push(pureField);
              }else if(field.type == "eform_input_signature"){

                var pureField = {
                                  checked: field.checked,
                                  name: field.name,
                                  ref: field.ref,
                                  type: field.type,
                                  value: isPrint?null:field.value,
                                  base64Data: isPrint? (field.value ? field.value.sub:null) :null,
                                  moduleID: section.moduleID
                                };
                fields.push(pureField);
              }else if(field.type == "table"){
                  if(field.tableData){
                      field.tableData.forEach(row=>{
                          row.forEach(col=>{
                              var pureField = {
                                                refChild: col.refChild,
                                                value: col.value,
                                                type: col.type,
                                                typeChild: col.typeChild,
                                                ref: col.ref,
                                                name: col.name,
                                                moduleID: section.moduleID
                                              };
                              fields.push(pureField);
                          });
                      });
                  }
              }else if(field.type == "line_chart" || field.type == "rec_chart" ){

                    console.log('field.type >>>',field.type);
                    console.log('field >>>',field);

                    var pureField = {
                                      ref: field.ref,
                                      type: field.type,
                                      name: field.name,
                                      series : field.series,
                                      moduleID: section.moduleID,
                                      value: isPrint?null:'',
                                      base64Data: isPrint? (field.image ? field.image:null) :null,
                                    };
                    fields.push(pureField);
                    if (isPrint) {
                      if (field.type == "line_chart") {
                        var pureFieldHeader = {
                                          ref: field.ref,
                                          type: field.type,
                                          name: 'chart_base64_image_1',
                                          series : field.series,
                                          moduleID: section.moduleID,
                                          value: isPrint?null:'',
                                          base64Data: isPrint? (field.headerImage ? field.headerImage:null) :null,
                                        };
                        fields.push(pureFieldHeader);
                      }
                    }
              }
          }
      }//End for of rows



  }//end for of sections

  console.log('----------------------------------->Conver time = ',(new Date() - startAt),' ms <------------------------------');
  return fields;

}
