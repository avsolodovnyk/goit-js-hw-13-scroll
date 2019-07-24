'use strict';
import createMarkup from './createMarkup';
import Masonry from 'masonry-layout';
import InfiniteScroll from 'infinite-scroll';
import imagesLoaded from 'imagesloaded';
{
//   const refs = {
//   targetform: document.querySelector('#js-search-form'),
//   targetGallery: document.querySelector('#js-gallery'),

//   masonryOptions: {
//     columnWidth: '.grid-sizer',
//     itemSelector: '.grid-item',
//     percentPosition: true,
//     transitionDuration: '0.3s',
//     gutter: '.grid__gutter-sizer',
//     stagger: 30,
//     visibleStyle: { transform: 'translateY(0)', opacity: 1 },
//     hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
//   },
//   infiniteScrollOptions: {
//     path() {
//       return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=cat&page=${
//         this.pageIndex
//       }&per_page=12&key=13065886-3f8c1539ec248c8d73efef485`;
//     },
//     responseType: 'text',
//     history: false,
//     outlayer: masonryInstance,
//     status: '.page-load-status',
//   },
// };
// const masonryInstance = new Masonry('.grid', refs.masonryOptions);
// const infScrollInstance = new infiniteScroll(
//   refs.targetGallery,
//   refs.infiniteScrollOptions,
// );

// refs.targetform.addEventListener('submit', handelSubmit);
// function handelSubmit(event) {
//   event.preventDefault();
//   const keyword = event.currentTarget.elements[0].value;
//   refs.targetGallery.innerHTML = '';
//   console.log(keyword);
//   infScrollInstance.pageIndex = 1;
//   infScrollInstance.option={
//     path() {
//       console.log(keyword);
//       return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyword}&page=${
//         this.pageIndex
//       }&per_page=12&key=13065886-3f8c1539ec248c8d73efef485`;
//     },
//   };
//   const proxyElem = document.createElement('div');
//   infScrollInstance.on('load', function(response, url) {
//     const data = JSON.parse(response);
//     const itemsHTML = data.hits.map(createMarkup).join('');
//     proxyElem.innerHTML = itemsHTML;
//     const items = proxyElem.querySelectorAll('.photo-card');
//     infScrollInstance.appendItems(items);
//     masonryInstance.appended(items);
//     // imagesLoaded(items, );
//     imagesLoaded( items, function() {
//       infScrollInstance.appendItems( items );
//       masonryInstance.appended( items );
//       masonryInstance.layout();
//     });
    
//   });
//   infScrollInstance.loadNextPage();
// }
}

const refs = {
    targetform: document.querySelector('#js-search-form'),
    targetGallery: document.querySelector('#js-gallery'),}






refs.targetform.addEventListener('submit', handelSubmit);
function handelSubmit(event) {
  event.preventDefault();
  const keyword = event.currentTarget.elements[0].value;
  refs.targetform.reset();
  const infScroll = new InfiniteScroll( refs.targetGallery, {
    path() {
          return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyword}&page=${
            this.pageIndex}&per_page=12&key=13126426-945f384018c76d9f4b98b5024`;
          },
    responseType: 'text',
    outlayer: msnry,
    status: '.page-load-status',
    history: false,
  });
  
  const msnry = new Masonry( refs.targetGallery, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    transitionDuration: '0.3s',
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  });

const proxyElem = document.createElement('div');
infScroll.on( 'load', function( response ) {
  const data = JSON.parse(response);
      const itemsHTML = data.hits.map(createMarkup).join('');
      proxyElem.innerHTML = itemsHTML;
      const items = proxyElem.querySelectorAll('.photo-card');
  imagesLoaded( items, function() {
    infScroll.appendItems( items );
    msnry.appended( items );
  });
  
});

infScroll.loadNextPage();
}