import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import TotalBayar from './TotalBayar'
import ModalKeranjang from './ModalKeranjang'

export default class Result extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
        }
    }

    handleShow = (daftarKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: daftarKeranjang,
            jumlah: daftarKeranjang.jumlah,
            keterangan: daftarKeranjang.keterangan
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1
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
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt-2>
                <h4><strong>Jumlah</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
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

                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} />
                    </ListGroup>
                )
                }
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col >
        )
    }
}
