
(function (define, require) {
    define('front/webimlite/im/font', [
        'require',
        '../base/dom',
        '../base/browser',
        '../base/event',
        'qiao-im-core'
    ], function (require) {
        var e = require('../base/dom'), t = require('../base/browser'), n = require('../base/event'), i = require('qiao-im-core'), a = i.lib.mixin, o = (e.g, n.on), r = [
                '\u5B8B\u4F53',
                '\u6977\u4F53_GB2312',
                '\u9ED1\u4F53',
                '\u96B6\u4E66',
                'Times New Roman',
                'Arial'
            ], s = [
                {
                    text: '8',
                    value: '8pt'
                },
                {
                    text: '9',
                    value: '9pt'
                },
                {
                    text: '10',
                    value: '10pt'
                },
                {
                    text: '11',
                    value: '11pt'
                },
                {
                    text: '12',
                    value: '12pt'
                },
                {
                    text: '14',
                    value: '14pt'
                },
                {
                    text: '16',
                    value: '16pt'
                },
                {
                    text: '18',
                    value: '18pt'
                },
                {
                    text: '20',
                    value: '20pt'
                },
                {
                    text: '22',
                    value: '22pt'
                },
                {
                    text: '24',
                    value: '24pt'
                },
                {
                    text: '26',
                    value: '26pt'
                },
                {
                    text: '28',
                    value: '28pt'
                },
                {
                    text: '36',
                    value: '36pt'
                },
                {
                    text: '48',
                    value: '48pt'
                },
                {
                    text: '72',
                    value: '72pt'
                }
            ], c = '<table border="0" cellspacing="0" cellpadding="0"><tr><td><a href="#"><span style="background-color:#990000"></span></a></td><td><a href="#"><span style="background-color:#ff0000"></span></a></td><td><a href="#"><span style="background-color:#ff9900"></span></a></td><td><a href="#"><span style="background-color:#ffffff"></span></a></td></tr><tr><td><a href="#"><span style="background-color:#ffff00"></span></a></td><td><a href="#"><span style="background-color:#99ff99"></span></a></td><td><a href="#"><span style="background-color:#006600"></span></a></td><td><a href="#"><span style="background-color:#666666"></span></a></td></tr><tr><td><a href="#"><span style="background-color:#99ccff"></span></a></td><td><a href="#"><span style="background-color:#000099"></span></a></td><td><a href="#"><span style="background-color:#990066"></span></a></td><td><a href="#"><span style="background-color:#000000"></span></a></td></tr></table>', f = {
                wrap: null,
                _b: !1,
                _i: !1,
                _u: !1,
                view: {}
            }, exports = {};
        a(exports);
        var u = {
                init: function (t) {
                    var n = document.createDocumentFragment(), i = f.view;
                    e.addClass(t, 'BD-QIAO-IM-FONT-WRAP'), i.family = u.createSelect('m-font-family-select', r), n.appendChild(i.family), i.fontSize = u.createSelect('m-font-size-select', s, '9pt'), n.appendChild(i.fontSize), i.bold = e.create('a', {
                        className: 'm-font-bold m-font-btn',
                        title: '\u52A0\u7C97'
                    }), i.italic = e.create('a', {
                        className: 'm-font-italic m-font-btn',
                        title: '\u659C\u4F53'
                    }), i.underline = e.create('a', {
                        className: 'm-font-underline m-font-btn',
                        title: '\u4E0B\u5212\u7EBF'
                    }), i.fontColor = e.create('a', {
                        className: 'm-font-color m-font-btn',
                        title: '\u5B57\u4F53\u989C\u8272'
                    }), i.palette = e.create('div', { className: 'm-font-palette' }), i.palette.style.display = 'none', i.palette.innerHTML = c, n.appendChild(i.bold), n.appendChild(i.italic), n.appendChild(i.underline), n.appendChild(i.fontColor), n.appendChild(i.palette), t.appendChild(n), f.wrap = t, t.style.display = 'none', u.bindEvents();
                },
                createSelect: function (t, n, i) {
                    var a, o, r = e.create('select', { className: t || '' }), s = Object.prototype.toString, c = 0;
                    for (a = 0; o = n[a]; a++)
                        if ('[object Object]' === s.call(o)) {
                            if (o.value === i)
                                c = a;
                            r.options.add(new Option(o.text, o.value));
                        } else {
                            if (o === i)
                                c = a;
                            r.options.add(new Option(o, o));
                        }
                    return r.selectedIndex = c, r;
                },
                bindEvents: function () {
                    var e = f.view;
                    o(e.family, 'change', d.setFontFamily), o(e.fontSize, 'change', d.setFontSize), o(f.wrap, 'click', d.clickHandle), o(e.palette, 'click', d.onColorSelect);
                },
                bindBlankEvent: function () {
                    o(document, 'click', d.onBlankClick);
                },
                unbindBlankEvent: function () {
                    n.un(document, 'click', d.onBlankClick);
                },
                showSelect: function () {
                    var e = f.view;
                    if ('none' !== f.wrap.style.display)
                        if (t.ie)
                            e.family.style.visibility = 'visible', e.fontSize.style.visibility = 'visible';
                }
            }, d = {
                onColorSelect: function (e) {
                    var t = e || window.event, n = t.target || t.srcElement;
                    if ('span' === n.tagName.toLowerCase())
                        d.setColor(t, n);
                },
                setFontFamily: function () {
                    exports.emit('fontfamilychange', this.options[this.selectedIndex].value);
                },
                setFontSize: function () {
                    exports.emit('fontsizechange', this.options[this.selectedIndex].value);
                },
                onBlankClick: function (e) {
                    var t = e || window.event, n = t.target || t.srcElement;
                    if (n !== f.view.palette)
                        d.hidePalette();
                },
                clickHandle: function (t) {
                    var n = t || window.event, i = n.target || n.srcElement;
                    if (e.hasClass(i, 'm-font-bold'))
                        d.setBold(i);
                    else if (e.hasClass(i, 'm-font-italic'))
                        d.setItalic(i);
                    else if (e.hasClass(i, 'm-font-underline'))
                        d.setUnderline(i);
                    else if (e.hasClass(i, 'm-font-color'))
                        d.showPalette(n, i);
                },
                setBold: function (t) {
                    if (!f._b)
                        e.addClass(t, 'm-font-bold-on'), f._b = !0;
                    else
                        e.removeClass(t, 'm-font-bold-on'), f._b = !1;
                    exports.emit('fontboldchange', f._b);
                },
                setItalic: function (t) {
                    if (!f._i)
                        e.addClass(t, 'm-font-italic-on'), f._i = !0;
                    else
                        e.removeClass(t, 'm-font-italic-on'), f._i = !1;
                    exports.emit('fontitalicchange', f._i);
                },
                setUnderline: function (t) {
                    if (!f._u)
                        e.addClass(t, 'm-font-underline-on'), f._u = !0;
                    else
                        e.removeClass(t, 'm-font-underline-on'), f._u = !1;
                    exports.emit('fontunderlinechange', f._u);
                },
                showPalette: function (t, i) {
                    n.stopPropagation(t), i.blur(), f.view.palette.style.display = '', e.addClass(i, 'm-font-color-on'), u.bindBlankEvent();
                },
                hidePalette: function () {
                    var t = f.view;
                    t.palette.style.display = 'none', e.removeClass(t.fontColor, 'm-font-color-on'), u.unbindBlankEvent();
                },
                setColor: function (e, t) {
                    n.preventDefault(e), d.hidePalette(), exports.emit('fontcolorchange', t.style.backgroundColor);
                }
            };
        return exports.init = u.init, exports.toggle = function (t) {
            var n = f.wrap;
            if (t.blur(), '' === n.style.display)
                n.style.display = 'none', e.removeClass(t, 'btn-font-active');
            else
                n.style.display = '', e.addClass(t, 'btn-font-active'), u.showSelect();
        }, exports.hideSelect = function () {
            var e = f.view;
            if ('none' !== f.wrap.style.display) {
                if (t.ie)
                    e.family.style.visibility = 'hidden', e.fontSize.style.visibility = 'hidden';
                e.palette.style.display = 'none';
            }
        }, exports.showSelect = u.showSelect, exports;
    }), define('front/webimlite/im/face', [
        'require',
        '../base/dom',
        '../base/event',
        'qiao-im-core',
        './config'
    ], function (require) {
        var e = require('../base/dom'), t = require('../base/event'), n = require('qiao-im-core'), i = n.lib.mixin, a = e.g, o = require('./config'), r = t.on, s = t.un, c = {
                ROOT: o.URL.POOL_ROOT + o.FACE_ROOT,
                FACE_TAB: 'FaceTab',
                FACE_GROUP: 'FaceGroup',
                ROW: 6,
                CELL: 12,
                wrap: null,
                curEle: null
            }, exports = {};
        i(exports);
        var f = {
                init: function (t, n, i) {
                    var r, s, u, d, l = [], m = [], g = o.face.items, p = c.ROOT;
                    t = a(t), n = n || c.ROW, i = i || c.CELL, l.push('<table cellspacing="0" cellpadding="0">');
                    for (r in g)
                        m.push({
                            name: g[r].name,
                            md5: g[r].md5 + '.' + g[r].type
                        });
                    for (var u = 0, b = 0; n > u; u++) {
                        l.push('<tr>');
                        for (var s = 0; i > s; s++) {
                            if (d = m[b])
                                l.push('<td><a href="javascript:;"><img src="' + p + d.md5 + '" title="' + d.name + '" alt="' + d.name + '" class="J-face-item" /></a></td>');
                            else
                                l.push('<td><span></span></td>');
                            b++;
                        }
                        l.push('</tr>');
                    }
                    l.push('</table>'), t.innerHTML = l.join(''), e.addClass(t, 'BD-QIAO-IM-FACE-WRAP'), c.wrap = t, t.style.display = 'none', f.bindEvents(t);
                },
                bindEvents: function (e) {
                    r(e, 'click', u.clickHandle);
                },
                bindBlankEvent: function () {
                    r(document, 'click', u.onBlankClick);
                },
                unbindBlankEvent: function () {
                    s(document, 'click', u.onBlankClick);
                },
                hide: function () {
                    c.wrap.style.display = 'none', exports.emit('facehide', c.curEle), f.unbindBlankEvent();
                }
            }, u = {
                onBlankClick: function (e) {
                    var t = e || window.event, n = t.target || t.srcElement;
                    if (n !== c.curEle)
                        f.hide();
                },
                clickHandle: function (n) {
                    var i = n || window.event, a = i.target || i.srcElement;
                    if (t.stopPropagation(i), e.hasClass(a, 'J-face-tab'))
                        u.switchTab(i, a);
                    else if (e.hasClass(a, 'J-face-item'))
                        u.insert(i, a);
                },
                switchTab: function (n, i) {
                    t.preventDefault(n), e.addClass(i, 'active'), i.blur();
                    var o, r, s = a(c.FACE_TAB).getElementsByTagName('a'), f = a(c.FACE_GROUP).getElementsByTagName('table');
                    for (o = 0, r = s.length; r > o; o++) {
                        if (s[o] !== i)
                            e.removeClass(s[o], 'active');
                        if (f[o].id + 'Tab' !== i.id)
                            f[o].style.display = 'none';
                        else
                            f[o].style.display = '';
                    }
                },
                insert: function (e, n) {
                    t.preventDefault(e), f.hide();
                    var i = '<img src="' + n.src + '" data-type="face" alt="' + n.title + '"/>';
                    exports.emit('faceselect', i);
                }
            };
        return exports.init = f.init, exports.show = function (e) {
            c.curEle = e, c.wrap.style.display = '', exports.emit('faceshow'), f.bindBlankEvent();
        }, exports.hide = f.hide, exports;
    }), define('front/webimlite/im/editor', [
        'require',
        '../base/dom',
        '../base/browser',
        '../base/event',
        'qiao-im-core',
        './face',
        './font'
    ], function (require) {
        var e = require('../base/dom'), t = require('../base/browser'), n = require('../base/event'), i = e.create, a = n.on, o = require('qiao-im-core'), r = (o.lib, o.lib.mixin), s = require('./face'), c = require('./font'), f = {
                tool: '<a href="#" class="m-lite-tool-sp-btn btn-export">\u5BFC\u51FA\u804A\u5929\u8BB0\u5F55</a><a href="#" class="m-lite-tool-btn btn-face"></a><a href="#" class="m-lite-tool-btn btn-font"></a>',
                editor: '<html><head><style type="text/css">html,body{height:100%;padding:0px;margin:0px}p{margin:0px}img{margin:0 2px}</style></head><body style="font-size:9pt;line-height:1.5;cursor:text"></body></html>'
            }, u = 'CE', d = {}, exports = {};
        r(exports);
        var l = { getCursorTimer: null }, m = 300, g = {}, p = {
                init: function (e) {
                    var t;
                    d.tool = i('div', { className: 'm-lite-tool' }), d.tool.innerHTML = f.tool, d.face = i('div', { className: 'm-lite-tool-face' }), d.tool.appendChild(d.face), d.font = i('div', { className: 'm-lite-tool-font' }), d.tool.appendChild(d.font), e.appendChild(d.tool), d.inputArea = i('div', { className: 'm-lite-input-area' }), d.input = i('iframe', { frameborder: 0 }), d.inputArea.appendChild(d.input), e.appendChild(d.inputArea), d.wrap = e, s.init(d.face, 6, 10), c.init(d.font), t = d.input.contentWindow.document, t.open(), t.write(f.editor), t.close(), t.designMode = 'on', p.bindEvents();
                },
                bindEvents: function () {
                    var e = d.input.contentWindow.document;
                    if (a(d.wrap, 'click', g.clickHandle), a(e, 'keydown', g.handleInput), a(e, 'click', g.clickMontior), t.ie)
                        a(window.document.body, 'click', g.stopAutoSaveRange), a(e, 'click', g.autoSaveRange), a(e, 'keyup', g.autoSaveRange), a(e, 'select', g.autoSaveRange);
                    s.on('faceshow', g.onFaceShow), s.on('facehide', g.onFaceHide), s.on('faceselect', g.onFaceSelect), c.on('fontshow', g.onFontShow), c.on('fonthide', g.onFontHide), c.on('fontboldchange', g.onFontBoldChange), c.on('fontitalicchange', g.onFontItalicChange), c.on('fontunderlinechange', g.onFontUnderlineChange), c.on('fontfamilychange', g.onFontFamilyChange), c.on('fontsizechange', g.onFontSizeChange), c.on('fontcolorchange', g.onFontColorChange);
                },
                getRange: function () {
                    var e = d.input.contentWindow;
                    if (t.ie && t.ie < 11)
                        return e.document.selection.createRange();
                    else {
                        var n = e.getSelection();
                        return n.rangeCount ? n.getRangeAt(0) : e.document.createRange();
                    }
                },
                getEditorBody: function () {
                    return d.input.contentWindow.document.body;
                },
                editorFocus: function () {
                    var e = d.input.contentWindow;
                    e.focus();
                    var n = l.range || p.getRange();
                    if (t.ie < 11)
                        n.select();
                    else {
                        var i = e.getSelection();
                        i.removeAllRanges(), i.addRange(n);
                    }
                },
                getEditorStyle: function () {
                    var e, t, n = {}, i = p.getEditorBody(), a = [
                            'fontFamily',
                            'fontSize',
                            'color',
                            'fontWeight',
                            'fontStyle',
                            'textDecoration'
                        ];
                    for (e = 0; t = a[e]; e++)
                        if (i.style[t])
                            n[t] = i.style[t];
                    return n;
                },
                isInEditor: function (e) {
                    var t = d.input.contentWindow.document.body, n = window.document.body, i = e.focusNode || e.commonAncestorContainer || e.parentElement();
                    do
                        if (i === t)
                            return !0;
                        else if (i === n)
                            return !1;
                        else
                            i = i.parentNode;
                    while (i);
                }
            };
        return g = {
            clickMontior: function () {
                exports.emit('focus'), s.hide();
            },
            clickHandle: function (t) {
                var n = t || window.event, i = n.target || n.srcElement;
                if (e.hasClass(i, 'btn-face'))
                    g.showFace(i);
                else if (e.hasClass(i, 'btn-font'))
                    g.toggleFont(i);
                else if (e.hasClass(i, 'btn-export'))
                    g.exportHistory();
            },
            saveRange: function () {
                var e = p.getRange();
                if (p.isInEditor(e))
                    l.range = e;
            },
            autoSaveRange: function () {
                g.saveRange(), g.stopAutoSaveRange(), l.getCursorTimer = setTimeout(function () {
                    g.autoSaveRange();
                }, m);
            },
            stopAutoSaveRange: function () {
                clearTimeout(l.getCursorTimer);
            },
            exportHistory: function () {
                exports.emit('exporthistory');
            },
            onFontBoldChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.fontWeight = e ? 'bold' : 'normal';
            },
            onFontItalicChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.fontStyle = e ? 'italic' : 'normal';
            },
            onFontUnderlineChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.textDecoration = e ? 'underline' : 'none';
            },
            onFontFamilyChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.fontFamily = e ? e : '\u5B8B\u4F53';
            },
            onFontSizeChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.fontSize = e ? e : '9pt';
            },
            onFontColorChange: function (e) {
                p.editorFocus();
                var t = p.getEditorBody();
                t.style.color = e ? e : '#000';
            },
            showFace: function (t) {
                t.blur(), e.addClass(t, 'btn-face-active'), s.show(t);
            },
            toggleFont: function (e) {
                c.toggle(e);
            },
            onFaceShow: function () {
                c.hideSelect();
            },
            onFaceHide: function (t) {
                if (c.showSelect(), t)
                    e.removeClass(t, 'btn-face-active');
            },
            onFaceSelect: function (e) {
                var n = d.input.contentWindow, i = n.document;
                if (n.focus(), t.ie) {
                    if (t.ie < 11) {
                        var a = l.range || p.getRange();
                        a.select(), a.pasteHTML(e), a.select();
                    } else {
                        var o = n.getSelection(), a = o.getRangeAt(0), r = l.range ? l.range : a, s = i.createElement('span');
                        a.deleteContents(), s.innerHTML = e, r.insertNode(s), r.setStartAfter(s), a.setStartAfter(s), a.collapse(!0), o.removeAllRanges(), o.addRange(a);
                    }
                    g.saveRange();
                    for (var c = i.getElementsByTagName('img'), f = c.length, u = 0; f > u; u++)
                        c[u].onresizestart = function () {
                            return !1;
                        };
                } else
                    i.execCommand('insertHTML', !1, e);
            },
            forbid: function (e) {
                if (116 === e.keyCode) {
                    if (t.ie)
                        e.keyCode = 0;
                    return n.preventDefault(e), !1;
                }
                if (e.ctrlKey && 82 === e.keyCode || e.altKey && 39 === e.keyCode || e.altKey && 37 === e.keyCode || e.shiftKey && 121 === e.keyCode)
                    return n.preventDefault(e), !1;
                else
                    return void 0;
            },
            handleInput: function (e) {
                var t = e || window.event;
                if (g.forbid(t), 83 === t.keyCode && t.altKey)
                    return n.preventDefault(t), void exports.emit('editorsend');
                if ('CE' === u) {
                    if (13 === t.keyCode && t.ctrlKey)
                        exports.emit('editorsend');
                } else ;
            }
        }, exports.getStyle = p.getEditorStyle, exports.getContent = function () {
            return p.getEditorBody().innerHTML;
        }, exports.clear = function () {
            p.getEditorBody().innerHTML = '';
        }, exports.isMultilineMode = function () {
            return 'CE' === u;
        }, exports.init = p.init, exports;
    }), define('front/webimlite/im/lang', [
        'require',
        'exports'
    ], function (require, exports) {
        exports.TEXT = {
            WELCOME: '\u60A8\u597D\uFF01\u6709\u4EC0\u4E48\u9700\u8981\u5E2E\u5FD9\u7684\u4E48\uFF1F',
            DEFAULT_CSNAME: '\u5728\u7EBF\u5BA2\u670D',
            FILE_UNSUPPORT: '[\u6587\u4EF6]',
            FACE_UNSUPPORT: '[\u6269\u5C55\u5934\u50CF]',
            IMG_UNSUPPORT: '[\u56FE\u7247]',
            CFACE_UNSUPPORT: '[\u81EA\u5B9A\u4E49\u5934\u50CF]',
            ONLINE: '\u5BA2\u670D#{0}\u5DF2\u7ECF\u4E0A\u7EBF\u4E86\uFF0C\u60A8\u73B0\u5728\u53EF\u4EE5\u53D1\u8D77\u6C9F\u901A\uFF01',
            TRANSFER: '\u60A8\u5DF2\u88AB\u8F6C\u79FB\u7ED9\u5176\u4ED6\u5BA2\u670D',
            INPUT: '\u6B63\u5728\u8F93\u5165...'
        }, exports.ERROR = {
            INIT: '\u5BF9\u4E0D\u8D77\uFF0C\u8F6C\u63A5\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u8FDE\u63A5',
            CONFLICT: '\u60A8\u8F93\u5165\u7684\u5185\u5BB9\u5B58\u5728\u5B89\u5168\u9690\u60A3\uFF0C\u53D1\u9001\u5931\u8D25',
            OFFLINE: '\u5BA2\u670D\u5DF2\u7ECF\u79BB\u7EBF\uFF0C\u60A8\u76EE\u524D\u65E0\u6CD5\u53D1\u9001\u6D88\u606F',
            SEND_FAIL: '\u6D88\u606F\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5',
            DROP_KICKED: '\u672C\u6B21\u6C9F\u901A\u7ED3\u675F\uFF0C\u8BF7\u60A8\u7EE7\u7EED\u6D4F\u89C8\u7F51\u7AD9',
            DROP_CHATOVER: '\u672C\u6B21\u6C9F\u901A\u7ED3\u675F\uFF0C\u8BF7\u60A8\u7EE7\u7EED\u6D4F\u89C8\u7F51\u7AD9',
            KICKED: '\u7531\u4E8E\u7F51\u7EDC\u539F\u56E0\uFF0C\u60A8\u5DF2\u79BB\u7EBF'
        };
    }), define('front/webimlite/im/config', [
        'require',
        'exports'
    ], function (require, exports) {
        exports.FACE_ROOT = 'img/webim/defaultface/', exports.URL = {
            POOL_ROOT: 'http://h.qiao.baidu.com/f/pool/',
            QIAO_ROOT: 'http://h.qiao.baidu.com/v3/',
            HI_SERVER: 'http://webim.h.qiao.baidu.com/'
        }, exports.jscode = { jscode: '' }, exports.authCode = '';
        var e = {
            title: '\u9ED8\u8BA4\u5206\u7EC4',
            items: [
                {
                    name: '\u5FAE\u7B11',
                    shortcut: ':)',
                    md5: 'c7b91efe2e01b35d9ff088993ca9a11a',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u5927\u7B11',
                    shortcut: ':D',
                    md5: '73a512491b0e3e12099ed7900cd4482d',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5077\u7B11',
                    shortcut: '(tx)',
                    md5: '5394895d38f997b201036acf646ab181',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u61A8\u7B11',
                    shortcut: ':o',
                    md5: '2b257b850465aa84dfa9d7170515ac57',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5F97\u610F',
                    shortcut: '(dy)',
                    md5: '8372252a0bbffba66ded3a8fa71ff410',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u53EF\u7231',
                    shortcut: '(ka)',
                    md5: 'e51b1712edec1b5c5f751fbb7374a3b0',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5BB3\u7F9E',
                    shortcut: '(hx)',
                    md5: '6d3fdbc79e3568e66a1f3411dfc0a30c',
                    type: 'gif',
                    frame: '4'
                },
                {
                    name: '\u4E56',
                    shortcut: '(oo)',
                    md5: 'a024381379da74153694c4ebb9f75014',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u6DD8\u6C14',
                    shortcut: '(tq)',
                    md5: 'ee5ab8e89776a17d26367d131f77bea3',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u8C03\u76AE',
                    shortcut: ':p',
                    md5: '1cc3b63e1bf9753bcecf8e99185c3d74',
                    type: 'png',
                    frame: '2'
                },
                {
                    name: '\u6D41\u6CEA',
                    shortcut: '(ll)',
                    md5: '3fbeb731a465584bc3b2c5b84333860c',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u5927\u54ED',
                    shortcut: ':(',
                    md5: 'e7daaaf6031549140d88e46154445e2c',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u6487\u5634',
                    shortcut: '(pz)',
                    md5: '95af917d5ccfb614ec03731f686f1c49',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u95ED\u5634',
                    shortcut: ':-#',
                    md5: 'd267f14a949cc1c67d5afebea631b95f',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u5618',
                    shortcut: '(xu)',
                    md5: '2d962d090c00a534c3cb604a3409c8a9',
                    type: 'gif',
                    frame: '3'
                },
                {
                    name: '\u9119\u89C6',
                    shortcut: '(bs)',
                    md5: '6e5a6dd0094a5f413c9d40d703552563',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u50B2\u6162',
                    shortcut: '(am)',
                    md5: 'a7792b792338c0824e4eba4e8f53f248',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u767D\u773C',
                    shortcut: '(fc)',
                    md5: '9046a275b6fcc032d552c2be28deda85',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u601D\u8003',
                    shortcut: '(sk)',
                    md5: 'f68391b534ad9c6e2980e1c9f4248b7b',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u56F0',
                    shortcut: '|-)',
                    md5: '2939123abba6052d64383ad7cd62983d',
                    type: 'gif',
                    frame: '1'
                },
                {
                    name: '\u7761',
                    shortcut: '(zz)',
                    md5: 'e79f016440edafd4ba3f5c7f45077883',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u6C57',
                    shortcut: '(lh)',
                    md5: 'c0d21388d259446932b1d2c84a243c4b',
                    type: 'gif',
                    frame: '1'
                },
                {
                    name: '\u5C34\u5C2C',
                    shortcut: ':$',
                    md5: 'f57200e594d2c74dae63321a685c0a01',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u60CA\u8BB6',
                    shortcut: ':-o',
                    md5: 'f3807c4d0dfd29864538bff866f8e8d2',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u60CA\u6050',
                    shortcut: '(jk)',
                    md5: '2e855936c4d0e3a8d8925c6ff7033802',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u7591\u95EE',
                    shortcut: '(?)',
                    md5: 'efa51b9fd7f230928f589f72de2510ab',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u6655',
                    shortcut: ':s',
                    md5: '3b9b9fa53da41b2be65de19bbfa3f477',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u6572\u6253',
                    shortcut: '(qd)',
                    md5: '7add275c91a9130f9e3b1ba52eb8e8d6',
                    type: 'GIF',
                    frame: '2'
                },
                {
                    name: '\u96BE\u8FC7',
                    shortcut: ':(',
                    md5: 'fd0771f664dee6d809213572cb825efa',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u59D4\u5C48',
                    shortcut: '(wq)',
                    md5: '125b1fee2dcae224a46500185c41f74e',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u8272',
                    shortcut: '(se)',
                    md5: 'a9bb9d9d9bd83c530585f32139ca7e07',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u6293\u72C2',
                    shortcut: '(zk)',
                    md5: '2748bd8030e2db488dbf96b833e73233',
                    type: 'gif',
                    frame: '1'
                },
                {
                    name: '\u6124\u6012',
                    shortcut: ':@',
                    md5: '60f3c02d34d47ec70a1a93304606d5bf',
                    type: 'GIF',
                    frame: '0'
                },
                {
                    name: '\u5410',
                    shortcut: '+o(',
                    md5: '70347b086d5d1b58cb6afac1c5a709b6',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u8870',
                    shortcut: '(sh)',
                    md5: 'c93d82cc99597cd2af1e1de3bfe96dcc',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u518D\u89C1',
                    shortcut: '(zj)',
                    md5: '1d6e9bfd1eb9db00a2f5002660de7bd5',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5DE6\u62E5\u62B1',
                    shortcut: '({)',
                    md5: '6f2c8b9cc8b654852b8765f9de36ea7b',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u53F3\u62E5\u62B1',
                    shortcut: '(})',
                    md5: '835c7ed5ebc0638a4290dc2bc5075293',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u95EA\u4EBA',
                    shortcut: '(sr)',
                    md5: '638e9e5693be2e25b7fb49ef53dccd59',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u5200',
                    shortcut: '(d)',
                    md5: '79049e7bb24e1610fa3172ffc9c6afbe',
                    type: 'gif',
                    frame: '2'
                },
                {
                    name: '\u543B',
                    shortcut: '(w)',
                    md5: 'b4717e8c1be2396f59424edb642f346f',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u7231\u60C5',
                    shortcut: '(ai)',
                    md5: 'df8cd7fb1a5402081bba02ed27f3d460',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u5FC3\u788E',
                    shortcut: '(xs)',
                    md5: '9a48f0d784b340130ddc548bbe0e41b1',
                    type: 'gif',
                    frame: '1'
                },
                {
                    name: '\u9C9C\u82B1',
                    shortcut: '(xh)',
                    md5: 'e0ef4acf693e8bd332304539c3d556e6',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u67AF\u840E',
                    shortcut: '(kw)',
                    md5: 'e3d5d44d18592e744a877028ccd5ce7e',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u80DC\u5229',
                    shortcut: '(sl)',
                    md5: 'c12b4546988745b970a528e9d4c7d36b',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: 'OK',
                    shortcut: '(ok)',
                    md5: 'ea9118eeb5d1251204aa06ac676d039c',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u5927\u62C7\u6307',
                    shortcut: '(n)',
                    md5: 'df9f3c4d0296f6971a88f38836da30b3',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5F31',
                    shortcut: '(r)',
                    md5: '0700d37ba0b4b48503971f10d1e4b043',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u63E1\u624B',
                    shortcut: '(ws)',
                    md5: 'af63cb39facadd039efa04da4b29c160',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u86CB\u7CD5',
                    shortcut: '(^)',
                    md5: '71069905c70351d3b61d252c7bbea5cf',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5496\u5561',
                    shortcut: '(kf)',
                    md5: 'a119c664f4d00bf17448bb4a77b761c0',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u5403\u996D',
                    shortcut: '(cf)',
                    md5: 'f64ed5b3c7d9c934847aeacda0743cbe',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u592A\u9633',
                    shortcut: '(#)',
                    md5: 'c6889c8bdd7ee08445e5009b803a29aa',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u6708\u4EAE',
                    shortcut: '(s)',
                    md5: '7d1f68af6f74d00649c664a99f546b76',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u661F\u661F',
                    shortcut: '(*)',
                    md5: '0d11d94e64e06bc04c42d64a77834444',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u4FBF\u4FBF',
                    shortcut: '(bb)',
                    md5: 'a811e4d3e0bf451c4716401ac251d056',
                    type: 'gif',
                    frame: '0'
                },
                {
                    name: '\u732A\u5934',
                    shortcut: '(zt)',
                    md5: '8260d8878f182d0b3c6aa46d933fc216',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: '\u94B1',
                    shortcut: '(q)',
                    md5: 'd6b4a948530ed9dbb34e53e63dfc910',
                    type: 'png',
                    frame: '0'
                },
                {
                    name: 'Hi',
                    shortcut: '(hi)',
                    md5: 'd98dc2c9584121f0a863c3d608cd3503',
                    type: 'png',
                    frame: '2'
                }
            ]
        };
        exports.face = e;
    }), define('front/webimlite/base/object', [
        'require',
        'exports'
    ], function (require, exports) {
        exports.extend = function (e, t) {
            for (var n in t)
                if (t.hasOwnProperty(n))
                    e[n] = t[n];
            return e;
        };
    }), define('front/webimlite/base/date', [
        'require',
        'exports'
    ], function (require, exports) {
        function e(e, t) {
            var n = '', i = 0 > e, a = String(Math.abs(e));
            if (a.length < t)
                n = new Array(t - a.length + 1).join('0');
            return (i ? '-' : '') + n + a;
        }
        exports.format = function (t, n) {
            function i(e, t) {
                n = n.replace(e, t);
            }
            if ('string' != typeof n)
                return t.toString();
            var a = t.getFullYear(), o = t.getMonth() + 1, r = t.getDate(), s = t.getHours(), c = t.getMinutes(), f = t.getSeconds();
            return i(/yyyy/g, e(a, 4)), i(/yy/g, e(parseInt(a.toString().slice(2), 10), 2)), i(/MM/g, e(o, 2)), i(/M/g, o), i(/dd/g, e(r, 2)), i(/d/g, r), i(/HH/g, e(s, 2)), i(/H/g, s), i(/hh/g, e(s % 12, 2)), i(/h/g, s % 12), i(/mm/g, e(c, 2)), i(/m/g, c), i(/ss/g, e(f, 2)), i(/s/g, f), n;
        }, exports.dataFormat = function (e) {
            if (e) {
                var t = e.getHours();
                t = t > 9 ? t : '0' + t;
                var n = e.getMinutes();
                n = n > 9 ? n : '0' + n;
                var i = e.getSeconds();
                i = i > 9 ? i : '0' + i;
                var a = t + ':' + n + ':' + i;
                return a;
            }
        };
    }), define('front/base/lang', [], function () {
        'use strict';
        function e(e) {
            return '[object Array]' === n.call(e);
        }
        function t(e) {
            return !(!e || !i.test(e));
        }
        var n = {}.toString, i = /\{\s*\[(?:native code|function)\]\s*\}/i;
        return {
            isNative: t,
            isArray: t(Array.isArray) ? Array.isArray : e,
            isObject: function (e) {
                return e && '[object Object]' === n.call(e);
            },
            isFunction: function (e) {
                return e && '[object Function]' === n.call(e);
            },
            instanceOf: function (e, t) {
                return e && e.hasOwnProperty && e instanceof t;
            },
            extend: function (e, t) {
                for (var n in t)
                    if (t.hasOwnProperty(n))
                        e[n] = t[n];
                return e;
            }
        };
    }), define('front/data/config', [
        'require',
        'exports',
        '../base/lang'
    ], function (require, exports) {
        'use strict';
        function e() {
            for (var e, t = location.href, n = 0, i = null; e = a[n]; n++)
                if (e.url == t || t.indexOf(e.url) > -1)
                    !i && (i = e), i && i.url && i.url.length < e.url.length && (i = e);
            if (i)
                return i.pageid;
            else
                return '0';
        }
        var t = require('../base/lang'), n = 'undefined' != typeof BDBridgeConfig ? window.BDBridgeConfig : {}, i = n.BD_BRIDGE_DATA || {}, a = n.BD_BRIDGE_SPECIAL || [], o = {}, r = function () {
                for (var t, i = n.BD_BRIDGE_STYLE_ITEM || [], o = a && a.length <= 0 ? '0' : e(), r = 0; t = i[r]; r++)
                    if (t.pageid == o)
                        return t;
            }(), s = '';
        return {
            getSiteId: function () {
                return i.siteid || '';
            },
            getUcId: function () {
                return i.ucid || '';
            },
            getSiteIdMd5: function () {
                return i.SITE_ID || '';
            },
            getRoot: function () {
                return n.ROOT;
            },
            getRcvRoot: function () {
                return n.RCV_ROOT;
            },
            getImRoot: function () {
                return n.IM_ROOT || 'http://p.qiao.baidu.com/';
            },
            getFrontRoot: function () {
                return n.FRONT_ROOT;
            },
            getMainId: function () {
                return i.mainid || '';
            },
            getUserName: function () {
                return i.userName || '';
            },
            getStyleConfig: function (module) {
                if (!module)
                    return r;
                else
                    return r['BD_BRIDGE_' + module.toUpperCase()] || {};
            },
            setStyleConfig: function (module, e) {
                if (module)
                    module = 'BD_BRIDGE_' + module.toUpperCase(), r[module] = t.extend(r[module], e);
            },
            getAllowGroup: function () {
                return r.BD_BRIDGE_GROUP || [];
            },
            getPageId: function () {
                return '0' == r.pageid ? '' : r.pageid;
            },
            setModelData: function (e) {
                o = t.extend(o, e);
            },
            getModelData: function (e) {
                if (!e)
                    return o;
                else
                    return o[e];
            },
            getStartTime: function () {
                return n.TIME_START;
            },
            setJsFunction: function (e) {
                s = 'return ' + e;
            },
            getJsFunctionResult: function () {
                if (s) {
                    var e = new Function(s);
                    return e()();
                } else
                    return null;
            },
            getIsWebIm: function () {
                var e = this.getStyleConfig().BD_BRIDGE_WEBIM.webimtype;
                return e;
            },
            isAuthCode: !1,
            authCode: '',
            isSecondVerify: !1,
            jscodeForLog: function () {
                return s;
            }
        };
    }), define('front/common/identity', [
        'require',
        '../data/config'
    ], function (require) {
        function e() {
            var e = o;
            return window[e] || (window[e] = {});
        }
        var t = require('../data/config'), n = t.getSiteId(), i = 'QIAO_COOKIE_', a = 'QIAO_LS_' + n + '_', o = 'QIAO_NS_BSL', r = 'bridge', s = {
                bid: n + 'bid24',
                data: n + 'data',
                show: n + 'show',
                instance: n + 'instance',
                chat: n + 'chat',
                startload: n + 'startload',
                ack: n + 'ack',
                firstInfo: n + 'firstInfo',
                prevInfo: n + 'previousInfo',
                offsetTime: n + 'offsetTime'
            }, c = {
                BY_INVITE: 4,
                BY_SELF: 1,
                AUTO_INVITE: 3,
                ENFORCE: 5
            };
        return {
            cookieId: function (e) {
                return i + e.toUpperCase();
            },
            getLSKey: function (e) {
                return a + e.toUpperCase();
            },
            getFlashId: function () {
                return r;
            },
            getFlashKey: function (e) {
                return s[e] || '';
            },
            getBSLNs: function () {
                return e();
            },
            getChatType: function (e) {
                if (0 === c[e])
                    return 0;
                else
                    return c[e] || c.BY_SELF;
            }
        };
    }), define('front/base/Promise', [], function () {
        function e() {
            this._callbacks = [];
        }
        return e.prototype.then = function (t, n) {
            var i, a = this;
            if (a._isdone)
                i = t.apply(n, a.result);
            else
                i = new e(), a._callbacks.push(function () {
                    var e = t.apply(n, arguments);
                    if (e && 'function' == typeof e.then)
                        e.then(i.done, i);
                });
            return i;
        }, e.prototype.done = function () {
            var e = this;
            e.result = arguments, e._isdone = !0;
            for (var t = 0, n = e._callbacks.length; n > t; t++)
                e._callbacks[t].apply(null, arguments);
            e._callbacks = [];
        }, e.prototype.promise = function () {
            var e = this;
            return {
                then: function () {
                    e.then.apply(e, arguments);
                }
            };
        }, e;
    }), define('front/webimlite/base/localstorage', [
        'require',
        'exports',
        './json',
        './browser'
    ], function (require, exports) {
        var e = require('./json'), t = require('./browser'), n = function () {
                var t, n = null, i = 365;
                return {
                    build: function (e) {
                        var n = this;
                        return e = e || {}, t = e.fileName || location.hostname, i = e.expires || i, n;
                    },
                    _setup: function () {
                        if (!n)
                            try {
                                n = document.createElement('input'), n.type = 'hidden', n.addBehavior('#default#userData'), document.body.appendChild(n);
                            } catch (e) {
                                return !1;
                            }
                        return !0;
                    },
                    setItem: function (a, o) {
                        var r = this, s = new Date();
                        if (r._setup())
                            o = 'string' == typeof o ? o : e.stringfy(o), s.setDate(s.getDate() + i), n.expires = s.toUTCString(), n.load(t), n.setAttribute(a, o), n.save(t);
                    },
                    getItem: function (e) {
                        var i = this;
                        if (i._setup())
                            return n.load(t), n.getAttribute(e);
                    },
                    removeItem: function (e) {
                        var i = this;
                        if (i._setup())
                            n.load(t), n.removeAttribute(e), n.save(t);
                    },
                    clear: function () {
                        var e = new Date();
                        e.setDate(e.getDate() - 1), n.expires = e.toUTCString();
                    }
                };
            }(), i = {
                INTERVAL: 1000,
                ls: null,
                useTimer: t.ie && t.ie < 8,
                timer: null,
                keyEvent: {}
            }, a = {
                onStorage: function (e, t, n) {
                    var a = i.ls.getItem(e);
                    return n = n || null, function (o) {
                        setTimeout(function () {
                            o = o || window.storageEvent;
                            var r = o.key, s = o.newValue;
                            if (!r) {
                                var c = i.ls.getItem(e);
                                if (c !== a)
                                    r = e, s = c;
                            }
                            if (r === e)
                                t && t.call(n, o.oldValue || a, s), a = s;
                        }, 0);
                    };
                }
            };
        exports.init = function (e) {
            if (window.localStorage)
                i.ls = window.localStorage;
            else
                i.ls = n, i.ls.build(e);
        }, exports.setItem = function (t, n) {
            return n = 'string' == typeof n ? n : e.stringify(n), i.ls.setItem(t, n);
        }, exports.getItem = function (e) {
            return i.ls.getItem(e);
        }, exports.removeItem = function (e) {
            return i.ls.removeItem(e);
        }, exports.clear = function () {
            i.ls.clear();
        }, exports.addStorageEvent = function (e, n) {
            var o;
            if (!i.useTimer)
                if (o = a.onStorage(e, n), document.attachEvent && !t.opera)
                    document.attachEvent('onstorage', o);
                else
                    window.addEventListener('storage', o, !1);
            else
                o = a.onStorage(e, n), i.timer = setInterval(function () {
                    o({});
                }, i.INTERVAL);
        }, exports.removeStorageEvent = function (e, t) {
        };
    }), define('qiao-im-core/log/log', [
        'require',
        '../base/util'
    ], function (require) {
        function e(e) {
            return n(e) + '&_t=' + new Date().getTime();
        }
        function t(e) {
            var t = new Image();
            t.onload = t.onerror = function () {
                t = null;
            }, t.src = e;
        }
        var n = require('../base/util').jsonToQuery, i = 'http://sc.qiao.baidu.com/front/', exports = {};
        return exports.sendLog = function (n, a) {
            var o = i + n + '.gif?' + e(a);
            t(o);
        }, exports;
    }), define('qiao-im-core/log/chat', [
        'require',
        '../rcv/enter',
        '../im/connect',
        '../im/send',
        './log',
        '../data',
        '../base/util'
    ], function (require) {
        function e() {
            h.imuss = g.get('bid'), h.ucid = g.get('ucid'), h.siteid = g.get('siteid'), h.type = g.get('type'), v = p.extend(v, h), y = p.extend(y, h), E = p.extend(E, h);
        }
        function t() {
            u.on('enterfail', n), d.on(d.EVENT.WELCOME, i), d.on(d.EVENT.BRIDGEINIT, a), l.on('communicatefail', o), l.on('communicatesend', r);
        }
        function n() {
            m.sendLog('transfer', v);
        }
        function i(e, t) {
            if ('error' === e)
                n();
        }
        function a(e, t) {
            if ('success' === e)
                v.consume = new Date().getTime() - g.get('startTime'), v.status = 'ok', v.inited = g.get('inited');
            n();
        }
        function o(e) {
            y.msgid = e.messageid, m.sendLog('sendfail', y);
        }
        function r() {
            E.num++;
        }
        function s() {
            if (E.num)
                m.sendLog('sendtotal', E), E.num = 0;
        }
        function c() {
            s(), clearTimeout(f), f = setTimeout(function () {
                c();
            }, b);
        }
        var f, u = require('../rcv/enter'), d = require('../im/connect'), l = require('../im/send'), m = require('./log'), g = require('../data'), p = require('../base/util'), b = 5000, h = {
                siteid: '',
                ucid: '',
                imuss: '',
                dtype: 0,
                type: 1
            }, v = {
                consume: 0,
                status: 'fail',
                inited: 0
            }, y = { msgid: '' }, E = { num: 0 }, exports = {};
        return exports.init = function () {
            t(), e(), c();
        }, exports;
    }), define('qiao-im-core/log/stat', ['require'], function (require) {
        function e() {
            return Math.floor(10000000000 * Math.random());
        }
        function t(e) {
            var t = new Image(), n = f + '?' + e;
            t.onload = t.onerror = function () {
                t = null;
            }, t.src = n;
        }
        function n(e, t) {
            for (var n in e)
                if (e.hasOwnProperty(n))
                    t[n] && (e[n] = t[n]);
        }
        function i(n) {
            var i = 'si=' + s.siteId + '&et=99&ep=' + s.mainId;
            i += a(n), i = i + d + e(), t(i);
        }
        function a(e) {
            var t, n, i = '', a = m.length;
            for (t = 0; a > t; t++)
                n = m[t], i += '' === e[n] ? '*' + u : '*' + e[n];
            return i;
        }
        function o(e) {
            if (g.visitor_count)
                n(c, e), c.eventId = l.VISITOR_IM, c.count = g.visitor_count, c.valid = 1, i(c), g.visitor_count = 0, c.valid = 0;
        }
        function r(e) {
            if (!e.chatId)
                g.visitor_count += e.count;
            else
                n(c, e), c.eventId = l.VISITOR_IM, c.valid = 1, i(c), g.visitor_count = 0, c.valid = 0;
        }
        var s = {
                siteId: '',
                mainId: ''
            }, c = {
                mainId: '',
                subId: '',
                sessionId: '',
                eventId: '',
                chatId: '',
                from: '',
                open: '',
                valid: '',
                count: ''
            }, f = 'http://hm.baidu.com/hm.gif', u = 0, d = '&nv=0&st=4&v=bridge-0.2&rnd=', l = {
                REFRESH_IM: 1,
                SEND_INVITE: 3,
                ACCEPT_INVITE: 4,
                SEND_MESS: 5,
                VISITOR_IM: 6,
                SERVER_IM: 7,
                START_IM: 0
            }, m = [
                'subId',
                'sessionId',
                'eventId',
                'chatId',
                'from',
                'open',
                'valid',
                'count'
            ], g = { visitor_count: 0 };
        return function (e, t, a) {
            if (e)
                switch (s.siteId = s.siteId || t.siteId || 0, s.mainId = s.mainId || t.mainId || 0, e = e.toUpperCase()) {
                case 'VISITOR_IM':
                    r(a);
                    break;
                case 'START_IM':
                    o(a);
                    break;
                default:
                    n(c, a), c.eventId = l[e], i(c);
                }
        };
    }), define('qiao-im-core/hm', [
        'require',
        './log/stat',
        './im/send',
        './im'
    ], function (require) {
        function e(e) {
            var n = c;
            n.mainId = e.mainId || '', n.siteId = e.siteId || '', n.sessionId = e.siteId && e.bid && e.siteId + '_' + e.bid || '', n.chatId = e.chatId, n.subId = e.subId || '', o('START_IM', {
                siteId: n.siteId,
                mainId: n.mainId
            }, {
                subId: e.subId,
                sessionId: n.sessionId,
                chatId: n.chatId,
                open: n.open,
                count: 1
            }), t();
        }
        function t() {
            var e = c;
            f = setInterval(function () {
                o('REFRESH_IM', {
                    siteId: e.siteId,
                    mainId: e.mainId
                }, {
                    subId: e.subId,
                    sessionId: e.sessionId,
                    chatId: e.chatId,
                    open: e.open
                });
            }, 600000);
        }
        function n(e) {
            var t = c;
            o('VISITOR_IM', {
                siteId: t.siteId,
                mainId: t.mainId
            }, {
                subId: t.subId,
                sessionId: t.sessionId,
                chatId: t.chatId,
                open: t.open,
                count: e && e.count || 1
            });
        }
        function i(e) {
            var t = c;
            if (t.chatId)
                o('SERVER_IM', {
                    siteId: t.siteId,
                    mainId: t.mainId
                }, {
                    subId: t.subId,
                    sessionId: t.sessionId,
                    chatId: t.chatId,
                    open: t.open,
                    count: e && e.count || 1
                });
        }
        function a() {
            if (f)
                clearInterval(f);
            c.chatId = '';
        }
        var o = require('./log/stat'), r = require('./im/send'), s = require('./im'), c = {
                mainId: '',
                siteId: '',
                subId: '',
                sessionId: '',
                chatId: '',
                open: 1
            }, f = null, exports = {};
        return exports.init = function () {
            r.on('statCommunicate', n), s.on('statTaskBegin', e), s.on('statPickMessage', i), s.on('statPickOffline', a), s.on('statPickKick', a), s.on('statPickTransfer', a);
        }, exports;
    }), define('qiao-im-core/message/voice', [
        'require',
        '../base/string'
    ], function (require) {
        function e(e) {
            var t = a[e];
            return function (e, n, i) {
                var a = t(e);
                if (!a)
                    return void i();
                var o = n[n.length - 1];
                if (o && 'text' === o.type)
                    o.text += a;
                else
                    n.push({
                        type: 'text',
                        text: a
                    });
                i();
            };
        }
        var t = require('../base/string').encodeHTML, n = require('../base/string').format, i = { GET: '<span class="voice-tip">\u8BED\u97F3\u8F6C\u8BD1\uFF1A</span><span>${voice}</span>' }, a = {
                voice: function (e) {
                    var a = t(e.c);
                    return n(i.GET, { voice: a.replace(/\r\n/gi, '<br/>').replace(/&amp;#xD;&amp;#xA;/gi, '<br/>').replace(/%2B/gi, '+') });
                }
            }, exports = {};
        exports.decoder = {};
        for (var o in a)
            if (a.hasOwnProperty(o))
                exports.decoder[o] = e(o);
        return function () {
            return exports;
        };
    }), define('qiao-im-core/message/meta/img', [
        'require',
        '../../base/string'
    ], function (require) {
        var e = require('../../base/string').format, t = {
                SEND: '<img md5="${md5}" token="${token}" bcsname="${name}" source="bcs" t="${type}" n="screen"/>',
                GET: '<img data-fid="${bcsname}" src="${defaultImg}" />'
            }, n = /(<img[^>]+(:?(:?data-token=[^>]+data-md5=[^>]*)|(:?data-md5=[^>]+data-token=[^>]*))>)/gi, exports = {};
        return exports.encode = function (i, a, o) {
            var r, s = document.createElement('div'), c = '', f = '', u = '', d = '';
            return i = i.replace(n, function (n, i) {
                if (s.innerHTML = n, r = s.getElementsByTagName('img')[0], f = r.getAttribute('data-md5'), c = r.getAttribute('data-token'), u = r.getAttribute('data-fid'), d = r.getAttribute('data-type'), !(f && c && u && 'img' === d))
                    return n;
                else
                    return o && o.push(e(t.SEND, {
                        md5: f,
                        token: c,
                        name: u,
                        type: 'img'
                    })), a;
            });
        }, exports;
    }), define('qiao-im-core/message/meta/font', [
        'require',
        '../../base/util',
        '../../base/string'
    ], function (require) {
        function e(e) {
            return e = e.substr(5) + e.substr(3, 2) + e.substr(1, 2), parseInt(e, 16);
        }
        function t(t) {
            if (c.test(t))
                return e(t);
            else if (f.test(t))
                return n(t);
            return 0;
        }
        function n(t) {
            t = t.substring(4, t.length - 1), t = t.split(',');
            var n = parseInt(t[0], 10), i = parseInt(t[1], 10), a = parseInt(t[2], 10);
            if (n = n.toString(16), 1 == n.length)
                n = '0' + n;
            if (i = i.toString(16), 1 == i.length)
                i = '0' + i;
            if (a = a.toString(16), 1 == a.length)
                a = '0' + a;
            return t = ('#' + n + i + a).toUpperCase(), e(t);
        }
        function i(e) {
            var t = e;
            if (isNaN(t))
                return '';
            else
                return t = new Number(t).toString(16).toUpperCase(), t = (s.COLOR.substr(1) + t).substr(t.length), t = s.COLOR.substr(0, 1) + t.substr(4) + t.substr(2, 2) + t.substr(0, 2);
        }
        var a = require('../../base/util').extend, o = require('../../base/string').format, r = {
                SEND: '<font n="${family}" c="${color}" s="${size}" b="${weight}" i="${style}" ul="${decoration}" />',
                GET: '<div style="font-family:${family};font-size:${size};color:${color};font-weight:${weight};font-style:${style};text-decoration:${decoration};"></div>'
            }, s = {
                COLOR: '#000000',
                SIZE_UNIT: 'pt'
            }, exports = {}, c = /^\#[\da-f]{6}$/i, f = /^[rgb|RGB]/;
        return exports.encode = function (e) {
            var n = a({}, e || {});
            return n.family = n.fontFamily || 'simsun', n.size = parseInt(n.fontSize, 10) || 12, n.color = n.color ? t(n.color) : 0, n.weight = n.fontWeight ? 1 : 0, n.style = 'italic' === n.fontStyle ? 1 : 0, n.decoration = 'underline' === n.fontDecoration ? 1 : 0, n = o(r.SEND, n);
        }, exports.decode = function (e) {
            var t = a({}, e || {});
            return t.family = t.n, t.size = parseInt(t.s, 10) < 0 ? '' : t.s + s.SIZE_UNIT, t.color = t.c ? i(t.c) : '', t.weight = '1' === t.b ? 'bold' : '', t.style = '1' === t.i ? 'italic' : '', t.decoration = '1' === t.ul ? 'underline' : '', t = o(r.GET, t);
        }, exports;
    }), define('qiao-im-core/message/meta/url', [
        'require',
        '../../base/string'
    ], function (require) {
        var e = require('../../base/string').format, t = require('../../base/string').encodeHTML, n = /((((https?|ftp):\/\/[\w-]+)|\bwww)(\.[\w-]+)+(:\d+)?(\/[\w\u4e00-\u9fa5\uf900-\ufa2d%-]+){0,}(\/|\.[\w-]+)*(\?[\w-]*(\.[\w-]+)*(=[^&=< >\r\n]*)?(&[\w-;]*(=[^&=< >\r\n]*)?){0,})?)/gi, i = /(<img[^>]+>)/im, a = {
                DECODE: '<a target="_blank" href="${href}">${content}</a>',
                ENCODE: '<url ref="${ref}" />'
            }, exports = {};
        return exports.encode = function (o, r, s) {
            for (var c = []; i.test(o);)
                c.push(RegExp.$1), o = o.replace(RegExp.$1, '\x0F\x0E' + (c.length - 1) + '\x0F');
            var f = {};
            o = o.replace(n, function (n, i, o) {
                return f.ref = ('www' === o ? 'http://' : '') + i.replace(/&amp;/g, '&'), f.ref = t(f.ref), s && s.push(e(a.ENCODE, f)), r;
            });
            for (var u = 0; u < c.length; u++)
                o = o.replace('\x0F\x0E' + u + '\x0F', c[u]);
            return o;
        }, exports.decode = function (t) {
            var n = {}, i = t.ref;
            n.href = (/^http/.test(i) ? '' : 'http://') + i;
            var o = t.c || t.ref;
            return n.content = o.replace(/\r\n/gi, '<br>'), e(a.DECODE, n);
        }, exports;
    }), define('qiao-im-core/message/meta/face', [
        'require',
        '../../lang',
        '../../base/string',
        '../../common'
    ], function (require) {
        function e(e) {
            for (var t, n = 0; t = r[n]; n++)
                if (t.name === e)
                    return {
                        name: e,
                        img: o + t.md5
                    };
            return null;
        }
        var t = require('../../lang'), n = require('../../base/string').format, i = require('../../common').array.indexOf, a = [
                '\u5FAE\u7B11',
                '\u5927\u7B11',
                '\u5077\u7B11',
                '\u61A8\u7B11',
                '\u5F97\u610F',
                '\u53EF\u7231',
                '\u5BB3\u7F9E',
                '\u4E56',
                '\u6DD8\u6C14',
                '\u8C03\u76AE',
                '\u6D41\u6CEA',
                '\u5927\u54ED',
                '\u6487\u5634',
                '\u95ED\u5634',
                '\u5618',
                '\u9119\u89C6',
                '\u50B2\u6162',
                '\u767D\u773C',
                '\u601D\u8003',
                '\u56F0',
                '\u7761',
                '\u6C57',
                '\u5C34\u5C2C',
                '\u60CA\u8BB6',
                '\u60CA\u6050',
                '\u7591\u95EE',
                '\u6655',
                '\u6572\u6253',
                '\u96BE\u8FC7',
                '\u59D4\u5C48',
                '\u8272',
                '\u6293\u72C2',
                '\u6124\u6012',
                '\u5410',
                '\u8870',
                '\u518D\u89C1',
                '\u5DE6\u62E5\u62B1',
                '\u53F3\u62E5\u62B1',
                '\u95EA\u4EBA',
                '\u5200',
                '\u543B',
                '\u7231\u60C5',
                '\u5FC3\u788E',
                '\u9C9C\u82B1',
                '\u67AF\u840E',
                '\u80DC\u5229',
                'OK',
                '\u5927\u62C7\u6307',
                '\u5F31',
                '\u63E1\u624B',
                '\u86CB\u7CD5',
                '\u5496\u5561',
                '\u5403\u996D',
                '\u592A\u9633',
                '\u6708\u4EAE',
                '\u661F\u661F',
                '\u4FBF\u4FBF',
                '\u732A\u5934',
                '\u94B1',
                'Hi'
            ], o = 'http://h.qiao.baidu.com/f/pool/img/webim/defaultface/', r = [
                {
                    name: '\u5FAE\u7B11',
                    shortcut: ':)',
                    md5: 'c7b91efe2e01b35d9ff088993ca9a11a.png'
                },
                {
                    name: '\u5927\u7B11',
                    shortcut: ':D',
                    md5: '73a512491b0e3e12099ed7900cd4482d.gif'
                },
                {
                    name: '\u5077\u7B11',
                    shortcut: '(tx)',
                    md5: '5394895d38f997b201036acf646ab181.gif'
                },
                {
                    name: '\u61A8\u7B11',
                    shortcut: ':o',
                    md5: '2b257b850465aa84dfa9d7170515ac57.gif'
                },
                {
                    name: '\u5F97\u610F',
                    shortcut: '(dy)',
                    md5: '8372252a0bbffba66ded3a8fa71ff410.gif'
                },
                {
                    name: '\u53EF\u7231',
                    shortcut: '(ka)',
                    md5: 'e51b1712edec1b5c5f751fbb7374a3b0.gif'
                },
                {
                    name: '\u5BB3\u7F9E',
                    shortcut: '(hx)',
                    md5: '6d3fdbc79e3568e66a1f3411dfc0a30c.gif'
                },
                {
                    name: '\u4E56',
                    shortcut: '(oo)',
                    md5: 'a024381379da74153694c4ebb9f75014.gif'
                },
                {
                    name: '\u6DD8\u6C14',
                    shortcut: '(tq)',
                    md5: 'ee5ab8e89776a17d26367d131f77bea3.png'
                },
                {
                    name: '\u8C03\u76AE',
                    shortcut: ':p',
                    md5: '1cc3b63e1bf9753bcecf8e99185c3d74.png'
                },
                {
                    name: '\u6D41\u6CEA',
                    shortcut: '(ll)',
                    md5: '3fbeb731a465584bc3b2c5b84333860c.gif'
                },
                {
                    name: '\u5927\u54ED',
                    shortcut: ':\'(',
                    md5: 'e7daaaf6031549140d88e46154445e2c.gif'
                },
                {
                    name: '\u6487\u5634',
                    shortcut: '(pz)',
                    md5: '95af917d5ccfb614ec03731f686f1c49.png'
                },
                {
                    name: '\u95ED\u5634',
                    shortcut: ':-#',
                    md5: 'd267f14a949cc1c67d5afebea631b95f.gif'
                },
                {
                    name: '\u5618',
                    shortcut: '(xu)',
                    md5: '2d962d090c00a534c3cb604a3409c8a9.gif'
                },
                {
                    name: '\u9119\u89C6',
                    shortcut: '(bs)',
                    md5: '6e5a6dd0094a5f413c9d40d703552563.gif'
                },
                {
                    name: '\u50B2\u6162',
                    shortcut: '(am)',
                    md5: 'a7792b792338c0824e4eba4e8f53f248.png'
                },
                {
                    name: '\u767D\u773C',
                    shortcut: '(fc)',
                    md5: '9046a275b6fcc032d552c2be28deda85.gif'
                },
                {
                    name: '\u601D\u8003',
                    shortcut: '(sk)',
                    md5: 'f68391b534ad9c6e2980e1c9f4248b7b.gif'
                },
                {
                    name: '\u56F0',
                    shortcut: '|-)',
                    md5: '2939123abba6052d64383ad7cd62983d.gif'
                },
                {
                    name: '\u7761',
                    shortcut: '(zz)',
                    md5: 'e79f016440edafd4ba3f5c7f45077883.gif'
                },
                {
                    name: '\u6C57',
                    shortcut: '(lh)',
                    md5: 'c0d21388d259446932b1d2c84a243c4b.gif'
                },
                {
                    name: '\u5C34\u5C2C',
                    shortcut: ':$',
                    md5: 'f57200e594d2c74dae63321a685c0a01.gif'
                },
                {
                    name: '\u60CA\u8BB6',
                    shortcut: ':-o',
                    md5: 'f3807c4d0dfd29864538bff866f8e8d2.png'
                },
                {
                    name: '\u60CA\u6050',
                    shortcut: '(jk)',
                    md5: '2e855936c4d0e3a8d8925c6ff7033802.gif'
                },
                {
                    name: '\u7591\u95EE',
                    shortcut: '(?)',
                    md5: 'efa51b9fd7f230928f589f72de2510ab.gif'
                },
                {
                    name: '\u6655',
                    shortcut: ':s',
                    md5: '3b9b9fa53da41b2be65de19bbfa3f477.gif'
                },
                {
                    name: '\u6572\u6253',
                    shortcut: '(qd)',
                    md5: '7add275c91a9130f9e3b1ba52eb8e8d6.GIF'
                },
                {
                    name: '\u96BE\u8FC7',
                    shortcut: ':(',
                    md5: 'fd0771f664dee6d809213572cb825efa.png'
                },
                {
                    name: '\u59D4\u5C48',
                    shortcut: '(wq)',
                    md5: '125b1fee2dcae224a46500185c41f74e.gif'
                },
                {
                    name: '\u8272',
                    shortcut: '(se)',
                    md5: 'a9bb9d9d9bd83c530585f32139ca7e07.gif'
                },
                {
                    name: '\u6293\u72C2',
                    shortcut: '(zk)',
                    md5: '2748bd8030e2db488dbf96b833e73233.gif'
                },
                {
                    name: '\u6124\u6012',
                    shortcut: ':@',
                    md5: '60f3c02d34d47ec70a1a93304606d5bf.GIF'
                },
                {
                    name: '\u5410',
                    shortcut: '+o(',
                    md5: '70347b086d5d1b58cb6afac1c5a709b6.gif'
                },
                {
                    name: '\u8870',
                    shortcut: '(sh)',
                    md5: 'c93d82cc99597cd2af1e1de3bfe96dcc.png'
                },
                {
                    name: '\u518D\u89C1',
                    shortcut: '(zj)',
                    md5: '1d6e9bfd1eb9db00a2f5002660de7bd5.gif'
                },
                {
                    name: '\u5DE6\u62E5\u62B1',
                    shortcut: '({)',
                    md5: '6f2c8b9cc8b654852b8765f9de36ea7b.png'
                },
                {
                    name: '\u53F3\u62E5\u62B1',
                    shortcut: '(})',
                    md5: '835c7ed5ebc0638a4290dc2bc5075293.png'
                },
                {
                    name: '\u95EA\u4EBA',
                    shortcut: '(sr)',
                    md5: '638e9e5693be2e25b7fb49ef53dccd59.png'
                },
                {
                    name: '\u5200',
                    shortcut: '(d)',
                    md5: '79049e7bb24e1610fa3172ffc9c6afbe.gif'
                },
                {
                    name: '\u543B',
                    shortcut: '(w)',
                    md5: 'b4717e8c1be2396f59424edb642f346f.png'
                },
                {
                    name: '\u7231\u60C5',
                    shortcut: '(ai)',
                    md5: 'df8cd7fb1a5402081bba02ed27f3d460.png'
                },
                {
                    name: '\u5FC3\u788E',
                    shortcut: '(xs)',
                    md5: '9a48f0d784b340130ddc548bbe0e41b1.gif'
                },
                {
                    name: '\u9C9C\u82B1',
                    shortcut: '(xh)',
                    md5: 'e0ef4acf693e8bd332304539c3d556e6.png'
                },
                {
                    name: '\u67AF\u840E',
                    shortcut: '(kw)',
                    md5: 'e3d5d44d18592e744a877028ccd5ce7e.png'
                },
                {
                    name: '\u80DC\u5229',
                    shortcut: '(sl)',
                    md5: 'c12b4546988745b970a528e9d4c7d36b.gif'
                },
                {
                    name: 'OK',
                    shortcut: '(ok)',
                    md5: 'ea9118eeb5d1251204aa06ac676d039c.png'
                },
                {
                    name: '\u5927\u62C7\u6307',
                    shortcut: '(n)',
                    md5: 'df9f3c4d0296f6971a88f38836da30b3.gif'
                },
                {
                    name: '\u5F31',
                    shortcut: '(r)',
                    md5: '0700d37ba0b4b48503971f10d1e4b043.gif'
                },
                {
                    name: '\u63E1\u624B',
                    shortcut: '(ws)',
                    md5: 'af63cb39facadd039efa04da4b29c160.gif'
                },
                {
                    name: '\u86CB\u7CD5',
                    shortcut: '(^)',
                    md5: '71069905c70351d3b61d252c7bbea5cf.gif'
                },
                {
                    name: '\u5496\u5561',
                    shortcut: '(kf)',
                    md5: 'a119c664f4d00bf17448bb4a77b761c0.gif'
                },
                {
                    name: '\u5403\u996D',
                    shortcut: '(cf)',
                    md5: 'f64ed5b3c7d9c934847aeacda0743cbe.png'
                },
                {
                    name: '\u592A\u9633',
                    shortcut: '(#)',
                    md5: 'c6889c8bdd7ee08445e5009b803a29aa.png'
                },
                {
                    name: '\u6708\u4EAE',
                    shortcut: '(s)',
                    md5: '7d1f68af6f74d00649c664a99f546b76.png'
                },
                {
                    name: '\u661F\u661F',
                    shortcut: '(*)',
                    md5: '0d11d94e64e06bc04c42d64a77834444.png'
                },
                {
                    name: '\u4FBF\u4FBF',
                    shortcut: '(bb)',
                    md5: 'a811e4d3e0bf451c4716401ac251d056.gif'
                },
                {
                    name: '\u732A\u5934',
                    shortcut: '(zt)',
                    md5: '8260d8878f182d0b3c6aa46d933fc216.png'
                },
                {
                    name: '\u94B1',
                    shortcut: '(q)',
                    md5: 'd6b4a948530ed9dbb34e53e63dfc910.png'
                },
                {
                    name: 'Hi',
                    shortcut: '(hi)',
                    md5: 'd98dc2c9584121f0a863c3d608cd3503.png'
                }
            ], s = {
                SEND: '<face n="${face}"/>',
                GET: '<img src="${img}" alt="${name}"/>'
            }, c = /(<img[^>]+(:?(:?data-type="face"[^>]+alt=[^>]*)|(:?alt=[^>]+data-type="face"[^>]*))>)/gi, exports = {};
        return exports.encode = function (e, t, o) {
            var r, f = document.createElement('div'), u = '';
            return e = e.replace(c, function (e, c) {
                if (f.innerHTML = e, r = f.getElementsByTagName('img')[0], u = r.getAttribute('alt'), i(a, u) >= 0)
                    return o && o.push(n(s.SEND, { face: u })), t;
                else
                    return e;
            });
        }, exports.decode = function (i) {
            var a;
            if (a = e(i.n))
                return n(s.GET, a);
            else
                return t.TEXT.FACE_UNSUPPORT;
        }, exports;
    }), define('qiao-im-core/message/text', [
        'require',
        '../base/string',
        './meta/face',
        './meta/url',
        './meta/font',
        './meta/img'
    ], function (require) {
        function e(e) {
            var t = e.replace(/[\n\r]/g, '');
            return t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>\/]+>/g, '').replace(/(\n)?<\/([^>]+)>/g, function (e, t, n) {
                return m[n.toLowerCase()] ? '\n' : t ? t : '';
            }).replace(/<[^>]+>/g, '').replace(/(\n)+/g, '<br />'), t.replace(l, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
        }
        function t(e) {
            var t = g[e];
            return function (e, n, i) {
                var a = t(e);
                if (!a)
                    return void i();
                var o = n[n.length - 1];
                if (o && 'text' === o.type)
                    o.text += a;
                else
                    n.push({
                        type: 'text',
                        text: a
                    });
                i();
            };
        }
        function n(e, t) {
            for (var n, i = t.length, r = '', s = e, c = 0; i > c; c++)
                n = t[c], e = n.encode(e, n.replaceStr, n.res), s = n.encode(s, '\x0F'), r += n.replaceStr + '|';
            e = a(e), r = r.substring(0, r.length - 1);
            var f, u, l = new RegExp(r, 'g'), m = [], g = s.split('\x0F');
            e = e.replace(l, function (e) {
                for (c = 0; i > c; c++)
                    if (n = t[c], f = n.replaceStr, e === f && (u = n.res[n.index]))
                        m.push(n.res[n.index++]);
            }), i = g.length;
            var p = [];
            for (c = 0; i > c; c++) {
                if (n = g[c])
                    p.push(o(d, { text: a(n) }));
                if (n = m[c])
                    p.push(m[c]);
            }
            return e = p.join('');
        }
        function i(e, t) {
            var n = {
                encode: e,
                replaceStr: t,
                res: [],
                index: 0
            };
            return n;
        }
        var a = require('../base/string').encodeHTML, o = require('../base/string').format, r = require('./meta/face'), s = require('./meta/url'), c = require('./meta/font'), f = require('./meta/img'), u = 'text', d = '<text c="${text}"/>', l = new RegExp('\u200B', 'g'), m = {
                address: 1,
                blockquote: 1,
                center: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                hr: 1,
                isindex: 1,
                menu: 1,
                noframes: 1,
                ol: 1,
                p: 1,
                pre: 1,
                table: 1,
                ul: 1
            }, g = {
                text: function (e) {
                    var t = a(e.c);
                    return t.replace(/\r\n/gi, '<br/>').replace(/&amp;#xD;&amp;#xA;/gi, '<br/>').replace(/%2B/gi, '+');
                },
                url: s.decode,
                font: c.decode,
                face: r.decode,
                img: function (e) {
                    return '[\u56FE\u7247]';
                },
                html: function (t) {
                    return e(t.c);
                }
            }, exports = {};
        exports.decoder = {};
        for (var p in g)
            if (g.hasOwnProperty(p))
                exports.decoder[p] = t(p);
        return exports.encoder = {
            text: function (e) {
                var t = e.text, a = [];
                return a.push(i(r.encode, '\r')), a.push(i(f.encode, '\x0E')), a.push(i(s.encode, '\x0F')), t = n(t, a), t = c.encode(e) + t;
            }
        }, exports.type = u, function () {
            return exports;
        };
    }), define('qiao-im-core/im/config', ['require'], function (require) {
        var exports = {};
        return exports.EVENT = {
            CONNECT: 'connect',
            SAY: 'say',
            END: 'end',
            UPLOAD: 'getuploadserver',
            STARTUPLOAD: 'startupload',
            SENDPREVIEW: 'sendpreview',
            INPUTING: 'inputing',
            ACCEPTFILE: 'acceptfile',
            REJECTFILE: 'rejectfile',
            CANCELFILE: 'cancelfile',
            SENDFILE: 'sendfile',
            SENDFILESTATUS: 'sendfilestatus',
            TRANSFER: 'transfer',
            HASHISTORY: 'hashistory',
            FILEOK: 'fileok',
            KICK: 'kick',
            FORCEOVER: 'forceover',
            ASSIGNTASK: 'assigntask',
            TASKBEGIN: 'taskbegin',
            CSOFFLINE: 'csoffline',
            CSONLINE: 'csonline',
            INFO: 'info',
            BLOCK: 'block',
            ERROR: 'error',
            UPDATEDATA: 'updateData',
            PEERFILE: 'peerfile',
            STOP: 'stop'
        }, exports;
    }), define('qiao-im-core/im/file', ['require'], function (require) {
        var e = {}, exports = {};
        return exports.mapIn = function (t) {
            e[t.fid] = t;
        }, exports.set = function (t, n, i) {
            if (e[t])
                e[t][n] = i;
        }, exports.get = function (t, n) {
            for (var i in e)
                if (i === t)
                    if (!n)
                        return e[i];
                    else
                        return e[i][n];
        }, exports.map = e, exports;
    }), define('qiao-im-core/im/bcs', [
        'require',
        '../common'
    ], function (require) {
        function e(e, t, a) {
            var o = { file: e.fid }, r = i.URL_UPLOAD + e.type;
            n(i.SVR_TYPE, r, {
                data: o,
                onsuccess: t,
                onfail: a
            });
        }
        var t = require('../common'), n = t.request, i = {
                SVR_TYPE: 'ACCOUNT',
                URL_UPLOAD: '?module=im&controller=frontUrl&action=uploadUrl&m=',
                URL_DOWNLOAD: '?module=im&controller=frontUrl&action=downloadUrl'
            }, exports = {};
        return exports.getUploadPath = function (t, n, i) {
            var a;
            e(t, function (e) {
                e = e || {}, a = e.data || {}, a.fid = t.fid, n && n(a);
            }, function (e) {
                e = e || {}, a = e.data || {}, a.fid = t.fid, i && i(a);
            });
        }, exports.download = function (e, t, a) {
            var o = {
                file: t,
                token: e
            };
            n(i.SVR_TYPE, i.URL_DOWNLOAD, {
                data: o,
                onsuccess: function (e) {
                    if (0 === e.status)
                        a && a(e.data.url);
                }
            });
        }, exports;
    }), define('qiao-im-core/im/history', [
        'require',
        '../base/util',
        '../base/emitter',
        '../common',
        './chat/message'
    ], function (require) {
        function e(e) {
            var t = e.content;
            if (t) {
                var n = t.fields;
                if (n && a.isArray(n))
                    for (var i, o, r = n.length, s = 0; r > s; s++)
                        if (i = n[s], o = i.command, 'message' === o)
                            c[o](i, 'history');
            }
        }
        function t() {
            var t = {
                data: f,
                onsuccess: function (t) {
                    if (0 === t.status)
                        e(t.data || t);
                    n(i);
                },
                onfail: function () {
                    n(i);
                }
            };
            s(d.SVR_TYPE, d.URL_HIS, t);
        }
        var n, i, a = require('../base/util'), o = require('../base/emitter'), r = require('../common'), s = r.request, c = require('./chat/message'), f = {
                sessionid: '',
                imuss: '',
                s: '',
                e: '',
                ucid: ''
            }, u = { HAS: 'hashistory' }, d = {
                SVR_TYPE: 'ACCOUNT',
                URL_HIS: '?module=im&controller=web&action=getHistoryMsg'
            }, exports = {};
        return o.mixin(exports), exports.start = function (e, o, r) {
            n = r, i = o;
            var s;
            if (o.histime)
                s = {
                    s: o.histime.s || '',
                    e: o.histime.e || ''
                };
            f = a.extendBySame(f, e, o, s), f.imuss = e.bid, t();
        }, exports.EVENT = u, exports;
    }), define('qiao-im-core/lang', [], function () {
        var exports = {};
        return exports.TEXT = {
            FILE_UNSUPPORT: '[\u6587\u4EF6]',
            FACE_UNSUPPORT: '[\u6269\u5C55\u5934\u50CF]',
            IMG_UNSUPPORT: '[\u56FE\u7247]',
            CFACE_UNSUPPORT: '[\u81EA\u5B9A\u4E49\u5934\u50CF]',
            CSNAME_DEFAULT: '\u5728\u7EBF\u5BA2\u670D',
            CSNAME_GROUP: '\u9ED8\u8BA4\u5206\u7EC4'
        }, exports;
    }), define('qiao-im-core/account', [
        'require',
        './base/util',
        './common',
        './lang',
        './data'
    ], function (require) {
        var e = require('./base/util'), t = require('./common'), n = t.request, i = require('./lang'), a = require('./data'), o = {
                SVR_TYPE: 'ACCOUNT',
                GET_SUB_NAME: '?module=im&controller=mobile&action=getUserName',
                GET_GROUP_NAME: '?module=im&controller=mobile&action=getGroupName',
                GET_SITE_INFO: '?module=im&controller=mobile&action=corporation'
            }, r = {
                COMPANY: 0,
                GROUP: 1,
                SUBNAME: 2,
                NICKNAME: 3
            }, s = {
                siteid: '',
                ucid: '',
                csNameType: r.SUBNAME
            }, exports = {}, c = {};
        return exports.getGroupName = function (t, i, a, r) {
            var c = {};
            c[r ? 'subid' : 'groupid'] = t, n(o.SVR_TYPE, o.GET_GROUP_NAME, {
                data: e.extend(s, c),
                onsuccess: i,
                onfail: a
            });
        }, exports.getSubName = function (t, i, a) {
            n(o.SVR_TYPE, o.GET_SUB_NAME, {
                data: e.extend(s, { subid: t }),
                onsuccess: i,
                onfail: a
            });
        }, exports.getShowSubNameById = function (e, t) {
            function n() {
                if (f)
                    clearTimeout(f);
                if (f = null, c[e] = u, t)
                    t(u);
            }
            var o, f, u;
            if (s.csNameType === r.COMPANY)
                o = a.get('compname') || i.TEXT.CSNAME_DEFAULT;
            else if (s.csNameType === r.NICKNAME)
                o = a.get('nickname') || i.TEXT.CSNAME_DEFAULT;
            else if (c[e])
                o = c[e];
            else {
                u = s.csNameType === r.GROUP ? i.TEXT.CSNAME_GROUP : i.TEXT.CSNAME_DEFAULT;
                var d = s.csNameType === r.GROUP ? exports.getGroupName : exports.getSubName;
                return f = setTimeout(n, 3000), void d(e, function (n) {
                    n = n.data || '', n = n.replace(/^.*?:/, '');
                    var i = c[e] = n.status ? u : n;
                    if (f)
                        if (clearTimeout(f), t)
                            t(i);
                }, n, !0);
            }
            if (o && t)
                t(o);
            return o;
        }, exports.getSiteInfo = function (e, t) {
            n(o.SVR_TYPE, o.GET_SITE_INFO, {
                data: s,
                onsuccess: e,
                onfail: t
            });
        }, exports.init = function (t) {
            s = e.extendBySame(s, t);
        }, exports;
    }), define('qiao-im-core/im/send', [
        'require',
        '../base/util',
        '../common',
        '../message',
        './chat/message',
        '../base/emitter',
        '../data'
    ], function (require) {
        function e(e) {
            if (a(e), clearTimeout(u), u = setTimeout(function () {
                    exports.startResend();
                }, y.TIME_RESEND), e.count++, e.count >= y.STOP_SEND_COUNT)
                c(e.time);
        }
        function t(e) {
            var t = [].slice.call(arguments, 1);
            return function () {
                e.apply(null, t);
            };
        }
        function n(e) {
            c(e), exports.emit('statCommunicate');
        }
        function i(e) {
            exports.emit('communicatefail', e);
        }
        function a(e) {
            var a = e.time;
            m(y.SVR_TYPE, y.URL_SAY, {
                method: 'post',
                data: e,
                onsuccess: t(n, a),
                onfail: t(i, e)
            }), exports.emit('communicatesend');
        }
        function o(e, t) {
            var n = d.extend(E.ack, {
                to_sub: t || 0,
                ackid: e
            });
            m(y.SVR_TYPE, y.URL_ACK, {
                method: 'post',
                data: n
            });
        }
        function r(e) {
            E.scenemsg.body = e, m(y.SVR_TYPE, y.URL_PREVIEW, {
                method: 'post',
                data: E.scenemsg
            });
        }
        function s() {
            b.on(b.ACK, function (e, t) {
                o(e, t);
            });
        }
        function c(e) {
            var t = g.indexOf(I, e, 'time');
            if (t >= 0)
                g.removeAt(I, t);
            exports.startResend();
        }
        var f, u, d = require('../base/util'), l = require('../common'), m = l.request, g = l.array, p = require('../message'), b = require('./chat/message'), h = require('../base/emitter'), v = require('../data'), y = {
                TIME_RESEND: 20000,
                TIME_PREVIEW: 1500,
                SVR_TYPE: 'IM',
                URL_SAY: 'communicate',
                URL_PREVIEW: 'scenemsg',
                URL_ACK: 'msgack',
                URL_SENDFILE: 'sendfile',
                URL_SENDFILEACK: 'sendfileack',
                URL_CANCELFILE: 'sendfilecancel',
                URL_SENDFILE_STATUS: 'sendfilestatus',
                STOP_SEND_COUNT: 3
            }, E = {
                send: {
                    to: '',
                    tid: '',
                    body: '',
                    time: '',
                    msgtype: 0,
                    messageid: '',
                    auto_subid: ''
                },
                scenemsg: {
                    to: '',
                    body: ''
                },
                ack: {
                    from: '',
                    to: '',
                    to_sub: '',
                    ackid: ''
                },
                sendfile: { username: '' },
                cancelFile: { username: '' },
                sendFileStatus: { username: '' },
                sendFileAck: { username: '' }
            }, exports = {}, T = { SENDPREVIEW: 'sendpreview' }, I = [], C = !0;
        return h.mixin(exports), exports.say = function (e, t, n) {
            var i = E.send;
            if (i.body = e, i.time = t.time || +new Date(), i.messageid = v.get('seq'), i.msgtype = t.msgtype || 0, i.count = 0, void 0 !== n.auto_subid)
                i.auto_subid = n.auto_subid;
            var o = d.clone(i);
            if (I.push(o), C)
                clearTimeout(u), u = setTimeout(function () {
                    exports.startResend();
                }, y.TIME_RESEND), a(o);
        }, exports.setOnlineStatus = function (e) {
            if ('offline' === e)
                C = !1;
            else
                C = !0;
        }, exports.startResend = function () {
            if (I.length > 0)
                e(I[0]);
        }, exports.updateModel = function (e) {
            E.send = d.extend(E.send, e), E.scenemsg = d.extend(E.scenemsg, e);
        }, exports.stopPreview = function () {
            clearInterval(f), f = null;
        }, exports.preview = function () {
            clearInterval(f), f = setInterval(function () {
                exports.emit(T.SENDPREVIEW, function (e) {
                    if (e)
                        p.encode({
                            type: 'text',
                            text: e
                        }, r);
                });
            }, y.TIME_PREVIEW);
        }, exports.sendfile = function (e) {
            var t = '00000000000000000000000000000000', n = e.name, i = e.size, a = d.extend({
                    filepath: n,
                    filesize: i,
                    fid: e.fid
                }, {
                    filename: n.replace(/(.+)\.\w+$/, '$1'),
                    filetype: '.' + n.replace(/.+\.(\w+)$/, '$1'),
                    filemd5: t,
                    service: 'cached',
                    source: 'bcs',
                    role: 'bridge_visitor',
                    progress_notify: 1,
                    uri: 'file/temp/' + t + '/' + i
                }, E.sendfile);
            m(y.SVR_TYPE, y.URL_SENDFILE, {
                method: 'post',
                data: a
            });
        }, exports.cancelFile = function (e) {
            var t = d.extend(e, E.cancelFile);
            m(y.SVR_TYPE, y.URL_CANCELFILE, {
                method: 'post',
                data: t
            });
        }, exports.sendFileAck = function (e, t) {
            var n = {
                type: t,
                service: 'cached',
                role: 'bridge_visitor',
                progress_notify: 0,
                fid: e
            };
            d.extend(n, E.sendFileAck), m(y.SVR_TYPE, y.URL_SENDFILEACK, {
                method: 'post',
                data: n
            });
        }, exports.sendFileStatus = function (e) {
            var t = {
                fid: e.fid,
                size: e.size,
                uri: '',
                ready_for_download: e.finished ? 1 : 0,
                source: 'bcs',
                token: e.token,
                bcsname: e.fid
            };
            t = d.extend(t, E.sendFileStatus), m(y.SVR_TYPE, y.URL_SENDFILE_STATUS, {
                method: 'post',
                data: t
            });
        }, exports.ackMsg = o, exports.EVENT = T, exports.init = function (e) {
            E.send = d.extendBySame(E.send, e, { to: e.username }), E.scenemsg = d.extendBySame(E.scenemsg, e, { to: e.username }), E.ack = d.extendBySame(E.ack, e, { to: e.username }), E.sendfile = d.extendBySame(E.sendfile, e), E.sendFileStatus = d.extendBySame(E.sendFileStatus, e), E.cancelFile = d.extendBySame(E.cancelFile, e), E.sendFileAck = d.extendBySame(E.sendFileAck, e), s();
        }, exports;
    }), define('qiao-im-core/im/chat/message', [
        'require',
        '../../base/emitter',
        '../../base/util',
        '../../data'
    ], function (require) {
        var e = require('../../base/emitter'), t = require('../../base/util'), n = require('../../data'), i = { WELCOME: 1 }, a = {
                PICK: 'pick',
                NOTICE: 'notice',
                ACK: 'ack',
                HISMSG: 'hismsg'
            }, o = {}, r = {}, s = {
                imuss: '',
                from: '',
                to: '',
                to_sub: '',
                ackid: ''
            }, exports = {};
        return e.mixin(exports), exports.message = function (e, t) {
            var s = n.get('peerid') + '';
            if ('peer_message' !== e.command || e.peerid !== s) {
                var c = e.time, f = e.time_server_ms || c, u = e.content, d = e.from_sub;
                if ('peer_message' === e.command)
                    d = e.from;
                var l = e.showOnceType;
                if (void 0 === l) {
                    if (void 0 === f)
                        exports.emit(a.PICK, 'message', u, f, d, t);
                    else if (exports.emit(a.ACK, c, d), !r[c])
                        if (r[c] = !0, 'history' === t) {
                            if (d = e.from_alias || e.from, e.category === i.WELCOME)
                                o[i.WELCOME] = !0;
                            for (var m = 0; m < u.length; m++)
                                if ('img' === u[m].type)
                                    return;
                            exports.emit(a.HISMSG, u, f, d, t);
                        } else
                            exports.emit(a.PICK, 'message', u, f, d, t);
                } else {
                    if (l === i.WELCOME && void 0 !== f)
                        exports.emit(a.ACK, c, e.from);
                    if (!o[l])
                        o[l] = !0, exports.emit(a.PICK, 'message', u, f, d, t);
                }
            }
        }, exports.init = function (e) {
            s = t.extendBySame(s, e);
        }, exports.EVENT = a, exports;
    }), define('qiao-im-core/im/chat', [
        'require',
        '../base/util',
        '../base/emitter',
        '../common',
        './chat/message',
        '../data'
    ], function (require) {
        function e(e, i, o) {
            if (o === h) {
                b = null, clearTimeout(v);
                var r = i.result;
                if ('success' === e)
                    t(i);
                else if ('offline' === r || 'kicked' === r)
                    exports.emit(p.PICK, 'stop');
                else
                    n(i);
                if (!y)
                    setTimeout(a, 0);
                if ('offline' === r || 'kicked' === r)
                    exports.emit(p.PICK, 'restart');
            }
        }
        function t(e) {
            var t = e.content;
            if (t) {
                var n = t.fields;
                if (n && u.isArray(n)) {
                    g.pick.ack = t.ack || g.pick.ack;
                    for (var i, a, o = n.length, r = 0; o > r; r++)
                        if (i = n[r], a = i.command, 'message' === a) {
                            if (i.showOnceType)
                                l[a](i, 'welcome');
                            else
                                l[a](i);
                            if (e.acks)
                                exports.emit(p.SENDACK, e.acks.split(';'));
                        } else if ('peer_message' === a)
                            l.message(i, 'peer_message');
                        else {
                            var s = a.replace(/notify$/, '');
                            exports.emit(p.PICK, s, i.content);
                        }
                }
                exports.emit(p.PICK, 'success', {
                    seq: m.get('seq'),
                    ack: g.pick.ack
                });
            }
        }
        function n(e) {
            e.result;
            if (exports.emit(p.PICK, 'failure'), !y)
                exports.emit(p.PICK, 'success', {
                    seq: m.get('seq'),
                    ack: g.pick.ack
                });
        }
        function i() {
            exports.emit(p.PICK, 'timeout'), clearTimeout(v), r(), a();
        }
        function a() {
            if (!b)
                h++, b = d(E.SVR_TYPE, E.URL_PICK, {
                    method: 'post',
                    data: g.pick,
                    onsuccess: u.createHandle(e, h),
                    onfail: u.createHandle(e, h)
                }), v = setTimeout(i, E.TIME_OUT_PICK);
        }
        function o() {
            l.on(l.EVENT.PICK, function (e, t, n, i, a) {
                if ('message' === e)
                    exports.emit(p.PICK, 'message', t, n, i, a);
            }), T = !0;
        }
        function r() {
            if (b && b.abort)
                b.abort();
            b = null, clearTimeout(v);
        }
        function s(e, t, n) {
            g.pick = c.extendBySame(g.pick, e, { ack: t || '' }, { seq: n || 0 }), g.logout = c.extendBySame(g.logout, e);
        }
        var c = require('../base/util'), f = require('../base/emitter'), u = require('../common'), d = u.request, l = require('./chat/message'), m = require('../data'), g = {
                pick: { ack: '' },
                send: {
                    to: '',
                    tid: '',
                    body: '',
                    time: '',
                    msgtype: 0,
                    messageid: ''
                },
                logout: {}
            }, p = {
                PICK: 'pick',
                SENDACK: 'sendack',
                HISMSG: 'hismsg'
            }, b = null, h = 0, v = null, y = !1, E = {
                TIME_OUT_PICK: 40000,
                URL_PICK: 'pick',
                URL_SAY: 'communicate',
                URL_LOGOUT: 'logout',
                SVR_TYPE: 'IM'
            }, T = !1, exports = {};
        return f.mixin(exports), exports.start = function (e, t, n) {
            s(e, t), l.init(g.send), !T && o(), m.set('seq', n || ''), m.set('session', e.session || ''), a();
        }, exports.logout = function () {
            u.img(E.SVR_TYPE, E.URL_LOGOUT, g.logout);
        }, exports.restart = function () {
            y = !1;
        }, exports.stop = function () {
            y = !0, r(), clearTimeout(v);
        }, exports.EVENT = p, exports;
    }), define('qiao-im-core/im/connect', [
        'require',
        '../base/util',
        '../base/emitter',
        '../common',
        '../base/string',
        '../prevent/main'
    ], function (require) {
        function e(e) {
            return !!/^[0-9]+$/.test(e);
        }
        function t(e) {
            if (exports.emit(h.WELCOME, 'success', e), e.content.tag)
                return void g.proxy(e.content);
            else
                return void c();
        }
        function n(e) {
            exports.emit(h.WELCOME, 'error', e);
        }
        function i(e, i) {
            if ('success' === e)
                t(i);
            else
                n(i);
        }
        function a() {
            var e = {
                checkcode: g.getCheckCode(),
                jscode: g.getJsCode(!0)
            };
            e = m.objectToString(e), v.welcome.tag = e, p(b.SVR_TYPE, b.URL_WELCOME, {
                method: 'post',
                data: v.welcome,
                onsuccess: l.createHandle(i),
                onfail: l.createHandle(i)
            });
        }
        function o(e) {
            if (e.content.tag)
                return void g.proxy(e.content);
            else
                return void exports.emit(h.BRIDGEINIT, 'success', e);
        }
        function r(e) {
            var t = e && e.result;
            switch (t) {
            case 'wait':
                exports.emit(h.BRIDGEINIT, 'success', e);
                break;
            case 'block':
                exports.emit(h.BRIDGEINIT, 'block', e.content);
                break;
            default:
                exports.emit(h.BRIDGEINIT, 'error', e && e.content);
            }
        }
        function s(e, t) {
            if ('success' === e)
                o(t);
            else
                r(t);
        }
        function c() {
            p(b.SVR_TYPE, b.URL_BRIDGEINIT, {
                method: 'post',
                data: v.bridgeinit,
                onsuccess: l.createHandle(s),
                onfail: l.createHandle(s)
            });
        }
        function f(t) {
            var n = v.bridgeinit;
            if (n.sub = e(t.subid) ? t.subid : n.sub, n.bridgetid = e(t.groupid) ? t.groupid : n.bridgetid, e(n.sub))
                n.type = b.TYPE_SUB;
            else if (e(n.bridgetid))
                n.type = b.TYPE_GROUP;
            else
                n.bridgetid = e(t.ptid) ? t.ptid : n.bridgetid;
            n.fromsite = t.referrer || n.fromsite, n.srcword = t.word || n.srcword, n.region = t.from || n.region, n.insite = t.location || n.insite;
        }
        var u = require('../base/util'), d = require('../base/emitter'), l = require('../common'), m = require('../base/string'), g = require('../prevent/main'), p = l.request, b = {
                URL_WELCOME: 'welcome',
                URL_BRIDGEINIT: 'bridgeinit',
                SVR_TYPE: 'IM',
                TYPE_SUB: 0,
                TYPE_GROUP: 1,
                TYPE_SITE: 3,
                TYPE_CLIENT_PC: 1,
                TYPE_CLIENT_MOBILE: 2,
                TYPE_CLIENT_MINI: 3
            }, h = {
                WELCOME: 'welcome',
                BRIDGEINIT: 'bridgeinit'
            }, v = {
                welcome: {
                    source: 0,
                    anonym: !0,
                    clienttype: u.isMobile ? b.TYPE_CLIENT_MOBILE : b.TYPE_CLIENT_PC
                },
                bridgeinit: {
                    type: b.TYPE_SITE,
                    chattype: 1,
                    sub: '',
                    bridgetid: '',
                    username: '',
                    fromsite: document.referrer,
                    srcword: '',
                    wordtype: 0,
                    wordid: 0,
                    region: '',
                    insite: document.referrer,
                    title: '',
                    inittype: ''
                }
            }, exports = {};
        return d.mixin(exports), exports.start = function (e) {
            v.welcome = u.extendBySame(v.welcome, e), v.bridgeinit = u.extendBySame(v.bridgeinit, e), f(e), a();
        }, exports.EVENT = h, exports;
    }), define('qiao-im-core/im', [
        'require',
        './base/Storage',
        './base/emitter',
        './base/util',
        './im/connect',
        './im/chat',
        './im/send',
        './account',
        './message',
        './im/history',
        './data',
        './im/bcs',
        './im/file',
        './common',
        './im/chat/message',
        './im/config',
        './message/text',
        './message/voice'
    ], function (require) {
        function e(e) {
            P = v.extend(P, M, N.get(), e);
        }
        function t(e) {
            P = v.extend(P, e);
            for (var t in M)
                if (M.hasOwnProperty(t))
                    N.set(t, P[t]);
        }
        function n(e, t) {
            P[e] = t, N.set(e, t);
        }
        function i() {
            exports.emit(O.UPDATEDATA, {
                ls: P.ls,
                fs: P.fs,
                lc: P.lc
            });
        }
        function a() {
            n('lc', +P.lc + 1), i();
        }
        function o(e) {
            var t, n = v.getCookie(k.COOKIE_ACK);
            if (n)
                if (t = n.split('|')[1], new Date().getTime() - t < k.COOKIE_ACK_TIME)
                    n = n.split('|')[0];
            E.start(P, e.pickseq || n || '', e.seq), exports.emit(O.CONNECT, e);
        }
        function r(e, t) {
            if (!t)
                c(e);
            if (e.hismsg && e.hismsg === k.HAS_HIS_MSG)
                S.start(P, e, o);
            else
                o(e);
        }
        function s(e) {
            if (D = k.STATUS_WAIT, e && e.length > 0)
                C.decode(e, function (e) {
                    if (e = e[0], e && 'text' === e.type)
                        exports.emit(O.INFO, e.text, 'wait');
                });
        }
        function c(e) {
            var n = e.subid;
            if (void 0 !== n && n !== P.subid) {
                var a = void 0 === e.tid ? P.tid : e.tid;
                t({
                    subid: n,
                    tid: a,
                    ls: n,
                    fs: '' === P.fs ? e.subid || 0 : P.fs
                }), i(), _.set('subid', n);
            }
        }
        function f(e, t, n, i) {
            if (!t)
                t = new Date().getTime();
            if ('history' === i)
                C.decode(e, function (e) {
                    exports.emit('message', e, n, t, i);
                });
            else if ('peer_message' === i) {
                C.decode(e, function (e) {
                    exports.emit('message', e, n, t, i);
                });
                for (var a = 0; a < e.length; a++)
                    if ('img' === e[a].type)
                        !function () {
                            var t = decodeURIComponent(e[a].token), n = e[a].bcsname;
                            w.download(t, n, function (e) {
                                exports.emit(O.FILEOK, {
                                    url: e,
                                    name: R.get(n, 'name'),
                                    token: t,
                                    fid: n,
                                    type: 'img'
                                });
                            });
                        }();
            } else
                I.getShowSubNameById(n, function (n) {
                    C.decode(e, function (e) {
                        exports.emit('message', e, n, t, i);
                    });
                });
        }
        function u() {
            var e = Array.prototype.slice.call(arguments), t = U[e[0]];
            if (t)
                t.apply(null, e.slice(1));
        }
        function d() {
            y.on(y.EVENT.WELCOME, function (e, t) {
                if ('success' === e) {
                    if (t.content.tag)
                        return void (L = !1);
                    _.set('session', t.content.session), n('session', t.content.session), n('keep', 1000 * t.content.keep || k.CHAT_TIME_OUT);
                } else
                    L = !1, exports.emit(O.ERROR, A.CONNECT, t || k.ERROR_INIT_WELCOME);
            }), y.on(y.EVENT.BRIDGEINIT, function (e, t) {
                if ('success' === e) {
                    if (F = !0, r(t.content), t.result && 'wait' === t.result.toLowerCase())
                        s(t.content.autoResponse);
                    T.updateModel({ tid: t.content.tid }), a();
                } else if ('block' === e)
                    g(), exports.emit(O.ERROR, A.CONNECT, t);
                else
                    exports.emit(O.ERROR, A.CONNECT, t);
            }), x.on(x.EVENT.HISMSG, f), x.on(x.EVENT.ACK, T.ackMsg), E.on(E.EVENT.PICK, u), E.on(E.EVENT.SENDACK, T.success), T.on(T.EVENT.SENDPREVIEW, function (e) {
                exports.emit(O.SENDPREVIEW, e);
            }), S.on(S.EVENT.HAS, function (e) {
                exports.emit(O.HASHISTORY, e);
            });
        }
        function l() {
            t({ session: '' }), L = !1;
        }
        function m() {
            N.clear();
        }
        function g(e) {
            E.stop(), l();
        }
        var p, b = require('./base/Storage'), h = require('./base/emitter'), v = require('./base/util'), y = require('./im/connect'), E = require('./im/chat'), T = require('./im/send'), I = require('./account'), C = require('./message'), S = require('./im/history'), _ = require('./data'), w = require('./im/bcs'), R = require('./im/file'), N = (require('./common'), new b('im')), x = require('./im/chat/message'), O = require('./im/config').EVENT, A = {
                CONNECT: 'connect',
                OFFLINE: 'offline',
                UPLOAD: 'getuploadserver'
            }, k = {
                STATUS_NORMAL: 0,
                STATUS_WAIT: 1,
                TIME_OFFLINE: 130000,
                ERROR_INIT_WELCOME: 1,
                ERROR_INIT_BRIDGE: 2,
                OVER_TYPE_KICK: 1,
                OVER_TYPE_FORCE: 2,
                HAS_HIS_MSG: 1,
                CS_STATUS_WAIT: 3,
                CHAT_TIME_OUT: 120000,
                COOKIE_ACK: 'QIAO_COOKIE_ACK',
                COOKIE_ACK_TIME: 30000,
                STOP_TYPE_KICK: 'kick',
                STOP_TYPE_FORCE: 'force'
            }, P = { inittype: '' }, L = !1, F = !1, D = k.STATUS_NORMAL, M = {
                imuss: '',
                bid: '',
                session: '',
                ack: '',
                seq: '',
                tid: '',
                sub: '',
                inittype: '',
                csName: '',
                chatid: '',
                lasttime: 0,
                keep: 0
            }, U = {}, exports = {};
        return U.success = function (e) {
            if (v.extend(e, { lasttime: new Date().getTime() }), t(e), p)
                clearTimeout(p), p = null;
        }, U.scenefocus = function () {
            if (!P.inittype)
                T.preview();
        }, U.sceneunfocus = function () {
            T.stopPreview();
        }, U.stop = function () {
            g();
        }, U.restart = function () {
            E.restart(), exports.emit(O.ERROR, A.OFFLINE);
        }, U.scenemsg = function () {
            exports.emit(O.INPUTING);
        }, U.message = function (e, t, n, i) {
            f(e, t, n, i), exports.emit('statPickMessage');
        }, U.sendfileack = function (e) {
            if (e) {
                var t = e.type;
                if ('agree' === t)
                    exports.emit(O.ACCEPTFILE, {
                        fid: e.fid,
                        source: e.source
                    }), w.getUploadPath({
                        fid: e.fid,
                        type: 'POST'
                    }, function (e) {
                        exports.emit(O.STARTUPLOAD, e);
                    }, function (e) {
                        exports.emit(O.ERROR, A.UPLOAD);
                    });
                if ('reject' === t)
                    exports.emit(O.REJECTFILE, { fid: e.fid });
            }
        }, U.sendfilecancel = function (e) {
            exports.emit(O.CANCELFILE, e);
        }, U.sendfile = function (e) {
            var t = {
                fid: e.fid,
                name: e.filename,
                type: e.filetype,
                size: e.filesize,
                md5: e.filemd5,
                uri: e.uri
            };
            R.mapIn(t), exports.emit(O.SENDFILE, t);
        }, U.sendfilestatus = function (e) {
            var t = decodeURIComponent(e.token), n = e.bcsname || e.fid;
            if (e.ready_for_download)
                w.download(t, n, function (i) {
                    exports.emit(O.FILEOK, {
                        url: i,
                        name: R.get(n, 'name'),
                        token: t,
                        fid: n,
                        type: e.type || 'file'
                    });
                });
            exports.emit(O.SENDFILESTATUS, {
                fid: n,
                size: e.size,
                name: R.get(n, 'name'),
                type: e.type || 'file'
            });
        }, U.peer_sendfileack = function (e) {
            if (e) {
                var t = _.get('peerid') + '';
                if (e.peerid === t)
                    U.sendfileack(e);
                else
                    exports.emit(O.PEERFILE, {
                        fid: e.fid,
                        type: e.type
                    });
            }
        }, U.communicatetransfer = function (e) {
            c(e), exports.emit(O.TRANSFER, e), exports.emit('statPickTransfer');
        }, U.kick = function (e) {
            if (g(), e && +e.type === k.OVER_TYPE_KICK)
                exports.emit(O.STOP, k.STOP_TYPE_KICK);
            else if (e && +e.type === k.OVER_TYPE_FORCE)
                exports.emit(O.STOP, k.STOP_TYPE_FORCE);
            exports.emit('statPickKick');
        }, U.assigntaskack = function (e) {
            if (c(e), D === k.STATUS_WAIT)
                exports.emit(O.CSONLINE, e.from || '');
        }, U.taskbegin = function (e) {
            c(e), n('chatid', e.sessionid), _.set('sessionid', e.sessionid), exports.emit('statTaskBegin', {
                mainId: _.get('mainId'),
                siteId: _.get('SITE_ID'),
                bid: _.get('bid'),
                subId: _.get('subid'),
                chatId: _.get('sessionid')
            });
        }, U.offline = function (e) {
            exports.emit(O.CSOFFLINE, e), exports.emit('statPickOffline');
        }, h.mixin(exports), exports.setChatStatus = function (e) {
            if (e === k.CS_STATUS_WAIT)
                D = k.STATUS_WAIT;
            else
                D = k.STATUS_NORMAL;
        }, exports.start = function (e) {
            if (P = v.extend(P, e), !L)
                L = !0, y.start(P);
        }, exports.say = function (e) {
            var t = {};
            if (P.inittype)
                t.auto_subid = P.subid;
            C.encode(e, function (n) {
                T.say(n, e, t);
            });
        }, exports.rejectFile = function (e) {
            T.sendFileAck(e, 'reject');
        }, exports.acceptFile = function (e) {
            T.sendFileAck(e, 'agree');
        }, exports.sendFile = function (e) {
            T.sendfile(e);
        }, exports.sendFileStatus = function (e) {
            T.sendFileStatus(e);
        }, exports.upload = function (e, t) {
            var n = e.type;
            n = n ? n.toUpperCase() : 'POST', w.getUploadPath(e, t);
        }, exports.download = function (e, t, n) {
            e = decodeURIComponent(e), w.download(e, t, n);
        }, exports.end = function (e) {
            if (l(), e && F) {
                if (N.get('ack'))
                    v.setCookie(k.COOKIE_ACK, N.get('ack') + '|' + new Date().getTime());
                m(), E.logout();
            }
            exports.emit(O.END);
        }, exports.init = function (t) {
            e(t), d(), T.init(P), C.plugin(require('./message/text')()), C.plugin(require('./message/voice')());
        }, exports.cancelFile = function (e) {
            T.cancelFile(e);
        }, exports.EVENT = O, exports.hasConnented = function () {
            return L;
        }, exports;
    }), define('qiao-im-core/rcv/leave', [
        'require',
        '../base/util',
        '../base/emitter',
        '../common'
    ], function (require) {
        function e() {
            i.img(a.SVR_TYPE, a.URL_LEAVE, o);
        }
        var t = require('../base/util'), n = require('../base/emitter'), i = require('../common'), a = {
                URL_LEAVE: 'Leave.php',
                SVR_TYPE: 'RCV'
            }, o = {}, r = {}, exports = {};
        return n.mixin(exports), exports.start = function (n, i) {
            r = t.extend(r, i), o = t.extendBySame(o, n), e();
        }, exports;
    }), define('qiao-im-core/rcv/refresh', [
        'require',
        '../base/emitter',
        '../base/util',
        '../prevent/main',
        '../common'
    ], function (require) {
        function e(e) {
            if (0 === e.saved)
                return void clearInterval(c);
            else
                return a.prevent(e), void exports.emit('refresh', e);
        }
        function t() {
            o(r.SVR_TYPE, r.URL_REFRESH, {
                data: f,
                onsuccess: e
            });
        }
        var n = require('../base/emitter'), i = require('../base/util'), a = require('../prevent/main'), o = require('../common').request, r = {
                URL_REFRESH: 'Refresh.php',
                SVR_TYPE: 'RCV'
            }, s = 15000, c = null, f = {}, exports = {};
        return n.mixin(exports), exports.start = function (e) {
            f = i.extendBySame(f, e), c = setInterval(t, s);
        }, exports;
    }), define('qiao-im-core/rcv/enter', [
        'require',
        '../base/util',
        '../base/emitter',
        '../prevent/main',
        '../prevent/config',
        '../common'
    ], function (require) {
        function e() {
            var e = new Date().getTimezoneOffset(), t = parseInt(e / 60, 10), n = e % 60, i = '-';
            if (0 > t || 0 > n)
                if (i = '+', t = -t, 0 > n)
                    n = -n;
            return t += '', n += '', 'UTC' + i + t + ':' + n;
        }
        function t() {
            var t = window.navigator, n = window.screen, i = {};
            return i.lang = t.language || t.systemLanguage, i.rsl = n.width + '*' + n.height, i.tz = e(), i.cbit = n.colorDepth, i;
        }
        function n(e) {
            if (e.tag || 1 === e.saved)
                exports.emit('enter', e);
        }
        function i() {
            exports.emit('enterfail');
        }
        function a() {
            s(c.SVR_TYPE, c.URL_ENTER, {
                data: f,
                onsuccess: n,
                onfail: i
            });
        }
        var o = require('../base/util'), r = require('../base/emitter'), s = (require('../prevent/main'), require('../prevent/config'), require('../common').request), c = {
                URL_ENTER: 'Enter.php',
                SVR_TYPE: 'RCV',
                TYPE_VIS_PC: 1,
                TYPE_VIS_MOBILE: 2,
                TYPE_VIS_MINI: 3
            }, f = {
                referrer: document.referrer,
                ex: '',
                iswebim: 1,
                word: '',
                coding: '',
                bdclickid: '',
                title: '',
                inurl: '',
                vis_type: o.isMobile ? c.TYPE_VIS_MOBILE : c.TYPE_VIS_PC,
                lang: '',
                rsl: '',
                tz: '',
                cbit: '',
                fromSite: '',
                expand: ''
            }, exports = {};
        return r.mixin(exports), exports.start = function (e) {
            f = o.extendBySame(f, e, t()), a();
        }, exports;
    }), define('qiao-im-core/rcv', [
        'require',
        './base/util',
        './base/Storage',
        './base/emitter',
        './rcv/enter',
        './rcv/refresh',
        './rcv/leave'
    ], function (require) {
        function e(e) {
            l = a(l, e), l.lt = e.ltime || l.lt, l.ft = e.ftime || l.ft;
            for (var t in m)
                if (m.hasOwnProperty(t))
                    s.set(t, l[t]);
        }
        function t(e) {
            l = a(l, s.get(), e);
        }
        function n(t) {
            e(t), f.start(l), exports.emit(d.ENTER, l);
        }
        function i(e) {
            exports.emit(d.REFRESH, e);
        }
        var a = require('./base/util').extend, o = require('./base/Storage'), r = require('./base/emitter'), s = new o('rcv'), c = require('./rcv/enter'), f = require('./rcv/refresh'), u = require('./rcv/leave'), d = {
                ENTER: 'rcv:enter',
                REFRESH: 'rcv:refresh'
            }, l = {
                lt: 0,
                ft: 0,
                lv: 0,
                lvp: 0,
                peerid: ''
            }, m = {
                bid: '',
                lt: 0,
                ft: 0,
                lv: 0,
                lvp: 0,
                peerid: ''
            }, exports = {};
        return r.mixin(exports), exports.start = function () {
            c.start(l);
        }, exports.leave = function () {
            u.start(l);
        }, exports.init = function (e) {
            t(e), c.on('enter', n), f.on('refresh', i);
        }, exports.EVENT = d, exports;
    }), define('qiao-im-core/base/net/jsonp', ['require'], function (require) {
        'use strict';
        function e(e, i) {
            var s = o(), m = null, g = i.timeout || null, p = i.callbackKey || d, b = s, h = i.data || {};
            h.t = new Date().getTime();
            var v = i.charset || l, y = function (e) {
                    i.onsuccess && i.onsuccess(e), n(m), a(b);
                }, E = function () {
                    i.onfail && i.onfail(), n(m), a(b);
                }, T = r({
                    url: e + t(e, h, p, b),
                    charset: v,
                    id: s
                });
            if (f[s] = c[s] = function () {
                    try {
                        y.apply(null, arguments);
                    } catch (e) {
                        E.apply(null, arguments);
                    }
                }, u[s] = function () {
                    E.apply(null, arguments);
                }, g)
                m = setTimeout(function () {
                    m = null, T.abort(), E.call(null);
                }, g);
            return T.send(), T;
        }
        function t(e, t, n, i) {
            var a = {}.toString.call(t), o = '?';
            if (e.indexOf('?') > -1)
                o = '&';
            var r = o + n + '=' + i;
            if ('[object Object]' === a)
                for (var s in t)
                    if (t.hasOwnProperty(s))
                        r += '&' + s + '=' + encodeURIComponent(t[s]);
            return r;
        }
        function n(e) {
            if (e)
                clearTimeout(e), e = null;
        }
        function i(e) {
            if (c[e])
                c[e] = m(e), f[e] = null, delete f[e];
        }
        function a(e) {
            try {
                f[e] = null, c[e] = null, delete f[e], delete c[e];
            } catch (t) {
            }
        }
        function o() {
            var e = 'cxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx';
            return e.replace(/[xy]/g, function (e) {
                var t = 16 * Math.random() | 0, n = 'x' == e ? t : 3 & t | 8;
                return n.toString(16);
            });
        }
        function r(e) {
            var t, n = s.head || s.getElementsByTagName('head') && s.getElementsByTagName('head')[0] || s.body;
            return {
                send: function () {
                    t = s.createElement('script'), t.async = !0, t.charset = e.charset, t.src = e.url, t.id = e.id, t.onload = t.onreadystatechange = function (n) {
                        if (n === !0 || !t.readyState || /loaded|complete/.test(t.readyState)) {
                            if (t.onload = t.onreadystatechange = null, t.parentNode)
                                t.parentNode.removeChild(t);
                            if (t = null, n === !0)
                                i(e.id);
                        }
                    }, t.onerror = function () {
                        if (t.parentNode)
                            t.parentNode.removeChild(t);
                        if (u[t.id])
                            u[t.id].call(null);
                        t = null;
                    }, n.insertBefore(t, n.firstChild);
                },
                abort: function () {
                    if (t)
                        t.onload(!0);
                }
            };
        }
        var s = document, c = window, f = {}, u = {}, d = 'callback', l = 'utf-8', m = function (e) {
                return function () {
                    try {
                        c[e] = null, delete c[e];
                    } catch (t) {
                    }
                };
            };
        return { request: e };
    }), define('qiao-im-core/data', [
        'require',
        './base/util'
    ], function (require) {
        var e = require('./base/util'), t = {
                bid: '',
                peerid: '',
                siteid: '',
                mainId: '',
                username: '',
                ucid: '',
                seq: 0,
                session: '',
                subid: '',
                sessionid: '',
                SITE_ID: '',
                tag: '',
                compname: '',
                nickname: '',
                crossdomain: !1,
                startTime: 0,
                inited: 0,
                type: 1
            }, n = {
                imuss: '',
                peerid: '',
                siteid: '',
                ucid: '',
                seq: 0,
                session: '',
                tag: ''
            }, i = {
                bid: '',
                peerid: '',
                siteid: '',
                ucid: '',
                tag: ''
            }, exports = {};
        return exports.IM = function () {
            return e.extendBySame(n, t, { imuss: t.bid });
        }, exports.RCV = function () {
            return e.extendBySame(i, t);
        }, exports.ACCOUNT = function () {
            return {
                siteid: t.siteid,
                ucid: t.ucid,
                tag: t.tag
            };
        }, exports.set = function (e, n) {
            if (t.hasOwnProperty(e))
                t[e] = n;
        }, exports.get = function (e) {
            if (!e)
                return t;
            else
                return t[e];
        }, exports.init = function (n) {
            t = e.extendBySame(t, n);
        }, exports;
    }), define('qiao-im-core/common', [
        'require',
        './base/net/ajax',
        './base/net/imgnet',
        './data',
        './base/util',
        './base/net/jsonp'
    ], function (require) {
        function e(e, t) {
            if (t = o.clone(a[e](), t), 'IM' === e)
                a.set('seq', t.seq + 1), t.session = a.get('session');
            return t;
        }
        function t(t, n, i) {
            var a = i.data, o = i.onfail, s = i.onsuccess;
            if ('function' == typeof a)
                o = s, s = a, a = null;
            i.data = e(t, a);
            var u = c + f[t] + n;
            return r.request(u, i);
        }
        var n = require('./base/net/ajax'), i = require('./base/net/imgnet'), a = require('./data'), o = require('./base/util'), r = require('./base/net/jsonp'), s = Object.prototype.toString, c = 'http://p.qiao.baidu.com', f = {
                IM: '/',
                RCV: '/',
                ACCOUNT: '/im/'
            }, exports = {};
        exports.createHandle = function (e) {
            var t = [].slice.call(arguments, 1);
            return function () {
                var n = [[].slice.call(arguments)[0]].concat(t);
                if (!n || !n[0])
                    return void e('fail');
                var i = n[0], a = i.result;
                if (a && 'ok' === a.toLowerCase())
                    n = ['success'].concat(n), e && e.apply(null, n);
                else {
                    if (n = ['fail'].concat(n), !a)
                        i.result = 'error';
                    e && e.apply(null, n);
                }
            };
        }, exports.array = {
            indexOf: function (e, t, n) {
                var i, a, o = e.length;
                for (i = 0; o > i; i++) {
                    if (n)
                        a = e[i][n];
                    else
                        a = e[i];
                    if (i in e && a === t)
                        return i;
                }
                return -1;
            },
            removeAt: function (e, t) {
                return e.splice(t, 1)[0];
            }
        };
        var u = {
            post: function (t, i, a) {
                var o = e(t, a.data), r = f[t] + i;
                return n.post(r, o, a.onsuccess, a.onfail);
            },
            get: function (t, i, a) {
                var o = a.data, r = a.onfail, s = a.onsuccess;
                if ('function' == typeof o)
                    r = s, s = o, o = null;
                o = e(t, o);
                var c = f[t] + i;
                return n.get(c, o, s, r);
            }
        };
        return exports.request = function (e, n, i) {
            var o = a.get('crossdomain');
            if (o)
                return t(e, n, i);
            else {
                var r = i.method || 'get';
                return u[r](e, n, i);
            }
        }, exports.img = function (t, n, a, o, r) {
            if ('function' == typeof a)
                r = o, o = a, a = null;
            a = e(t, a);
            var s = f[t] + n;
            i.request(s, a, o, r);
        }, exports.isArray = function (e) {
            return '[object Array]' === s.call(e);
        }, exports.URL = f, exports;
    }), define('qiao-im-core/prevent/config', [
        'require',
        '../base/string',
        '../base/emitter'
    ], function (require) {
        function e() {
            var e = { jscode: i };
            return t.objectToString(e);
        }
        var t = require('../base/string'), n = require('../base/emitter'), i = '', a = '', exports = {};
        return n.mixin(exports), exports.anti = {
            ANTI_FORBID: 1,
            ANTI_JSCODE: 2,
            ANTI_SECOND: 3,
            ANTI_AUTHCODE: 4
        }, exports.tag = {
            antiJscode: !1,
            antiSecond: !1,
            antiAuthcode: !1
        }, exports.url = {
            checkUrl: 'atverifycode',
            getUrl: 'atgetcode'
        }, exports.setJsCode = function (e) {
            try {
                var t = 'return ' + e, n = new Function(t), a = n();
                if ('function' == typeof a)
                    i = a();
                else
                    i = a;
            } catch (o) {
                i = e;
            }
            exports.emit('setTag');
        }, exports.setAuthCode = function (e) {
            a = e || '';
        }, exports.getAuthCode = function () {
            return a;
        }, exports.getJsCode = function (t) {
            if (t)
                return i;
            else
                return e();
        }, exports;
    }), define('qiao-im-core/prevent/main', [
        'require',
        './config',
        '../common',
        '../message',
        '../base/emitter',
        '../data'
    ], function (require) {
        function e(e) {
            exports.emit('getAuth', e), c = e.body.codeid;
        }
        function t(e) {
            exports.emit('verifyAuth', e);
        }
        var n, i = require('./config'), a = require('../common').request, o = (require('../message'), require('../base/emitter')), r = require('../data'), s = {
                SVR_TYPE: 'RCV',
                url: i.url
            }, c = '', exports = {};
        return o.mixin(exports), exports.prevent = function (e, t) {
            if (e.tag)
                switch (e.tag.op) {
                case i.anti.ANTI_JSCODE:
                    if (i.setJsCode(e.tag.val), i.tag.antiJscode = !0, r.set('tag', n()), t)
                        t();
                    break;
                case i.anti.ANTI_SECOND:
                    i.tag.antiSecond = !0;
                    break;
                case i.anti.ANTI_AUTHCODE:
                    if (i.tag.antiAuthcode = !0, e.tag.val)
                        i.url.checkUrl = e.tag.val.checkurl, i.url.getUrl = e.tag.val.geturl;
                }
        }, exports.proxy = function (e) {
            switch (e.tag.op) {
            case i.anti.ANTI_AUTHCODE:
                exports.emit('authCode', e);
                break;
            case i.anti.ANTI_SECOND:
                exports.emit('secondConfirm', e);
                break;
            case i.anti.ANTI_FORBID:
                var t = '\u7F51\u7EDC\u7E41\u5FD9,\u8BF7\u60A8\u91CD\u8BD5';
                exports.emit('info', t, 'forbid');
            }
        }, o.mixin(exports), exports.getAuthCode = function () {
            var t = { timestamp: new Date().valueOf() };
            a(s.SVR_TYPE, s.url.getUrl, {
                data: t,
                onsuccess: e
            });
        }, exports.verifyCode = function (e) {
            i.setAuthCode(e);
            var n = {
                bid: r.get('bid') || '',
                val: e,
                timestamp: new Date().valueOf(),
                codeId: c
            };
            a(s.SVR_TYPE, s.url.checkUrl, {
                data: n,
                onsuccess: t
            });
        }, exports.getJsCode = n = function (e) {
            return i.getJsCode(e);
        }, exports.getCheckCode = function () {
            return i.getAuthCode();
        }, exports.init = function () {
            i.on('setTag', function () {
                r.set('tag', n());
            });
        }, exports;
    }), define('qiao-im-core/log', [
        'require',
        './base/util',
        './base/net/imgnet'
    ], function (require) {
        var e = require('./base/util'), t = require('./base/net/imgnet'), n = {
                siteid: '',
                bid: '',
                peerid: '',
                ucid: ''
            }, i = '', exports = {};
        return exports.send = function (a) {
            var o = e.clone(n);
            o = e.extend(o, a), t.request(i, o);
        }, exports.init = function (t) {
            n = e.extendBySame(n, t);
        }, exports;
    }), define('qiao-im-core/message', ['require'], function (require) {
        function e(e) {
            for (var n, i = e.length, a = 0; i > a; a++)
                if (n = e[a], 'text' === n.type)
                    n.text = n.text.replace(t, '') + '</div>';
        }
        var t = /<\/div>/i, n = {}, i = {}, exports = {};
        return exports.encode = function (e, t) {
            var i, a = n[e.type];
            if (a)
                i = a(e), t && t('<msg>' + i + '</msg>');
        }, exports.decode = function (t, n) {
            function a() {
                var s = t[o++];
                if (!s)
                    return e(r), void n(r);
                if ('url' === s.type && 'map' === s.t && i.map)
                    s.type = 'map';
                var c = i[s.type];
                if (!c)
                    return void a();
                else
                    return void c(s, r, a);
            }
            var o = 0, r = [];
            a();
        }, exports.plugin = function (e) {
            var t = e.encoder;
            if (t)
                for (var a in t)
                    if (t.hasOwnProperty(a))
                        n[a] = t[a];
            var o = e.decoder;
            if (o)
                for (a in o)
                    if (o.hasOwnProperty(a))
                        i[a] = o[a];
        }, exports;
    }), define('qiao-im-core/base/string', ['require'], function (require) {
        var e = {
                amp: '&',
                lt: '<',
                gt: '>',
                quot: '"',
                apos: '\''
            }, exports = {};
        return exports.encodeHTML = function (e) {
            if (!e)
                return '';
            else
                return String(e).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }, exports.decodeHTML = function (t) {
            if (!t)
                return '';
            else
                return (t + '').replace(/\&([^;]+);/g, function (t, n) {
                    var i;
                    if (n in e)
                        return e[n];
                    else if (i = n.match(/^#x([\da-fA-F]+)$/))
                        return String.fromCharCode(parseInt(i[1], 16));
                    else if (i = n.match(/^#(\d+)$/))
                        return String.fromCharCode(parseInt(i[1], 10));
                    return t;
                });
        }, exports.format = function (e, t) {
            if (!e)
                return '';
            if (null == t)
                return e;
            var n = 'function' == typeof t ? t : function (e) {
                var n = t[e];
                return null == n ? '' : n;
            };
            return (e + '').replace(/\$\{(.+?)\}/g, function (e, t) {
                return n(t);
            });
        }, exports.objectToString = function (e) {
            var t = [], n = function (e) {
                    if ('object' == typeof e && null !== e)
                        return this.objectToString(e);
                    else
                        return /^(string|number)$/.test(typeof e) ? '"' + e + '"' : e;
                };
            for (var i in e)
                t.push('"' + i + '":' + n(e[i]));
            return '{' + t.join(',') + '}';
        }, exports;
    }), define('qiao-im-core/base/Storage', [], function () {
        function e(e) {
            this.id = e.toUpperCase();
        }
        var t, n = window.localStorage, i = window, a = i.document, o = 'QIAOUSERDATACHAT' + location.hostname, r = function () {
                function e(e) {
                    return e.replace(r, '___');
                }
                var t, n = null, i = 365, r = new RegExp('[!"#$%&\'()*+,/\\\\:;<=>?@[\\]^`{|}~]', 'g');
                return {
                    build: function (e) {
                        e = e || {}, t = o + (e.siteid || ''), i = e.expires || i;
                    },
                    setup: function () {
                        if (!n)
                            try {
                                n = a.createElement('input'), n.type = 'hidden', n.addBehavior('#default#userData'), a.body.appendChild(n);
                            } catch (e) {
                                return !1;
                            }
                        return !0;
                    },
                    setItem: function (a, o) {
                        a = e(a);
                        var r = this, s = new Date();
                        if (r.setup())
                            return s.setDate(s.getDate() + i), n.expires = s.toUTCString(), n.load(t), n.setAttribute(a, o), n.save(t), o;
                        else
                            return void 0;
                    },
                    getItem: function (i) {
                        i = e(i);
                        var a = this;
                        if (a.setup())
                            return n.load(t), n.getAttribute(i);
                    },
                    clear: function () {
                        var e = new Date();
                        e.setDate(e.getDate() - 1), n.expires = e.toUTCString();
                    }
                };
            }();
        return e.init = function (e) {
            var i = e.siteid;
            if (!t)
                t = 'BDBG_IM_' + i + '_';
            if (!window.localStorage)
                n = r, n.build({ siteid: i });
        }, e.clear = function () {
            n.clear();
        }, e.prototype.key = function () {
            return t + this.id;
        }, e.prototype.get = function (e) {
            var t;
            try {
                t = JSON.parse(n.getItem(this.key()) || '{}');
            } catch (i) {
                t = {};
            }
            if (e)
                return t[e];
            else
                return t;
        }, e.prototype.clear = function () {
            try {
                try {
                    n.setItem(this.key(), JSON.stringify({}));
                } catch (e) {
                    n.clear();
                }
            } catch (t) {
            }
        }, e.prototype.set = function (e, t) {
            var i = this.get();
            i[e] = t;
            try {
                try {
                    n.setItem(this.key(), JSON.stringify(i));
                } catch (a) {
                    n.clear(), n.setItem(this.key(), JSON.stringify(i));
                }
            } catch (o) {
            }
        }, e;
    }), define('qiao-im-core/base/net/imgnet', [
        'require',
        '../util'
    ], function (require) {
        var e = require('../util'), t = function () {
                var e = 0;
                return function () {
                    var t = new Date().getTime();
                    return t += '_' + e++;
                };
            }(), exports = {};
        return exports.request = function (n, i, a, o) {
            if ('function' == typeof i)
                o = a, a = i, i = null;
            (i = i || {}).t = t(), n += (n.indexOf('?') > -1 ? '&' : '?') + e.jsonToQuery(i);
            var r = new Image();
            r.onload = function () {
                r.onload = null, r.onerror = null, r = null, a && a();
            }, r.onerror = function () {
                r.onload = null, r.onerror = null, r = null, o && o();
            }, r.src = n;
        }, exports;
    }), define('qiao-im-core/base/emitter', [], function () {
        function e() {
        }
        var t = e.prototype;
        return t._getEvents = function () {
            if (!this._events)
                this._events = {};
            return this._events;
        }, t._getMaxListeners = function () {
            if (isNaN(this.maxListeners))
                this.maxListeners = 10;
            return this.maxListeners;
        }, t.on = function (e, t) {
            var n = this._getEvents(), i = this._getMaxListeners();
            n[e] = n[e] || [];
            var a = n[e].length;
            if (a >= i && 0 !== i)
                throw new RangeError('Warning: possible Emitter memory leak detected. ' + a + ' listeners added.');
            return n[e].push(t), this;
        }, t.once = function (e, t) {
            function n() {
                i.off(e, n), t.apply(this, arguments);
            }
            var i = this;
            return n.listener = t, this.on(e, n), this;
        }, t.off = function (e, t) {
            var n = this._getEvents();
            if (0 === arguments.length)
                return this._events = {}, this;
            var i = n[e];
            if (!i)
                return this;
            if (1 === arguments.length)
                return delete n[e], this;
            for (var a, o = 0; o < i.length; o++)
                if (a = i[o], a === t || a.listener === t) {
                    i.splice(o, 1);
                    break;
                }
            return this;
        }, t.emit = function (e) {
            for (var t = this._getEvents(), n = t[e], i = [], a = 1; a < arguments.length; a++)
                i.push(arguments[a]);
            if (n)
                for (n = n.slice(0), a = 0; a < n.length; a++)
                    n[a].apply(this, i);
            return this;
        }, t.listeners = function (e) {
            var t = this._getEvents();
            return t[e] || [];
        }, t.setMaxListeners = function (e) {
            return this.maxListeners = e, this;
        }, e.mixin = function (e) {
            for (var n in t)
                if (t.hasOwnProperty(n))
                    e[n] = t[n];
            return e;
        }, e;
    }), define('qiao-im-core/base/util', ['require'], function (require) {
        var exports = {};
        exports.extend = function (e, t) {
            for (var n = arguments.length, i = 1; n > i; i++)
                if (t = arguments[i]) {
                    for (var a in t)
                        if (t.hasOwnProperty(a) && void 0 !== t[a])
                            e[a] = t[a];
                } else ;
            return e;
        }, exports.extendBySame = function (e, t) {
            for (var n = 1, i = arguments.length; i > n; n++)
                if (t = arguments[n]) {
                    for (var a in t)
                        if (t.hasOwnProperty(a) && e.hasOwnProperty(a) && void 0 !== t[a])
                            e[a] = t[a];
                } else ;
            return e;
        }, exports.createUUID = function () {
            for (var e = '0123456789ABCDEF', t = [], n = 0; 32 > n; n++)
                t[n] = e.substr(Math.floor(16 * Math.random()), 1);
            t[12] = '4', t[16] = e.substr(3 & t[16] | 8, 1);
            var i = t.join('');
            return i = i.toLowerCase(), i = i.replace(/^(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, '$1-$2-$3-$4-$5');
        }, exports.jsonToQuery = function (e) {
            var t, n, i = [];
            for (var a in e)
                if (e.hasOwnProperty(a)) {
                    if (t = e[a], !exports.isArray(t))
                        t = [t];
                    n = t.length;
                    for (var o = 0; n > o; o++)
                        i.push(a + '=' + encodeURIComponent(t[o]));
                }
            return i.join('&');
        };
        var e = Object.prototype.toString;
        return exports.isObject = function (t) {
            return '[object Object]' === e.call(t);
        }, exports.isString = function (t) {
            return '[object String]' === e.call(t);
        }, exports.isArray = function (t) {
            return '[object Array]' === e.call(t);
        }, exports.clone = function (e) {
            for (var t = {}, n = 0, i = arguments.length; i > n; n++)
                if (e = arguments[n]) {
                    for (var a in e)
                        if (e.hasOwnProperty(a) && void 0 !== e[a])
                            t[a] = e[a];
                } else ;
            return t;
        }, exports.setCookie = function (e, t, n) {
            var i = e + '=' + escape(t), a = 0;
            if (n)
                a = new Date(), a.setTime(a.getTime() + 1000 * n);
            i += (a ? ';expires=' + a.toGMTString() : '') + ';path=/;', document.cookie = i;
        }, exports.getCookie = function (e) {
            var t = new RegExp('(^| )' + e + '=([^;]*)(;|$)'), n = document.cookie.match(t);
            if (null != n)
                return unescape(n[2]);
            else
                return null;
        }, exports.isMobile = function () {
            var e = navigator.userAgent;
            return !!e.match(/.*Mobile.*/) || 'ontouchstart' in window;
        }(), exports;
    }), define('qiao-im-core/base/net/ajax', [
        'require',
        '../util'
    ], function (require) {
        function e() {
        }
        function t(n, i) {
            function a() {
                if (4 === f.readyState) {
                    try {
                        var t = f.status;
                    } catch (n) {
                        return void r('failure');
                    }
                    if (r(t), t >= 200 && 300 > t || 304 === t || 1223 === t)
                        r('success');
                    else
                        r('failure');
                    window.setTimeout(function () {
                        if (f.onreadystatechange = e, d)
                            f = null;
                    }, 0);
                }
            }
            function o() {
                if (window.ActiveXObject)
                    try {
                        return new ActiveXObject('Msxml2.XMLHTTP');
                    } catch (e) {
                        try {
                            return new ActiveXObject('Microsoft.XMLHTTP');
                        } catch (e) {
                        }
                    }
                if (window.XMLHttpRequest)
                    return new XMLHttpRequest();
                else
                    return void 0;
            }
            function r(e) {
                e = 'on' + e;
                var n = h[e], a = t[e];
                if (n) {
                    if (s)
                        clearTimeout(s);
                    if ('onsuccess' !== e)
                        n(f);
                    else {
                        try {
                            var o = f.responseText;
                            o = new Function('return (' + o + ')')();
                        } catch (r) {
                            return n(f);
                        }
                        i.onsuccess(o);
                    }
                } else if (a) {
                    if ('onsuccess' === e)
                        return;
                    a(f);
                }
            }
            i = i || {};
            var s, c, f, u = i.data || '', d = !(i.async === !1), l = i.username || '', m = i.password || '', g = (i.method || 'GET').toUpperCase(), p = i.headers || {}, b = i.timeout || 0, h = {};
            for (c in i)
                h[c] = i[c];
            if (0 !== n.indexOf('http'))
                p['X-Requested-With'] = 'XMLHttpRequest';
            try {
                if (f = o(), 'GET' === g) {
                    if (u)
                        n += (n.indexOf('?') >= 0 ? '&' : '?') + u, u = null;
                    if (i.noCache)
                        n += (n.indexOf('?') >= 0 ? '&' : '?') + 'b' + +new Date() + '=1';
                }
                if (l)
                    f.open(g, n, d, l, m);
                else
                    f.open(g, n, d);
                if (d)
                    f.onreadystatechange = a;
                if ('POST' === g)
                    p['Content-Type'] = p['Content-Type'] || 'application/x-www-form-urlencoded', f.setRequestHeader('Content-Type', p['Content-Type']), delete p['Content-Type'];
                for (c in p)
                    if (p.hasOwnProperty(c))
                        f.setRequestHeader(c, p[c]);
                if (r('beforerequest'), b)
                    s = setTimeout(function () {
                        f.onreadystatechange = e, f.abort(), r('timeout');
                    }, b);
                if (f.send(u), !d)
                    a();
            } catch (v) {
                r('failure');
            }
            return f;
        }
        function n() {
            return new Date().getTime().toString(36);
        }
        function i(i, o) {
            var s = o.onsuccess || e, c = o.onfailure || e;
            o.onsuccess = s, o.onfailure = c;
            var f = o.data || {};
            if (o.method === r)
                i += (i.indexOf('?') >= 0 ? '&' : '?') + '_t=' + n(), o.data = a(f);
            else
                f._t = n(), i += (i.indexOf('?') >= 0 ? '&' : '?') + a(f), o.data = null;
            return t(i, o);
        }
        var a = require('../util').jsonToQuery, o = 'GET', r = 'POST', exports = {};
        return exports.post = function (e, t, n, a) {
            return i(e, {
                method: r,
                data: t,
                onsuccess: n,
                onfailure: a
            });
        }, exports.get = function (e, t, n, a) {
            return i(e, {
                method: o,
                data: t,
                onsuccess: n,
                onfailure: a
            });
        }, exports;
    }), define('qiao-im-core/base/main', [
        'require',
        './net/ajax',
        './emitter',
        './net/imgnet',
        './Storage',
        './string',
        './util'
    ], function (require) {
        function e(e, t) {
            for (var n in t)
                if (t.hasOwnProperty(n))
                    e[n] = t[n];
            return e;
        }
        var exports = {};
        return e(exports, require('./net/ajax')), e(exports, require('./emitter')), e(exports, require('./net/imgnet')), e(exports, require('./Storage')), e(exports, require('./string')), e(exports, require('./util')), exports;
    }), define('qiao-im-core', ['qiao-im-core/main'], function (e) {
        return e;
    }), define('qiao-im-core/main', [
        'require',
        './base/main',
        './message',
        './log',
        './base/util',
        './base/Storage',
        './base/emitter',
        './prevent/main',
        './prevent/config',
        './rcv',
        './im',
        './account',
        './data',
        './hm',
        './log/chat',
        './message/meta/face',
        './message/meta/font',
        './message/meta/url'
    ], function (require) {
        function e() {
            u.on('rcv:enter', function (e) {
                if (e && e.bid)
                    b.bid = e.bid, m.set('bid', b.bid), b.peerid = e.peerid, m.set('peerid', b.peerid);
                if (e.tag)
                    if (e.tag.op === f.anti.ANTI_JSCODE && !e.group)
                        return void c.prevent(e, function () {
                            u.start();
                        });
                    else
                        c.prevent(e);
                if (f.tag.antiAuthcode)
                    exports.emit('authCode');
                else if (f.tag.antiSecond)
                    exports.emit('secondConfirm');
                else
                    exports.emit('init');
            }), u.on('rcv:refresh', function (e) {
                d.setChatStatus(e.cstatus);
            }), d.on(d.EVENT.ERROR, function (e) {
                if (e === h.OFFLINE)
                    exports.resetStartTime(), u.start();
            });
        }
        function t(t, n) {
            m.init(o.clone(t, n)), r.init({ siteid: t.siteid }), u.init(t), d.init(t), l.init(t), a.init(), e(), g.init(), c.init(), p.init();
        }
        var n = require('./base/main'), i = require('./message'), a = require('./log'), o = require('./base/util'), r = require('./base/Storage'), s = require('./base/emitter'), c = require('./prevent/main'), f = require('./prevent/config'), u = require('./rcv'), d = require('./im'), l = require('./account'), m = require('./data'), g = require('./hm'), p = require('./log/chat'), b = {
                bid: '',
                peerid: '',
                siteid: '',
                mainId: '',
                username: '',
                ucid: ''
            }, h = {
                CONNECT: 'connect',
                OFFLINE: 'offline'
            }, exports = {};
        return s.mixin(exports), exports.face = {}, exports.font = {}, exports.url = {}, o.extend(exports.face, require('./message/meta/face')), o.extend(exports.font, require('./message/meta/font')), o.extend(exports.url, require('./message/meta/url')), exports.send = function (e) {
            if (o.isString(e))
                e = {
                    type: 'text',
                    text: e
                };
            d.say(e);
        }, exports.sendFile = function (e) {
            d.sendFile(e);
        }, exports.sendFileStatus = function (e) {
            d.sendFileStatus(e);
        }, exports.rejectFile = function (e) {
            d.rejectFile(e);
        }, exports.acceptFile = function (e) {
            d.acceptFile(e);
        }, exports.cancelFile = function (e) {
            d.cancelFile(e);
        }, exports.upload = function (e, t) {
            d.upload(e, t);
        }, exports.download = function (e, t, n) {
            d.download(e, t, n);
        }, exports.addPlugin = function (e) {
            if (e)
                i.plugin(e.call(null, exports, n));
        }, exports.getSiteInfo = function (e) {
            l.getSiteInfo(function (t) {
                e(t);
            });
        }, exports.disconnect = function (e) {
            d.end(e), u.leave();
        }, exports.listen = function (e, t) {
            d.on(e, t), u.on(e, t), c.on(e, t), exports.on(e, t);
        }, exports.reconnect = function () {
            u.start();
        }, exports.connect = function (e) {
            var t = e || {};
            if (t.jscode)
                f.setJsCode(t.jscode);
            if (t.authCode)
                f.setAuthCode(t.authCode);
            d.start(t);
        }, exports.getData = function (e) {
            return m.get(e);
        }, exports.refreshCode = function (e) {
            e.jsCode && f.setJsCode(e.jsCode), e.authCode && f.setAuthCode(e.authCode);
        }, exports.getAuthCode = function () {
            c.getAuthCode();
        }, exports.verifyCode = function (e) {
            c.verifyCode(e);
        }, exports.resetStartTime = function () {
            m.set('startTime', new Date().getTime()), m.set('inited', 1);
        }, exports.lib = n, exports.init = function (e, n) {
            if (o.isString(e))
                e = { siteid: e };
            if (t(e, n), !n || !n.entered)
                u.start();
        }, exports.hasConnented = function () {
            return d.hasConnented();
        }, exports;
    }), define('front/webimlite/base/json', [
        'require',
        'exports'
    ], function (require, exports) {
        function e(e) {
            if (/["\\\x00-\x1f]/.test(e))
                e = e.replace(/["\\\x00-\x1f]/g, function (e) {
                    var t = a[e];
                    if (t)
                        return t;
                    else
                        return t = e.charCodeAt(), '\\u00' + Math.floor(t / 16).toString(16) + (t % 16).toString(16);
                });
            return '"' + e + '"';
        }
        function t(e) {
            var t, n, i, a = ['['], o = e.length;
            for (n = 0; o > n; n++)
                switch (i = e[n], typeof i) {
                case 'undefined':
                case 'function':
                case 'unknown':
                    break;
                default:
                    if (t)
                        a.push(',');
                    a.push(exports.stringify(i)), t = 1;
                }
            return a.push(']'), a.join('');
        }
        function n(e) {
            return 10 > e ? '0' + e : e;
        }
        function i(e) {
            return '"' + e.getFullYear() + '-' + n(e.getMonth() + 1) + '-' + n(e.getDate()) + 'T' + n(e.getHours()) + ':' + n(e.getMinutes()) + ':' + n(e.getSeconds()) + '"';
        }
        var a = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        exports.parse = function (e) {
            return new Function('return (' + e + ')')();
        }, exports.stringify = function (n) {
            switch (typeof n) {
            case 'undefined':
                return 'undefined';
            case 'number':
                return isFinite(n) ? String(n) : 'null';
            case 'string':
                return e(n);
            case 'boolean':
                return String(n);
            default:
                if (null === n)
                    return 'null';
                else if (n instanceof Array)
                    return t(n);
                else if (n instanceof Date)
                    return i(n);
                var a, o, r = ['{'], s = exports.stringify;
                for (var c in n)
                    if (Object.prototype.hasOwnProperty.call(n, c))
                        switch (o = n[c], typeof o) {
                        case 'undefined':
                        case 'unknown':
                        case 'function':
                            break;
                        default:
                            if (a)
                                r.push(',');
                            a = 1, r.push(s(c) + ':' + s(o));
                        }
                return r.push('}'), r.join('');
            }
        };
    }), define('front/webimlite/base/event', [
        'require',
        'exports',
        './dom'
    ], function (require, exports) {
        var e = require('./dom'), t = e.g;
        exports.EventArg = function (e, t) {
            t = t || window, e = e || t.event;
            var n = t.document;
            this.target = e.target || e.srcElement, this.keyCode = e.which || e.keyCode;
            for (var i in e) {
                var a = e[i];
                if ('function' != typeof a)
                    this[i] = a;
            }
            if (!this.pageX && 0 !== this.pageX)
                this.pageX = (e.clientX || 0) + (n.documentElement.scrollLeft || n.body.scrollLeft), this.pageY = (e.clientY || 0) + (n.documentElement.scrollTop || n.body.scrollTop);
            this._event = e;
        }, exports.EventArg.prototype.preventDefault = function () {
            if (this._event.preventDefault)
                this._event.preventDefault();
            else
                this._event.returnValue = !1;
            return this;
        }, exports.EventArg.prototype.stopPropagation = function () {
            if (this._event.stopPropagation)
                this._event.stopPropagation();
            else
                this._event.cancelBubble = !0;
            return this;
        }, exports.EventArg.prototype.stop = function () {
            return this.stopPropagation().preventDefault();
        }, exports._listeners = exports._listeners || [], exports.get = function (e, t) {
            return new exports.EventArg(e, t);
        }, exports.getTarget = function (e) {
            return e.target || e.srcElement;
        }, exports.on = function (e, n, i) {
            n = n.replace(/^on/i, ''), e = t(e);
            var a, o = function (t) {
                    i.call(e, t);
                }, r = exports._listeners, s = exports._eventFilter, c = n;
            if (n = n.toLowerCase(), s && s[n])
                a = s[n](e, n, o), c = a.type, o = a.listener;
            if (e.addEventListener)
                e.addEventListener(c, o, !1);
            else if (e.attachEvent)
                e.attachEvent('on' + c, o);
            return r[r.length] = [
                e,
                n,
                i,
                o,
                c
            ], e;
        }, exports.preventDefault = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = !1;
        }, exports.stopPropagation = function (e) {
            if (e.stopPropagation)
                e.stopPropagation();
            else
                e.cancelBubble = !0;
        }, exports.un = function (e, n, i) {
            e = t(e), n = n.replace(/^on/i, '').toLowerCase();
            for (var a, o, r, s = exports._listeners, c = s.length, f = !i; c--;)
                if (a = s[c], a[1] === n && a[0] === e && (f || a[2] === i)) {
                    if (o = a[4], r = a[3], e.removeEventListener)
                        e.removeEventListener(o, r, !1);
                    else if (e.detachEvent)
                        e.detachEvent('on' + o, r);
                    s.splice(c, 1);
                }
            return e;
        };
    }), define('front/webimlite/base/string', [
        'require',
        'exports'
    ], function (require, exports) {
        var e = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)', 'g');
        exports.trim = function (t) {
            return String(t).replace(e, '');
        }, exports.encodeHTML = function (e) {
            return String(e).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }, exports.decodeHTML = function (e) {
            var t = String(e).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            return t.replace(/&#([\d]+);/g, function (e, t) {
                return String.fromCharCode(parseInt(t, 10));
            });
        }, exports.escapeReg = function (e) {
            return String(e).replace(new RegExp('([.*+?^=!:${}()|[\\]/\\\\])', 'g'), '\\$1');
        }, exports.format = function (e, t) {
            e = String(e);
            var n = Array.prototype.slice.call(arguments, 1), i = Object.prototype.toString;
            if (n.length)
                return n = 1 === n.length ? null !== t && /\[object Array\]|\[object Object\]/.test(i.call(t)) ? t : n : n, e.replace(/#\{(.+?)\}/g, function (e, t) {
                    var a = n[t];
                    if ('[object Function]' === i.call(a))
                        a = a(t);
                    return 'undefined' == typeof a ? '' : a;
                });
            else
                return e;
        };
    }), define('front/webimlite/base/browser', [
        'require',
        'exports'
    ], function (require, exports) {
        exports.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp.$1 : void 0, exports.ie = /msie (\d+\.\d+)|rv:11/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1 : void 0, exports.isStrict = 'CSS1Compat' === document.compatMode, exports.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent), exports.isWebkit = /webkit/i.test(navigator.userAgent), exports.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp.$6 || RegExp.$2) : void 0;
    }), define('front/webimlite/base/dom', [
        'require',
        'exports',
        './browser',
        './string'
    ], function (require, exports) {
        var e = require('./browser'), t = require('./string'), n = e.opera, i = e.ie, a = {
                cellpadding: 'cellPadding',
                cellspacing: 'cellSpacing',
                colspan: 'colSpan',
                rowspan: 'rowSpan',
                valign: 'vAlign',
                usemap: 'useMap',
                frameborder: 'frameBorder'
            };
        if (8 > i)
            a['for'] = 'htmlFor', a['class'] = 'className';
        else
            a.htmlFor = 'for', a.className = 'class';
        exports.g = function (e) {
            if ('string' == typeof e)
                return document.getElementById(e);
            else
                return e;
        }, exports.q = function (e, n, i) {
            var a, o, r, s, c = [], f = t.trim;
            if (!(e = f(e)))
                return c;
            if ('undefined' == typeof n)
                n = document;
            else if (n = baidu.dom.g(n), !n)
                return c;
            if (i && (i = f(i).toUpperCase()), n.getElementsByClassName)
                for (r = n.getElementsByClassName(e), a = r.length, o = 0; a > o; o++)
                    if (s = r[o], !i || s.tagName === i)
                        c[c.length] = s;
                    else ;
            else
                for (e = new RegExp('(^|\\s)' + Q.base.string.escapeReg(e) + '(\\s|$)'), r = i ? n.getElementsByTagName(i) : n.all || n.getElementsByTagName('*'), a = r.length, o = 0; a > o; o++)
                    s = r[o], e.test(s.className) && (c[c.length] = s);
            return c;
        }, exports.setAttr = function (e, t, n) {
            if (e = exports.g(e), 'style' === t)
                e.style.cssText = n;
            else
                t = a[t] || t, e.setAttribute(t, n);
            return e;
        }, exports.setAttrs = function (e, t) {
            var n;
            e = exports.g(e);
            for (n in t)
                if (t.hasOwnProperty(n))
                    exports.setAttr(e, n, t[n]);
            return e;
        }, exports.create = function (e, t) {
            var n = document.createElement(e);
            return exports.setAttrs(n, t || {});
        }, exports.insertHTML = function (e, t, i) {
            var a, o;
            if ('string' == typeof e)
                e = document.getElementById(e);
            if (e.insertAdjacentHTML && !n)
                e.insertAdjacentHTML(t, i);
            else {
                if (a = e.ownerDocument.createRange(), t = t.toUpperCase(), 'AFTERBEGIN' === t || 'BEFOREEND' === t)
                    a.selectNodeContents(e), a.collapse('AFTERBEGIN' === t);
                else
                    o = 'BEFOREBEGIN' === t, a[o ? 'setStartBefore' : 'setEndAfter'](e), a.collapse(o);
                a.insertNode(a.createContextualFragment(i));
            }
            return e;
        }, exports.hasClass = function (e, n) {
            if (e = exports.g(e), !e || !e.className)
                return !1;
            var i = t.trim(n).split(/\s+/), a = i.length;
            for (n = e.className.split(/\s+/).join(' '); a--;)
                if (!new RegExp('(^| )' + i[a] + '( |$)').test(n))
                    return !1;
            return !0;
        }, exports.addClass = function (e, t) {
            e = exports.g(e);
            for (var n = t.split(/\s+/), i = e.className, a = ' ' + i + ' ', o = 0, r = n.length; r > o; o++)
                if (a.indexOf(' ' + n[o] + ' ') < 0)
                    i += (i ? ' ' : '') + n[o];
            return e.className = i, e;
        }, exports.removeClass = function (e, t) {
            e = exports.g(e);
            for (var n, i, a = e.className.split(/\s+/), o = t.split(/\s+/), r = o.length, s = 0; r > s; ++s)
                for (i = 0, n = a.length; n > i; ++i)
                    if (a[i] === o[s]) {
                        a.splice(i, 1);
                        break;
                    }
            return e.className = a.join(' '), e;
        };
    }), define('front/webimlite/main', [
        'require',
        './base/dom',
        './base/event',
        './base/json',
        'qiao-im-core',
        './base/localstorage',
        '../base/Promise',
        '../common/identity',
        './base/browser',
        './base/string',
        './base/date',
        './base/object',
        './im/config',
        './im/lang',
        './im/editor'
    ], function (require) {
        function e() {
            var e, n, i, a = 1 === K.position ? 'left:0px;right:auto;' : '';
            if (Y.container = k('div', {
                    id: 'BD_QIAO_WEBIM_LITE_WRAP',
                    className: 'BD-QIAO-WEBIM-LITE-WRAP',
                    style: 'display:none;' + a
                }), Y.title = k('div', { className: 'm-lite-title' }), K.bgColor)
                Y.title.style.cssText = N.ie ? 'background-image:none;border-color:' + K.bgColor + ';background-color:' + K.bgColor : F(z.titleBgColor, { color: K.bgColor });
            for (Y.title.innerHTML = z.title, Y.container.appendChild(Y.title), e = Y.title.getElementsByTagName('a'), n = 0; i = e[n]; n++)
                if (i.className.indexOf('btn-min') >= 0)
                    Y.minBtn = i;
                else if (i.className.indexOf('btn-max') >= 0)
                    Y.maxBtn = i;
            if (Y.content = k('div', { className: 'm-lite-content' }), K.bgColor)
                Y.content.style.borderColor = K.bgColor;
            if (Y.container.appendChild(Y.content), Y.editor = k('div', { className: 'm-lite-editor' }), Y.container.appendChild(Y.editor), Y.opt = k('div', { className: 'm-lite-opt' }), Y.opt.innerHTML = z.opt, Y.container.appendChild(Y.opt), Y.widgets = [
                    Y.content,
                    Y.editor,
                    Y.opt
                ], N.ie <= 6)
                Y.iframe = k('iframe', {
                    src: 'about:blank',
                    scrolling: 'no',
                    frameborder: 0,
                    style: 'width:100%;z-index:-1;position:absolute;top:0;left:0;'
                }), Y.container.appendChild(Y.iframe), Y.container.style.position = 'absolute', window.attachEvent('onscroll', t), window.attachEvent('onresize', t);
            document.body.appendChild(Y.container), H.init(Y.editor), Y.tip = k('div', {
                className: 'm-lite-tip',
                style: 'display:none'
            }), Y.container.appendChild(Y.tip);
        }
        function t() {
            var e = N.isStrict ? document.documentElement : document.body, t = Y.container;
            t.style.top = e.clientHeight + e.scrollTop - t.clientHeight + 'px';
        }
        function n(e) {
            e.scrollTop += e.scrollHeight;
        }
        function i() {
            var e = /(^|\s+)btn-([^-]+)(\s+|$)/;
            Y.container.onclick = function (t) {
                var n;
                t = t || window.event, n = t.target || t.srcElement;
                var i = n.tagName.toLowerCase();
                if ('a' === i && n.className.indexOf('btn') >= 0)
                    n.className.replace(e, function (e, t, i, a) {
                        var o;
                        if (o = W[i])
                            o.call(null, n);
                    }), U(t);
                else if ('span' === i && n.className.indexOf('m-lite-title-notify-text') >= 0)
                    g('all');
                o(!1);
            }, H.on('focus', function () {
                o(!1);
            }), I.listen('init', function () {
                V.jscode = q.jscode.jscode, I.connect(V);
            }), I.listen('message', function (e, t, n, i) {
                for (var a, r = e.length, s = 0; r > s; s++) {
                    if (a = e[s], a.type = 'server', $.messages.push(a), a.time = new Date(), '' === t)
                        t = '\u6211', a.type = 'client';
                    if ('history' === i)
                        a.time = new Date(parseInt(n, 10));
                    a.csName = t, f(a);
                }
                if ('none' === $.showType)
                    g('min');
                o(!0);
            }), I.listen('connect', function () {
                $.status = 1, $.sendAbled = !0, exports.emit('ready');
                for (var e, t = document.getElementById('BD_QIAO_WEBIM_LITE_WRAP').getElementsByTagName('div'), e = 0; e < t.length; e++)
                    if (1 === t[e].nodeType && 'm-lite-msg-info m-lite-connect-info' === t[e].className)
                        t[e].innerHTML = '\u8F6C\u63A5\u6210\u529F';
                if (v)
                    p(v);
            }), I.listen('info', function (e) {
                f({
                    text: e,
                    type: 'info'
                });
            }), I.listen('inputing', function () {
                r('\u6B63\u5728\u8F93\u5165...');
            }), I.listen('sendpreview', function (e) {
                var t = H.getContent();
                if (t = L(t))
                    t = d(t, H.isMultilineMode()), e & e(t);
            }), I.listen('authCode', function (e) {
                exports.auth(function (e) {
                    V.authCode = e.code, V.jscode = q.jscode.jscode, I.connect(V);
                }, e.tag);
            }), I.listen('secondConfirm', function () {
            }), I.listen('error', function (e) {
                switch (e) {
                case j.CONNECT:
                    f({
                        text: '\u8F6C\u63A5\u5931\u8D25',
                        type: 'info'
                    });
                }
            }), I.listen('stop', function () {
                f({
                    text: B.ERROR.DROP_KICKED,
                    type: 'info'
                }), $.sendAbled = !1, Y.opt.getElementsByTagName('a')[0].className += ' m-lite-opt-unablebtn';
            }), I.listen('transfer', function () {
                f({
                    text: B.TEXT.TRANSFER,
                    type: 'info'
                });
            }), H.on('exporthistory', c), H.on('editorsend', W.send), X = !0;
        }
        function a(e) {
            if ($.flashTimer)
                clearTimeout($.flashTimer), $.flashTimer = null;
            e %= J.flashTitle.length, document.title = J.flashTitle[e] + $.pageTitle, $.flashTimer = setTimeout(function () {
                a(++e);
            }, 500);
        }
        function o(e) {
            if (e && Y.title.className.indexOf('notify') < 0)
                Y.title.className += ' m-lite-title-notify', $.pageTitle = document.title, a(0);
            else if (!e && Y.title.className.indexOf('notify') >= 0)
                Y.title.className = Y.title.className.replace(/\s+m-lite-title-notify/g, ''), clearTimeout($.flashTimer), $.flashTimer = null, document.title = $.pageTitle || document.title;
        }
        function r(e) {
            if ($.tiptimer)
                clearTimeout($.tiptimer);
            if ('all' === $.showType)
                Y.tip.innerHTML = e, Y.tip.style.display = '', $.tiptimer = setTimeout(function () {
                    Y.tip.style.display = 'none';
                }, 3000);
        }
        function s() {
            if ($.tiptimer)
                clearTimeout($.tiptimer);
            Y.tip.style.display = 'none';
        }
        function c() {
            var e, t, n, i, a, o = R('BD_Qiao_History');
            if (!o)
                o = k('form', {
                    id: 'BD_Qiao_History',
                    method: 'post',
                    target: '_blank'
                }), o.setAttribute('accept-charset', 'utf-8'), o.setAttribute('action', K.root + 'download_record.php'), o.style.display = 'none', o.innerHTML = z.history, document.body.appendChild(o);
            for (e = o.getElementsByTagName('input'), n = 0, i = e.length; i > n; n++)
                switch (t = e[n], t.name) {
                case 'r':
                    t.value = Y.content.innerHTML.replace(/\r\n|\n/g, '<br>').replace(/<table.*?zoom_table.*?>.*?<\/table>/gi, '(\u56FE\u7247)');
                    break;
                case 't':
                    t.value = K.userGroupName || '';
                    break;
                case 'z':
                    if (N.ie)
                        t.value = !0;
                    else
                        t.value = !1;
                    break;
                case 'prefix':
                    t.value = K.root;
                }
            if (N.ie)
                return a = document.charset, document.charset = 'utf-8', o.submit(), void (document.charset = a);
            else
                return void o.submit();
        }
        function f(e) {
            var t;
            switch (e.type) {
            case 'connInfo':
                t = z.connInfo;
                break;
            case 'info':
                t = z.info;
                break;
            default:
                t = z.msg;
            }
            var i;
            if (e = P({}, e), e.time = D(e.time), A(Y.content, 'beforeend', F(t, e)), e = e.style) {
                t = '';
                for (i in e)
                    if (e.hasOwnProperty(i))
                        t += i + ':' + ('color' === i.toLowerCase() ? e[i].toLowerCase() : e[i]) + ';';
                Y.content.lastChild.children[1].style.cssText = t.replace(/[A-Z]/g, function (e) {
                    return '-' + e.toLowerCase();
                });
            }
            n(Y.content);
        }
        function u() {
            if (!Y.container)
                e(), !X && i(), w.done(), I.init({
                    bid: K.bid,
                    peerid: K.peerid,
                    siteid: K.siteid,
                    ucid: K.ucid,
                    mainid: K.mainid,
                    username: K.userName,
                    csNameType: K.csNameType,
                    nickname: K.customName,
                    vis_type: 3,
                    clienttype: 3,
                    startTime: new Date().getTime(),
                    type: 0
                }, {
                    crossdomain: !0,
                    entered: !0
                });
        }
        function d(e, t) {
            if (t)
                if (N.ie)
                    e = e.replace(/(^<P>|<\/P>$)/gi, '').replace(/<\/P>\s*<P>/gi, '<br>').replace(/\&nbsp;?/g, ' ');
                else if (N.firefox)
                    e = e.replace(/<br>$/, ' ');
                else if (N.opera)
                    e = e.replace(/<br>/gi, ' ').replace(/(^<p>|<\/p>$)/gi, '').replace(/<\/p><p>/gi, '<br>');
                else
                    e = e.replace(/<div>/i, '<BR>').replace(/<\/div>$/i, '').replace(/<\/div><div>/gi, '<BR>').replace(/<br>/g, ' '), e = e.replace(/<BR>/g, '<br>');
            else
                e = e.replace(/<BR>/g, '<br>');
            for (var n = []; /((<br[^>]*\/?>)|(<img[^>]+>))/im.test(e);)
                n[n.length] = RegExp.$1, e = e.replace(RegExp.$1, '\x0F\x0E' + (n.length - 1) + '\x0F');
            e = e.replace(/<[^>]+>/gm, '');
            for (var i = 0; i < e.length; i++)
                e = e.replace('\x0F\x0E' + i + '\x0F', n[i]);
            return e = e.replace(/(<br[^>]*\/?>)/gim, '\n'), e = e.replace(/&nbsp;/g, ' ');
        }
        function l(e) {
            if (!e)
                return '';
            else
                return (e + '').replace(/\&([^;]+);/g, function (e, t) {
                    var n;
                    if (t in Q)
                        return Q[t];
                    else if (n = t.match(/^#x([\da-fA-F]+)$/))
                        return String.fromCharCode(parseInt(n[1], 16));
                    else if (n = t.match(/^#(\d+)$/))
                        return String.fromCharCode(parseInt(n[1], 10));
                    return e;
                });
        }
        function m() {
            return P({}, K.searchInfo);
        }
        function g(e) {
            var i, a;
            if (Y.container)
                if ('none' === e)
                    Y.container.style.display = 'none', $.showType = 'none';
                else {
                    for (Y.container.style.display = '', Y.title.style.display = '', i = 0; a = Y.widgets[i]; i++)
                        a.style.display = 'all' === e ? '' : 'none';
                    if (Y.minBtn.style.display = 'all' === e ? '' : 'none', Y.maxBtn.style.display = 'all' === e ? 'none' : '', $.showType = 'all' === e ? 'all' : 'min', 'all' === e)
                        n(Y.content);
                    else
                        s();
                    if (N.ie <= 6)
                        Y.iframe.style.height = Y.container.clientHeight - 2 + 'px', setTimeout(function () {
                            t();
                        }, 0);
                }
        }
        function p(e) {
            var t, n = H.getStyle();
            if (e = L(e)) {
                e = d(e, H.isMultilineMode()), t = {
                    text: e,
                    csName: '\u6211',
                    type: 'client',
                    style: n
                }, t.time = new Date();
                var i = P({
                    type: 'text',
                    text: l(e)
                }, n);
                I.send(i), f(t), $.messages.push(t), H.clear();
            }
        }
        function b() {
            return G.PRE + K.siteid + '_IM';
        }
        function h() {
            var e = C.getItem(b());
            if (e) {
                e = M(e);
                var t = e.lasttime;
                if (new Date().getTime() - t < 120000)
                    exports.emit('revertsession');
            }
        }
        var v, y = require('./base/dom'), E = require('./base/event'), T = require('./base/json'), I = require('qiao-im-core'), C = require('./base/localstorage'), S = I.lib.mixin, _ = require('../base/Promise'), w = (require('../common/identity'), new _()), R = y.g, N = (E.on, require('./base/browser')), x = require('./base/string'), O = require('./base/date'), A = y.insertHTML, k = y.create, P = require('./base/object').extend, L = (T.stringify, x.trim), F = x.format, D = (x.encodeHTML, O.dataFormat), M = T.parse, U = E.preventDefault, q = require('./im/config'), B = require('./im/lang'), V = {}, H = require('./im/editor'), j = { CONNECT: 'connect' }, G = {
                PRE: 'BDBG_IM_',
                LAST_CHAT_TIME: 'lasttime'
            }, exports = {};
        S(exports);
        var K = {}, Y = {}, $ = {
                messages: [],
                status: 0,
                showType: 'none',
                sendAbled: !1,
                showOnce: !0,
                firstEnterFlag: !1
            }, W = {}, z = {
                title: '<a href="#" class="m-lite-title-btn btn-max"></a><a href="#" class="m-lite-title-btn btn-min"></a><span class="m-lite-title-text">\u5728\u7EBF\u54A8\u8BE2</span><span class="m-lite-title-notify-text"><em></em>\u60A8\u6709\u672A\u8BFB\u6D88\u606F</span>',
                tool: '<div class="m-lite-tool-face"></div><a href="#" class="m-lite-tool-sp-btn btn-export">\u5BFC\u51FA\u804A\u5929\u8BB0\u5F55</a><a href="#" class="m-lite-tool-btn btn-face"></a><a href="#" class="m-lite-tool-btn btn-font"></a>',
                msg: '<div class="m-lite-msg msg-#{type}"><div class="m-lite-msg-title">#{csName}&nbsp;#{time}</div><div class="m-lite-msg-content">#{text}</div><div class="m-lite-msg-cursor"></div>',
                info: '<div class="m-lite-msg-info">#{text}</div>',
                opt: '<span class="m-lite-logo"></span><span class="m-lite-qiao">\u767E\u5EA6\u5546\u6865</span><a href="#" hidefocus="false" title="\u6309Ctrl+Enter\u53D1\u9001\u6D88\u606F"class="m-lite-opt-btn btn-send"></a>',
                editor: '<html><head><style type="text/css">html,body{height:100%;padding:0px;margin:0px}p{margin:0px}img{margin:0 2px}</style></head><body style="font-size:12px;line-height:1.5;cursor:text;"></body></html>',
                history: '<input type="hidden" name="r" value="" /><input type="hidden" name="t" value="" /><input type="hidden" name="z" value="" /><input type="hidden" name="prefix" value="" />',
                titleBgColor: 'border-color:#{color};background-image:none;background: -webkit-gradient(linear, left top, left bottom, from(#fdfeff), to(#{color}));background: -webkit-linear-gradient(top, #fdfeff, #{color});background:-moz-linear-gradient(top, #fdfeff, #{color});background:-o-linear-gradient(top, #fdfeff, #{color});background:linear-gradient(top bottom, #fdfeff, #{color});',
                connInfo: '<div class="m-lite-msg-info m-lite-connect-info">#{text}</div>'
            }, J = {
                flashTitle: [
                    '\u3010\u65B0\u6D88\u606F\u3011',
                    '\u3010\u3000\u3000\u3000\u3011'
                ]
            }, X = !1, Q = {
                amp: '&',
                lt: '<',
                gt: '>',
                quot: '"',
                apos: '\''
            };
        return W.close = function () {
            g('none');
        }, W.max = function (e) {
            g('all');
        }, W.min = function (e) {
            g('min');
        }, W.send = function () {
            var e = H.getContent();
            if ($.sendAbled)
                p(e);
        }, exports.init = function (e) {
            if (K.bid = e.bid, K.peerid = e.peerid, K.siteid = e.siteid, K.ucid = e.ucid, K.mainid = e.mainid, K.SITE_ID = e.SITE_ID, K.userName = e.userName, K.offsetTime = parseInt(e.offsetTime, 10), K.root = e.root || 'http://h.qiao.baidu.com/v3/', K.bgColor = e.bgColor, K.position = e.position, K.csNameType = e.csNameType, K.customName = e.customName, K.searchInfo = e.searchInfo, K.jscode = e.jscode, K.IMroot = e.imRoot, K.authCode = e.authCode, isNaN(K.offsetTime))
                K.offsetTime = 0;
            var t = {};
            if (t.siteid = K.siteid, K.jscode)
                q.jscode.jscode = K.jscode;
            q.authCode = K.authCode, q.URL.HI_SERVER = K.IMroot, $.firstEnterFlag = !1, C.init(), h();
        }, exports.refreshCode = function (e) {
            I.refreshCode(e);
        }, exports.auth = function (e, t) {
            exports.emit('auth', e, t);
        }, exports.accept = function (e) {
            if (!I.hasConnented()) {
                if (e.userGroupName)
                    K.userGroupName = e.userGroupName, delete e.userGroupName;
                e = P(m(), e), V = {
                    subid: e.subid,
                    groupid: e.bridgeTid,
                    chattype: e.chattype
                }, v = e.chat, u(V), f({
                    text: '\u6B63\u5728\u8FDE\u63A5...',
                    type: 'connInfo'
                }), w.promise().then(function () {
                    V.jscode = q.jscode.jscode, I.connect(V);
                });
            }
            return g('all'), !0;
        }, exports.show = function () {
            g('all');
        }, exports;
    });
}(qiao.define, qiao.require));