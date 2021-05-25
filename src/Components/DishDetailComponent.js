import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle><h4>{dish.name}</h4></CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments (comments, postComment, dishId) {
    if (comments != null && comments.length > 0)
        return(
            <Card>
                <CardBody>
                    <CardTitle><h4>Comments</h4></CardTitle>
                    <CardText>
                        <ul className="list-unstyled">
                            {comments.map((c) => <li>{c.comment}<br/>--{c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}<br/><br /></li>)}
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {RenderDish(props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {RenderComments(props.comments, props.postComment, props.dish.id)}
                </div>
            </div>
        </div>
    );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment)
        alert("Comment Added.");
        //event.preventDefault();
    }

    commentForm() {
        return (
            <div>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={{size: 12}}>
                            <Control.select model=".rating" name="rating" className="form-control"
                                innerRef={(input) => this.rating = input}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourname" md={12}>Your Name</Label>
                        <Col md={{size: 12}}>
                            <Control.text model=".yourname" name="yourname"
                                className="form-control" validators={{required, minLength: minLength(2), maxLength: maxLength(15)}}
                                innerRef={(input) => this.yourname = input}  />
                            <Errors className="text-danger" model=".yourname" show="touched"
                                messages={{
                                    required: 'Required. ',
                                    minLength: `Must be greater than 2 characters. `,
                                    maxLength: `Must be 15 characters or less. `,
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={12}>Comment</Label>
                        <Col md={{size: 12}}>
                            <Control.textarea model=".comment" name="comment" rows="6"
                                    className="form-control" validators={{required, minLength: minLength(5), maxLength: maxLength(100)}}
                                    innerRef={(input) => this.comment = input}  />
                            <Errors className="text-danger" model=".comment" show="touched"
                                messages={{
                                    required: 'Required. ',
                                    minLength: `Must be greater than 5 characters. `,
                                    maxLength: `Must be 100 characters or less. `,
                                }}
                            />
                        </Col>
                    </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </div>
        );
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            {this.commentForm()}
                        </div>
                    </ModalBody>
                </Modal>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil">Submit Comment</span>
                </Button>
            </div>
        );
    }
}

export default DishDetail;
