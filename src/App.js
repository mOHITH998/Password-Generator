import {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { includeUpperCase, includeLowerCase, includeNumbers, includeSymbols } from './components/Characters'
import  {success}from './components/Message'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Footer from './components/Footer';

const App = () => {

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(18)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const notify = (success, isError = false) => {
    if(isError) {
     toast.error(success, {
       position: 'top-center'
     })
    } else {
      toast(success, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  const generatePasswordHandler = e => {

    if (!upperCase && 
      !lowerCase && 
      !numbers && 
      !symbols
      ){
   notify('You must Select atleast one option')
    }

    let characterList = ''

    if (lowerCase) {
      characterList = characterList + includeLowerCase
    }

    if (upperCase) {
      characterList = characterList + includeUpperCase
    }

    if (numbers) {
      characterList = characterList + includeNumbers
    }

    if (symbols) {
      characterList = characterList + includeSymbols
    }
    setPassword(generatePassword(characterList))
  }
    const generatePassword = characterList => {
      let password = ''
      const characterListLength = characterList.length

      for (let i = 0; i < passwordLength; i++) {
        const index = Math.round(Math.random() * characterListLength)
        password = password + characterList.charAt(index)
      }
      return password
    }

  const clipBoardHandler = (e) => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const copyPasswordHandler = (e) => {
    if(password === '') {
      notify('Nothing To Copy', true)
    } else {
      clipBoardHandler(
        notify(success)
      )
    }
  }
  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='gen-header'> 
      <i className='fas fa-key'></i> Password Generator</h2>
          <div className='gen-pass'>
            <h3>{password}</h3>
            <button
              onClick={copyPasswordHandler}
              className='copy__btn'
            ><i className='fas fa-clipboard'></i>
            </button>
          </div>

          <div className='form-group'>
            <Form.Label>Password Length</Form.Label>
            <Form.Control
              as='select'
              value={passwordLength}
              onChange={(e => setPasswordLength(e.target.value))}
            >
              <option val='18'>18</option>
              <option val='24'>24</option>
              <option val='32'>32</option>
            </Form.Control>
          </div>

          <div className='form-group'>
            <Form.Label>
              Include Upper Case
        </Form.Label>
            <Form.Control
              type='checkbox'
              checked={upperCase}
              onChange={e => setUpperCase(e.target.checked)}
            ></Form.Control>
          </div>

          <div className='form-group'>
            <Form.Label> Include Lower Case</Form.Label>
            <Form.Control
              type='checkbox'
              checked={lowerCase}
              onChange={e => setLowerCase(e.target.checked)}
            ></Form.Control>
          </div>
          <div className='form-group'>
            <Form.Label> Include Numbers</Form.Label>
            <Form.Control
              type='checkbox'
              checked={numbers}
              onChange={e => setNumbers(e.target.checked)}
            ></Form.Control>
          </div>
          <div className='form-group'>
            <Form.Label> Include Symbols</Form.Label>
            <Form.Control
              type='checkbox'
              checked={symbols}
              onChange={e => setSymbols(e.target.checked)}
            ></Form.Control>
          </div>
          <Button type='submit' className='btn' onClick={generatePasswordHandler}>Generate Password</Button>
        </div>
        <Footer />
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
{/* Same as */}
<ToastContainer />
     
    </div>

  )
}

export default App
