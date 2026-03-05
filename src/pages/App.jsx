import { useNavigate, useParams } from 'react-router-dom'
import './App.scss'
import { useEffect } from 'react'

const acceptedLanguages = ['fr', 'en']

const App = (props) => {
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    const lang = params.lang
    if(!lang || acceptedLanguages.indexOf(lang) < 0) navigate('/fr')
  }, [params])

  return (
    <div className="AppContainer">
      {params.lang}
    </div>
  )
}

export default App
