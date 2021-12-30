import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalKeranjang = ({showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan}) => {
    if(keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    {keranjangDetail.product.nama} {" "}
                    <strong>
                        (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                    </strong>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total Price : </Form.Label>
                    <p><strong>Rp. {numberWithCommas(totalHarga)}</strong></p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total Product : </Form.Label>
                    <br/>
                    <Button variant='warning' size="sm" className="mr-5" onClick={ () => kurang()}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Button>
                    <strong>{jumlah}</strong>
                    <Button variant='warning' size="sm" className="ml-5" onClick={ () => tambah()}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description : </Form.Label>
                    <Form.Control as="textarea" rows={3} name="keterangan" placeholder="Ex:  Spicy, Don't use tomatoes, little sweet, etc." value={keterangan} onChange={(event) => changeHandler(event)}/>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                    <FontAwesomeIcon icon={faTrash}/>Delete Order
                </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default ModalKeranjang
