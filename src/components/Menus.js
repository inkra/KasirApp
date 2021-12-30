import React from 'react'
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils';

const Menus = ({menu, masukKeranjang }) => {
    return (
            <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={() => masukKeranjang(menu)}>
            <div class="card-body">
            <Card.Img variant="top" src={"foto_produk/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
                <Card.Body>
                <Card.Title><strong>{menu.nama}</strong>  ({menu.kode})</Card.Title>
                <Card.Text>
                {menu.deskripsi} 
                </Card.Text>
                <Card.Text>
                Rp. {numberWithCommas(menu.harga)}
                </Card.Text>
                </Card.Body>
                </div>
            
            </Card>
        </Col>
    )
}

export default Menus;