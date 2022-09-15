import Invaria2222 from 'components/pages/Invaria2222'

function App() {
  return <Invaria2222 />
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
