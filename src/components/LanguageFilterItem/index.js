const LanguageFilterItem = props => {
  const {eachLang, updateLang} = props
  const {id, language} = eachLang
  const onClickLang = () => {
    updateLang(id)
  }
  return (
    <>
      <button type="button" onClick={onClickLang}>
        {language}
      </button>
    </>
  )
}

export default LanguageFilterItem
