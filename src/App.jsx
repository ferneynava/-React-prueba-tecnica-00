import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${}?fontSize=50&fontColor=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  // para recuperar la cita al cargar la página
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        if (!res.ok) {
          setFactError('No se pudo obtener la cita')
        }
        return res.json()
      })
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // para recuperar la imagen cada vez que tenemos una cita nueva

  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
    // const firstWord = fact.split(' ', 3).join(' ') Otra forma es opcional el split recibe dos parametros el ultimo parametro es la cantidad de elemetos que queremos tomar
    // del array.
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response
        setImageUrl(`${_id}/says/${threeFirstWords}`)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the firstrhee words for ${fact}`} />}
      </section>
    </main>
  )
}
export default App
