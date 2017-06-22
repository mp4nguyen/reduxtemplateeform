import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

import * as _ from 'underscore';
import Row from '../../row/components/row';
import NewOrEditSection from './newOrEditSection.component';

import EditPermission from '../../home/containers/EditPermission.component';

import OrderPosition from '../../row/components/orderPosition.component';

import {postRequest,getRequest} from '../../redux/lib/request';
import {toastr} from 'react-redux-toastr'

export default class Section extends Component {

    static contextTypes = {
      updatingFields: React.PropTypes.array,
      updateSection: React.PropTypes.func,
      removeSection: React.PropTypes.func,
      addRow:React.PropTypes.func,
      doubleSection:React.PropTypes.func,
      orderSection:React.PropTypes.func,
      pasteSection:React.PropTypes.func
    }

    static propTypes = {
      rows: React.PropTypes.array,
      sectionID: React.PropTypes.number,
      name: React.PropTypes.string,
      code: React.PropTypes.number,
      viewType: React.PropTypes.string,
      isShow:  React.PropTypes.bool,
      userRole: React.PropTypes.object,
      isOpen: React.PropTypes.bool,
      isComplete: React.PropTypes.bool,
      showOpenCloseSection: React.PropTypes.string,
      defaultOpenCloseSection: React.PropTypes.string,
      section: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isComplete: false,
            open: false,
            openOrder: false,
            openPermission: false
        }
    }

    shouldComponentUpdate(nextProps,nextState,nextContext){
        //only update section that have the updated field
        //by checking sectionID
        //var startAt = new Date();
        // console.log(' section nextContext.updatingFields = ',nextContext.updatingFields);
        // console.log(' section nextProps = ',nextProps.sectionID, nextProps.section);
        // console.log(' section this props = ',this.props.sectionID, this.props.section);
        var isUpdate = false;
        if (nextContext.updatingFields) {
          // if (  nextContext.updatingFields[0] == "removeSection" || nextContext.updatingFields[0] == "addRow" || nextContext.updatingFields[0] == "orderRow"
          //       || nextContext.updatingFields[0] == "removeRow" || nextContext.updatingFields[0] == "copyRow" || nextContext.updatingFields[0] == "addField"
          //       || nextContext.updatingFields[0] == "doubleSection" || nextContext.updatingFields[0] == "orderSection"
          //     ) {
          if (  nextContext.updatingFields[0] == "removeSection" 
                || nextContext.updatingFields[0] == "doubleSection" || nextContext.updatingFields[0] == "orderSection" 
                || nextContext.updatingFields[0] == "simplifyPermission" || nextContext.updatingFields[0] == "addField"
            ) {
            isUpdate = true;
          }else{
            console.log('nextContext.updatingFields', nextContext.updatingFields);
            nextContext.updatingFields.forEach(f=>{
                if(this.props.sectionID == f.sectionID){
                    console.log('vo update section');
                    isUpdate =  true;
                }
            });
          }
        }       

        if (isUpdate == false) {
          if(nextState.open != this.state.open){
            isUpdate = true;
          }
          if(nextState.openOrder != this.state.openOrder){
            isUpdate = true;
          }
          if(nextState.openPermission != this.state.openPermission){
            isUpdate = true;
          }
        }

        return isUpdate;

    }



    _calShowRow() {
        let isShowRow = false;
        if (this.props.isOpen == false ) {
          isShowRow = false
        } else if (this.props.isOpen == true) {
          isShowRow = true
        } else if (this.props.isOpen == undefined) {
          isShowRow = false
        }
        return isShowRow
    }

    _showhideButtons(){
        //Only hide OpenClose button if it is forced to NO
        let isShowRow = this._calShowRow();

        return (
          <div><i className={ isShowRow ?'fa fa-minus':'fa fa-plus'}></i> { isShowRow ?'Close section':'Open section' }</div>
        )

    }

    _openCloseSection(){
        this.context.updateSection(this.props.sectionID,'isOpen',!this.props.isOpen);
    }

    _onRemoveSection(){
        this.context.removeSection(this.props.sectionID);
    }

    _onAddRow(){
        this.context.addRow(this.props.sectionID);
    }



    _handleOpen(){
      this.setState({open: true});
    }

    _handleClose(){
      this.setState({open: false});
    }

    _handleOpenOrder(){
      this.setState({openOrder: true});
    }

    _handleCloseOrder(valueOrder, isSubmit){
      if (isSubmit) {
        this.context.orderSection(this.props.sectionID, valueOrder);   
      }
      
      this.setState({openOrder: false});
    }

    _handleClose(valueOrder, isSubmit){
        if (isSubmit) {
            this.context.orderRow(this.props.sectionID, this.props.rowID, valueOrder);  
        }
        
        this.setState({open: false});
    }

    _onDoubleSection() {
        this.context.doubleSection(this.props.sectionID);
    }

    _onOrderSection(valueOrder) {
        this.context.orderSection(this.props.sectionID, valueOrder);
    }

    _onCopySection() {
        
        var content = this.props.section;
        console.log('eformTemplateDetail._onComponentSectionSaveForCopy: content = ',content) 
        postRequest('/eformtemplate/saveSectionForCopy',{content: JSON.stringify(content)}).then(eformResponse => {
            toastr.success('Copy successfully !')
        });
        
    }  

    _onPasteSection() {
        var self = this;
        postRequest('/eformtemplate/pasteSectionForCopy').then(response => {
            console.log('response', response);
            var content = JSON.parse(response.data.data.TemplateData);            
            self.context.pasteSection(self.props.sectionID, content);
        });        
    }   

    _handleOpenPermission(){
      console.log('vvvvv1');
      this.setState({openPermission: true});
    };
    
    _handleClosePermission(){
      this.setState({openPermission: false});
    };

    _renderSection(){
      var displayPermission ='inline-block';

      var arrViewRoleCode = [];
      var arrEditRoleCode = [];
      if (this.props.arrViewRoleCode) {
        arrViewRoleCode = this.props.arrViewRoleCode;
      }

      if (this.props.arrEditRoleCode) {
        arrEditRoleCode = this.props.arrEditRoleCode;
      }

      console.log('this.props.arrViewRoleCode in section', this.props.arrViewRoleCode);

        

        return (

          <div className="portlet box green" ref="section">
                <NewOrEditSection isOpenPermission={this.state.open} closeDialog={this._handleClose.bind(this)} section={this.props.section} sectionID={this.props.sectionID} />
                <OrderPosition isOpenPermission={this.state.openOrder} closeDialog={this._handleCloseOrder.bind(this)} originID={this.props.sectionID} />
                <EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type='section' 
                                roles = {this.props.section.roles} sectionID = {this.props.sectionID} 
                                arrViewRoleCode = {arrViewRoleCode} arrEditRoleCode={arrEditRoleCode}/>
                <div className="portlet-title">
                    <div className="caption">
                        {this.props.name}
                        &nbsp;
                    </div>
                    <div className="tools" style={{display: displayPermission}}>
                          <a className="collapse"></a>
                    </div>

                    <div className="actions" style={{display: displayPermission}}>

                        <a className="btn green btn-sm" onClick={this._openCloseSection.bind(this)}>
                            { this._showhideButtons() }
                        </a>&nbsp;

                        <a className="btn green btn-sm" onClick={this._onAddRow.bind(this)}>
                            <i className="fa fa-plus"></i> Add Row
                        </a>&nbsp;                       

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
                                    <a onClick={this._handleOpenOrder.bind(this)}>
                                        <i className="fa fa-sort"></i> Order Section
                                    </a>
                                </li>                                                             
                                <li>
                                    <a onClick={this._handleOpen.bind(this)}>
                                        <i className="fa fa-pencil"></i> Update Section
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._onDoubleSection.bind(this)}>
                                        <i className="fa fa-copy"></i> Double Section
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._onCopySection.bind(this)}>
                                        <i className="fa fa-copy"></i> Copy Section
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._onPasteSection.bind(this)}>
                                        <i className="fa fa-copy"></i> Paste Section
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._onUpdateViewType}>
                                        <i className="fa fa-pencil"></i>Change View Type
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._onRemoveSection.bind(this)}>
                                        <i className="fa fa-trash-o"></i> Remove Section
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this._handleOpenPermission.bind(this)}>
                                        <i className="fa fa-pencil"></i> Set Permission
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        Page&nbsp;&nbsp;
                                        <input type="text" ref="page" defaultValue={this.props.page}/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>
                  {/*<div className="portlet-body form flip-scroll">*/}
                 <div className="portlet-body form">
                      <div className="form-horizontal">
                          <div className="form-body">
                            {
                                this._renderRows(arrViewRoleCode, arrEditRoleCode)
                            }
                          </div>
                      </div>
                  </div>
             </div>
        );


    }

    _renderRows(arrViewRoleCode, arrEditRoleCode){
      //only close section if isOpen == false && defaultOpenCloseSection = 'NO'

      console.log('arrViewRoleCode, arrEditRoleCode', arrViewRoleCode, arrEditRoleCode);

      let isShowRow = this._calShowRow();


      if (!isShowRow) {
        //close section
        // console.log('this.props.rows >>> Render Row',this.props.rows);
        return <div />
      }
      else {
        var rows = [];
        this.props.rows.map(function(row,index){
            rows.push(<Row
                      key={index}
                      refName={row.ref}
                      fields = {row.fields}
                      rowID={index}
                      sectionID={this.props.sectionID}
                      userRole = {this.props.userRole}
                      roles =  {row.roles}
                      row = {row}
                      arrViewRoleCode = {arrViewRoleCode}
                      arrEditRoleCode = {arrEditRoleCode}
                    />);
        },this)
      }
      return rows;
    }

    render() {
       
        var displayPermission = 'inline-block';
        return (

              <div className="row">
                <div className="col-md-12">

                  {this._renderSection()}

                </div>
              </div>


        )
    }
}


