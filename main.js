jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
    
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data;
        sortByDate(repos);    
   
        var list = $('<dl/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                list.append('<dt><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                list.append('<dd>' + '<img src ="' + this.description + '" width="100"></img>' +'</dd>');
                list.append('<dd>' + this.updated_at + '</dd>');
            }
        });      
     });
    function sortByDate(repos) {
        repos.sort(function(a,b) {
            if(a.updated_at < b.updated_at) {
                return -1;
            }
        } return a.updated_at - b.updated_at;
            });
        }
    };
      
   function sortByName(repos) {
        repos.sort(function(a,b) {
            if(a.name < b.name) {
                return -1;
            }
        return a.name - b.name;
       });
    }
};