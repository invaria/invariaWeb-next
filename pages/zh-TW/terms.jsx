import TermsComp from 'components/pages/Terms'

function Terms() {
  return <TermsComp />
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

export default Terms
