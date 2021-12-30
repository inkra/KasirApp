import React, { Component } from 'react'
import { Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../utils/constants'

export default class Sukses extends Component {

    componentDidMount() {
        axios
        .get(API_URL + "keranjangs")
          .then(res => {
            const keranjangs = res.data;
            keranjangs.map(function(item) {
                return axios
                .delete(API_URL+"keranjangs/"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
            })
          })
          
          .catch(error => {
            console.log(error);
          });
    }
    render() {
        return (
            <div className='mt-4 text-center'>
                <Image src="foto_produk/sukses.png" width="700px" />
                <h2>Order success</h2>
                <p>Thanks you for order!</p>
                <Button id="my-primary" variant="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
