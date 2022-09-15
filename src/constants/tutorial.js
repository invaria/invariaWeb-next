const tutorialsList = (intl, currentLang) => [
  {
    question: intl.formatMessage({ id: 'tutorials_1_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'tutorials_1_desc' },
          {
            p1: (str) => (
              <span className="  text-invar-error font-semibold">{str}</span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'tutorials_2_title' }),
    answer: intl.formatMessage({ id: 'tutorials_2_desc' }),
  },
  {
    question: intl.formatMessage({ id: 'tutorials_3_title' }),
    answer: intl.formatMessage({ id: 'tutorials_3_desc' }),
  },
  {
    question: intl.formatMessage({ id: 'tutorials_4_title' }),
    answer: intl.formatMessage({ id: 'tutorials_4_desc' }),
  },
  {
    question: intl.formatMessage({ id: 'tutorials_5_title' }),
    answer: intl.formatMessage({ id: 'tutorials_5_desc' }),
  },
]

export default tutorialsList
