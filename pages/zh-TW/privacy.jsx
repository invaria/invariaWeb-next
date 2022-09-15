import PrivacyComp from 'components/pages/Privacy'

function Privacy() {
  return <PrivacyComp />
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

export default Privacy
