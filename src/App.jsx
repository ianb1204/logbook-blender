import { useNavigate, useParams } from 'react-router-dom'
import './App.scss'
import { useEffect, useMemo } from 'react'
import Nav from './components/Nav'
import breadcrumbs from './content/breadcrumbs.json'
import { useTranslation } from 'react-i18next'
import MarkdownReader from './components/MarkdownReader'
import Menu from './components/Menu'

const acceptedLanguages = ['fr', 'en']

const App = () => {
  const { i18n } = useTranslation()

  const navigate = useNavigate()
  const params = useParams()

  const lang = params.lang

  const path = useMemo(() => {
    if (!params['*']) return []
    return params['*'].split('/')
  }, [params])

  const languageBreadcrumbs = useMemo(() => {
    return breadcrumbs[lang]
  }, [lang])

  useEffect(() => {
    if (!lang || !acceptedLanguages.includes(lang)) {
      navigate('/fr')
      return
    } else if(lang !== i18n.language) i18n.changeLanguage(lang)

    let currentBreadcrumbs = {...languageBreadcrumbs}
    let currentPath = []
    for(const page of path){
      let pageKey = page ?? "home"
      if(currentBreadcrumbs[pageKey]) {
        currentBreadcrumbs = currentBreadcrumbs[pageKey]
        currentPath.push(pageKey)
      } else{
        navigate('/' + lang + (currentPath.length > 0 ? '/' + currentPath.join('/') : ""))
      }
    }
  }, [lang, languageBreadcrumbs, path, navigate, i18n])

  const onCurrentPathChanged = (lang, newPath) => {
    navigate('/' + lang + (newPath && newPath.length > 0 ? '/' + newPath.join('/') : ""))
  }

  const modules = import.meta.glob("./content/**/*.md", { query: '?raw' });

  const buildModulesURL = (lang, path) => {
    let f = breadcrumbs[lang]
    for(const pathItem of path) f = f[pathItem]

    if(!f) return

    const url = './content/' + lang + (path.length > 0 ? '/' + path.join('/') : '') + (typeof f !== "string" ? '/' + f['home'] :  '.md')
    return url
  }

  if(!languageBreadcrumbs) return null

  const currentTab = path.length > 0 && path[0] ? path[0] : 'home'
  const currentPage = path.length === 1 && !path[0] ? 'home' : path[path.length -1]
  let hasMenu = typeof languageBreadcrumbs[currentTab] !== "string" && Object.keys(languageBreadcrumbs[currentTab]).length > 1

  return (
    <div className="App">
      <Nav currentTab={currentTab} setCurrentPath={onCurrentPathChanged} tabs={Object.keys(languageBreadcrumbs)}/>
      <div className="AppContainer">
        <div className="AppContent">
          {hasMenu && <Menu currentTab={currentTab} currentPage={currentPage} breadcrumbs={languageBreadcrumbs[currentTab]} setCurrentPath={(newPath)=>onCurrentPathChanged(lang, newPath)}/>}
          <div className="Page">
            <MarkdownReader file={modules[buildModulesURL(lang, path)]}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
