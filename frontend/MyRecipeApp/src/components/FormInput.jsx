import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';



function FormInput({ formName, handleChange, handleSubmit, formData }) {

    return (
        <div className='formContainer'>
            <Card className='formCard'>
                <Card.Body className='formBody'>
                    <Card.Title className='formTitle'>{formName}</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Username" onChange={handleChange} name='username' value={formData.username} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} name='password' value={formData.password} />
                        </FloatingLabel>
                        <Button variant="outline-secondary" className='regBtn' type='submit'>{formName}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FormInput