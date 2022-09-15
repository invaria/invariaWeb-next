import Homepage from 'components/pages/homepage'

function App() {
  return <Homepage />
}

export async function getServerSideProps(context) {
  const { resolvedUrl } = context
  const [lang] = resolvedUrl.split('/').filter(Boolean)

  return {
    props: {
      lang,
    },
  }
}

export default App
