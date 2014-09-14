/**
 * Created by Danny Schreiber on 6/22/14.
 */

app.factory('MainService', function($location, $http){
    var mainModel = {
        isActive : function(parm){
            if($location.path() === parm){
                return 'active';
            }
            return '';
        },
        sendMail: function(name, email, message){
            var notificationMessage = {
                "FromEmail": "webform@calradomes.com",
                "ToEmails": ["danny@ravenartmedia.com"],
                "Bccs": ["cognitronic@gmail.com"],
                "Ccs": [],
                "MessageBody": '<div style="font-family: Arial, Helvetica, sans-serif"><div><b>Name: </b>' + name + '</div>' +
                    '<div><b>Email: </b>' + email + '</div>' +
                    '<div><b>Message: </b>' + message + '</div></div>',
                "Subject": "You have a new web message"
            }

            $http.post('http://pspapi.dannyschreiber.net/api/sendmail', notificationMessage).then(function(data){
               console.log('message sent');
            });
        },
        message: {
            name: '',
            email: '',
            message: ''
        }
    };

    return{
        model: mainModel
    }
});