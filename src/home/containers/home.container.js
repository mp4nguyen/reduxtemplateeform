import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import * as eformActions from '../../redux/actions/eformActions/';
import Section from '../../section/components/section';
import NewOrEditSection from '../../section/components/newOrEditSection.component';
import EditPermission from './EditPermission.component';

var updateAt = null;

var createAt = null;


var handleWindowClose = function(ev){
    ev.preventDefault();
    alert("Alerted Browser Close");
}

class Home extends Component {


    static childContextTypes = {
      // onMyBlur: React.PropTypes.func,
      // updateField: React.PropTypes.func,
      updateSection: React.PropTypes.func,
      // updateTableField: React.PropTypes.func,
      updatingFields: React.PropTypes.array,
      // updateAxisXField:React.PropTypes.func,
      // updateChartLineImage:React.PropTypes.func,
      // updateChartLineHeaderImage:React.PropTypes.func
      addSection: React.PropTypes.func,
      updateInfoSection: React.PropTypes.func,
      removeSection: React.PropTypes.func,
      addRow:React.PropTypes.func,
      removeRow:React.PropTypes.func,
      addField:React.PropTypes.func,
      updateInfoField:React.PropTypes.func,
      updateInfoHome:React.PropTypes.func,      
      updateInfoRow:React.PropTypes.func,
      orderRow:React.PropTypes.func,
      copyRow:React.PropTypes.func,
      doubleSection:React.PropTypes.func,
      orderSection:React.PropTypes.func,
      pasteSection:React.PropTypes.func,
      saveEform:React.PropTypes.func,
      simplifyPermission:React.PropTypes.func,
      arrViewRoleCode:React.PropTypes.array,
      arrEditRoleCode:React.PropTypes.array       
    }


    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            error: null,
			      errorDetails: null,
            open: false,
            openPermission: false
        }

        // this.handler = (ev) => {
        //   ev.preventDefault();

        //   if(this.props.saveEform){
        //       this.props.saveEform();
        //   }

        //   return ev.returnValue = 'Are you sure you want to close?';
        // }
    }

    componentWillMount(){
      console.log(' eformActions = ',eformActions);
      console.log('home.component.js.componentWillMount: locationParams = ',this.props);


      if(this.props.location.query.templateUID){
          this.props.fetchEformTemplateFromServer(this.props.location.query);
      }else {
          this.setState({
				error:'please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14',
				errorDetails: this.props.location.pathname + ' ' + this.props.location.search
				});
          console.log('please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14');
      }
    }

    componentWillUnmount(e){

    }

    componentDidMount() {
      // window.addEventListener("beforeunload", this.handler);
      // window.addEventListener("pagehide", this.handler);

    }

    componentWillUnmount() {
      // window.removeEventListener("beforeunload", this.handler);
      // window.removeEventListener("pagehide", this.handler);
    }

    componentWillUpdate(){
      updateAt = new Date();
      console.log("home.container.componentWillUpdate: start at = ",updateAt);
    }

    componentDidUpdate() {
      console.log("home.container.componentDidUpdate: at ",(new Date()) - updateAt );
    }

    getChildContext() {
      var o = {
        // onMyBlur: this.props.onMyBlur,
        // updateField: this.props.updateField,
        // updateTableField: this.props.updateTableField,
        updatingFields: this.props.eform.updatingFields,
        updateSection: this.props.updateSection,
        // updateAxisXField : this.props.updateAxisXField,
        // updateChartLineImage:this.props.updateChartLineImage,
        // updateChartLineHeaderImage:this.props.updateChartLineHeaderImage
        addSection: this.props.addSection,
        updateInfoSection: this.props.updateInfoSection,
        removeSection: this.props.removeSection,
        addRow: this.props.addRow,
        removeRow: this.props.removeRow,
        addField: this.props.addField,
        updateInfoField: this.props.updateInfoField,
        updateInfoHome:this.props.updateInfoHome,        
        updateInfoRow:this.props.updateInfoRow,
        orderRow: this.props.orderRow,
        copyRow: this.props.copyRow,
        doubleSection: this.props.doubleSection,
        orderSection: this.props.orderSection,
        pasteSection: this.props.pasteSection,
        saveEform: this.props.saveEform,
        simplifyPermission: this.props.simplifyPermission,
        arrViewRoleCode : this.props.eform.template.arrViewRoleCode,
        arrEditRoleCode : this.props.eform.template.arrEditRoleCode
      
      };
      return o;
    }

    _saveForm(event){
        event.preventDefault();
        this.props.saveEform(this.props.location.query);
    }

    _addSection(){
        console.log('this.props',this.props);
        this.props.addSection();
    }

    _handleOpen(){
      this.setState({open: true});
    };

    _handleOpenPermission(){
      this.setState({openPermission: true});
    };

    _handleClose(){
      this.setState({open: false});
    };

    _handleClosePermission(){
      this.setState({openPermission: false});
    };

    _handleSimplifyPermission(){
      this.props.simplifyPermission();
    };

    render() {

        //createAt = new Date();
        //console.log("ended load data from server at ",createAt);
        if(this.props.eform.params && this.props.eform.params.eformTemplateName){
            document.title = this.props.eform.params.eformTemplateName;
        }else{
            document.title = 'Eform loading...';
        }

        var arrViewRoleCode = [];
        var arrEditRoleCode = [];

        console.log('this.props.eform.template.arrViewRoleCode >>>>> home', this.props.eform.template.arrViewRoleCode);

        if (this.props.eform.template.arrViewRoleCode) {
          arrViewRoleCode = this.props.eform.template.arrViewRoleCode;
        }

        if (this.props.eform.template.arrEditRoleCode) {
          arrEditRoleCode = this.props.eform.template.arrEditRoleCode;
        }

        var _roles = {};
        var mainBody = null;

        if(this.props.eform && this.props.eform.template && this.props.eform.template.sections){

          console.log('this.props.eform.template.roles >>>>> begin aaaa', this.props.eform.template.roles);        

          if (this.props.eform.template.roles) {
            console.log('this.props.eform.template.roles >>>>> begin', this.props.eform.template.roles);            
            _roles = this.props.eform.template.roles;
          }

          mainBody = <div className="row">
                          <div className="col-md-12">
                              {
                                  this.props.eform.template.sections.map(function(section, index){
                                          return <Section
                                                    key={index}
                                                    name={section.name}
                                                    refName={section.ref}
                                                    rows={section.rows}
                                                    code={index}
                                                    sectionID={index}
                                                    viewType={section.viewType}
                                                    isShow={section.isShow}
                                                    userRole={this.props.eform.userRole}
                                                    isOpen={section.isOpen}
                                                    isComplete={section.isComplete}
                                                    showOpenCloseSection={section.showOpenCloseSection}
                                                    defaultOpenCloseSection={section.defaultOpenCloseSection}
                                                    section = {section}
                                                    arrViewRoleCode = {arrViewRoleCode}
                                                    arrEditRoleCode = {arrEditRoleCode}

                                                />
                                  }, this)
                              }
                          </div>
                      </div>
        }
            
        return (
          <div>
            <NewOrEditSection isOpen={this.state.open} closeDialog={this._handleClose.bind(this)}/>
            <EditPermission isOpenPermission={this.state.openPermission} closeDialog={this._handleClosePermission.bind(this)} type = 'home' 
                            roles = {_roles} arrViewRoleCode = {arrViewRoleCode} arrEditRoleCode={arrEditRoleCode}/>
            <form id="myEform" className="container-fluid" onSubmit={this._saveForm.bind(this)}>
              <div className="page-content">
                  <div ref="content">
                    <div className="page-bar">
                         <div className="page-toolbar">
                             <div className="pull-right">
                                 <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._handleOpen.bind(this)}>
                                               <i className="fa fa-save"></i>&nbsp;
                                               Add Section
                                 </button>
                                 &nbsp;
                                 <button ref="btnSave" type="submit" className="btn green btn-sm">
                                               <i className="fa fa-save"></i>&nbsp;
                                               Save Form
                                 </button>
                                 &nbsp;
                                  <button ref="btnAddPermission" type="button" className="btn green btn-sm" onClick={this._handleOpenPermission.bind(this)}>
                                               <i className="fa fa-save"></i>&nbsp;
                                               Add Permission
                                 </button>
                                 &nbsp;
                                 <button ref="btnResetPermission" type="button" className="btn green btn-sm" onClick={this._handleSimplifyPermission.bind(this)}>
                                               <i className="fa fa-pencil"></i>&nbsp;
                                               Simplify Permission
                                 </button>
                             </div>
                         </div>
                     </div>
                     <h3 className="page-title"> {this.props.eform.template.eformName}</h3>
                      
                        {mainBody}

                      <div className="page-bar">
                           <div className="page-toolbar">
                               <div className="pull-right">
                                 <div className="pull-right">
                                     <button ref="btnSave" type="button" className="btn green btn-sm" onClick={this._handleOpen.bind(this)}>
                                               <i className="fa fa-save"></i>&nbsp;
                                               Add Section
                                     </button>
                                     &nbsp;
                                     <button ref="btnSave" type="submit" className="btn green btn-sm">
                                                   <i className="fa fa-save"></i>&nbsp;
                                                   Save Form
                                     </button>
                                 </div>
                               </div>
                           </div>
                       </div>
                  </div>
              </div>
            </form>
          </div>
        );
        
    }

}



const mapStateToProps = (state) => {
    return {
        eform: state.eform
    }
}
export default connect(mapStateToProps, eformActions)(Home)
