import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from 'react'
import {Row, Col, Button } from 'react-bootstrap'
import {numberWithCommas} from '../utils/utils'
import { API_URL } from '../utils/constants'

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    };
    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0); 
        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{span: 8, offset: 9}}>
                        <h5>Total Price : <strong className='float-right'>  Rp. {numberWithCommas (totalBayar)}</strong></h5>
                        <Button variant="warning" block className='mb-4 mt-2 mr-2' size="lg" onClick={ () => this.submitTotalBayar(totalBayar)}> 
                            <FontAwesomeIcon icon={faMoneyBillWave}/> <strong>PAY NOW</strong>
                            
                        </Button>
                    </Col>
                </Row>
             
            </div>
        )
    }
}
