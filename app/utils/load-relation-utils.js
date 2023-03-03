export async function loadAllVendorsForEenheid(store, eenheid) {
  const pageSize = 20;
  let vendors = [];
  const firstPage = await store.query('vendor', {
    'filter[can-act-on-behalf-of][:id:]': eenheid.id,
    'page[size]': pageSize,
  });
  const count = firstPage.meta.count;
  firstPage.forEach((result) => vendors.push(result));
  let pageNumber = 1;
  while (pageNumber * pageSize < count) {
    const pageResults = await store.query('vendor', {
      'filter[can-act-on-behalf-of][:id:]': eenheid.id,
      'page[size]': pageSize,
      'page[number]': pageNumber,
    });
    pageResults.forEach((result) => vendors.push(result));
    pageNumber++;
  }
  return vendors;
}

export async function loadAllBestuurseenheidenForVendor(store, vendor) {
  const pageSize = 20;
  let eenheden = [];
  const firstPage = await store.query('bestuurseenheid', {
    'filter[vendors][:id:]': vendor.id,
    'page[size]': pageSize,
  });
  const count = firstPage.meta.count;
  firstPage.forEach((result) => eenheden.push(result));
  let pageNumber = 1;
  while (pageNumber * pageSize < count) {
    const pageResults = await store.query('bestuurseenheid', {
      'filter[vendors][:id:]': vendor.id,
      'page[size]': pageSize,
      'page[number]': pageNumber,
    });
    pageResults.forEach((result) => eenheden.push(result));
    pageNumber++;
  }
  return eenheden;
}
