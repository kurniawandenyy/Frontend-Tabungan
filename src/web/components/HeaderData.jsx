import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { addTabungan, getTabungan } from '../redux/actions/Tabungan'

function HeaderData(props) {
    
    const [tipe, setTipe] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [judul, setJudul] = useState('')

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = _ => {
        props.fetch(process.env.REACT_APP_API)
    }

    const clearForm = () => {
        document.getElementById('myForm').reset()
    }

    const addData = e => {
        e.preventDefault()
        const data = {
            tipe: tipe,
            jumlah: jumlah,
            judul: judul
        }
        props.add(process.env.REACT_APP_API, data)
        .then(result => {
            clearForm()
            getData()
        })
        .catch(err => {
            console.log(err)
        })
    } 
    return (
        <>
        <Col>
            <Form id='myForm' onSubmit={ (e) => addData(e)}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Tipe</Form.Label>
                    <Form.Control as="select" onChange={ (e) => setTipe(e.target.value )}>
                    <option>Pilih</option>
                    <option>Pemasukan</option>
                    <option>Pengeluaran</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Jumlah</Form.Label>
                    <Form.Control type="number" onChange={ (e) => setJumlah(e.target.value )} placeholder="Jumlah" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control onChange={ (e) => setJudul(e.target.value )} type="text" placeholder="Judul" />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Col>
        <Col>
            <Card style={{ height: "83%" }} >
                <Card.Body>
                    <Row style={{marginLeft:'5px'}}>Total Pemasukan :</Row>
                    <Row style={{marginLeft:'5px'}}>IDR&nbsp;<NumberFormat value={props.Tabungan.jmlPemasukan} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={''} /></Row>
                    <Row style={{marginTop:'10px', marginLeft:'5px'}}>Total Pengeluaran :</Row>
                    <Row style={{marginLeft:'5px'}}>IDR&nbsp;<NumberFormat value={props.Tabungan.jmlPengeluaran} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={''} /></Row>
                    <Row style={{marginTop:'10px', marginLeft: '5px'}}>Total Uang :</Row>
                    <Row style={{marginLeft:'5px'}}>IDR&nbsp;<NumberFormat value={props.Tabungan.total} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={''} /></Row>
                </Card.Body>
            </Card>
        </Col>  
        </>
    )
}

const mapStateToProps = state => ({
    Tabungan: state.Tabungan
  })
  const mapDispatchToProps = dispatch => ({
    fetch: url => dispatch(getTabungan(url)),
    add: (url, data) => dispatch(addTabungan(url, data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(HeaderData)
