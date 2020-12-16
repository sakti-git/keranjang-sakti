import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

export default class Result extends Component {
    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt-2>
                <h4><strong>Jumlah</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <ListGroup variant="flush">
                        {keranjangs.map((daftarKeranjang) => (
                            <ListGroup.Item>
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
                    </ListGroup>
                )}
            </Col >
        )
    }
}
