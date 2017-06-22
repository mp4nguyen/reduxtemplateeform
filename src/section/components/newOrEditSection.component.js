import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class NewOrEditSection extends Component {

    static contextTypes = {
      addSection: React.PropTypes.func,
      removeSection: React.PropTypes.func,
      updateInfoSection: React.PropTypes.func
    }

    static propTypes = {
      sectionID: React.PropTypes.number,
      section: React.PropTypes.object,
      isOpen: React.PropTypes.bool,
      addSection: React.PropTypes.func,
      closeDialog: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            sectionName:'',
            ref:''
        }

    }

    componentWillMount(){

        if(this.props.section){
          // console.log(' NewOrEditSection >>> componentWillMount >>> this.props.section',this.props.section);
            this.setState({
                              sectionName:this.props.section.name,
                              ref:this.props.section.ref
                            });
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log('newOrEditSection.componentWillReceiveProps: nextProps = ',nextProps);
        if(this.props.section){
            this.setState({
                              sectionName:this.props.section.name,
                              ref:this.props.section.ref
                            });
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
    }

    componentDidUpdate() {
    }

    _handleSubmit(){
        console.log('this.props',this.props);
        if(!this.props.section){
            console.log('v1');
            var newSection = {              
              name: this.state.sectionName
            };
            this.context.addSection(newSection);
        }else{
            console.log('v2');
            var newSectionUpdate = {  
              sectionID: this.props.sectionID,            
              name: this.state.sectionName
            };
            this.context.updateInfoSection(newSectionUpdate);
        }
        this._handleClose();
    }


    _handleClose(){
        //this.setState({open: false});
        if(this.props.closeDialog){
            this.props.closeDialog()
        }
    };

    _onChange(componentName,event,value){
        console.log('newOrEditSection._onChange: componentName = ',componentName);
        console.log('newOrEditSection._onChange: value = ',value);
        var object = {};
        object[componentName] = value;
        this.setState(object);
    }

    render() {



          const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this._handleClose.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this._handleSubmit.bind(this)}
            />,
          ];

          var titleName = this.props.section? this.props.section.name:'New section';

          return (
            <div>
                <Dialog
                  title={titleName}
                  actions={actions}
                  modal={false}
                  open={this.props.isOpen}
                  onRequestClose={this.handleClose}
                >
                    <TextField
                     hintText="Ref"
                     disabled={true}
                     floatingLabelText="Ref"
                     floatingLabelFixed={true}
                     value={this.state.ref}
                   />
                    <TextField
                      name='sectionName'
                      hintText="Section name"
                      floatingLabelText="Section name"
                      floatingLabelFixed={true}
                      value={this.state.sectionName}
                      onChange={this._onChange.bind(this,'sectionName')}
                   />
                </Dialog>
            </div>
          );


    }

}
