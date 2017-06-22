import React, { Component } from 'react';
import * as _ from 'underscore'

import Table from '../../table/components/table';
import InputText from '../../fields/components/InputText';
import Label from '../../fields/components/Label';
import Radio from '../../fields/components/Radio';
import CheckBox from '../../fields/components/CheckBox';
import TextArea from '../../fields/components/TextArea';
import InputDate from '../../fields/components/InputDate';
import Signature from '../../fields/components/Signature';
import SignatureDoctor from '../../fields/components/SignatureDoctor';
import SignaturePatient from '../../fields/components/SignaturePatient';
import ChartLine from '../../fields/components/ChartLine';
import RecChart from '../../fields/components/RecChart';

import OrderPosition from './orderPosition.component';

import EditPermission from '../../home/containers/EditPermission.component';


export default class Row extends Component {

    static contextTypes = {
      updatingFields: React.PropTypes.array,
      removeRow: React.PropTypes.func,
      addField:React.PropTypes.func,
      orderRow:React.PropTypes.func,
      copyRow:React.PropTypes.func,
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array  
    }

    static propTypes = {
      fields: React.PropTypes.array,
      sectionID: React.PropTypes.number,
      rowID: React.PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {     
            open: false,
            openPermission: false
        }
    }

    componentDidMount(){       
        self=this;
                
        var id = "FieldList_"+this.props.sectionID+'_'+this.props.rowID;                    
        $('#'+ id + ' li').on('click', function(event){              
            self._onFieldClick(event.target.name) ;            
            event.stopPropagation();
        });
    }


    shouldComponentUpdate(nextProps,nextState,nextContext){
        //var startAt = new Date();
        
        var isUpdate = false;
        // if (    nextContext.updatingFields[0] == "removeSection" || nextContext.updatingFields[0] == "removeRow" || nextContext.updatingFields[0] == "orderRow"  
        //         || nextContext.updatingFields[0] == "copyRow" || nextContext.updatingFields[0] == "addField") {
        // console.log('vo update row 1',nextContext.updatingFields.note);            
        
        if (nextContext.updatingFields[0] == "removeSection" || nextContext.updatingFields[0] == "simplifyPermission"
            || nextContext.updatingFields[0] == "addField"){
            console.log('vo update row 222222', nextContext.updatingFields[0]);
            isUpdate = true;
        }else if (nextContext.updatingFields[0]) {
            if (nextContext.updatingFields[0].note == "removeRow" || nextContext.updatingFields[0].note == "orderRow" 
                || nextContext.updatingFields[0].note == "copyRow" ) {
                // console.log('vo update row 3',nextContext.updatingFields.note);
                isUpdate = true;
            }else{
                nextContext.updatingFields.forEach(f=>{
                    if(this.props.rowID == f.rowID){
                        isUpdate =  true;
                    }
                });
            }
        }else{
            nextContext.updatingFields.forEach(f=>{
                if(this.props.rowID == f.rowID){
                    isUpdate =  true;
                }
            });
        }

        if (isUpdate == false) {
            if(nextState.open != this.state.open){
                isUpdate = true;
            }
        }

        if (isUpdate == false) {
            if(nextState.openPermission != this.state.openPermission){
                isUpdate = true;
            }
        }
      
        return isUpdate;

    }

    _onFieldClick(_name) {
        
        var name=_name.split("_")[0];

        var type = '';
        if (name == "Label") {
            type='eform_input_check_label';
        }else if (name=="InputText"){
            type='eform_input_text';
        }else if (name=="ImageObject"){
            type='eform_input_image_object';
        }else if (name=="InputDate"){
            type='eform_input_date';
        }else if (name=="Textarea"){
            type='eform_input_textarea';
        }else if (name=="Checkbox"){
            type='eform_input_check_checkbox';
        }else if (name=="Radio"){
            type='eform_input_check_radio';
        }else if (name=="Table"){
            type='table';
        }else if (name=="ESignature"){
            type='eform_input_signature';
        }else if (name=="ImageDoctor"){
            type='eform_input_image_doctor';
        }else if (name=="ImagePatient"){
            type='eform_input_image_patient'; 
        }else if (name=="DynamicTable"){
            type='dynamic_table';
        }else if (name=="LineChart"){
            type='line_chart';
        }else if (name=="RecChart"){
            type='rec_chart';
        }else if (name=="ReloadDoctorInfo"){
            type='eform_button_reload_doctor';     
        }
        
        // this.context.addField(this.props.sectionID, this.props.rowID, name, type);
        this.context.addField(parseInt(_name.split("_")[1]), parseInt(_name.split("_")[2]), name, type);
    }

