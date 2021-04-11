import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
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

function RenderComments (comments) {
    if (comments != null && comments.length > 0)
        return(
            <Card>
                <CardBody>
                    <CardTitle ><h4>Comments</h4></CardTitle>
                    <CardText>
                        <ul className="list-unstyled">
                            {comments.map((c) => <li>{c.comment}<br/>--{c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}<br/><br /></li>)}
                        </ul>
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
                    {RenderComments(props.comments)}
                </div>
            </div>
        </div>
    );
}


export default DishDetail;
