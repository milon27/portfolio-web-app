import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'

const Login = () => {

    const [username, setUsername] = useState("")



    return (
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col className="" md={6}>
                    <h1 className="text-center mb-3">Login Now!</h1>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }

                            }
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
                        <FormControl
                            placeholder="Password"
                        />
                    </InputGroup>
                    <div className="text-center">
                        <Button >Login Now</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
