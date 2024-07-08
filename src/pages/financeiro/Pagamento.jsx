import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pagamento = () => {
  const [folhas, setFolhas] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    descritivo: '',
    referencia: '',
    proventos: '',
    descontos:'',
    });

  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  
  const fetchPagamento = async () => {
    setCarregando(true);
    try {
      const responseFolhas = await axios.get('http://localhost:8080/api/folhas-pagamentos');
      setFolhas(responseFolhas.data && responseFolhas.data.content);
    } catch (error) {
      console.error('Erro ao gerar a folha pagameto:', error);
      setFolhas([]);
    } finally {
      setCarregando(false);
    }
  };
  fetchPagamento();
}, []);
  return (
      <Container className='mt-5'>
        <Row className="justify-content-center">
          <div className="border border-3 border-primary"></div>
          <Col md={12}>
            <h2 className="fw-bold mb-2 text-uppercase">Demonstrativo de Pagamento</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="2">Nome funcionário:</th>
                  <th colSpan="2">Cargo: </th>
                </tr>
                <tr>
                  <th>Descritivo</th>
                  <th>Referência</th>
                  <th>Proventos</th>
                  <th>Descontos</th>
                </tr>
                </thead>  
                <tbody>
                <tr>
                  <th>Salário base: </th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>INSS: </th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>IRRF: </th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th colSpan="2">Total de vencimentos: </th>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th colSpan="2">Total de descontos: </th>
                </tr>
                <tr>
                  <th colSpan="2"></th>
                  <th colSpan="4">Salário líquido: </th>
                </tr>
                  {/*<th>{calcularTotalValor().toFixed(2)}</th>
                  <th>{calcularTotalDesconto().toFixed(2)}</th>*/}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
};

export default Pagamento;