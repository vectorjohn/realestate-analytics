
function spiceUp(listing, src) {
  listing.daysListed = Math.floor((new Date(listing.dpending) - new Date(listing.dlist)) / (24 * 60 * 60000));
  var diff = listing.list && listing.sale && (parseInt(listing.sale.replace('$', '')) - parseInt(listing.list.replace('$', '')));

  if (diff === ''){
    diff = '';
  } else {
    diff = (diff < 0 ? '-' : '') + '$' + Math.abs(diff);
  }
  listing.saleMinusListPrice = diff;

  return listing;
}

function toCsv(listings) {
  var first = listings[0];
  var headings = Object.keys(first);

  return [headings.join(',')].concat(listings.map(function(l) {
    return headings.map(function(h) {
      return l[h];
    }).join(',');
  })).join('\n');
}

console.log(toCsv($('.reportItemHeader')
  .map(function() {
    var header = $(this);
    var body = header.next('.REPORT_STDBOX');
    var base = {
      mls: header.find('b').text().split(' ')[1],
      list: body.find(".V2R_LB:contains('List Price:')").next().text().replace(',', '').replace(' ', ''),
      sale: body.find(".V2R_LB:contains('Sold:')").next(":contains('$')").text().replace(',', '').replace(' ', ''),
      addr: body.find(".V2R_LB:contains('Addr:')").next().clone().children().remove().end()[0].textContent,
      dpending: body.find(".V2R_LB:contains('Pend:')").next().text(),
      dlist: body.find(".V2R_LB:contains('List Date')").next().text(),
      bsmtFnd: body.find(".V2R_LB:contains('Bsmt/Fnd:')").next().text(),
      terms: body.find(".V2R_LB:contains('Terms:')").next().text(),
      totalSqft: body.find(".V2R_LB:contains('Total SQFT:')").next().text(),
      upperSqft: body.find(".V2R_LB:contains('Upper SQFT:')").next().text(),
      mainSqft: body.find(".V2R_LB:contains('Main SQFT:')").next().text(),
      lowerSqft: body.find(".V2R_LB:contains('Lower SQFT:')").next().text()
    };

    return spiceUp(base, body);
  }).toArray()));

