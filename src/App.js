import './App.css';
import ListCategories from './components/ListCategories';
import NavbarComponent from './components/NavbarComponent';
import { Col, Row, Container } from 'react-bootstrap'
import Result from './components/Result';
import React, { Component } from 'react'
import { API_URL } from './utils/constants'
import axios from 'axios'
import Products from './components/Products';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      barangs: [],
      pilihKategori: 'fashion-anak'
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

  render() {
    const { barangs, pilihKategori } = this.state
    return (
      <div className="App">
        <NavbarComponent />
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
                    />
                  ))}
                </Row>
              </Col>
              <Result />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}