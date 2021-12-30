import React, { Component } from 'react'
import { Col, Row, Badge, Card } from 'react-bootstrap'
import { numberWithCommas } from "../utils/utils";
import TotalBayar from './TotalBayar';
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from '../utils/constants'
import axios from 'axios'
import swal from 'sweetalert'

export default class Hasil extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showModal: false,
             keranjangDetail: false,
             jumlah: 0,
             keterangan: '',
             totalHarga: 0,


        };
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false
        });
    };
    
    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah+1,
            totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
        });
    }

    kurang = () => {
        if(this.state.jumlah !== 1){
            this.setState({
                jumlah: this.state.jumlah-1,
                totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
          };
      
          axios
          .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
              swal({
                title: "Update your order!",
                text: data.product.nama+ " success update your order!",
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.log(error);
            });
    }

    hapusPesanan = (id) => {

        this.handleClose();

          axios
          .delete(API_URL + "keranjangs/" + id)
            .then(res => {
              swal({
                title: "Delete your order!",
                text: this.state.keranjangDetail.product.nama+ " success delete your order!",
                icon: "error",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.log(error);
            });
    }

    render() {
        const { keranjangs } = this.props
        return (
            <div class="bill">
                <Col md={3} mt="2">
                    <h5><strong>Bill</strong></h5>
                    {keranjangs.length !== 0 && (
                    
                    <ul class="list-group">
                    {keranjangs.map((menuKeranjang) => (
                        
                            <li class="list-group-item list-group-item-primary" id="my-primary" key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                            <Row>
                                <Col xs={2}>
                                    <h5>
                                        <Badge pill bg="warning" text="dark">
                                            {menuKeranjang.jumlah}
                                        </Badge>
                                    </h5>
                                </Col>
                                <Col xs={8} class="harga-keranjang">
                                    <h5><strong>{menuKeranjang.product.nama}</strong></h5>
                                    <p>Rp.{numberWithCommas(menuKeranjang.product.harga)}</p>
                                </Col>
                                <Col xs={2}>
                                    <strong className='float-right'>Rp.{numberWithCommas(menuKeranjang.total_harga)}</strong>
                                </Col>
                            </Row>
                        </li>
                        
                        
                    ))}
                
                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/>

                </ul>
                    )}
                    
                    
                </Col>
                <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </div>
        )
    }
}
