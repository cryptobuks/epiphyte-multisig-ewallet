(function () {
    'use strict';

    function submit(id, password, success, fail) {
        try {
            if (id && password) {
                success();
            } else {
                fail('Missing id and/or password');
            }
        } catch (error) {
            fail(error.message);
        }
    }

    App.UserLoginController = Ember.ObjectController.extend({
        needs: ['application'],
        auth: Ember.computed.alias('controllers.application.auth'),
        balance: 10000,
        loading: false,
        error: null,
        id: null,
        password: null,
        actions: {
            submit: function () {
                var self = this;

                this.setProperties({
                    loading: true,
                    error: null
                });

                submit(this.get('id'), this.get('password'), function () {
                    self.setProperties({
                        loading: false,
                        auth: true
                    });
                    self.transitionToRoute('index');
                }, function (error) {
                    self.setProperties({
                        loading: false,
                        error: error
                    });
                });
            }
        }
    });
}());