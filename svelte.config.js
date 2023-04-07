import adapter from '@sveltejs/adapter-netlify';
 
export default {
  kit: {
    // default options are shown
    adapter: adapter({
      // if true, will create a Netlify Edge Function rather
      // than using standard Node-based functions
      edge: false,
 
      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app.
      // if `edge` is true, this option cannot be used
      split: false
    })
  }
};
<<<<<<< HEAD
=======

>>>>>>> 80a5050d1d40d8d80a860da6184e2832f4e71a97
