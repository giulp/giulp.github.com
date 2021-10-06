import { starsString } from '@/modules/print-utils'
import { images, fonts, styles } from '@/modules/print-layout'

//

const IS_IMAGE      = true
const ALLFALSE      = [false,false,false,false]
const NOMARGIN      = [0,0,0,0]
const LASTFAUX      = { text: ' ', border: ALLFALSE, margin: NOMARGIN }
const BOTTOMONLY    = [false, false, false, true]
const FAUXROW       = [{text: ' ', colSpan: 2, border: ALLFALSE, style: 'fauxRow', margin: NOMARGIN }, LASTFAUX]

// const ICO_GROUPWORK = {text: findSymbolForClass('zmdi-group-work', ''),       style: { font: 'iconic' }}
// const ICO_COLLPLUS  = {text: findSymbolForClass('zmdi-collection-plus', ''),  style: { font: 'iconic' }}
// const ICO_KEY       = {text: findSymbolForClass('zmdi-key', ''),              style: { font: 'iconic' }}
// extra section hidden for now
// const ICO_HOME      = {text: findSymbolForClass('zmdi-home', ''),             style: { font: 'iconic' }}
// const ICO_GLOBE     = {text: findSymbolForClass('zmdi-globe', ''),            style: { font: 'iconic' }}

//

const _headFootLayout = body => ([
  {
    table: {
      headerRows: 0,
      widths: [ 'auto', '*', 'auto' ],
      body: body
    }
  }
])

const _headFootStack = (rows, isHead) => ({
  stack: rows,
  margin: isHead ? [0, 25, 0, 10] : undefined,
  border: ALLFALSE
})

const header = ({config, lang}) => _headFootLayout([
  [                   
    { image: 'giulpAvatar', width: 60, margin:[5,5], border: ALLFALSE },
    _headFootStack([
      { text: config.labels.pdf_title[ lang ], style: 'headerTitle', border: ALLFALSE },
      { text: 'giuliopicasso@gmail.com            skype: giuliopicasso', style: {fontSize: 8, font: 'exo', alignment: 'center'}, border: ALLFALSE}
    ], IS_IMAGE ),
    _headFootStack([
      { image: 'githubio', width: 60, margin:NOMARGIN },
      { text: "giulp.github.io", style: 'cornerLink', margin:NOMARGIN }
    ])
  ]
])

const footer = () => _headFootLayout([
  [                   
    _headFootStack([
      { image: 'linkedin', width: 60, margin:[5,5] },
      { text: "it.linkedin.com/in/giuliopicasso", style: 'cornerLink' }
    ]),
    LASTFAUX,                   
    _headFootStack([
      { image: 'stackoverflow', width: 60, margin:[5,5] },
      { text: "stackoverflow.com/users/3739756/giulp", style: 'cornerLink' }
    ])
  ]
])

//
const _layoutDevJob = (exp, lang) => ({ 
  table: { 
    widths: ['*', 'auto', '1'], border: ALLFALSE,
    body: [
      [
        {
          text: exp.title[ lang ],
          style: 'devTitle', bold: true, colSpan: 2, border: ALLFALSE, margin: [0, 0, 0, 0] 
        }, 
        LASTFAUX
      ],
      [
        {
          text: `${exp.workplace}${exp.time === undefined ? '' : ' - ' + exp.time}`, 
          style: 'devWorkplace', bold: true, border: ALLFALSE},
        LASTFAUX
      ],
      [
        {
          ul: ( exp.achievements === undefined || exp.achievements === null ) 
          ? [] 
          : [ ... exp.achievements].map( a => a[ lang ]),

          style: 'devDescr', colSpan: 2, border: ALLFALSE
        }, 
        LASTFAUX
      ]
    ]
  },
  pageBreak: exp.workplace === 'NewEntity s.r.l. Trieste' ? 'before' : undefined
})

const dev = ({config, resume, lang}) => ({ 
  table: { 
    widths: ['*'], margin: [0,5], border: ALLFALSE,
    body: [
      [{ text: config.menu.dev.name[ lang ], style: 'devCoaching', border: BOTTOMONLY }],
      [{ 
        table:{ 
          widths: ['*'], 
          body: [[{ 
            stack: resume.jobs.practice.map(j => _layoutDevJob(j, lang)), 
            border: ALLFALSE 
          }]], 
          border: ALLFALSE 
        }, 
        border: ALLFALSE
      }]
    ]
  }, 
  margin: [0,5]
})

const _layoutEdu = exp => ({ 
  table: { 
    widths: ['*', 'auto', '1'], border: ALLFALSE,
    body: [
      // [
      //   {
      //     text: exp.degree,
      //     style: 'devTitle', bold: true, border: ALLFALSE, margin: [0, 0, 0, 0] 
      //   }, 
      //   LASTFAUX
      // ],
      [
        {
          text: `${exp.degree ? ( exp.degree + ' - ' ) : '' }${exp.school} - ${exp.year}`, 
          style: 'devWorkplace', bold: true, border: ALLFALSE},
        LASTFAUX
      ],
      [
        {
          ul: [...exp.courses],

          style: 'devDescr', colSpan: 2, border: ALLFALSE
        }, 
        LASTFAUX
      ]
    ]
  },
  // pageBreak: exp.workplace === 'NewEntity s.r.l. Trieste' ? 'before' : undefined
})

const edu = ({config, resume, lang}) => ({ 
  table: { 
    widths: ['*'], margin: [0,5], border: ALLFALSE,
    body: [
      [{ text: config.labels.h1_education[ lang ], style: 'devCoaching', border: BOTTOMONLY }],
      [{ 
        table:{ 
          widths: ['*'], 
          body: [[{ 
            stack: resume.edu.map(_layoutEdu), 
            border: ALLFALSE 
          }]], 
          border: ALLFALSE 
        }, 
        border: ALLFALSE
      }]
    ]
  }, 
  margin: [0,10,0,0]
})

