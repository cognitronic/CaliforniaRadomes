/**
 * Created by Danny Schreiber on 6/20/14.
 */

app.directive('crHighlightContainer', function(){
   function link(scope, element, attr){
       element.on('mouseenter', function(){
           element.addClass('highlighted_column');
       }).on('mouseleave', function(){
               element.removeClass('highlighted_column');
           });
   }

    return {
        link:link
    }
});

app.directive('crMainSlider', function(){
    function link (scope, element, attr){
        element.revolution({
            delay:5000,
            startwidth: 1000,
            startheight: 770,
            navigationType:'bullet',
            navigationArrows:'none',
            touchenabled:'off',
            fullWidth:'on',
            fullScreen:'on',
            shadow:0
        });
    }

    return {
        link: link
    }
});

app.directive('crIsActive', function($location){
   function link(scope, element, attr){
       element.on('click', function(){

           console.log('attr: ' + attr.crIsActive);
           if(attr.crIsActive === $location.path().replace('/', '')){
               element.addClass('active');
           } else {
               element.removeClass('active');
           }
       });
   }

    return {
        link: link
    }
});