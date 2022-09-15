export const handleChangeLanguage = (router, lang) => {
  const { pathname } = router
  const [, ...pageArr] = pathname.split('/').filter(Boolean)
  const page = pageArr.join('/')
  const newPage = `/${lang}/${page}`
  router.push(newPage)
}

export const getCurrentLanguage = (router) => {
  const { pathname } = router
  const [currnetLang] = pathname.split('/').filter(Boolean)

  return currnetLang
}
