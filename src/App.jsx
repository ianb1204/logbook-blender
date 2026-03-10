import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.scss'
import { useEffect } from 'react'
import Nav from './components/Nav'
import breadcrumbs from './content/breadcrumbs.json'
import { useTranslation } from 'react-i18next'

const acceptedLanguages = ['fr', 'en']

const App = () => {
  const { i18n } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()

  const lang = params.lang
  const tab = params['*']?.split('/')[0] ?? null

  const currentBreadcrumbs = breadcrumbs[lang]
  const pages = currentBreadcrumbs ? Object.keys(currentBreadcrumbs) : null

  const currentPage = tab && pages && pages.includes(tab) ? tab : 'home'

  useEffect(() => {
    if (!lang || !acceptedLanguages.includes(lang)) {
      navigate('/fr')
      return
    } else if(lang !== i18n.language) i18n.changeLanguage(lang)

    if (tab && pages && !pages.includes(tab)) navigate('/' + lang)
  }, [lang, tab, pages, navigate, i18n])

  const onCurrentPageChanged = (lang, pageId) => {
    navigate('/' + lang + (pageId ? '/' + pageId : ""))
  }

  if(!breadcrumbs[lang]) return null

  return (
    <div className="App">
      <Nav currentPage={currentPage} setCurrentPage={onCurrentPageChanged} breadcrumbs={breadcrumbs[params.lang]}/>
      <div className="AppContainer">
        <div className="AppContent">
          <Routes>
            <Route path={'/'} element={<>{"Hello World - 1"}</>}/>
            <Route path={'/home'} element={<>{"Hello World - 1"}</>}/>
            <Route path={'/*'} element={<>{"Hello World - 2"}</>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
