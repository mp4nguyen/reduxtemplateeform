import React, { Component } from 'react';
import { Link } from 'react-router';
import {printRequest,postRequest,getRequest} from '../redux/lib/request';
import { browserHistory } from 'react-router';
import CreateTemplate from './CreateTemplate';
import TemplateDetail from './templateDetail';
import { connect } from 'react-redux';
import * as eformActions from '../redux/actions/eformActions/';

var arrViewRoleCode = [];
var arrEditRoleCode = [];
var arrPrintRoleCode =[];
var _form={};

export default class List extends Component {

    static childContextTypes = {
        arrViewRoleCode:React.PropTypes.array,
        arrEditRoleCode:React.PropTypes.array,
        arrPrintRoleCode:React.PropTypes.array,
        removeTemplate: React.PropTypes.func,
        createTemplate: React.PropTypes.func,
        updateInfoTemplate: React.PropTypes.func
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            open: false            
        }

    }

    componentWillMount(){   

        console.log('enter>>>>>',this.props);

      // if(this.props.location.query.templateUID){
          this.props.getListEformTemplateFromServer(this.props.location.query);
      // }else {
      //     this.setState({
      //           error:'please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14',
      //           errorDetails: this.props.location.pathname + ' ' + this.props.location.search
      //           });
      //     console.log('please enter route like : home/?appointmentUID=a7880d5f-c0e8-4ad5-8a74-3b0b46ac8196&patientUID=099fe439-b22a-403d-b0c8-4e056a092563&templateUID=e6b05150-4b5f-468d-ac9e-c456790bc0de&userUID=126dfd18-98aa-11e5-b898-e03f49aecb14');
      // }
    }

    getChildContext() {
      var o = {        
        arrViewRoleCode : this.props.eform.template.arrViewRoleCode,
        arrEditRoleCode : this.props.eform.template.arrEditRoleCode,
        arrPrintRoleCode : this.props.eform.template.arrPrintRoleCode,
        removeTemplate: this.props.removeTemplate,
        createTemplate: this.props.createTemplate,
        updateInfoTemplate: this.props.updateInfoTemplate
      
      };
      return o;
    }

    _handleOpen(){
      this.setState({open: true});
    }

    _handleClose(){
      this.setState({open: false});
    }

    render(){        

        console.log('this.props ???', this.props);

        if(this.props.eform && this.props.eform.template && this.props.eform.template.listTemplate){

            return (
                <div>                                    
                        
                        <div className="page-bar">
                            <div className="page-toolbar">
                                <div className="pull-right">
                                    <CreateTemplate   isOpen={this.state.open} closeDialog={this._handleClose.bind(this)}/> 
                                
                                    <button className="btn green btn-sm" onClick={this._handleOpen.bind(this)}>
                                                   <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;
                                                   Add Template
                                    </button>
                                    &nbsp;                                    
                                 </div>
                             </div>
                         </div>

                        <div style={{display: "table", "width": "100%"}}>
                            <div style={{"display": "table-row"}}>
                                <div style={{"display": "table-cell",  "padding": "3px 10px", "border": "1px solid #999999"}}><strong>Index</strong></div>
                                <div style={{"display": "table-cell",  "padding": "3px 10px", "border": "1px solid #999999"}}><span style={{"font-weight": "bold"}}>Name</span></div>
                                <div style={{"display": "table-cell",  "padding": "3px 10px", "border": "1px solid #999999"}}><span style={{"font-weight": "bold"}}>Created Date</span></div>
                                <div style={{"display": "table-cell",  "padding": "3px 10px", "border": "1px solid #999999"}}><span style={{"font-weight": "bold"}}>User Created</span></div>
                                <div style={{"display": "table-cell",  "padding": "3px 10px", "border": "1px solid #999999"}}><span style={{"font-weight": "bold"}}>Action</span></div>                                
                            </div>

                            {
                                this.props.eform.template.listTemplate.map((l,index)=>{                                        
                                    
                                        return (                                            
                                            <TemplateDetail index = {index+1} data = {l} />                                                                           
                                        )
                                            
                                })
                            }
                                                
                        </div>                       
                    
                </div>
            )
        }else{
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        eform: state.eform
    }
}
export default connect(mapStateToProps, eformActions)(List)