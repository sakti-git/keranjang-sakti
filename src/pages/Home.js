import '../App.css';
import ListCategories from '../components/ListCategories';
import { Col, Row, Container } from 'react-bootstrap'
import Result from '../components/Result';
import React, { Component } from 'react'
import { API_URL } from '../utils/constants'
import axios from 'axios'
import Products from '../components/Products';
import Swal from 'sweetalert2'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            barangs: [],
            pilihKategori: 'fashion-anak',
            keranjangs: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "produks?category.nama=" + this.state.pilihKategori)
            .then(res => {
                const barangs = res.data;
                this.setState({ barangs });
            })
            .catch(error => {
                console.log(error);
            })

        axios
            .get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then(res => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    changeCategory = (value) => {
        this.setState({
            pilihKategori: value,
            barangs: []
        })

        axios
            .get(API_URL + "produks?category.nama=" + value)
            .then(res => {
                const barangs = res.data;
                this.setState({ barangs });
            })
            .catch(error => {
                console.log(error);
            })
    }

    tambahKeranjang = (value) => {

        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }

                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then(res => {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: keranjang.product.nama + ' sukses ditambahkan',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    }

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then(res => {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: keranjang.product.nama + ' sukses ditambahkan',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })


    }

    render() {
        const { barangs, pilihKategori, keranjangs } = this.state
        return (
            <div className="mt-4">
                <Container fluid>
                    <Row>
                        <ListCategories changeCategory={this.changeCategory} pilihKategori={pilihKategori} />
                        <Col>
                            <h4><strong>Daftar Produk</strong></h4>
                            <hr />
                            <Row>
                                {barangs && barangs.map((barang) => (
                                    <Products
                                        key={barang.id}
                                        barang={barang}
                                        tambahKeranjang={this.tambahKeranjang}
                                    />
                                ))}
                            </Row>
                        </Col>
                        <Result keranjangs={keranjangs} {...this.props} />
                    </Row>
                </Container>
            </div>
        )
    }
}