import { useNavigate, useParams } from 'react-router-dom'
import './App.scss'
import { useEffect } from 'react'

const acceptedLanguages = ['fr', 'en']

const App = () => {
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    const lang = params.lang
    if(!lang || acceptedLanguages.indexOf(lang) < 0) navigate('/fr')
  }, [params, navigate])

  return (
    <div className="AppContainer">
      {"Hello world"}
    </div>
  )
}

export default App
