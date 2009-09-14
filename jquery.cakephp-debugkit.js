/**
 * 'CakePHP DebugKit Plugin' Plugin for jQuery
 *
 * Copyright(C) 2009 101000code/101000LAB
 * http://code.101000lab.org
 *
 * Licensed under The MIT License
 */
(function($){

     $.debugkit = function(name, obj) {
         if (!_init() || !name) {
             return false;
         }
         var content = _makeList(name, obj, 0);
         $("ul#debug-kit-js").append(content);
         return true;
     };

     _init = function() {
         if (document.getElementById('debug-kit-js')) {
             return true;
         }
         if (document.getElementById('panel-tabs')){
             var panel = $('<li>').attr({'class':'panel-tab'})
                 .append($('<a>').attr({'href':'#debug-kit-js'}).text('JavaScript Valiables'));
             var panel_content = $('<div>').attr({'class':'panel-content'});
             var panel_content_data = $('<div>').attr({'class':'panel-content-data'})
                 .append($('<h2>').text('JavaScript Valiables'))
                 .append($('<ul>').attr({'class':'neat-array depth-0', 'id':'debug-kit-js'}));

             $('ul#panel-tabs').append(panel.append(panel_content.append(panel_content_data)));
             return true;
         }
         return false;
     };

     _makeList = function(name, obj, depth) {
         var ul = $('<ul>').attr({'class':'neat-array depth-' + (depth + 1)});
         var li = $('<li>');
         var type = (obj === undefined) ? 'undefined' : ((obj === null) ? 'null' : (($.isArray(obj) ? 'array' : typeof(obj))));
         var title = $('<strong>').text(name + ' [' + type + ']');
         var inner;
         li.append(title);
         if (type == 'object' || type == 'array') {
             $.each(obj, function(i, val) {
                        inner = _makeList(i, val, depth + 1);
                        ul.append(inner);
                    });
             li.append(ul);
         } else {
             inner = (obj === undefined) ? 'undefined' : ((obj === null) ? 'null' : obj);
             li.append(inner);
         }
         return li;
     };

 })(jQuery);
