var Resume = angular.module("Resume", []);
Resume.controller("resumeController", function($scope, $http) {
  // References: Available on request
  $scope.data = {
    "it": null,
    "en": null,
    "countries": null
  };

  $scope.range = function(count){
    var ratings = []; 
    for (var i = 0; i < count; i++)
      ratings.push(i);
    return ratings;
  };
  
  $http.get("json/countries.json")
    .success(function(response){
      var countries = {
        "it": {
          "view": "Visualizza in italiano",
          "flag": response
            .filter(function(e) { return e.isoAlpha2 == "IT"; })
            .map(function(o) { return o.flag; })
            .shift()
        },
        "en": {
          "view": "View in english",
          "flag": response
            .filter(function(e) { return e.isoAlpha2 == "GB"; })
            .map(function(o) { return o.flag; })
            .shift()
        }
      };
      $scope.data.countries = countries;
    });

  $http.get("json/lang/it.json")
    .success(function(response){
      $scope.data.it = response;
    });

  $http.get("json/lang/eng.json")
    .success(function(response){
      $scope.data.en = response;
    });


  $scope.openPdf = function(){

    var _data  = $scope.data;
    var lang   = $scope.lang;
    var styles = {
      headerTitle: {
        alignment: 'center',
        font: 'exo',
        fontSize: 18
      },
      cornerLink: {
        alignment: 'center',
        fontSize: 5
      },
      devCoaching: { fontSize: 14 },
      devDescr: { fontSize: 7.5 },
      devTitle: { fontSize: 8 },
      devWorkplace: { fontSize: 7 },
      devTime: {
        fontSize: 7,
        alignment: 'right'
      },
      fauxRow: { fontSize: 1 },
      projDescr: { fontSize: 7 },
      skillName: { fontSize: 7.5},
      langName: {
        fontSize: 6.5,
        alignment: 'left'
      },
      skillStars: {
        alignment: 'right',
        fontSize: 7.5
      }
    };
    var images = {
      giulpAvatar:    'data:image/jpeg;base64,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',
      githubio:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKAQMAAABB54RGAAAABlBMVEX///8AAABVwtN+AAABaElEQVRoge2aW46EIBBFK3EBLsmtuyQXYMJAPcC2ncn8USbnfijCoX9uKC/YIgghhNDbVFxnba/tIkuprejeQVOh9tCo7aiNrY7HpD4KmgZtJu51rHY3T63vFDUbNCuqxlpLQN+C+jIETYnqzezUd9ryj/oKOgntgcQrp13+zi6gk9DLJPV0O5bfANDpqHnaTdTHmiFH9gdNhGr3zVNPJXIrmqDT0VIUsBjS7I39mScV0Hxou5jF2mpnH6Xv1EDToGqnpXt1V9eiVc7vlx1oCtSB4scejt7rK+hs9JLurXt1T2OnBpoItW49+9WTeq+cMSCgmVCzriWQQdmKLMfnb4LORz8meQyJTdp9GYLORt3ESI6R/U8Zk0DzoPawjhXoh/Q+CTQXGh9X1N/4rlLKk7GgaVCxf2+Myvl1+giaB72ERtupPWzNQGejeuvHHmqslc/nsA86E3XFK24XuU7aQTOhCCGE0Dv0A2zoXxmqlitkAAAAAElFTkSuQmCC',
      stackoverflow:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyAQMAAADS6sNKAAAABlBMVEX///8AAABVwtN+AAABsklEQVR4nO2aUW6EMAxELXEAjrRX50gcYCUXbE8MoWr/Ws1q5iOE5WV/MnHsgJkkSZIkSf8jL73NXvtx/zp6+cu24tkmnpfPm/Wk9sWjiZEH/74h4jn5Neb+9MPRyZGbLdU7jSL+I/iLFXwfHhH/KTysYOmM+g/x7HxcAkUAL/0W/8Uz8KXibw2eieflJ8Wz2K9/osTT8DXjK0zhWVT5uXMv1Yjn5buUynrZRub9wlKfnCGeiUfadWqvVR6mCI/YQ+LZeDRdLx9akIPbHB/EU/ERsb3OMxdHKO//uOfg4sn4rqLccVRt5QevonkTT8wDra0aCZiPQ82bxHPxlnNvteg7itftI56Lp+I798qeT1XUwz/iufiY8QSylCoXQM94Lp6KbypNgfRsLPrJD+IJ+V7lkYVZF1qP+ks8Ge+ZW/dbRNRYjqRbPC1/HWnYrw1VVA0ST8vXvI/3icnjvMuf8Vw8F7/FJVe53c5DrOwx52/iqfg+1hp+GCP9u3xbPCfv/SleG2WWeGK+ku5a9PieRzw1HxfwmW/bxR6Peko8Fd9h2zuKhzPwQDwxL0mSJEnSX+oLDDvZqBA/NMoAAAAASUVORK5CYII=',
      linkedin:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyAQMAAADS6sNKAAAABlBMVEX///8AAABVwtN+AAABsUlEQVR4nO2ZTW7EIAyFLc0BOFKuzpFygJEoGP8wCaq6avui9xYkwEc2GGM7IhRFURRF/Y2a6d3fy1tajbFafK6Sx+VnR9EyFslrAt4NhDwmX3TvYy4XjW8MQyH/CH7ODckxGiH/KF6OcwyUd/hz8k/gJaizn3JrfuL/ySPwJruvPxqfI4/LLzqaevHR9Pt6z5AH423Hde/7Ue+L3LMf2j0vK8mD8TUNII56qsounyIPw5uK1UPMAPTtGoqRx+T1WNu2p3n07u68k8fi84BPA5gKSt07eVx+mkJkUdZtVhTZ+HPyUHzmyxpquz342MZ+yEPxagqL7/5IleWWWZHH4m1Ry1RZPHOeb1d/Th6Kb1aRjh9M7s/bUgMjj8tf/kccSp7xoXKP38hj8WYF+VPCpvRDN/9PHowf7bCCXK4399S0FvKw/LKy+d2cXtwWkYflbd+bR9kReXuh5B6PkUfiqz48X04v7qWQrT8nj8N7PLZWMSPo3vh/8qD8GJ4n3075aylqkn8Eb0DxevWQCHlgXh9pD+fqytf0ijwkb3J+lqqXpPmb+I38/+cpiqIoivpNfQGyWbhC87B57QAAAABJRU5ErkJggg=='
    };

    var ALLFALSE      = [false,false,false,false];
    var NOMARGIN      = [0,0,0,0];
    var BOTTOMONLY    = [false, false, false, true];
    var LASTFAUX      = { text: ' ', border: ALLFALSE, margin: NOMARGIN };
    var FAUXROW       = [{text: ' ', colSpan: 2, border: ALLFALSE, style: 'fauxRow', margin: NOMARGIN }, LASTFAUX];

    var ICO_GROUPWORK = {text: findSymbolForClass('zmdi-group-work', ''),       style: { font: 'iconic' }};
    var ICO_COLLPLUS  = {text: findSymbolForClass('zmdi-collection-plus', ''),  style: { font: 'iconic' }};
    var ICO_KEY       = {text: findSymbolForClass('zmdi-key', ''),              style: { font: 'iconic' }};
    var ICO_HOME      = {text: findSymbolForClass('zmdi-home', ''),             style: { font: 'iconic' }};
    var ICO_GLOBE     = {text: findSymbolForClass('zmdi-globe', ''),            style: { font: 'iconic' }};
    var ICO_STAR      = {text: findSymbolForClass('zmdi-plus-square', ''),      style: { font: 'iconic' }};
    var ICO_STAR_0    = {text: findSymbolForClass('zmdi-square-o', ''),         style: { font: 'iconic' }};
    pdfMake.fonts  = {
      exo: {
        normal: 'Exo-Regular.ttf',
        bold: 'Exo-Bold.ttf',
        italics: 'Exo-Italic.ttf'
      },
      Ptsans: {
        normal: 'PTSans-Regular.ttf',
        bold: 'PTSans-Bold.ttf',
        italics: 'PTSans-Italic.ttf',
        bolditalics: 'PTSans-BoldItalic.ttf'
      },
      iconic: {
        normal: 'Material-Design-Iconic-Font.ttf'
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };

    function findSymbolForClass(selector) {
      var result = '';
      var sheets = document.styleSheets;

      for (var sheetNr = 0; sheetNr < sheets.length; sheetNr++) {
        var content = findCSSRuleContent(sheets[sheetNr], selector);

        if (content) {
          result = stripQuotes(content);
          break;
        }
      }
      return result;
    };
    function findCSSRuleContent(mySheet, selector) {
      try {
        if(!mySheet.cssRules)
          return;
      }
      catch(e) {
        if(e.name !== 'SecurityError')
          throw e;
        return;
      }
      var ruleContent = '';
      var rules = mySheet.cssRules ? mySheet.cssRules : mySheet.rules;

      for (var i = 0; i < rules.length; i++) {
        var text = rules[i].selectorText;
        if (text && text.indexOf(selector) >= 0) {
          ruleContent = rules[i].style.content;
          break;
        }
      }

      return ruleContent;
    };
    function stripQuotes(s) { return s.slice(1, s.length - 1); };
    function starsString(stars){
      if(stars == undefined) return ' ';

      var i = 0;
      var j = 0;
      var ret  = [];
      var empty = 5 - stars;

      while(i < stars){ ret.push(ICO_STAR); i++; }
      while(j < empty){ ret.push(ICO_STAR_0); j++; }

      return ret;
    };

    function _header(){
      // you can apply any logic and return any valid pdfmake element
      return [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: [ 'auto', '*', 'auto' ],
            body: [
              [                   
                { image: 'giulpAvatar', width: 60, margin:[5,5], border: ALLFALSE },
                { stack: [
                  { text: _data[lang].general.pdf_title, style: 'headerTitle', border: ALLFALSE },
                  { text: 'giuliopicasso@gmail.com            skype: giulio.picasso', style: {fontSize: 8, font: 'exo', alignment: 'center'}, border: ALLFALSE}
                  ], margin: [0, 25, 0, 10], border: ALLFALSE
                },
                {
                  stack:[
                    { image: 'githubio', width: 60, margin:NOMARGIN },
                    { text: "giulp.github.io", style: 'cornerLink', margin:NOMARGIN }
                  ], 
                  border: ALLFALSE
                }
              ]
            ]
          }
        }
      ]
    };
    function _footer() {
      return [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: [ 'auto', '*', 'auto' ],
            body: [
              [                   
                {
                  stack:[
                    { image: 'linkedin', width: 60, margin:[5,5] },
                    { text: "it.linkedin.com/in/giuliopicasso", style: 'cornerLink' }
                  ],
                  border: ALLFALSE
                },
                LASTFAUX,                   
                {
                  stack:[
                    { image: 'stackoverflow', width: 60, margin:[5,5] },
                    { text: "stackoverflow.com/users/3739756/giulp", style: 'cornerLink' }
                  ],
                  border: ALLFALSE
                }
              ]
            ]
          }
        }
      ] 
    };
    function _dev(){
      var exps = JSON.parse(JSON.stringify(_data[lang].resume.experience.dev));
      var elenco = [{ text: [ICO_GROUPWORK, _data[lang].general.main_dev], margin: [0, 0, 0, 5] }]
        .concat(exps.map(function(el, i){
          // console.log(el.achievements);return ' ';
          achievements = el.achievements == undefined ? [] : el.achievements;
          return { table: { widths: ['*', 'auto', '1'], border: ALLFALSE,
            body: [
              [{text: el.title, style: 'devTitle', bold: true, colSpan: 2, border: ALLFALSE, margin: [0, 0, 0, 0] }, LASTFAUX],
              [{text: el.workplace, style: 'devWorkplace', bold: true, border: ALLFALSE}, { text: el.time, style: 'devTime', border: ALLFALSE}, LASTFAUX],
              [{ul: achievements, style: 'devDescr', colSpan: 2, border: ALLFALSE}, LASTFAUX]
            ]}};
        }));
      return { table: { widths: ['*'], margin: [0,5], border: ALLFALSE,
          body: [
            [{ text: _data[lang].general.menu_dev, style: 'devCoaching', border: BOTTOMONLY }],
            [{ table:{ widths: ['*'], body: [[ { stack: elenco, border: ALLFALSE } ]], border: ALLFALSE }, border: ALLFALSE }]
          ]}};
    };
    function _coaching(){
      var elenco = [{ text: [ICO_GROUPWORK, _data[lang].general.main_dev], margin: [0, 0, 0, 5] }]
        .concat(_data[lang].resume.experience.mentoring.map(function(el, i){
          var details = el.details == undefined ? [] : el.details.map(function(el){return el.title;});
          return { table: { widths: ['*', 'auto', '1'], border: ALLFALSE,
              body: [
                [{text: el.title, style: 'devTitle', bold: true, colSpan: 2, border: ALLFALSE, margin: [0, 0, 0, 0]}, LASTFAUX],
                [{text: el.workplace, style: 'devWorkplace', bold: true, border: ALLFALSE}, { text: el.time, style: 'devTime', border: ALLFALSE}, LASTFAUX],
                [{ul: details, colSpan: 2, border: ALLFALSE, style: 'devDescr' }, LASTFAUX]
              ]}};
      }));
      return { table: { widths: ['*'], body: [
            [{ text: _data[lang].general.menu_coaching, style: 'devCoaching', border: BOTTOMONLY }],
            [{ table:{ widths: ['*'], border: ALLFALSE, body: [ [{ stack: elenco, border: ALLFALSE } ]] }, border: ALLFALSE }]
          ]}, margin: [0,5], pageBreak: 'before'};
    };
    function _skills(){
      return [{ text: [ICO_KEY, ' ' + _data[lang].general.section_skill] }].concat(_data[lang].resume.skills.map(function(el, i){
        var stars = starsString(el.stars);
        return {
          table: {
            widths: ['*', 'auto', '1'],
            body: [FAUXROW,
              [{text: el.title, border: ALLFALSE, style: 'skillName', bold: true},{ text: stars, border: ALLFALSE, style: 'skillStars'}, LASTFAUX],
              [{text: el.skills.join(' - '), colSpan: 2, style:'projDescr', border: ALLFALSE }, LASTFAUX]
            ], margin: [0, 0, 0, 0]
          }, margin: [0, 0, 0, 0]
        };
        return ' '
      }));
    };
    function _langs(){
      return [
        { text: [ICO_GLOBE, ' ' + _data[lang].general.section_langs] },
        ' ',
        {
          table: {
            widths: ['*','*','*','*','*','*','1'],
            body: 
            [
              _data[lang].resume.langs.map(function(el, i){ 
                return { stack: [
                {text: el.title, bold: true, style: 'langName', margin: [10,0,0,0]},
                {text: starsString(el.stars), style:{alignment: 'center'}}
                ], border: [false,false,false,false]};
              }).concat([LASTFAUX])
            ]
          }, margin: [0, 0, 0, 0]
        },
        ' '
      ];
    };
    function _progetti(){
      return [{ text: [ICO_COLLPLUS, _data[lang].general.h1_projects] }].concat(_data[lang].resume.projects.map(function(el, i){
        return {
          table: {
            widths: ['*', 'auto', '1'],
            body: [FAUXROW,
              [{text: el.title, border: ALLFALSE}, { text: el.time, border: ALLFALSE, style: 'skillStars'}, LASTFAUX],
              [{text: el.description, colSpan: 2, style: 'projDescr', border: ALLFALSE }, LASTFAUX]
            ], margin: [0, 0, 0, 0]
          }, margin: [0, 0, 0, 0]
        };
      }));
    };
    function _extra(){
      return [{ text: [ICO_HOME, ' Extra'] }].concat(_data[lang].resume.extracurriculars.map(function(el, i){
        return {
          table: {
            widths: ['auto', '*', '1'],
            body: [FAUXROW,
              [{text: el.title, border: ALLFALSE, style: 'skillName'},{ text: el.time, border: ALLFALSE, style: 'skillStars'},LASTFAUX]
            ], margin: [0, 0, 0, 0]
          }, margin: [0, 0, 0, 0]
        }
      }));
    };
    var docDefinition = {
      pageSize: 'LETTER',
      pageMargins: [70,74,65,85],
      defaultStyle: { font: 'Ptsans' },
      styles: styles,
      header: _header,
      footer: _footer,
      content: [ 
        _dev(),
        _coaching(),
        { border: ALLFALSE, pageBreak: 'before', table:{ widths: ['*'],
            body: [
              [{ stack: _skills(),    border: [false,true,false,false], margin: [0, 3, 0, 6] }],
              [{ stack: _langs(),     border: [false,true,false,false], margin: [0, 3, 0, 6] }],
              [{ stack: _progetti(),  border: [false,true,false,false], margin: [0, 3, 0, 6] }],
              [{ stack: _extra(),     border: [false,true,false,false], margin: [0, 3, 0, 6] }]
            ], border: ALLFALSE
          }}
        ],
        images: images
    };
    var pdf = pdfMake.createPdf(docDefinition);
    pdf.download();
    // pdf.open();
  };
});