    _onRemoveRow() {
        this.context.removeRow(this.props.sectionID, this.props.rowID);
    }

    _onCopyRow(isLast) {
        this.context.copyRow(this.props.sectionID, this.props.rowID, isLast);
    }

    _handleOpen(){
        console.log('_handleOpen enter');
        this.setState({open: true});
    }

    _handleClose(valueOrder, isSubmit){
        if (isSubmit) {
            this.context.orderRow(this.props.sectionID, this.props.rowID, valueOrder);  
        }
        
        this.setState({open: false});
    }

    _handleOpenPermission(){
      console.log('vvvvv1');
      this.setState({openPermission: true});
    };
    
    _handleClosePermission(){
      this.setState({openPermission: false});
    };

    render() {

       

        console.log('this.context.arrViewRoleCode >>>> ', this.context.arrViewRoleCode);
        console.log('this.props.arrViewRoleCode >>>> ', this.props.arrViewRoleCode);
        return (
            <div>
                <OrderPosition isOpen={this.state.open} closeDialog={this._handleClose.bind(this)} sectionID={this.props.sectionID} originID={this.props.rowID} />
                <EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type='row' 
                                roles = {this.props.roles} sectionID = {this.props.sectionID} rowID = {this.props.rowID} 
                                arrViewRoleCode = {this.context.arrViewRoleCode} arrEditRoleCode={this.context.arrEditRoleCode}/>
                <div className="col-md-12 dragRow">
                    <div className="portlet light" >
                        <div className="portlet-title">
                            <div className="caption"/> 
                                <div className="tools">
                                    <a className="collapse"></a>
                                </div>
                                <div className="actions">
                                    <div className="btn-group">
                                    <a className="btn btn-default btn-sm" data-toggle="dropdown" >
                                        Add Field
                                        <i className="fa fa-angle-down"></i>
                                    </a>

                                    <ul className="dropdown-menu" id={"FieldList_"+this.props.sectionID+'_'+this.props.rowID}>                                                                                       
                                            <li>
                                                <a name={"Label"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Label
                                                </a>
                                            </li>  
                                            <li>
                                                <a name={"InputText"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Input Text
                                                </a>
                                            </li>                                           
                                            <li>
                                                <a name={"InputDate"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Input Date
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"Checkbox"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Checkbox
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"Radio"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Radio
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"Textarea"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Textarea
                                                </a>
                                            </li>                                                                                        
                                            <li>
                                                <a name={"ESignature"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    E-Signature
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"ImageDoctor"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Image Doctor
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"ImagePatient"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Image Patient
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"ImageObject"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Image Object
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"Table"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Table
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"DynamicTable"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Dynamic Table
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"LineChart"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Line Chart
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"RecChart"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Rec Chart
                                                </a>
                                            </li>
                                            <li>
                                                <a name={"ReloadDoctorInfo"+'_'+this.props.sectionID+'_'+this.props.rowID}>
                                                    Reload Doctor Info
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    &nbsp;
                                    <div className="btn-group">

                                        <a className="btn btn-default btn-sm" data-toggle="dropdown">
                                            Action&nbsp;
                                            <i className="fa fa-angle-down"></i>
                                        </a>
                                        <ul className="dropdown-menu pull-right">
                                            <li>
                                                <a>
                                                    <input type="text" ref="tempRef" readOnly defaultValue={this.props.refName}/>
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={this._handleOpen.bind(this)} >
                                                    <i className="fa fa-plus"></i> Order Row
                                                </a>
                                            </li>                                          
                                            <li>
                                                <a onClick={this._onCopyRow.bind(this,true)}>
                                                    <i className="fa fa-plus"></i> Copy Row To Last
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={this._onCopyRow.bind(this,false)}>
                                                    <i className="fa fa-plus"></i> Double Row
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={this._onRemoveRow.bind(this)}>
                                                    <i className="fa fa-trash-o"></i> Remove Row
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={this._handleOpenPermission.bind(this)}>
                                                    <i className="fa fa-pencil"></i> Set Permission
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        <div className="row">

                          {
                              this.props.fields.map((field,index)=>{
                                
                                var groupId = 'fieldgroup_'+this.props.codeSection+'_'+this.props.code+'_'+index;
                                if(field.type === 'eform_input_text'){
                                   
                                    return <InputText
                                            key={index}
                                            name={field.name}
                                            refName={field.ref}
                                            size={field.size}
                                            labelPrefix={field.labelPrefix}
                                            labelSuffix={field.labelSuffix}
                                            roles={field.roles}
                                            userRole = {this.props.userRole}
                                            preCal={field.preCal}
                                            cal={field.cal}
                                            value={field.value}
                                            required={field.required}
                                            isDisabled={field.isDisabled}
                                            isVisible={field.isVisible}
                                            fieldID={index}
                                            rowID={this.props.rowID}
                                            sectionID={this.props.sectionID}
                                            field={field}
                                        />
                                }else if(field.type === 'eform_input_check_label'){
                                    return <Label
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                size={field.size}
                                                code={index}
                                                label={field.label}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />

                                }else if(field.type === 'eform_input_check_label_html'){
                                    return <Label
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                size={field.size}
                                                code={index}
                                                label={field.label}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_check_radio'){
                                    return <Radio
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                ref={field.ref}
                                                size={field.size}                                        
                                                refTemp={field.ref}
                                                code={index}
                                                label={field.label}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                preCal={field.preCal}
                                                cal={field.cal}
                                                value={field.value}
                                                checked={field.checked}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_check_checkbox'){
                                    
                                    return <CheckBox
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                ref={field.ref}
                                                size={field.size}                                        
                                                refTemp={field.ref}
                                                code={index}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                checked= {field.checked}
                                                preCal={field.preCal}
                                                cal={field.cal}
                                                value={field.value}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                label={field.label}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_textarea'){
                                    return <TextArea
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                ref={field.ref}
                                                size={field.size}
                                                permission={this.props.permission}                                        
                                                refTemp={field.ref}
                                                code={index}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                preCal={field.preCal}
                                                cal={field.cal}
                                                value={field.value}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                rows={field.rows}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />

                                }else if(field.type === 'eform_input_date'){
                                    return <InputDate
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                refTemp={field.ref}
                                                code={index}
                                                preCal={field.preCal}
                                                cal={field.cal}
                                                value = {field.value}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_signature'){
                                    return <Signature
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                refTemp={field.ref}
                                                code={index}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                height={field.height}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                value = {field.value}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_image_doctor'){
                                    return <SignatureDoctor
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                refTemp={field.ref}
                                                code={index}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                height={field.height}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'eform_input_image_patient'){
                                    return <SignaturePatient
                                                key={index}
                                                type={field.type}
                                                groupId={groupId}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                refTemp={field.ref}
                                                code={index}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                isDisabled={field.isDisabled}
                                                isVisible={field.isVisible}
                                                height={field.height}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'table'){
                                    return <Table
                                                key={index}
                                                type={field.type}
                                                ref={field.ref}
                                                roles={field.roles}
                                                content={field.content}
                                                tableHeader={field.tableHeader}
                                                tableData={field.tableData}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />
                                }else if(field.type === 'line_chart'){
                                            return <ChartLine
                                                key={index}
                                                type={field.type}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                refTemp={field.ref}
                                                axisX={field.axisX}
                                                series={field.series}
                                                title={field.title}
                                                subtitle={field.subtitle}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />

                                }
                                else if(field.type === 'rec_chart'){
                                            return <RecChart
                                                key={index}
                                                type={field.type}
                                                name={field.name}
                                                size={field.size}
                                                ref={field.ref}
                                                refTemp={field.ref}
                                                axisX={field.axisX}
                                                series={field.series}
                                                title={field.title}
                                                subtitle={field.subtitle}
                                                roles={field.roles}
                                                userRole = {this.props.userRole}
                                                fieldID={index}
                                                rowID={this.props.rowID}
                                                sectionID={this.props.sectionID}
                                                field={field}
                                                />

                                }
                                else{
                                  return <div key={index}/>
                                }

                              },this)
                          }
                        </div>
                
                    </div>
                </div>
            </div>


                )
    }
}


//{this.renderRows()}


