import React, { useEffect, useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import swal from 'sweetalert2';
import { getTabungan, updateTabungan, deleteTabungan } from '../redux/actions/Tabungan';
import { connect } from 'react-redux';

function TableData(props) {

    const [tipe, setTipe] = useState('')
    const [jumlah, setJumlah] = useState(0)
    const [judul, setJudul] = useState('')
    const [Id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    
    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = () => {
        props.fetch(process.env.REACT_APP_API)
    }

    const handleEdit = (id, tipe, jumlah, judul) => {
        setId(id)
        setJumlah(jumlah)
        setJudul(judul)
        setTipe(tipe)
        setEdit(true)
    }

    const updateData = (e, id) => {
        e.preventDefault()
        const data = {
            tipe: tipe,
            jumlah: jumlah,
            judul: judul    
        }
        props.update(process.env.REACT_APP_API + '/' + id, data)
        .then(result => {
            getData()
            setEdit(false)
        })
        .catch(err => {
            console.log(err)
        })
    } 

    const deleteData = id => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                props.delete(process.env.REACT_APP_API + '/' + id)
                .then(result => {
                    swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                        )
                    getData()
                })
            }
        })
    }

    const renderTable = () => {
        return props.Tabungan.data.map((tabung, index) => (
            edit && Id===tabung.id ? (
                <tr key={index} style={tabung.tipe.toLowerCase()==='pemasukan' ? {color: '#2196F3'} : {color: '#F44336'}}>
                    <td>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select" onChange={ (e) => setTipe(e.target.value )}>
                            {tabung.tipe.toLowerCase()==='pemasukan' ?
                                <option selected>Pemasukan</option> :
                                <option>Pemasukan</option> }
                            {tabung.tipe.toLowerCase()==='pengeluaran' ?
                                <option selected>Pengeluaran</option> : 
                                <option>Pengeluaran</option> }
                            </Form.Control>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="number" onChange={ (e) => setJumlah(e.target.value)} placeholder="Jumlah" defaultValue={jumlah} />
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control onChange={ (e) => setJudul(e.target.value )} type="text" placeholder="Judul" defaultValue={judul} />
                        </Form.Group>
                    </td>
                    <td>
                        <Button variant='success' type='submit' onClick={(e) => updateData(e, tabung.id)}>Simpan</Button>
                    </td>
                </tr>
            ): (
                <tr key={index} style={tabung.tipe.toLowerCase()==='pemasukan' ? {color: '#2196F3'} : {color: '#F44336'}}>
                    <td>{tabung.tipe}</td>
                    <td><NumberFormat value={tabung.jumlah} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} /></td>
                    <td>{tabung.judul}</td>
                    <td width='20%'><Button variant='primary' onClick={() => {handleEdit(tabung.id, tabung.tipe, tabung.jumlah, tabung.judul)}}>Edit</Button> | <Button variant='danger' onClick={() => {deleteData(tabung.id)}} >Hapus</Button></td>
                </tr>
            )
        ))
      }

    return (
        <Table striped hover responsive>
            <thead style={{backgroundColor: '#212121', color:'#FAFAFA'}}>
                <tr>
                <th>Tipe</th>
                <th>Jumlah</th>
                <th>Judul</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>{renderTable().length > 0 ? renderTable() : <tr align='center'><td colSpan='4'>Tidak ada data</td></tr>}</tbody>
        </Table>
    )
}

const mapStateToProps = state => ({
    Tabungan: state.Tabungan
  })
  const mapDispatchToProps = dispatch => ({
    fetch: url => dispatch(getTabungan(url)),
    update: (url, data) => dispatch(updateTabungan(url, data)),
    delete: url => dispatch(deleteTabungan(url)),
  })

export default connect(mapStateToProps, mapDispatchToProps)(TableData)
