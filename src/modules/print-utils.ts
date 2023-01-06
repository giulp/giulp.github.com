const ICO_STAR      = {text: findSymbolForClass('zmdi-plus-square'),      style: { font: 'iconic' }}
const ICO_STAR_0    = {text: findSymbolForClass('zmdi-square-o'),         style: { font: 'iconic' }}

function _stripQuotes(s: string) {
    return s.slice(1, s.length - 1)
}

function _findCSSRuleContent(mySheet: any, selector: string){
    try {
        if(mySheet.cssRules !== undefined && mySheet.cssRules !== null){
            for (const r of mySheet.cssRules || mySheet.rules) {
                if (r.selectorText && r.selectorText.indexOf(selector) >= 0) {
                    return r.style.content
                }
            }
        }
    }
    catch(e: any) {
        if(e.name !== 'SecurityError')
            throw e
    }
    return ''
}

function findSymbolForClass(selector: string) {
    const iconicSheet = [...document.styleSheets].find(s => s.title === 'iconic')
    if(iconicSheet){
        return _stripQuotes(_findCSSRuleContent(iconicSheet, selector))
    }
}

function starsString(stars: number) {
    const STARSLOTS = 5
    if (stars)
        return [...Array(STARSLOTS)].map((_, i) => (i < stars) ? ICO_STAR : ICO_STAR_0)
    else
        return ' '
}

export { findSymbolForClass, starsString }