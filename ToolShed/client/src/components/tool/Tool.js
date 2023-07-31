import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from "reactstrap";
import { deleteTool } from "../../modules/toolManager";

export default function Tool({ tool, userCheck }) {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate();

    const confirmDelete = () => {
        deleteTool(tool.id)
            .then(res => {
                if (res.ok) {

                    setModal(false)
                    window.location.reload()
                }
            })
    }

    return (
        <Card className="m-5 text-center" style={{
            'borderRadius': '20px',
        }}>
            <CardBody style={{
                'borderRadius': '20px',
            }}
            >
                <h3>{tool.name}</h3>
                <h3>{tool.description}</h3>
                <h3>{tool?.condition?.name}</h3>

                <ButtonGroup>
                    <Link to={`/toolDetails/${tool.id}`} >
                        <Button
                            color="secondary"
                            style={{
                                'borderRadius': '20px',
                                'margin': '10px'
                            }}>
                            Details</Button>
                    </ Link>
                    {userCheck ? (
                        <>
                            <Button
                                color="secondary"
                                onClick={() => navigate(`/edittool/${tool.id}`)}
                                style={{
                                    'borderRadius': '20px',
                                    'margin': '10px'
                                }}>
                                Edit</Button>
                            <Button
                                color="danger"
                                onClick={() => setModal(!modal)}
                                style={{
                                    'borderRadius': '20px',
                                    'margin': '10px'
                                }}>
                                Delete
                            </Button>
                        </>
                    ) : ""}
                </ButtonGroup>

                <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}>Modal Title</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete your {tool.name}?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => confirmDelete(setModal(!modal))} color="danger">Confirm</Button>
                        <Button onClick={() => setModal(!modal)} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </CardBody >
        </Card >
    )
}