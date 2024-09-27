import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function Form(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()){
            
            if (!props.modoEdicao){
                props.setLista([...props.lista, produto]);
                props.setExibirTabela(true);
            }
            else{
                props.setLista(props.lista.map((item) => {
                    if (item.codigo !== produto.codigo)
                        return item
                    else
                        return produto
                }));
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo:0,
                    nome:"",
                    preco: 0,
                    descricao:"",
                    Categoria:"" ,
                    Imagem:"",
                    tamanho:0
                });
                props.setExibirTabela(true);
            }

        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor    = evento.target.value; 
        setProduto({...produto, [elemento]:valor});
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={produto.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={produto.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a nome do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <Form.Label>Preço</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="preco">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="preco"
                            name="preco"
                            aria-describedby="preco"
                            value={produto.preco}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de custo!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="categoria"
                        name="categoria"
                        value={produto.categoria}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a categoria do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <Form.Label>Imagem:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="Imagem"
                        name="Imagem"
                        value={produto.Imagem}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Tamanho:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="tamanho"
                        name="tamanho"
                        value={produto.tamanho}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o tamanho do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}