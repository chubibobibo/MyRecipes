import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function Navbar(title) {
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['access_tokens'])
    //function to remove the cookies and the id in localStorage
    const clickHandler = () => {
        setCookie('access_tokens', '');
        window.localStorage.removeItem('storedId')//pass the name of the variable that contains the id of user after setting it in localStorage.
        navigate('/')
        alert('Logged Out')
    }
    return (
        <div>
            <Nav variant="pills" defaultActiveKey='' className='navApp'>
                <Nav.Item>
                    <Nav.Link href="/index">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/">All Recipes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/newRecipe">New Recipe</Nav.Link>
                </Nav.Item>
                {!cookie.access_tokens ? <>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" {...title === '/login' && active} href="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" href="/register">
                            Register
                        </Nav.Link>
                    </Nav.Item> </> :
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" href="/logout" onClick={clickHandler}>Logout</Nav.Link>
                    </Nav.Item>
                }
            </Nav>
        </div >
    )
}
export default Navbar