const _layoutCoachingJob = (coach, lang) => ({ 
  table: { 
    widths: ['*', 'auto', '1'], border: ALLFALSE,
    body: [
      [
        { 
          text: `${coach.time === undefined ? '' : coach.time + ' - '}${coach.workplace}`,
          style: 'devWorkplace', bold: true, border: ALLFALSE 
        },
        LASTFAUX
      ],
      [
        { 
          text: coach.title[ lang ], 
          style: 'devTitle', bold: true, colSpan: 2, border: ALLFALSE, margin: [0, 0, 0, 0] 
        },
        LASTFAUX
      ],
      [
        { 
          ul: ( coach.details === undefined || coach.details === null )
            ? [] 
            : coach.details.map(coach => coach.title),
          
          colSpan: 2, 
          border: ALLFALSE, 
          style: 'devDescr' 
        },
        LASTFAUX
      ]
    ]
  },
  pageBreak: coach.workplace === 'Edilmaster Trieste' ? 'before' : undefined
})

const coaching = ({config, resume, lang}) => ({ 
  table: { 
    widths: ['*'],
    body: [
      [{ 
        text: config.menu.coaching.name[ lang ], 
        style: 'devCoaching', 
        border: BOTTOMONLY 
      }],
      [{
        table: { 
          widths: ['*'], 
          body: [[{ 
            stack: resume.jobs.coaching.map( j => _layoutCoachingJob(j, lang) ), 
            border: ALLFALSE 
          }]],
          border: ALLFALSE
        }, 
        border: ALLFALSE 
      }]
    ]
  }, 
  margin: [0,5]
})

const _layoutSkill = sk => ({
  table: {
    widths: ['*', 'auto', '1'],
    body: [
      FAUXROW,
      [
        {text: sk.title, border: ALLFALSE, style: 'skillName', bold: true},
        { text: starsString(sk.stars), border: ALLFALSE, style: 'skillStars'}, 
        LASTFAUX
      ],
      [
        {text: sk.topics.join(' - '), colSpan: 2, style:'projDescr', border: ALLFALSE }, 
        LASTFAUX
      ]
    ], margin: [0, 0, 0, 0]
  }, margin: [0, 0, 0, 0]
})

const skills = ({config, resume, lang}) => (
  [{ 
    text: [
      // ICO_KEY, 
      ` ${config.labels.section_skill[ lang ]}`
    ],
    bold:true
  }]
  .concat(resume.skills.map(_layoutSkill))
)

const _layoutLang = (lng, lang) => ({ 
  stack: [
    {text: lng.title[ lang ], bold: true, style: 'langName', margin: [10,0,0,0]},
    {text: starsString( lng.stars ), style:{alignment: 'center'}}
  ], 
  border: [false,false,false,false]
})

const langs = ({config, resume, lang}) => ([
  { 
    text: [
      // ICO_GLOBE,
      config.labels.section_langs[ lang ]
    ],
    bold:true
  },
  ' ',
  {
    table: {
      widths: ['*','*','*','*','*','*','1'],
      body: 
      [
        resume.langs.map(l => _layoutLang(l, lang))
        .concat([LASTFAUX])
      ]
    }, margin: [0, 0, 0, 0]
  },
  ' '
])

// const _extra = (resume, lang) => {
//   return [{ text: [ICO_HOME, ' Extra'] }].concat(_data[ lang ].resume.extracurriculars.map(function(el){
//     return {
//       table: {
//         widths: ['auto', '*', '1'],
//         body: [FAUXROW,
//           [{text: el.title, border: ALLFALSE, style: 'skillName'},{ text: el.time, border: ALLFALSE, style: 'skillStars'},LASTFAUX]
//         ], margin: [0, 0, 0, 0]
//       }, margin: [0, 0, 0, 0]
//     }
//   }))
// }
// const _layoutProject = prj => ({
//   table: {
//     widths: ['*', 'auto', '1'],
//     body: [FAUXROW,
//       [{text: prj.title, border: ALLFALSE}, LASTFAUX],
//       [{text: prj.description, colSpan: 2, style: 'projDescr', border: ALLFALSE }, LASTFAUX]
//     ], margin: [0, 0, 0, 0]
//   }, margin: [0, 0, 0, 0]
// })

// const progetti = ({config, resume, lang}) => (
//   [{ 
//     text: [ICO_COLLPLUS, config.labels.h1_projects[ lang ]] 
//   }]
//   .concat(resume.projects.map(_layoutProject))
// )

//

const docDefinition = cv => ({
  pageSize: 'LETTER',
  pageMargins: [70,74,65,85],
  defaultStyle: { font: 'Ptsans' },
  styles: styles,
  header: () => header(cv),
  footer: footer,
  content: [ 
    dev(cv),
    coaching(cv),
    edu(cv),
    [{ stack: langs(cv),     border: [false,false,false,false], margin: [0, 20, 0, 6] }],
    [{ stack: skills(cv),    border: [false,true,false,false], margin: [0, 3, 0, 6], pageBreak: 'before' }],
  ],
  images: images
})

const openPdf = (builder, cv) => {

  if(!cv.config || ! cv.resume || ! cv.lang)
    throw Error('expected {config, resume, lang}')

  builder.fonts  = fonts
  const pdf = builder.createPdf(
    docDefinition(cv)
  )
  pdf.download('Giulio_Picasso_RESUME.pdf')
// pdf.open();
}

export { openPdf }