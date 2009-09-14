/**
 * 'CakePHP DebugKit Plugin' Plugin for jQuery
 *
 * Copyright(C) 2009 101000code/101000LAB
 * http://code.101000lab.org
 *
 * Licensed under The MIT License
 */
(function($){

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
         return false
     }

     $.debugkit = function(obj, name) {
         if (!_init()) {
             return false;
         }
         var content = _makeList(obj, name, 0);
         $("ul#debug-kit-js").append(content);
     };

     _makeList = function(obj, name, depth) {
         var ul = $('<ul>').attr({'class':'neat-array depth-' + (depth + 1)});
         var li = $('<li>');
         var title = $('<strong>').text(name);
         var inner = obj;
         li.append(title);
         if (typeof(obj) == 'object') {
             $.each(obj, function(i, val) {
                        inner = _makeList(val, i, depth + 1);
                        ul.append(inner);
                    });
             li.append(ul);
         } else {
             li.append(obj);
         }
         return li;
     }

 })(jQuery);
