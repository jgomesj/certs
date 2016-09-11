// Models
window.Aluno = Backbone.Model.extend({
    urlRoot:"../aluno",
    defaults:{
        "id":null,
        "nome":"",
        "escola":"",
        "dataNascimento":"",
        "cursosInteresse":"",
        "cursosFeitos":"",
        "serie":"",
        "turno":"",
        "email":"",
        "telefone":"",
        "certificados":""
    }
});
 
window.AlunoCollection = Backbone.Collection.extend({
    model:aluno,
    url:"../aluno"
});
 
// Views
window.AlunoListView = Backbone.View.extend({
 
    tagName:'ul',
 
    initialize:function () {
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (aluno) {
            $(self.el).append(new AlunoListItemView({model:aluno}).render().el);
        });
    },
 
    render:function (eventName) {
        _.each(this.model.models, function (aluno) {
            $(this.el).append(new alunoListItemView({model:wine}).render().el);
        }, this);
        return this;
    }
 
});
 
window.AlunoListItemView = Backbone.View.extend({
 
    tagName:"li",
 
    template:_.template($('#tpl-aluno-list-item').html()),
 
    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
 
});
 
window.AlunoView = Backbone.View.extend({
 
    template:_.template($('#tpl-aluno-details').html()),
 
    initialize:function () {
        this.model.bind("change", this.render, this);
    },
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
 
    events:{
        "change input":"change",
        "click .save":"savealuno",
        "click .delete":"deletealuno"
    },
 
    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
    },
 
    saveWine:function () {
        this.model.set({
            name:$('#name').val(),
            grapes:$('#grapes').val(),
            country:$('#country').val(),
            region:$('#region').val(),
            year:$('#year').val(),
            description:$('#description').val()
        });
        if (this.model.isNew()) {
            app.alunoList.create(this.model);
        } else {
            this.model.save();
        }
        return false;
    },
 
    deleteWine:function () {
        this.model.destroy({
            success:function () {
                alert('Aluno deletado com sucesso');
                window.history.back();
            }
        });
        return false;
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});
 
window.HeaderView = Backbone.View.extend({
 
    template:_.template($('#tpl-header').html()),
 
    initialize:function () {
        this.render();
    },
 
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
 
    events:{
        "click .new":"newAluno"
    },
 
    newWine:function (event) {
        if (app.alunoView) app.alunoView.close();
        app.alunoView = new alunoView({model:new aluno()});
        $('#content').html(app.alunoView.render().el);
        return false;
    }
});
 
 
});
 
// Router
var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"list",
        "aluno/:id":"alunoDetails"
    },
 
    list:function () {
        this.wineList = new WineCollection();
        this.wineListView = new WineListView({model:this.wineList});
        this.wineList.fetch();
        $('#sidebar').html(this.wineListView.render().el);
    },
 
    wineDetails:function (id) {
        this.aluno = this.alunoList.get(id);
        this.alunoView = new AlunoView({model:this.aluno});
        $('#content').html(this.alunoView.render().el);
    }
});
 
var app = new AppRouter();
Backbone.history.start();
