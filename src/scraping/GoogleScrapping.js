const fixHtmlSpecialEntities = require('../utils/fixHtmlSpecialEntities')

module.exports = {
    
    getTitlesAndLinks: htmlData => {

        // Os resultados ficam dentro da div "r"
        // Iremos pegar todas essas divs e separar em um array
        const data = htmlData.match(/<div class="r">(.*?)<\/h3>/gi)          
        
        if(data !== null){ // Isso significa que temos resultados pela keyword pesquisada

            // Array auxiliar para retorno
            const arr = []

            data.forEach(element => {
                //Extracao do titulo e link de cada resultado
                let title = fixHtmlSpecialEntities(element.match(/<h3 class=(.*?)>(.*?)<\/h3>/gi).join().replace(/<h3 (.*?)>/, '').replace('</h3>', ''))
                let link = element.match(/<a(.*?)"(.*?)"/gi).join().replace(/<a(.*?)"/gi, '').replace('"', '')

                //Montagem do array de retorno            
                arr.push({
                    title,
                    link
                })            
            })

            return arr
        }        
    },

    getResultStat: htmlData => {
        // Iremos pegar a quantidade de resultados
        // Ficam dentro da div "resultStats"

        const data = htmlData.match(/<div id="resultStats">(.*?)<\/div>/gi)

        if(data !== null){

            const dataStr = data.join().toLowerCase()

            if(dataStr.includes('aproximadamente')){
                
                return parseInt(
                    dataStr.substring(
                        dataStr.lastIndexOf("aproximadamente") + 'aproximadamente'.length + 1, 
                        dataStr.lastIndexOf("resultados") - 1
                    ).replace(/\./g, '')
                )
            }
        }

        return 0
    }
}