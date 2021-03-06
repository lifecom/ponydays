var ls = ls || {};

/**
* Различные настройки
*/
ls.settings = (function ($) {

	this.getMarkitup = function() {
		return {
			onShiftEnter:  	{keepDefault:false, replaceWith:'<br />\n'},
			onCtrlEnter:  	{keepDefault:false, openWith:'\n<p>', closeWith:'</p>'},
			onTab:    		{keepDefault:false, replaceWith:'    '},
			markupSet:  [
				{name: "sup", className:'fa fa-superscript', openWith:'<sup>', closeWith:'</sup>' },
				{name: "sub", className:'fa fa-subscript', openWith:'<sub>', closeWith:'</sub>' },
				{name: "small", className:'fa fa-text-height', openWith:'<small>', closeWith:'</small>' },
				{separator:'---------------' },
				{name: "left", className:'fa fa-align-left', openWith:'<span class="left">', closeWith:'</span>' },
				{name: "center", className:'fa fa-align-center', openWith:'<span class="center">', closeWith:'</span>' },
				{name: "right", className:'fa fa-align-right', openWith:'<span class="right">', closeWith:'</span>' },
				{separator:'---------------' },
				{name: ls.lang.get('panel_b'), className:'fa fa-bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
				{name: ls.lang.get('panel_i'), className:'fa fa-italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)'  },
				{name: ls.lang.get('panel_s'), className:'fa fa-strikethrough', key:'S', openWith:'<s>', closeWith:'</s>' },
				{name: ls.lang.get('panel_u'), className:'fa fa-underline', key:'U', openWith:'<u>', closeWith:'</u>' },
				{name: ls.lang.get('panel_quote'), className:'fa fa-quote-left', key:'Q', replaceWith: function(m) { if (m.selectionOuter) return '<blockquote>'+m.selectionOuter+'</blockquote>'; else if (m.selection) return '<blockquote>'+m.selection+'</blockquote>'; else return '<blockquote></blockquote>' } },
				{name: ls.lang.get('panel_code'), className:'fa fa-code', openWith:'<code>', closeWith:'</code>' },
				{separator:'---------------' },
				{name: ls.lang.get('panel_list'), className:'fa fa-list-ul', openWith:'    <li>', closeWith:'</li>', multiline: true, openBlockWith:'<ul>\n', closeBlockWith:'\n</ul>' },
				{name: ls.lang.get('panel_list'), className:'fa fa-list-ol', openWith:'    <li>', closeWith:'</li>', multiline: true, openBlockWith:'<ol>\n', closeBlockWith:'\n</ol>' },
				{name: ls.lang.get('panel_list_li'), className:'fa fa-hashtag', openWith:'<li>', closeWith:'</li>' },
				{separator:'---------------' },
				{name: ls.lang.get('panel_image'), className:'fa fa-picture-o', key:'P', beforeInsert: function(h) { jQuery('#window_upload_img').jqmShow(); } },
				{name: ls.lang.get('panel_video'), className:'fa fa-video-camera', replaceWith:'<video>[!['+ls.lang.get('panel_video_promt')+':!:http://]!]</video>' },
				{name: ls.lang.get('panel_url'), className:'fa fa-link', key:'L', openWith:'<a target="_blank" href="[!['+ls.lang.get('panel_url_promt')+':!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
				{name: ls.lang.get('panel_user'), className:'fa fa-user', replaceWith:'<ls user="[!['+ls.lang.get('panel_user_promt')+']!]" />' },
				{separator:'---------------' },
				{name: "Серый спойлер", className:'fa fa-h-square', key:'G', replaceWith: function(m) { if (m.selectionOuter) return '<span class="spoiler-gray">'+m.selectionOuter+'</span>'; else if (m.selection) return '<span class="spoiler-gray">'+m.selection+'</span>'; else return '<span class="spoiler-gray"></span>' } },
				{name: "Спойлер", className:'fa fa-caret-square-o-down', key:'R', replaceWith: function(m) { if (m.selectionOuter) return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + prompt('Спойлер', "Спойлер") + '</span><span class="spoiler-body">\n'+m.selectionOuter+'\n</span></span>'; else if (m.selection) return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + prompt('Спойлер', "Спойлер") + '</span><span class="spoiler-body">\n'+m.selection+'\n</span></span>'; else return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + prompt('Спойлер', "Спойлер") + '</span><span class="spoiler-body">\nтекст спойлера\n</span></span>'} },
				{separator:'---------------' },
				{name: ls.lang.get('panel_clear_tags'), className:'fa fa-times', replaceWith: function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } },
				{name: ls.lang.get('panel_cut'), className:'fa fa-cut', replaceWith: function(markitup) { if (markitup.selection) return '<cut name="'+markitup.selection+'">'; else return '<cut>' }}
			]
		}
	};

	this.getMarkitupComment = function() {
		return {
			onShiftEnter:  	{keepDefault:false, replaceWith:'<br />\n'},
			onTab:    		{keepDefault:false, replaceWith:'    '},
			markupSet:  [
				{name: ls.lang.get('panel_b'), className:'fa fa-bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
				{name: ls.lang.get('panel_i'), className:'fa fa-italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)'  },
				{name: ls.lang.get('panel_s'), className:'fa fa-strikethrough', key:'S', openWith:'<s>', closeWith:'</s>' },
				{name: ls.lang.get('panel_u'), className:'fa fa-underline', key:'U', openWith:'<u>', closeWith:'</u>' },
				{name: "sup", className:'fa fa-superscript', openWith:'<sup>', closeWith:'</sup>' },
				{name: "sup", className:'fa fa-subscript', openWith:'<sub>', closeWith:'</sub>' },
				{name: "small", className:'fa fa-text-height', openWith:'<small>', closeWith:'</small>' },
				{separator:'---------------' },
				{name: "left", className:'fa fa-align-left', openWith:'<span class="left">', closeWith:'</span>' },
				{name: "center", className:'fa fa-align-center', openWith:'<span class="center">', closeWith:'</span>' },
				{name: "right", className:'fa fa-align-right', openWith:'<span class="right">', closeWith:'</span>' },
				{separator:'---------------' },
				{name: ls.lang.get('panel_quote'), className:'fa fa-quote-left', key:'Q', replaceWith: function(m) { if (m.selectionOuter) return '<blockquote>'+m.selectionOuter+'</blockquote>'; else if (m.selection) return '<blockquote>'+m.selection+'</blockquote>'; else return '<blockquote></blockquote>' } },
				{name: ls.lang.get('panel_code'), className:'fa fa-code', openWith:'<code>', closeWith:'</code>' },
				{name: ls.lang.get('panel_image'), className:'fa fa-picture-o', key:'P', beforeInsert: function(h) { jQuery('#window_upload_img').jqmShow(); } },
				{name: ls.lang.get('panel_url'), className:'fa fa-link', key:'L', openWith:'<a target="_blank" href="[!['+ls.lang.get('panel_url_promt')+':!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
				{name: ls.lang.get('panel_video'), className:'fa fa-video-camera', replaceWith:'<video>[!['+ls.lang.get('panel_video_promt')+':!:http://]!]</video>' },
				{name: ls.lang.get('panel_user'), className:'fa fa-user', replaceWith:'<ls user="[!['+ls.lang.get('panel_user_promt')+']!]" />' },
				{separator:'---------------' },
				{name: "Серый спойлер", className:'fa fa-h-square', key:'G', replaceWith: function(m) { if (m.selectionOuter) return '<span class="spoiler-gray">'+m.selectionOuter+'</span>'; else if (m.selection) return '<span class="spoiler-gray">'+m.selection+'</span>'; else return '<span class="spoiler-gray"></span>' } },
				{name: "Спойлер", className:'fa fa-caret-square-o-down', key:'R', replaceWith: function(m) { var title = prompt('Спойлер', "Спойлер"); if(title) if (m.selectionOuter) return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + title + '</span><span class="spoiler-body">\n'+m.selectionOuter+'\n</span></span>'; else if (m.selection) return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + title + '</span><span class="spoiler-body">\n'+m.selection+'\n</span></span>'; else return '<span class="spoiler"><span class="spoiler-title spoiler-close">' + title + '</span><span class="spoiler-body">\nтекст спойлера\n</span></span>' } },
				{separator:'---------------' },
				{name: ls.lang.get('panel_clear_tags'), className:'fa fa-times', replaceWith: function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } }
			]
		}
	};

	this.getTinymce = function() {
		return {
			mode : 									"specific_textareas",
			editor_selector : 						"mce-editor",
			theme : 								"advanced",
			content_css : 							DIR_STATIC_SKIN + "/css/reset.css" + "," + DIR_STATIC_SKIN + "/css/tinymce.css?" + new Date().getTime(),
			theme_advanced_toolbar_location : 		"top",
			theme_advanced_toolbar_align : 			"left",
			theme_advanced_buttons1 : 				"lshselect,bold,italic,underline,strikethrough,|,bullist,numlist,|,undo,redo,|,lslink,unlink,lsvideo,lsimage,pagebreak,code",
			theme_advanced_buttons2 : 				"",
			theme_advanced_buttons3 : 				"",
			theme_advanced_statusbar_location : 	"bottom",
			theme_advanced_resizing : 				true,
			theme_advanced_resize_horizontal : 		0,
			theme_advanced_resizing_use_cookie : 	0,
			theme_advanced_path : 					false,
			object_resizing : 						true,
			force_br_newlines :						true,
			forced_root_block : 					'', // Needed for 3.x
			force_p_newlines : 						false,
			plugins : 								"lseditor,safari,inlinepopups,media,pagebreak,autoresize",
			convert_urls : 							false,
			extended_valid_elements : 				"embed[src|type|allowscriptaccess|allowfullscreen|width|height]",
			pagebreak_separator :					"<cut>",
			media_strict : 							false,
			language : 								TINYMCE_LANG,
			inline_styles:							false,
			formats : {
				underline : 	{inline : 'u', exact : true},
				strikethrough : {inline : 's', exact : true}
			}
		}
	};

	this.getTinymceComment = function() {
		return {
			mode : 									"textareas",
			theme : 								"advanced",
			content_css : 							DIR_STATIC_SKIN + "/css/reset.css" + "," + DIR_STATIC_SKIN + "/css/tinymce.css?" + new Date().getTime(),
			theme_advanced_toolbar_location : 		"top",
			theme_advanced_toolbar_align : 			"left",
			theme_advanced_buttons1 : 				"bold,italic,underline,strikethrough,lslink,lsquote",
			theme_advanced_buttons2 : 				"",
			theme_advanced_buttons3 : 				"",
			theme_advanced_statusbar_location : 	"bottom",
			theme_advanced_resizing : 				true,
			theme_advanced_resize_horizontal : 		0,
			theme_advanced_resizing_use_cookie : 	0,
			theme_advanced_path : 					false,
			object_resizing : 						true,
			force_br_newlines : 					true,
			forced_root_block : 					'', // Needed for 3.x
			force_p_newlines : 						false,
			plugins : 								"lseditor,safari,inlinepopups,media,pagebreak,autoresize",
			convert_urls : 							false,
			extended_valid_elements : 				"embed[src|type|allowscriptaccess|allowfullscreen|width|height]",
			pagebreak_separator :					"<cut>",
			media_strict : 							false,
			language : 								TINYMCE_LANG,
			inline_styles:							false,
			formats : {
				underline : 	{inline : 'u', exact : true},
				strikethrough : {inline : 's', exact : true}
			},
			setup : function(ed) {
				// Display an alert onclick
				ed.onKeyPress.add(function(ed, e) {
					key = e.keyCode || e.which;
					if(e.ctrlKey && (key == 13)) {
						$('#comment-button-submit').click();
						return false;
					}
				});
			}
		}
	};

	return this;
}).call(ls.settings || {},jQuery);
