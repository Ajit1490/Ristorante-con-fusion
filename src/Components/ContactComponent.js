import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.contactUsForm = this.contactUsForm.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    renderFormGroup(ipType, stateName, labelText, modelName) {
        return (
            <Row className='form-group'>
                <Label htmlFor={stateName} md={2}> {labelText} </Label>

                <Col md={10}>
                    {ipType === 'textarea' 
                        ? 
                        <Control.textarea model={modelName} id={stateName} name={stateName}
                            rows={ipType === 'textarea' ? '12' : '1'}
                            placeholder={labelText} className="form-control"/>
                        :
                        <Control.text model={modelName} id={stateName} name={stateName}
                            rows={ipType === 'textarea' ? '12' : '1'}
                            placeholder={labelText} className="form-control"/>
                    }
                </Col>
            </Row>
        );
    }

    renderAgreementCheck() {
        return (
            <Row className="form-group">
                <Col md={{size: 6, offset: 2}}>
                    <div className="form-check">
                        <Label check>
                            <Control.checkbox model=".agree"
                                name="agree" className="form-check-input" />
                            {' '}
                            <strong>May we contact you?</strong>
                        </Label>
                    </div>
                </Col>
                <Col md={{size: 3, offset: 1}}>
                    <Control.select model=".contactType" name="contactType"
                            className="form-control">
                        <option>Tel.</option>
                        <option>Email</option>
                    </Control.select>
                </Col>
            </Row>
        );
    }

    contactUsForm() {
        return(
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                {this.renderFormGroup('text', 'firstname', 'First Name', '.firstname')}
                {this.renderFormGroup('text', 'lastname', 'Last Name', '.lastname')}
                {this.renderFormGroup('tel', 'telnum', 'Tel. Number', '.telnum')}
                {this.renderFormGroup('email', 'email', 'Email', '.email')}

                {this.renderAgreementCheck()}

                {this.renderFormGroup('textarea', 'message', 'Your Feedback', '.message')}

                <Row className="form-group">
                    <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary"> Send Feedback </Button>
                    </Col>
                </Row>
            </LocalForm>
        );
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                                House Number<br />
                                Street<br />
                                City, Country<br />
                                <i className="fa fa-phone"></i>: +xxxxxxxxxxxx<br />
                                <i className="fa fa-fax"></i>: +xxxxxxxxxxxx<br />
                                <i className="fa fa-envelope"></i>: <a href="">eMailId</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+xxxxxxxxxxxx"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href=""><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        {this.contactUsForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;