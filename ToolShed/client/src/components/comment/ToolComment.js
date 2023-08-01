import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteToolComment } from "../../modules/toolCommentManager";

const ToolComment = ({ toolComment }) => {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate();

    const confirmDelete = () => {
        deleteToolComment(toolComment.id)
            .then(res => {
                if (res.ok) {

                    setModal(false)
                    window.location.reload()
                }
            })
    }

    return (

        <Card className="m-5 bg-secondary text-white text-center">
            <CardBody>
                <CardTitle>{toolComment?.user.name} said: </CardTitle>
                <CardText>{toolComment?.body}</CardText>
                <ButtonGroup>
                    <Button
                        color="danger"
                        onClick={() => setModal(!modal)}
                        style={{
                            'margin': '10px'
                        }}>
                        Delete
                    </Button>
                </ButtonGroup>

                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}>Delete?</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this comment?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => confirmDelete(setModal(!modal))} color="danger">Confirm</Button>
                        <Button onClick={() => setModal(!modal)} color="secondary">Cancel</Button>
                    </ModalFooter>
                </ Modal>
            </CardBody>
        </Card >
    )
}

export default ToolComment;