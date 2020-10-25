const RequestPromise = require('request-promise');
Cheerio = require('cheerio');

const getFootballNews = () => {
    const uri = 'https://www.skysports.com/football/news';
  
    let options = {
      uri,
      transform: function(body) {
        return Cheerio.load(body);
      }
    }
  
    return RequestPromise(options).then($ => {
      let articles = [];
      $('.news-list__item').each(function(i, elem) {
        let article = {
          title: $(this)
            .find('a.news-list__headline-link')
            .text()
            .trim(),
          image: $(this)
            .find('img.news-list__image')
            .attr('data-src'),
          date: $(this)
            .find('span.label__timestamp')
            .text()
            .trim(),
          link: $(this)
            .find('a.news-list__headline-link')
            .attr('href'),
          smallDescription: $(this)
            .find('.news-list__snippet')
            .text()
            .trim()
        };
        articles.push(article);
      });
      return articles;
    });
};

module.exports = {
    getFootballNews
}