import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container, InputGroup } from 'react-bootstrap';
import BarraBusca from "../components/BarraBusca";
import CaixaSelecao from "../components/CaixaSelecao";
import TabelaCandidatoVaga from "../tabelas/tabelaCandidatoVaga";
import Pagina from "../templates/pagina";

export default function FormCadInscricao(props) {
    const [validado, setValidado] = useState(false);
    const [listaCandidatos, setListaCandidatos] = useState([]);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
    const [vagaSelecionada, setVagaSelecionada] = useState({});

    const inscricao_data = new Date().toLocaleDateString();
    const inscricao_hora = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();


    const [inscricao, setInscricao] = useState({
        candidato: "",
        inscricao_data: "",
        inscricao_hora: "",
        vagas: []
    });

    useEffect(() => {
        fetch('http://localhost:4000/candidatos', { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            })
            .then((listaCandidatos) => {
                setListaCandidatos(listaCandidatos.listacandidatos);
            })
            .catch((erro) => {
                alert("Não foi possível recuperar os candidatos!");
            });
    }, []);



    function gravarInscricao() {
        fetch('http://localhost:4000/inscricoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cand_codigo: candidatoSelecionado.cand_codigo,
                data_inscricao: inscricao_data,
                hora_inscricao: inscricao_hora,
                vagas: inscricao.vagas
            })
        })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                if (dados.status) {
                    setInscricao({ ...inscricao, insc_codigo: dados.insc_codigo });
                }
                alert(dados.mensagem);
            })
            .catch(erro => alert(erro.message));
    }

    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidado(false);
            gravarInscricao();
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();


    };

    return (
        <div>
            <Pagina>
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>

                    <Row className='mt-2 mb-2'>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Candidato</Form.Label>
                                <InputGroup hasValidation>
                                    <BarraBusca placeHolder={'Digite o nome do Candidato cadastrado'}
                                        dados={listaCandidatos}
                                        campoChave={"cand_codigo"}
                                        campoBusca={"cand_nome"}
                                        funcaoSelecao={setCandidatoSelecionado}
                                        valor={""}
                                        required />
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                    Informe o nome do Candidato
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3 mt-4">
                        <Form.Group as={Col} md="2" controlId="inscricao_data">
                            <Form.Label>Data de Inscrição</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="inscricao_data"
                                value={inscricao_data}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="inscricao_hora">
                            <Form.Label>Horário da Inscrição</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="inscricao_hora"
                                value={inscricao_hora}

                            />
                        </Form.Group>

                    </Row>

                    <Row>

                        <Container className="border">
                            <Row className="mb-5">
                                <Col md={2}>
                                    <Form.Label>Lista de vagas disponíveis:</Form.Label>
                                </Col>
                                <Col>
                                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/vagas"}
                                        campoChave={"vaga_codigo"}
                                        campoExibicao={"vaga_cargo"}
                                        funcaoSelecao={setVagaSelecionada}
                                        localLista={'listavagas'} />
                                </Col>
                            </Row>
                            <Row>



                                <Col md={10}>
                                    <Row>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>CodVaga</Form.Label>
                                                <Form.Control type="text" value={vagaSelecionada?.vaga_codigo} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Cargo</Form.Label>
                                                <Form.Control type="text" value={vagaSelecionada?.vaga_cargo} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group>
                                                <Form.Label>Salário</Form.Label>
                                                <Form.Control type="text" value={vagaSelecionada?.vaga_salario} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Group>
                                                <Form.Label>Cidade</Form.Label>
                                                <Form.Control type="text" value={vagaSelecionada?.vaga_cidade} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col md={1} className="middle">
                                            <Form.Group>
                                                <Form.Label>Adicionar</Form.Label>
                                                <Button onClick={() => {

                                                    const vagaIcluida = inscricao.vagas.some(
                                                        (registro) => registro.vagas.vaga_codigo === vagaSelecionada?.vaga_codigo
                                                    );

                                                    if (vagaIcluida) {
                                                        alert('Você ja possui essa vaga!Escolha outra, por favor.');
                                                        return;
                                                    } else {
                                                        setInscricao({
                                                            ...inscricao,
                                                            vagas: [...inscricao.vagas, {
                                                                vagas: {
                                                                    vaga_codigo: vagaSelecionada?.vaga_codigo,
                                                                    vaga_cargo: vagaSelecionada?.vaga_cargo,
                                                                    vaga_salario: vagaSelecionada?.vaga_salario,
                                                                    vaga_cidade: vagaSelecionada?.vaga_cidade
                                                                }

                                                            }]
                                                        })
                                                    }



                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-bag-plus-fill"
                                                        viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                                    </svg>
                                                </Button>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <p><strong>Você escolheu as seguintes vagas disponíveis:</strong></p>
                                <TabelaCandidatoVaga
                                    listaItens={inscricao.vagas}
                                    setInscricao={setInscricao}
                                    dadosInscricao={inscricao} />
                            </Row>
                        </Container>
                    </Row>
                    <Button type="submit" className="mb-1">Inscreva-se!</Button>
                </Form>

            </Pagina>
        </div>
    );
}