import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.contactUsForm = this.contactUsForm.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    renderFormGroup(ipType, stateName, labelText) {
        return (
            <FormGroup row>
                <Label htmlFor={stateName} md={2}>
                    {labelText}
                </Label>

                <Col md={10}>
                    <Input type={ipType} id={stateName} name={stateName}
                        rows={ipType === 'textarea' ? '12' : '1'}
                        placeholder={labelText} value={this.state[stateName]}
                        onChange={this.handleInputChange} />
                </Col>
            </FormGroup>
        );
    }

    renderAgreementCheck() {
        return (
            <FormGroup row>
                <Col md={{size: 6, offset: 2}}>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox"
                                name="agree"
                                checked={this.state.agree}
                                onChange={this.handleInputChange} /> {' '}
                            <strong>May we contact you?</strong>
                        </Label>
                    </FormGroup>
                </Col>
                <Col md={{size: 3, offset: 1}}>
                    <Input type="select" name="contactType"
                            value={this.state.contactType}
                            onChange={this.handleInputChange}>
                        <option>Tel.</option>
                        <option>Email</option>
                    </Input>
                </Col>
            </FormGroup>
        );
    }

    contactUsForm() {
        return(
            <Form onSubmit={this.handleSubmit}>
                {this.renderFormGroup('text', 'firstname', 'First Name')}
                {this.renderFormGroup('text', 'lastname', 'Last Name')}
                {this.renderFormGroup('tel', 'telnum', 'Tel. Number')}
                {this.renderFormGroup('email', 'email', 'Email')}

                {this.renderAgreementCheck()}

                {this.renderFormGroup('textarea', 'message', 'Your Feedback')}

                <FormGroup row>
                    <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary"> Send Feedback </Button>
                    </Col>
                </FormGroup>
            </Form>
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