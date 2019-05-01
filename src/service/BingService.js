const axios = require('axios');
const bingScrapping = require('../scraping/BingScrapping')

module.exports = {    

    async search(keyword, first) {

        const normalizedKeyword = encodeURIComponent(keyword)

        return axios({
            method: 'get',
            url: `https://www.bing.com/search?q=${normalizedKeyword}&first=${first}`,
            
            headers: {
                'Accept-Charset': 'utf-8',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0'
            },

        }).then(response => {
            
            return {
                titlesAndLinks: bingScrapping.getTitlesAndLinks(response.data),
                resultStat: bingScrapping.getResultStat(response.data)          
            }
        })
    }
}