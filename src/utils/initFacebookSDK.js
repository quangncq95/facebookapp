const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export default function initFacebookSDK() {
  return new Promise((resolve,reject) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId            : facebookAppId,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v14.0'
      });

      // auto authenticate with the api if already logged in with facebook
      resolve()
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
