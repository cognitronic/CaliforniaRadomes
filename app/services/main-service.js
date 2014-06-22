/**
 * Created by Danny Schreiber on 6/22/14.
 */

app.factory('MainService', function($location){
    var mainModel = {
        isActive : function(parm){
            if($location.path() === parm){
                return 'active';
            }
            return '';
        }
    }

    return{
        model: mainModel
    }
});