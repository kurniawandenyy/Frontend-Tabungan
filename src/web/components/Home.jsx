import React from 'react'
import { Row, Container } from 'react-bootstrap'
import TableData from './TableData'
import HeaderData from './HeaderData'

function Home() {

    return (
        <Container>
            <Row className='justify-content-center' style={{ marginTop: '20px' }}>
                <h2>REACT TABUNGAN APP (CRUD)</h2>
            </Row>
            <Row className='justify-content-center' style={{ marginTop: '30px' }}>
                <HeaderData />
            </Row>
            <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                <TableData />
            </Row>
        </Container>
    )
}

export default Home