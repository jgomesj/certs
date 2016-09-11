// Models
window.Aluno = Backbone.Model.extend();
 
window.AlunoWineCollection = Backbone.Collection.extend({
    model:aluno,
    url:"../api/aluno"
});
 
// Views
window.AlunoListView = Backbone.View.extend({
 
    tagName:'ul',
 
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },
 
    render:function (eventName) {
        _.each(this.model.models, function (aluno) {
            $(this.el).append(new AlunoListItemView({model:aluno}).render().el);
        }, this);
        return this;
    }
 
});
 
window.AlunoListItemView = Backbone.View.extend({
 
    tagName:"li",
 
    template:_.template($('#tpl-aluno-list-item').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
 
window.AlunoView = Backbone.View.extend({
 
    template:_.template($('#tpl-wine-details').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
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
