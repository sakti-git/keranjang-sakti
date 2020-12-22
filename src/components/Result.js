import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import TotalBayar from './TotalBayar'
import ModalKeranjang from './ModalKeranjang'
import { API_URL } from '../utils/constants'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class Result extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0,
        }
    }

    handleShow = (daftarKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: daftarKeranjang,
            jumlah: daftarKeranjang.jumlah,
            keterangan: daftarKeranjang.keterangan,
            totalHarga: daftarKeranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
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
        }

        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: data.product.nama + ' sukses diupdate',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    hapusPesanan = (id) => {

        this.handleClose();


        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: this.state.keranjangDetail.product.nama + ' telah dihapus',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} className="mt-3">
                <h4><strong>Jumlah</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto result">
                        <ListGroup variant="flush">
                            {keranjangs.map((daftarKeranjang) => (
                                <ListGroup.Item key={daftarKeranjang.id} onClick={() => this.handleShow(daftarKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="info">
                                                    {daftarKeranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{daftarKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(daftarKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right">Rp. {numberWithCommas(daftarKeranjang.total_harga)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                        </ListGroup>
                    </Card>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col >
        )
    }
}
