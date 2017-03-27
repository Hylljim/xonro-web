(function (define, require) {
    var qiao = {};
    !function (e) {
        function t(e) {
            return function (t) {
                if ('.' == t.charAt(0)) {
                    var r = e.split('/');
                    r.splice(r.length - 1, 1), t = r.concat(t.split('/'));
                    for (var o, a = 0; o = t[a]; a++)
                        if ('.' == o)
                            t.splice(a, 1), a--;
                        else if ('..' == o)
                            t.splice(a - 1, 2), a -= 2;
                    t = t.join('/');
                }
                if (!n[t] && i[t])
                    i[t].call(null);
                return n[t];
            };
        }
        var n = {}, i = {};
        e.config = function () {
        }, e.define = function (e, r) {
            for (var e, r, o, a = 0; o = arguments[a]; a++)
                if ('string' == typeof o)
                    e = o;
                else if ('[object Function]' == {}.toString.call(o))
                    r = o;
            var s = function () {
                var module = { exports: {} }, i = r(t(e), module.exports, module);
                i = i || module.exports, n[e] = i;
            };
            i[e] = s;
        }, e.require = function (e, n) {
            for (var i, require = t(''), r = [], o = 0; i = e[o]; o++)
                r.push(require(i));
            n.apply(null, r);
        };
    }(qiao), define('front/icon/fix', [
        'require',
        'exports'
    ], function (require, exports) {
        function e(e) {
            e.style.top = 'auto', e.style.bottom = 0;
        }
        var t = {}, n = {}, i = {};
        return {
            init: function (e, r, o, a) {
                t.users = e || [], t.groups = r || [], i = o, n = a;
            },
            fixClose: function () {
                var r = t.groups;
                if (2 == i.icontype)
                    1 == i.iconlevel && r.length <= 1 && e(n.close), 2 == i.iconlevel && r.length <= 1 && t.users.length <= 1 && e(n.close);
            }
        };
    }), define('front/data/group', [
        'require',
        'exports',
        './config',
        '../base/emitter',
        '../base/Promise',
        '../base/array'
    ], function (require, exports) {
        'use strict';
        function e(e) {
            for (var t, n = 0, i = !1; t = e[n]; n++)
                if (0 !== t.islogin) {
                    i = !0;
                    break;
                }
            return i;
        }
        function t(t) {
            if (t || t.group) {
                for (var n, i = 0, t = t.group; n = t[i]; i++)
                    if (!(n.user.length <= 0 || -1 == s.indexOf(a, n.groupid))) {
                        var r = e(n.user);
                        d = r || d, u.push({
                            groupid: n.groupid,
                            groupname: n.groupname,
                            online: r
                        }), c.push(n);
                    } else ;
                l.done();
            }
        }
        function n(e) {
            for (var t, n = 0, i = u.length; i > n; n++)
                if (t = u[n], t.groupid == e)
                    return t.groupname;
            return '\u5206\u7EC4';
        }
        function i(e) {
            for (var t, n, i = 0, r = 0; t = c[r]; r++) {
                var o = t.user;
                for (i = 0; n = o[i]; i++)
                    if (n.subid == e)
                        return {
                            groupid: t.groupid,
                            groupname: t.groupname,
                            subname: n.subname
                        };
            }
            return null;
        }
        var r = require('./config'), o = (require('../base/emitter'), require('../base/Promise')), a = r.getAllowGroup(), s = require('../base/array'), u = [], c = [], d = !1, l = new o();
        return {
            getGroupBySub: i,
            getGroupNameById: n,
            handleGroup: t,
            getGroup: function () {
                return u;
            },
            hasLoginSub: function () {
                return d;
            },
            getUser: function () {
                return c;
            },
            asyncHandle: function () {
                return l.promise();
            },
            getOnlineSubId: function () {
                for (var e = '', t = 0; t < c.length; t++)
                    if (c.online) {
                        e = c.subid;
                        break;
                    }
                return e;
            }
        };
    }), define('front/icon/view/min', [
        'require',
        './const',
        '../../base/event',
        '../../base/emitter'
    ], function (require) {
        function e() {
            var e = document.createElement('a');
            return e.setAttribute('href', 'javascript:;'), e.setAttribute('target', '_self'), e.className = o, a = e, e;
        }
        function t() {
            i.on(a, 'click', function (e) {
                if (e = e || window.event, e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = !1;
                r.emit('icon:open');
            });
        }
        var n = require('./const'), i = require('../../base/event'), r = require('../../base/emitter'), o = n('min'), a = null;
        return {
            render: function (n, i) {
                var r = e();
                return n.appendChild(r), !i && t(), r;
            }
        };
    }), define('front/icon/view/close', [
        'require',
        './const',
        '../../base/event',
        '../../base/emitter'
    ], function (require) {
        function e() {
            var e = document.createElement('a');
            return e.setAttribute('href', 'javascript:;'), e.setAttribute('target', '_self'), e.className = o, a = e, e;
        }
        function t() {
            i.on(a, 'click', function (e) {
                if (e = e || window.event, e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = !1;
                r.emit('icon:close');
            });
        }
        var n = require('./const'), i = require('../../base/event'), r = require('../../base/emitter'), o = n('close'), a = null;
        return {
            render: function (n, i) {
                var r = e();
                return n.appendChild(r), !i && t(), r;
            }
        };
    }), define('front/base/string', [
        'require',
        'exports',
        './lang'
    ], function (require, exports) {
        'use strict';
        var e = require('./lang'), t = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)', 'g');
        return {
            format: function (t, n) {
                t = String(t);
                var i = [].slice.call(arguments, 1);
                if (i.length)
                    return i = 1 == i.length ? e.isArray(n) || e.isObject(n) ? n : i : i, t.replace(/#\{(.+?)\}/g, function (t, n) {
                        var r = i[n];
                        if (e.isFunction(r))
                            r = r(n);
                        return 'undefined' == typeof r ? '' : r;
                    });
                else
                    return t;
            },
            objectToString: function (e) {
                var t = [], n = function (e) {
                        if ('object' == typeof e && null !== e)
                            return this.objectToString(e);
                        else
                            return /^(string|number)$/.test(typeof e) ? '"' + e + '"' : e;
                    };
                for (var i in e)
                    t.push('"' + i + '":' + n(e[i]));
                return '{' + t.join(',') + '}';
            },
            encodeHTML: function (e) {
                return String(e).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            },
            trim: function (e) {
                return e.replace(t, '');
            }
        };
    }), define('front/icon/view/body', [
        'require',
        './const',
        '../../base/string',
        '../../base/event',
        '../../base/emitter',
        '../../common/identity'
    ], function (require) {
        function e(e) {
            for (var t, n = 0, i = []; t = e[n]; n++)
                t.online = t.online ? h : '', i.push(c.format(E, t));
            return i.join('');
        }
        function t(e) {
            var t, n, i, r = 0, o = [];
            for (r; t = e[r]; r++)
                for (t.online = '', o.push(c.format(T, t)), n = 0; i = t.user[n]; n++)
                    i.online = i.islogin ? 'qiao-icon-user-online' : '', i.subname = c.trim(i.subname) || '&nbsp', o.push(c.format(S, i));
            return o.join('');
        }
        function n(n) {
            var i = n.iconlevel, r = document.createElement('ins');
            r.className = m;
            var o = n.group, a = 1 == i ? e(o) : 2 == i ? t(o) : '';
            return r.innerHTML = a, N = r, r;
        }
        function i(e) {
            var t = 'BY_SELF';
            e.chattype = f.getChatType(t), l.emit('webim:open', e);
        }
        function r(e) {
            l.emit('mess:center');
        }
        function o(e) {
            var t = e.className, n = e.id.replace(y, '');
            if (t.indexOf(h) > -1)
                return void i({ groupid: n });
            else
                return void r(n);
        }
        function a(e) {
            var t = e.className, n = e.id.replace(I, '');
            if (t.indexOf(w) > -1)
                return void i({ subid: n });
            else
                return void r(n);
        }
        function s() {
            d.on(N, 'click', function (e) {
                e = e || window.event;
                var t = e.target || e.srcElement, n = t.className;
                if (e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = !1;
                if (n.indexOf(g) > -1)
                    return o(t), l.emit('stat', 'CLICK_ICON', { info: 'bridgeIconClick' }), !1;
                if (n.indexOf(b) > -1)
                    return a(t), l.emit('stat', 'CLICK_ICON', { info: 'bridgeSubClick' }), !1;
                else
                    return void 0;
            });
        }
        var u = require('./const'), c = require('../../base/string'), d = require('../../base/event'), l = require('../../base/emitter'), f = require('../../common/identity'), m = u('body'), p = u('group'), g = u('group-link'), v = u('user-group'), b = u('user'), h = u('group-online'), w = u('user-online'), y = u('group'), I = u('user'), E = '<ins class="' + p + '"><a href="#" target="_self" id="' + y + '#{groupid}" class="' + g + ' #{online}">#{groupname}</a></ins>', T = '<ins class="' + v + '">#{groupname}</ins>', S = '<a href="#" target="_self" id="' + I + '#{subid}" class="' + b + ' #{online}">#{subname}</a>', N = null;
        return {
            render: function (e, t, i) {
                var r = n(t);
                return e.appendChild(r), !i && s(), r;
            }
        };
    }), define('front/data/config', [
        'require',
        'exports',
        '../base/lang'
    ], function (require, exports) {
        'use strict';
        function e() {
            for (var e, t = location.href, n = 0, i = null; e = r[n]; n++)
                if (e.url == t || t.indexOf(e.url) > -1)
                    !i && (i = e), i && i.url && i.url.length < e.url.length && (i = e);
            if (i)
                return i.pageid;
            else
                return '0';
        }
        var t = require('../base/lang'), n = 'undefined' != typeof BDBridgeConfig ? window.BDBridgeConfig : {}, i = n.BD_BRIDGE_DATA || {}, r = n.BD_BRIDGE_SPECIAL || [], o = {}, a = function () {
                for (var t, i = n.BD_BRIDGE_STYLE_ITEM || [], o = r && r.length <= 0 ? '0' : e(), a = 0; t = i[a]; a++)
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
                    return a;
                else
                    return a['BD_BRIDGE_' + module.toUpperCase()] || {};
            },
            setStyleConfig: function (module, e) {
                if (module)
                    module = 'BD_BRIDGE_' + module.toUpperCase(), a[module] = t.extend(a[module], e);
            },
            getAllowGroup: function () {
                return a.BD_BRIDGE_GROUP || [];
            },
            getPageId: function () {
                return '0' == a.pageid ? '' : a.pageid;
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
        var t = require('../data/config'), n = t.getSiteId(), i = 'QIAO_COOKIE_', r = 'QIAO_LS_' + n + '_', o = 'QIAO_NS_BSL', a = 'bridge', s = {
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
            }, u = {
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
                return r + e.toUpperCase();
            },
            getFlashId: function () {
                return a;
            },
            getFlashKey: function (e) {
                return s[e] || '';
            },
            getBSLNs: function () {
                return e();
            },
            getChatType: function (e) {
                if (0 === u[e])
                    return 0;
                else
                    return u[e] || u.BY_SELF;
            }
        };
    }), define('front/base/event', [
        'require',
        'exports',
        './dom'
    ], function (require, exports) {
        'use strict';
        var e = require('./dom'), t = [];
        return {
            on: function (n, i, r, o) {
                if (i = i.replace('/^on/i', '').toLowerCase(), n !== window)
                    n = e.g(n);
                if (n) {
                    var a = function (e) {
                        o = o || n, r.call(o, e);
                    };
                    if (n.addEventListener)
                        n.addEventListener(i, a, !1);
                    else if (n.attachEvent)
                        n.attachEvent('on' + i, a);
                    return t.push([
                        n,
                        i,
                        r,
                        a
                    ]), n;
                }
            },
            un: function (n, i, r) {
                if (i = i.replace('/^on/i', '').toLowerCase(), n !== window)
                    n = e.g(n);
                for (var o, a = t.length; a--;) {
                    var s = t[a];
                    if (s[1] === i && s[0] === n && s[2] === r) {
                        if (o = s[3], n.removeEventListener)
                            n.removeEventListener(i, o, !1);
                        else if (n.detachEvent)
                            n.detachEvent('on' + i, o);
                        t.splice(a, 1);
                    }
                }
            }
        };
    }), define('front/icon/view/head', [
        'require',
        './const',
        '../../base/event',
        '../../base/emitter',
        '../../common/identity'
    ], function (require) {
        function e(e) {
            var t = e.iconlevel, n = 0 == t ? 'a' : 'ins', i = document.createElement(n), r = s;
            if (0 == t)
                if (i.setAttribute('href', 'javascript:;'), i.setAttribute('target', '_self'), 0 == e.hasLoginSub) {
                    var o = e.iconskin.useOfflineimg;
                    if (o)
                        r += ' qiao-icon-head-offline';
                }
            i.className = r;
            var d = document.createElement('ins');
            d.className = u;
            var l = document.createElement('ins');
            return l.className = c, l.innerHTML = '\u5728\u7EBF\u54A8\u8BE2', i.appendChild(d), i.appendChild(l), a = i, {
                head: i,
                gradient: d,
                title: l
            };
        }
        function t() {
            i.on(a, 'click', function (e) {
                if (e = e || window.event, e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = !1;
                var t = 'BY_SELF';
                r.emit('webim:open', { chattype: o.getChatType(t) }), r.emit('stat', 'CLICK_ICON', { info: 'bridgeClick' });
            });
        }
        var n = require('./const'), i = require('../../base/event'), r = require('../../base/emitter'), o = require('../../common/identity'), a = null, s = n('head'), u = n('gradient'), c = n('title');
        return {
            render: function (n, i, r) {
                var o = e(i);
                return n.appendChild(a), !r && 0 == i.iconlevel && t(), o;
            }
        };
    }), define('front/common/Fixed', [
        'require',
        '../base/browser',
        '../base/dom',
        '../base/lang'
    ], function (require) {
        'use strict';
        function e() {
            return Math.max(d.documentElement.scrollTop, d.body.scrollTop);
        }
        function t() {
            var e = d.documentElement, t = d.body, n = c ? e : t;
            return n.clientHeight;
        }
        function n() {
            return Math.max(d.documentElement.scrollLeft, d.body.scrollLeft);
        }
        function i() {
            var e = d.documentElement, t = d.body, n = c ? e : t;
            return n.clientWidth;
        }
        function r(e, t) {
            if (e.indexOf('%') > -1)
                e = parseInt(e, 10) / 100, e *= t;
            return e = parseInt(e, 10);
        }
        function o(e) {
            var t = this;
            if (!u.instanceOf(t, o))
                t = new o(e);
            else
                t.init(e);
            return t;
        }
        var a = require('../base/browser'), s = require('../base/dom'), u = require('../base/lang'), c = a.isStrict(), d = document;
        return o.prototype = {
            constructor: o,
            init: function (e) {
                if (!(a.ie <= 6 || 7 == a.ie && !a.isStrict()) || !e)
                    return null;
                var t = this;
                return t.el = s.g(e), t.el.style.position = 'absolute', t.set(), t;
            },
            set: function () {
                var e = this;
                if (e.isReady())
                    return e.getNodeRect(), e.analyze(), e.setHtml(), void e.bindEvent();
                else
                    return void setTimeout(function () {
                        e.set();
                    }, 200);
            },
            analyzeTop: function () {
                var e, n = this, i = n.rect, o = t();
                if (!i.bottom || 'auto' == i.bottom)
                    return e = r(i.top, o), void (n.top = e);
                var a = r(i.bottom, o);
                e = o - a - n.el.offsetHeight, n.top = e;
            },
            analyzeLeft: function () {
                var e, t = this, n = t.rect, o = i();
                if (!n.right || 'auto' == n.right)
                    return e = r(n.left, o), void (t.left = e);
                var a = r(n.right, o);
                e = o - a - t.el.offsetWidth, t.left = e;
            },
            analyze: function () {
                var e = this;
                e.el;
                if (e.isReady())
                    e.analyzeTop(), e.analyzeLeft(), e.fix();
            },
            isReady: function () {
                var e = this.el;
                if (e && e.offsetHeight && 'visible' == s.getStyle(e, 'visibility'))
                    return !0;
                else
                    return !1;
            },
            getNodeRect: function () {
                var e = this, t = e.el, n = t.style, i = t.currentStyle;
                e.rect = {
                    top: n.top || i.top,
                    left: n.left || i.left,
                    right: n.right || i.right,
                    bottom: n.bottom || i.bottom
                };
            },
            setHtml: function () {
                var e = d.documentElement;
                e.style.backgroundImage = 'url(about:blank)', e.style.backgroundAttachment = 'fixed';
            },
            bindEvent: function () {
                var e = this;
                window.attachEvent('onscroll', function () {
                    e.fix();
                }), window.attachEvent('onresize', function () {
                    e.resizeFix();
                });
            },
            resizeFix: function () {
                var e = this;
                if (a.ie <= 6)
                    e.getNodeRect(), e.analyze();
            },
            fix: function () {
                var t = this, i = t.el;
                if (t.isReady()) {
                    var r = e(), o = n();
                    i.style.top = r + t.top + 'px', i.style.left = o + t.left + 'px';
                }
            }
        }, o;
    }), define('front/common/Mask', [
        'require',
        '../base/browser',
        '../base/dom',
        './view'
    ], function (require) {
        'use strict';
        function e() {
            var e = document.createElement('iframe');
            return e.className = r, e.src = 'about:blank', e.setAttribute('frameborder', 0), e.frameborder = 0, e.border = 0, e;
        }
        function t() {
            this.init.apply(this, arguments);
        }
        var n = require('../base/browser'), i = require('../base/dom'), r = require('./view').getClassPre('mask') + 'iframe';
        return t.prototype = {
            constructor: t,
            init: function (t) {
                var i = this;
                if (!n.ie || n.ie > 6 || !t)
                    return null;
                var r = e(), o = t.firstElementChild || t.firstChild;
                return t.insertBefore(r, o), i.wrap = t, i.mask = r, i.auto(), i;
            },
            auto: function () {
                var e = this, t = e.mask, n = e.wrap;
                if (t && n)
                    if (n.offsetHeight && 'visible' == i.getStyle(n, 'visibility'))
                        return t.style.height = n.offsetHeight, void (t.style.width = n.offsetWidth);
                    else
                        return void setTimeout(function () {
                            e.auto();
                        }, 200);
            }
        }, t;
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
    }), define('front/base/array', [
        'require',
        'exports',
        './lang'
    ], function (require, exports) {
        'use strict';
        var e = require('./lang');
        exports.indexOf = function (t, n) {
            if (e.isNative([].indexOf))
                return t.indexOf(n);
            for (var i, r = 0, o = t.length; o > r; r++)
                if (i = t[r], i === n)
                    return r;
            return -1;
        };
    }), define('front/base/emitter', [
        'require',
        'exports',
        './array'
    ], function (require, exports) {
        'use strict';
        var e = require('./array').indexOf, t = {};
        exports.on = function (e, n) {
            (t[e] = t[e] || []).push(n);
        }, exports.once = function (e, t) {
            function n() {
                exports.off(e, n), t.apply(this, arguments);
            }
            exports.on(e, n);
        }, exports.off = function (n, i) {
            var r = arguments.length;
            if (0 == r)
                return void (t = {});
            if (1 == r)
                return void delete t[n];
            var o = t[n], a = e(o, i);
            if (a > -1)
                o.splice(a, 1);
        }, exports.emit = function (e) {
            var n = [].slice.call(arguments, 1), i = t[e];
            if (i)
                for (var r = 0, o = i.length; o > r; r++)
                    i[r].apply(this, n);
        };
    }), define('front/base/Promise', [], function () {
        function e() {
            this._callbacks = [];
        }
        return e.prototype.then = function (t, n) {
            var i, r = this;
            if (r._isdone)
                i = t.apply(n, r.result);
            else
                i = new e(), r._callbacks.push(function () {
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
    }), define('front/common/view', [
        'require',
        '../base/Promise'
    ], function (require) {
        'use strict';
        function e() {
            if (o.wrap)
                return void a.done(o.wrap);
            var e;
            if (e = document.body) {
                var t = e.firstElementChild || document.body.firstChild;
                return e.insertBefore(s, t), o.wrap = s, void a.done(o.wrap);
            } else
                setTimeout(arguments.callee, 0);
        }
        function t(e) {
            this.elements = e;
        }
        var n = require('../base/Promise'), i = 'qiao-', r = 'qiao-', o = {}, a = new n(), s = document.createElement('ins');
        return s.id = i + 'wrap', t.prototype.getElement = function (e) {
            return this.elements[e];
        }, {
            getWrap: function () {
                return e();
            },
            getIdPre: function (e) {
                return i + e.toLowerCase() + '-';
            },
            getClassPre: function (e) {
                return r + e.toLowerCase() + '-';
            },
            asyncHandle: function () {
                return a.promise();
            },
            create: function (e) {
                return new t(e);
            },
            setWrapTop: function (e) {
                if (o.wrap && e != o.wrap.lastChild)
                    o.wrap.appendChild(e);
            }
        };
    }), define('front/icon/view/const', [
        'require',
        '../../common/view'
    ], function (require) {
        var e = require('../../common/view'), t = e.getIdPre('icon'), n = e.getClassPre('icon');
        return function (e, i) {
            return ('id' == i ? t : n) + e.toLowerCase();
        };
    }), define('front/icon/view', [
        'require',
        'exports',
        './view/const',
        '../base/browser',
        '../base/emitter',
        '../base/dom',
        '../base/lang',
        '../common/Mask',
        '../common/Fixed',
        './view/head',
        './view/body',
        './view/close',
        './view/min',
        '../common/view'
    ], function (require, exports) {
        function e(e, t) {
            var n = u.g(v);
            if (!n)
                n = document.createElement('ins'), n.id = v, n.className = b, n.style.visibility = 'hidden', e.appendChild(n);
            if (0 == t.icontype)
                n.className += ' ' + h;
            return n.innerHTML = '', y = n, n;
        }
        function t() {
            u.addClass(y, w), I && I.auto(), E && E.resizeFix();
        }
        function n() {
            u.removeClass(y, w), I && I.auto(), E && E.resizeFix();
        }
        function i() {
            s.on('icon:close', t), s.on('icon:open', n);
        }
        function r() {
            var e = y;
            if ('visible' == u.getStyle(e, 'visibility') && e.offsetHeight)
                return void (e.style.marginTop = -Math.floor(e.offsetHeight / 2) + 'px');
            else
                return void setTimeout(function () {
                    r();
                }, 200);
        }
        function o(e, t, n) {
            var i = t.iconlevel, r = t.icontype, o = f.render(e, t, n);
            if (0 !== i) {
                var a = m.render(e, t, n);
                if (0 !== r)
                    var s = p.render(e), u = g.render(e);
            }
            var d = c.extend({}, o);
            return a && (d.body = a), u && (d.min = u), s && (d.close = s), d;
        }
        var a = require('./view/const'), s = (require('../base/browser'), require('../base/emitter')), u = require('../base/dom'), c = require('../base/lang'), d = require('../common/Mask'), l = require('../common/Fixed'), f = require('./view/head'), m = require('./view/body'), p = require('./view/close'), g = require('./view/min'), v = a('wrap'), b = a('wrap'), h = a('fixed'), w = a('wrap-min'), y = null, I = null, E = null, T = {};
        return exports.hide = function () {
            T.iconWrap.style.cssText += ';display:none !important;';
        }, {
            render: function (n, a, s) {
                var u = T.iconWrap = e(n, a), c = o(u, a, s);
                c.container = u;
                var f = a.iconposition.postype;
                if (1 === f && 0 !== a.icontype) {
                    var m = a.iconposition.position;
                    if (1 === m || 4 === m) {
                        var m = a.position;
                        r();
                    }
                }
                if (0 !== a.icontype)
                    I = new d(u), E = new l(u);
                if (1 == a.iconmode)
                    t();
                i();
                var p = require('../common/view').create(c);
                return require('../base/lang').extend(p, exports);
            }
        };
    }), define('front/base/browser', [], function () {
        'use strict';
        var e, t = document, n = new RegExp('msie (\\d+\\.\\d+)', 'i');
        return {
            ie: function () {
                return n.test(navigator.userAgent) ? t.documentMode || +RegExp.$1 : e;
            }(),
            opera: /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp.$6 || RegExp.$2) : void 0,
            isStrict: function () {
                return 'CSS1Compat' == t.compatMode;
            },
            isMobile: function () {
                var e = navigator.userAgent;
                return !!e.match(/.*Mobile.*/) || 'ontouchstart' in window;
            }()
        };
    }), define('front/base/dom', [
        'require',
        './browser'
    ], function (require) {
        'use strict';
        function e(e) {
            return e.replace(/-+(.)?/g, function (e, t) {
                return t ? t.toUpperCase() : '';
            });
        }
        function t(t, n, i) {
            t.style[e(n)] = i;
        }
        function n(e, n) {
            for (var i in n)
                if (n.hasOwnProperty(i))
                    t(e, i, n[i]);
        }
        function i(e) {
            var t = require('./browser').ie, n = {};
            if (8 > t)
                n['for'] = 'htmlFor', n['class'] = 'className';
            else
                n.htmlFor = 'for', n.className = 'class';
            return n[e] || e;
        }
        function r(e, t) {
            if (!e || !e.className)
                return !1;
            var n = new RegExp('(^| )' + t + '( |$)');
            if (!n.test(e.className))
                return !1;
            else
                return !0;
        }
        function o(e) {
            if (!e)
                return null;
            if ('string' == typeof e || e instanceof String)
                return document.getElementById(e);
            if (e.nodeName && (1 == e.nodeType || 9 == e.nodeType))
                return e;
            else
                return null;
        }
        var a = require('./browser');
        return {
            g: o,
            createIframe: function (e, t, n) {
                var i = require('./browser').ie, r = 9 > i ? '<iframe name="' + t + '">' : 'iframe', o = document.createElement(r);
                if (o.setAttribute('id', e), o.setAttribute('name', t), o.style.display = 'none', o.setAttribute('src', 'about:blank'), n)
                    n.appendChild(o);
                return o;
            },
            create: function (e, t, r) {
                var o = document.createElement(e);
                for (var a in t)
                    if (t.hasOwnProperty(a))
                        if ('styles' == a)
                            n(o, t[a]);
                        else
                            o.setAttribute(i(a), t[a]);
                if (r)
                    r.appendChild(o);
                return o;
            },
            insertHTML: function (e, t, n) {
                e = o(e);
                var i, r;
                if (e.insertAdjacentHTML && !a.opera)
                    e.insertAdjacentHTML(t, n);
                else {
                    if (i = e.ownerDocument.createRange(), t = t.toUpperCase(), 'AFTERBEGIN' == t || 'BEFOREEND' == t)
                        i.selectNodeContents(e), i.collapse('AFTERBEGIN' == t);
                    else
                        r = 'BEFOREBEGIN' == t, i[r ? 'setStartBefore' : 'setEndAfter'](e), i.collapse(r);
                    i.insertNode(i.createContextualFragment(n));
                }
                return e;
            },
            setStyle: t,
            setStyles: n,
            hasClass: r,
            getStyle: function (t, n) {
                if (!t)
                    return '';
                n = e(n);
                var i = 9 == t.nodeType ? t : t.ownerDocument || t.document;
                if (i.defaultView && i.defaultView.getComputedStyle) {
                    var r = i.defaultView.getComputedStyle(t, null);
                    if (r)
                        return r[n] || r.getPropertyValue(n);
                } else if (t && t.currentStyle)
                    return t.currentStyle[n];
                return '';
            },
            addClass: function (e, t) {
                if (e && !r(e, t))
                    return e.className += ' ' + t, e;
                else
                    return void 0;
            },
            removeClass: function (e, t) {
                if (e) {
                    var n = new RegExp('(\\s|^)' + t + '(\\s|$)');
                    return e.className = e.className.replace(n, ''), e;
                }
            }
        };
    }), define('front/icon/main', [
        'require',
        'exports',
        '../base/dom',
        './view',
        '../common/view',
        '../data/config',
        '../data/group',
        './view/const',
        '../base/emitter',
        './fix'
    ], function (require, exports) {
        function e(e) {
            var t = o.getStyleConfig('icon'), e = 0 == t.icontype ? n.g(s('fixed-wrap', 'id')) || n.g('BDBridgeFixedWrap') || e : e;
            if (e) {
                var r = a.getUser();
                if (!r || 0 == r.length)
                    t.iconlevel = 0;
                var u = a.getGroup(), l = 2 == t.iconlevel ? r : u;
                t.group = l, t.hasLoginSub = a.hasLoginSub(), d.main = i.render(e, t), c.init(r, u, t, d.main.elements), c.fixClose();
            }
        }
        function t() {
            d.main.hide();
        }
        var n = require('../base/dom'), i = require('./view'), r = require('../common/view'), o = require('../data/config'), a = require('../data/group'), s = require('./view/const'), u = require('../base/emitter'), c = require('./fix'), d = {};
        exports.init = function () {
            var n = a.asyncHandle();
            r.getWrap();
            var i = r.asyncHandle();
            n.then(function () {
                i.then(e);
            }), u.on('icon:hide', t);
        };
    }), require(['front/icon/main'], function (e) {
        e.init();
    }), define('front/invite/view/event', [
        'require',
        '../../base/emitter'
    ], function (require) {
        function e() {
            var e = [].slice.call(arguments);
            t.emit.apply(t, e);
        }
        var t = require('../../base/emitter'), n = 'invite:', i = {
                close: function () {
                    e(n + 'close');
                },
                accept: function () {
                    e(n + 'accept');
                },
                reject: function () {
                    e(n + 'reject');
                },
                send: function (t) {
                    e(n + 'send', t);
                }
            };
        return {
            emit: function (e) {
                var t = [].slice.call(arguments, 1), n = i[e];
                if (n)
                    n.apply(null, t);
            }
        };
    }), define('front/invite/view/operation', [
        'require',
        '../../base/browser',
        '../../data/config',
        '../../base/dom',
        './common',
        '../../base/event',
        '../../base/string',
        './event'
    ], function (require) {
        function e() {
            var e = u.getStyleConfig('invite');
            return '1' == e.type;
        }
        function t(e) {
            var t = require('../../base/dom'), n = require('./common');
            c.accept = t.create('ins', { className: n.className('accept') }, e), c.accept.innerHTML = i, c.reject = t.create('a', { className: n.className('reject') }, e), c.close = t.create('a', { className: n.className('close') }, e), c.reject.innerHTML = r, c.form = t.create('ins', { className: n.className('form') }, e), c.form.innerHTML = '<ins class="' + n.className('form') + '-inner"></ins>';
            var s = c.form.firstChild;
            c.input = t.create('textarea', {
                className: n.className('input'),
                placeholder: a
            }, s), c.send = t.create('a', { className: n.className('send') }, s), c.send.innerHTML = o;
        }
        function n(t) {
            var n = require('../../base/event'), i = require('../../base/string'), r = require('./event'), o = function () {
                    var e = '';
                    if (c.input)
                        e = c.input.value = i.trim(c.input.value), c.input.value = '';
                    r.emit('accept', e);
                };
            if (n.on(c.accept, 'click', o), s.ie && s.ie <= 6 && e())
                n.on(t, 'click', o);
            n.on(c.reject, 'click', function () {
                r.emit('reject');
            }), n.on(c.close, 'click', function () {
                r.emit('close');
            }), n.on(c.send, 'click', function () {
                var e = c.input.value = i.trim(c.input.value);
                c.input.value = '', r.emit('send', e);
            });
        }
        var i = '\u73B0\u5728\u54A8\u8BE2', r = '\u7A0D\u540E\u518D\u8BF4', o = '\u53D1\u9001', a = '\u60A8\u53EF\u76F4\u63A5\u5728\u8FD9\u91CC\u548C\u6211\u4EEC\u8054\u7CFB\uFF01', s = require('../../base/browser'), u = require('../../data/config'), c = {};
        return {
            render: function (e, i) {
                if (t(e), i.bindEvent !== !1)
                    n(e);
                return c;
            }
        };
    }), define('front/invite/view/text', [
        'require',
        '../../base/dom',
        './common'
    ], function (require) {
        function e(n) {
            if (n.offsetHeight) {
                var i = -1 * n.offsetHeight / 2 - 20;
                t.setStyle(n, 'margin-top', i + 'px'), t.setStyles(n, {
                    'margin-top': i + 'px',
                    visibility: 'visible'
                });
            } else
                setTimeout(function () {
                    e(n);
                }, 100);
        }
        var t = require('../../base/dom');
        return {
            render: function (n, i) {
                var r = require('./common'), o = t.create('ins', {
                        className: r.className('text'),
                        styles: { visibility: 'hidden' }
                    });
                return o.innerHTML = i.text || '', n.appendChild(o), e(o), o;
            }
        };
    }), define('front/invite/view/decoration', [
        'require',
        './common',
        '../../base/dom'
    ], function (require) {
        return {
            render: function (e) {
                var t = require('./common').className('decoration'), n = require('../../base/dom').create('ins', { className: t }, e);
                return n;
            }
        };
    }), define('front/invite/view/common', [
        'require',
        '../../common/view'
    ], function (require) {
        'use strict';
        var e = require('../../common/view'), t = 'invite';
        return {
            id: function (n) {
                return e.getIdPre(t) + n;
            },
            className: function (n) {
                return e.getClassPre(t) + n;
            }
        };
    }), define('front/invite/view/container', [
        'require',
        './common',
        '../../base/dom',
        '../../base/browser',
        '../../common/Fixed',
        '../../common/Mask'
    ], function (require) {
        'use strict';
        var e = require('./common'), t = require('../../base/dom'), n = require('../../base/browser'), i = require('../../common/Fixed'), r = {
                WRAPPER: e.className('wrap'),
                IFRAME: e.className('wrap-mask')
            }, o = e.id('wrap');
        return {
            render: function (e) {
                var a = t.g(o);
                if (!a) {
                    if (a = t.create('ins', {
                            id: o,
                            className: r.WRAPPER,
                            styles: {
                                visibility: 'hidden',
                                display: 'none'
                            }
                        }), n.ie && n.ie <= 6) {
                        var s = require('../../common/Mask');
                        new s(a);
                    }
                    e.appendChild(a);
                } else
                    a.innerHTML = '';
                return i(a), a;
            }
        };
    }), define('front/invite/view', [
        'require',
        '../base/dom',
        '../common/view',
        './view/container',
        './view/decoration',
        './view/text',
        './view/operation',
        '../base/lang'
    ], function (require) {
        'use strict';
        var e = (require('../base/dom'), {}), exports = {}, t = require('../common/view');
        return exports.hide = function () {
            e.container.style.display = 'none';
        }, exports.show = function () {
            e.container.style.display = '', t.setWrapTop(e.container);
        }, {
            render: function (t, n) {
                e.container = require('./view/container').render(t, n);
                var i = require('./view/decoration').render(e.container, n), r = require('./view/text').render(e.container, n), o = require('./view/operation').render(e.container, n), a = require('../common/view').create({
                        container: e.container,
                        decoration: i,
                        text: r,
                        operation: o
                    });
                return require('../base/lang').extend(a, exports);
            }
        };
    }), define('front/base/cookie', [], function () {
        return {
            get: function (e) {
                var t = new RegExp('(^| )' + e + '=([^;]*)(;|$)'), n = t.exec(document.cookie);
                return n ? decodeURIComponent(n[2]) : null;
            },
            set: function (e, t, n) {
                n = n || {};
                var i;
                if (n.expires)
                    if (i = n.expires, 'number' == typeof i)
                        i = new Date(), i.setTime(n.expires + i.getTime());
                document.cookie = e + '=' + encodeURIComponent(t) + (n.path ? '; path=' + n.path : '') + (i ? '; expires=' + i.toGMTString() : '') + (n.domain ? '; domain=' + n.domain : '') + (n.secure ? '; secure' : '');
            }
        };
    }), define('front/invite/main', [
        'require',
        '../base/emitter',
        '../data/config',
        '../data/group',
        '../common/identity',
        '../common/view',
        '../base/lang',
        '../base/cookie',
        './view'
    ], function (require) {
        function e(e, n, i) {
            t(e), w[e] = setTimeout(n, i);
        }
        function t(e) {
            var t = w[e];
            if (t)
                clearTimeout(t);
        }
        function n() {
            var e = '';
            if (b.status == v.HAND)
                e = b.subid, b.chatType = p.getChatType(y);
            else
                b.chatType = p.getChatType(I);
            return e;
        }
        function i(e) {
            e = e || {}, b = require('../base/lang').extend(b, e);
        }
        function r(n) {
            var i = b.way >= 1;
            b.way >= 2;
            if (i && b.interval)
                e('autoInvite', o, 1000 * b.interval);
            if (b.status == v.HAND && n)
                if (f.emit('rcv:reject'), 0 === b.interval)
                    b.way = 1;
            b.status = v.NONE, b.subid = null, b.count++, h.main.hide(), t('disapear');
        }
        function o() {
            if (!(0 === b.interval && b.count >= 1))
                if (b.way % 2 == 1)
                    if (b.status === v.NONE) {
                        if (0 == b.page) {
                            var n = require('../base/cookie'), i = require('../common/identity').cookieId('INVITE_PAGE');
                            if (n.get(i))
                                return;
                            else
                                n.set(i, 1);
                        }
                        if (t('autoInvite'), b.status = v.AUTO, h.main.show(), b.disap)
                            e('disapear', function () {
                                r();
                            }, 1000 * b.disap);
                    }
        }
        function a(n) {
            var i = 1 === Math.floor(b.way / 2);
            if (i)
                if (!(0 === b.interval && b.count >= 1))
                    if (b.status != v.HAND) {
                        if (b.status == v.NONE)
                            h.main.show();
                        if (t('autoInvite'), b.status = v.HAND, b.subid = n, b.disap)
                            e('disapear', function () {
                                r(!0);
                            }, 1000 * b.disap);
                    }
        }
        function s(e) {
            h.wrapper = e, h.main = require('./view').render(h.wrapper, { text: b.text });
        }
        function u(e) {
            if (1 != e.status)
                b.reported = !1;
            else if (a(e.subid), !b.reported) {
                var t = {
                        subId: b.subid || 0,
                        open: 1
                    }, n = m.getModelData('zhixin'), i = m.getModelData('servicetype');
                n && (t.orderKey = n), i && (t.servicetype = i), f.emit('stat', 'SEND_INVITE', t), b.reported = !0;
            }
        }
        function c() {
            t('disapear'), t('autoInvite'), h.main.hide();
        }
        function d() {
            for (var e in E)
                if (E.hasOwnProperty(e))
                    f.on('invite:' + e, E[e]);
            f.on('rcv:refresh', u), f.on('invite:hide', c);
        }
        function l(e) {
            if (s(e), d(), b.way % 2 === 1 && b.time)
                setTimeout(function () {
                    o();
                }, 1000 * b.time);
        }
        var f = require('../base/emitter'), m = require('../data/config'), p = (require('../data/group'), require('../common/identity')), g = require('../common/view'), v = {
                NONE: 0,
                AUTO: 1,
                HAND: 2
            }, b = {
                status: v.NONE,
                auto: 0,
                interval: 0,
                page: 1,
                time: 1,
                manual: 0,
                repeat: 0,
                disap: 0,
                text: '',
                reported: !1,
                count: 0,
                chatType: 'BY_SELF',
                subid: null
            }, h = {}, w = {}, y = 'BY_INVITE', I = 'AUTO_INVITE', E = {};
        return E.close = function () {
            f.emit('stat', 'CLOSE_INVITE', {}), r(!0);
        }, E.accept = function (e) {
            var t = n(), i = {};
            if ('' !== t)
                i.subid = t;
            if (i.chatType = b.chatType, i.chat = e || '', f.emit('webim:open', i), '' !== t)
                f.emit('stat', 'ACCEPT_INVITE', {
                    subId: t,
                    open: 1
                });
            r(), f.emit('stat', 'CLICK_ICON', { info: 'invite' });
        }, E.reject = function () {
            r(!0);
        }, E.send = function (e) {
            r();
            var t = n(), i = {};
            if ('' !== t)
                i.subid = t;
            if (i.chatType = b.chatType, i.chat = e || '', f.emit('webim:open', i), '' !== t)
                f.emit('stat', 'ACCEPT_INVITE', {
                    subId: groupOption.subid,
                    open: 1
                });
            f.emit('stat', 'CLICK_ICON', { info: 'invite' });
        }, {
            init: function () {
                var e = m.getStyleConfig('invite');
                i(e), g.getWrap();
                var t = g.asyncHandle();
                t.then(l);
            }
        };
    }), require(['front/invite/main'], function (e) {
        e.init();
    }), define('front/mess/view/foot', [
        'require',
        '../../base/dom',
        './common',
        '../../base/event',
        '../../base/emitter'
    ], function (require) {
        function e(e) {
            n.send = i.create('a', {
                className: u,
                id: s
            }, e), n.send.innerHTML = c.SEND, n.logo = i.create('ins', { className: d }, e);
        }
        function t() {
            var e = require('../../base/event'), t = require('../../base/emitter');
            e.on(n.send, 'click', function () {
                n.value = '', t.emit('mess:send', n.value);
            });
        }
        var n = {
                wrap: null,
                send: null,
                logo: null
            }, i = require('../../base/dom'), r = require('./common'), o = r.id('foot'), a = r.className('foot'), s = r.id('foot-send-btn'), u = r.className('foot-send-btn'), c = {}, d = r.id('foot-logo');
        return {
            render: function (r, s) {
                if (c = s.LANGUAGE || {}, n.wrap = i.create('ins', {
                        id: o,
                        className: a
                    }), e(n.wrap), s.bindEvent !== !1)
                    t();
                return r.appendChild(n.wrap), n;
            }
        };
    }), define('front/mess/view/head', [
        'require',
        './common',
        '../../base/dom',
        '../../base/event',
        '../../base/emitter'
    ], function (require) {
        function e() {
            var e = f.replace('#id', u).replace('#class', c), t = m.replace('#id', d).replace('#class', l);
            i.wrap.innerHTML = t + e;
        }
        function t(t) {
            i.wrap = o.create('ins', {
                id: a,
                className: s
            }), e(), t.appendChild(i.wrap);
        }
        function n(e) {
            var t = require('../../base/event'), n = require('../../base/emitter');
            t.on(u, 'click', function (e) {
                if (n.emit('mess:toggle'), e = e || window.event, e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = !0;
            });
            o.g(l);
            if (e.messSkin.active == p)
                t.on(a, 'click', function () {
                    n.emit('mess:max');
                });
        }
        var i = {
                close: null,
                text: null,
                wrap: null
            }, r = require('./common'), o = require('../../base/dom'), a = r.id('head'), s = r.className('head'), u = r.id('head-close'), c = r.className('head-close'), d = r.id('head-text'), l = r.className('head-text'), f = '<a id="#id" data-status="max" class="#class"></a>', m = '<ins id="#id" class="#class" ></ins>', p = '0';
        return {
            render: function (e, r) {
                if (t(e), r.bindEvent !== !1)
                    n(r);
                return i;
            }
        };
    }), define('front/mess/view/placeholder', [
        'require',
        'exports'
    ], function (require, exports) {
        'use strict';
        function e(e) {
            if (!('placeholder' in document.createElement('input')))
                for (var r, o = e.getElementsByTagName('*'), a = 0; a < o.length; a++) {
                    var s = o[a].tagName.toLowerCase();
                    if ('input' == s || 'textarea' == s || 'select' == s)
                        r = o[a], r.onfocus = n, r.onblur = i, r.onchange = t, r.onblur();
                }
        }
        function t() {
            var e = this.getAttribute('placeholder'), t = this.value;
            if (t === e)
                this.style.color = o;
        }
        function n() {
            var e = this.getAttribute('placeholder'), t = this.value;
            if (t === e)
                this.value = '', this.style.color = o;
        }
        function i() {
            var e = this.getAttribute('placeholder'), t = this.value;
            if ('' === t)
                this.value = e, this.style.color = r;
        }
        var r = '#999', o = '#000';
        return { fixPlaceholder: e };
    }), define('front/mess/view/validate', [
        'require',
        '../../base/emitter'
    ], function (require) {
        function e(e, t) {
            var n = !0, i = {};
            if ('[object Array]' == {}.toString.call(t))
                for (var i, r = 0; (i = t[r]) && (n = o[i.type](e, i), n); r++);
            return {
                result: n,
                msg: i && i.msg
            };
        }
        function t(e) {
            var t = e.getAttribute('placeholder'), n = e.value;
            if (n === t)
                n = '', e.value = '';
            return n;
        }
        function n(n, i) {
            for (var o = n.getElementsByTagName('*'), a = [], s = 0, u = o.length; u > s; s++) {
                var c = o[s], d = c.getAttribute('name'), l = i[d] || !1;
                if (d && l) {
                    var f = t(c), m = e(f, l);
                    if (!m.result)
                        r.emit('validate:fail', c, !1), a.push({
                            name: d,
                            msg: m.msg
                        });
                }
            }
            return a;
        }
        function i(e) {
            for (var t = s.ERR_TITLE + '\n\n', n = [], i = 0, r = e.length; r > i; i++) {
                var o = e[i];
                n.push('      ' + o.msg + '\n');
            }
            return t += n.join('');
        }
        var r = require('../../base/emitter'), o = {}, a = {
                email: /^[_\w-]+(\.[_\w-]+)*@([\w-])+(\.[\w-]+)*((\.[\w]{2,})|(\.[\w]{2,}\.[\w]{2,}))$/,
                url: /^[^.。，]+(\.[^.，。]+)+$/,
                mobilePhone: /^1\d{10}$/,
                number: /^\d*$/
            }, s = {};
        return o.len = function (e, t) {
            var n = !0;
            if (e = e.toString(), void 0 !== t.min)
                n = n && e.length >= t.min;
            if (void 0 !== t.max)
                n = n && e.length <= t.max;
            return n;
        }, o.range = function (e, t) {
            var n = !0;
            if (e = +e, void 0 !== t.min)
                n = n && e >= t.min;
            if (void 0 !== t.max)
                n = n && e <= t.max;
            return n;
        }, o.regexp = function (e, t) {
            if ('' == e)
                return !0;
            var n = a[t.rule] || new RegExp(t.rule);
            return e = e.toString(), n.test(e);
        }, {
            check: function (e, t, r) {
                var o = n(e, t);
                s = r || {};
                var a = !o.length, u = i(o);
                return {
                    result: a,
                    msg: u
                };
            }
        };
    }), define('front/storage/localStorage', [
        'require',
        'exports',
        '../base/browser'
    ], function (require, exports) {
        'use strict';
        function e(e) {
            if (n.localStorage)
                u.ls = n.localStorage;
            else
                u.ls = s, u.ls.build(e);
        }
        var t = require('../base/browser'), n = window, i = n.document, r = '', o = '', a = '_QIAO_USERDATA_', s = function () {
                function e(e) {
                    return e.replace(s, '___');
                }
                var t, n = null, o = 365, s = new RegExp('[!"#$%&\'()*+,/\\\\:;<=>?@[\\]^`{|}~]', 'g');
                return {
                    build: function (e) {
                        e = e || {}, t = a + (e.siteId || r), o = e.expires || o;
                    },
                    setup: function () {
                        if (!n)
                            try {
                                n = i.createElement('input'), n.type = 'hidden', n.addBehavior('#default#userData'), i.body.appendChild(n);
                            } catch (e) {
                                return !1;
                            }
                        return !0;
                    },
                    setItem: function (i, r) {
                        i = e(i);
                        var a = this, s = new Date();
                        if (a.setup())
                            return s.setDate(s.getDate() + o), n.expires = s.toUTCString(), n.load(t), n.setAttribute(i, r), n.save(t), r;
                        else
                            return void 0;
                    },
                    getItem: function (i) {
                        i = e(i);
                        var r = this;
                        if (r.setup())
                            return n.load(t), n.getAttribute(i);
                    },
                    removeItem: function (i) {
                        i = e(i);
                        var r = this;
                        if (r.setup())
                            n.load(t), n.removeAttribute(i), n.save(t);
                    },
                    clear: function () {
                        var e = new Date();
                        e.setDate(e.getDate() - 1), n.expires = e.toUTCString();
                    }
                };
            }(), u = {
                INTERVAL: 1000,
                ls: null,
                useTimer: t.ie && t.ie < 8,
                timer: null,
                keyEvent: {}
            }, c = {
                onStorage: function (e, t, i) {
                    var r = u.ls.getItem(e);
                    return i = i || null, function (o) {
                        setTimeout(function () {
                            o = o || n.storageEvent;
                            var a = o.key, s = o.newValue;
                            if (!a) {
                                var c = u.ls.getItem(e);
                                if (c != r)
                                    a = e, s = c;
                            }
                            if (a == e)
                                t && t.call(i, o.oldValue || r, s), r = s;
                        }, 0);
                    };
                }
            };
        return exports.setItem = function (e, t) {
            return e = o + e, u.ls.setItem(e, t);
        }, exports.getItem = function (e) {
            return e = o + e, u.ls.getItem(e);
        }, exports.removeItem = function (e) {
            return e = o + e, u.ls.removeItem(e);
        }, exports.clear = function () {
            u.ls.clear();
        }, exports.addStorageEvent = function (e, r) {
            e = o + e;
            var a;
            if (!u.useTimer)
                if (a = c.onStorage(e, r), i.attachEvent && !t.opera)
                    i.attachEvent('onstorage', a);
                else
                    n.addEventListener('storage', a, !1);
            else
                a = c.onStorage(e, r), u.timer = setInterval(function () {
                    a({});
                }, u.INTERVAL);
        }, e({}), exports;
    }), define('front/mess/view/body', [
        'require',
        '../../base/emitter',
        '../../base/event',
        '../../common/identity',
        '../../storage/localStorage',
        '../../base/string',
        './language',
        '../../data/config',
        './validate',
        './common',
        '../../base/dom',
        '../../base/lang',
        './placeholder'
    ], function (require) {
        function e(e) {
            var e = e || '', t = F.replace('#name', e).replace(/#itemHolder/g, y.TIP_MESS), n = x(y.TEXT, 0) + ': ';
            return S.rules[e] = [{
                    type: 'len',
                    min: 1,
                    msg: n + y.ERR_NOT_NULL
                }], S.rules[e].push({
                type: 'len',
                max: 500,
                msg: n + y.ERR_TEXT_TOO_LONG
            }), t;
        }
        function t(e, t, n, i) {
            var r = S.rules;
            r[e] = [];
            var o = 'display:none', a = t + ': ';
            if ('1' == i || i === !0)
                o = 'display:inline', r[e].push({
                    type: 'len',
                    min: 1,
                    msg: a + y.ERR_NOT_NULL
                });
            if (r[e].push({
                    type: 'len',
                    max: 100,
                    msg: a + y.ERR_ITEM_TOO_LONG
                }), 'bd_bp_messPhone' == e)
                r[e].push({
                    type: 'regexp',
                    rule: 'number',
                    msg: a + y.ERR_NUMBER_ONLY
                });
            if ('bd_bp_messEmail' == e)
                r[e].push({
                    type: 'regexp',
                    rule: 'email',
                    msg: a + y.ERR_EMAIL_STYLE
                });
            return e = e || '', n = n || y.TIP_DEFAULT, t = t || '', html = H.replace('#itemTitle', t).replace('#name', e).replace('#star', o).replace(/#itemHolder/g, n), html;
        }
        function n(e, t, n, i, r) {
            e = e || '', n = n || y.TIP_DEFAULT, t = t || '', i = i || [];
            for (var o = r ? '' : '<option value="">\u8BF7\u9009\u62E9</option>', a = 0, s = i.length; s > a; a++) {
                var u = h(i[a]);
                o += '<option value="' + u + '">' + u + '</option>';
            }
            return html = U.replace('#itemTitle', t).replace('#name', e).replace(/#itemHolder/g, n).replace('#options', o), html;
        }
        function i(e) {
            var t = e.name || '', n = e.value || '', i = G.replace('#value', n).replace('#name', t);
            return i;
        }
        function r(e) {
            var t = C.g(L);
            if (t)
                T.wrap = t, T.wrap.innerHTML = '';
            else
                T.wrap = C.create('ins', {
                    id: L,
                    className: O
                }), e.appendChild(T.wrap);
            T.form = C.create('form', {
                className: M + ' qiao-mess-clearfix',
                method: 'post',
                target: A,
                action: E.SUBMIT + S.siteId + '&page_id=' + S.pageId + '&ucid=' + S.ucid
            }), T.form.setAttribute('accept-charset', 'utf-8'), T.iframe = C.createIframe(A, A, T.wrap), a(T.form), T.wrap.appendChild(T.form);
        }
        function o() {
            var e = {
                    name: 'bd_bp_title',
                    value: h(document.title)
                }, t = {
                    name: 'bd_bp_referer',
                    value: document.referrer
                }, n = {
                    name: 'bd_bp_bid',
                    value: b.getItem(v.getLSKey('bid'))
                }, r = {
                    name: 'bd_bp_tick',
                    value: new Date().getTime()
                }, o = i(e) + i(t) + i(r) + i(n);
            return o;
        }
        function a(n) {
            var i = S.options.messItem, r = S.options.extraMessItems, a = '';
            if (!0)
                a += e('bd_bp_messText');
            if ('2' != i.messItemName)
                a += t('bd_bp_messName', x(y.NAME, 0), y.TIP_DEFAULT, i.messItemName);
            if ('2' != i.messItemPhone)
                a += t('bd_bp_messPhone', x(y.PHONE, 0), x(y.PHONE, 1), i.messItemPhone);
            if ('2' != i.messItemAddress)
                a += t('bd_bp_messAddress', x(y.ADDRESS, 0), y.TIP_DEFAULT, i.messItemAddress);
            if ('2' != i.messItemEmail)
                a += t('bd_bp_messEmail', x(y.EMAIL, 0), x(y.EMAIL, 1), i.messItemEmail);
            if (r && r.length > 0)
                a += s(r);
            a += o(), n.innerHTML = a, R.fixPlaceholder(T.form);
        }
        function s(e) {
            for (var i = null, r = '', o = 'bd_bp_extral_', a = '', s = 0, u = e.length; u > s; s++) {
                i = e[s], a = h(i.key);
                var c = '1' == i.necessity ? !0 : !1;
                if (i.subItems)
                    r += n(o + s, a, '', i.subItems, c);
                else
                    r += t(o + s, a, '', c);
            }
            return r;
        }
        function u() {
            T.form.reset();
        }
        function c(e) {
            for (var t = b.getItem(v.getLSKey('bid')), n = e.getElementsByTagName('input'), i = n.length - 1; i > 0; i--)
                if ('bd_bp_bid' === n[i].getAttribute('name'))
                    n[i].setAttribute('value', t);
        }
        function d() {
            require('../../base/event'), require('../../base/string');
            f(T.form, S.rules);
        }
        function l() {
            p.on('mess:send', j.send), p.on('validate:fail', j.setStyle);
        }
        function f(e, t) {
            for (var n = e.getElementsByTagName('*'), i = 0, r = n.length; r > i; i++) {
                var o = n[i], a = o.getAttribute('name'), s = t[a] || !1;
                if (a && s)
                    !function (e) {
                        g.on(e, 'focus', function () {
                            j.setStyle(e, !0);
                        });
                    }(o);
            }
        }
        function m(e) {
            return '0' == e ? w.CHINESE : w.ENGLISH;
        }
        var p = require('../../base/emitter'), g = require('../../base/event'), v = require('../../common/identity'), b = require('../../storage/localStorage'), h = require('../../base/string').encodeHTML, w = require('./language'), y = {}, I = require('../../data/config').getRoot(), E = { SUBMIT: I + '?module=default&controller=index&action=doMess&siteid=' }, T = {
                form: '',
                phone: '',
                email: '',
                message: '',
                send: '',
                custom: {}
            }, S = {
                options: {},
                siteId: '',
                ucid: '',
                pageId: '',
                rules: {}
            }, N = require('./validate'), _ = require('./common'), x = _.getLanText, C = require('../../base/dom'), R = (require('../../base/lang'), require('./placeholder')), L = _.id('body'), O = _.className('body'), A = _.id('iframe'), M = _.className('form'), D = _.className('item'), k = _.className('item-head'), q = _.className('item-body'), P = _.className('item-mess'), B = /msie (\d+\.\d+)/i.test(navigator.userAgent), j = {}, H = '<ins class="' + D + ' qiao-mess-clearfix"><ins class="' + k + '">#itemTitle<ins class="qiao-mess-star" style="#star">*</ins></ins><ins class="qiao-mess-input-wrap"><input name="#name" class="' + q + '"  placeholder="#itemHolder"></ins></ins>', U = '<ins class="' + D + ' qiao-mess-clearfix"><ins class="' + k + '">#itemTitle</ins><ins class="qiao-mess-input-wrap"><select name="#name" class="' + q + '"  placeholder="#itemHolder">#options</select></ins></ins>', F = '<ins class="qiao-mess-clearfix"><ins class="qiao-mess-clearfix ' + P + '"><ins style="display:none">\u7559\u8A00\u5185\u5BB9</ins><textarea name="#name" class=""  placeholder="#itemHolder"></textarea><ins class="qiao-mess-star">*</ins></ins></ins>', G = '<input type="hidden" style="display:none" value="#value" name="#name" />', W = 'errBg';
        return j.send = function () {
            var e = N.check(T.form, S.rules, y);
            if (e.result) {
                var t = !1;
                if (B)
                    t = document.charset, document.charset = 'utf-8';
                if (c(T.form), T.form.submit(), B)
                    document.charset = t;
                p.emit('mess:min'), p.emit('stat', 'SEND_MESS', { open: 1 }), setTimeout(function () {
                    u(), R.fixPlaceholder(T.form);
                }, 0);
            } else
                R.fixPlaceholder(T.form), alert(e.msg);
        }, j.setStyle = function (e, t) {
            var n = t ? C.removeClass : C.addClass;
            if ('textarea' === e.tagName.toLocaleLowerCase())
                n(e, W);
            else
                n(e.parentNode.parentNode, W);
        }, {
            render: function (e, t) {
                if (t.rules)
                    S.rules = t.rules || {};
                if (y = t.LANGUAGE || m(t.messItem.language), S.options = t || {}, S.siteId = t.siteId || '', S.pageId = t.pageId || '', S.ucid = t.ucid || '', T.main = e, r(e, t), t.bindEvent !== !1)
                    d(), l();
                return T;
            }
        };
    }), define('front/mess/view/container', [
        'require',
        './common',
        '../../base/dom'
    ], function (require) {
        var e = require('./common'), t = require('../../base/dom'), n = e.id('container'), i = e.className('container');
        return {
            render: function (e, r) {
                var o = t.g(n);
                return o = t.create('ins', {
                    id: n,
                    className: i
                }), e.appendChild(o), o;
            }
        };
    }), define('front/mess/view/common', [
        'require',
        'exports',
        '../../common/view'
    ], function (require, exports) {
        'use strict';
        function e(e, t) {
            var n = e.split('%bd_bp_sp%');
            return n[t];
        }
        var t = require('../../common/view'), n = 'mess';
        return {
            id: function (e) {
                return t.getIdPre(n) + e;
            },
            className: function (e) {
                return t.getClassPre(n) + e;
            },
            getLanText: e
        };
    }), define('front/mess/view/language', ['require'], function (require) {
        var e = {
                TITLE: '\u6B22\u8FCE\u7ED9\u6211\u4EEC\u7559\u8A00',
                TEXT: '\u7559\u8A00\u5185\u5BB9',
                SEND: '\u53D1\u9001',
                RIGHT_TIP: '\u767E\u5EA6\u63D0\u4F9B\u6280\u672F\u652F\u6301',
                NAME: '\u59D3\u540D',
                PHONE: '\u7535\u8BDD%bd_bp_sp%\u8BF7\u8F93\u5165\u60A8\u7684\u7535\u8BDD\u53F7\u7801',
                ADDRESS: '\u5730\u5740',
                EMAIL: '\u90AE\u7BB1%bd_bp_sp%\u8BF7\u8F93\u5165\u5408\u6CD5\u90AE\u7BB1\u540D',
                SELECT: '\u8BF7\u9009\u62E9',
                TIP_DEFAULT: '\u6700\u591A100\u4E2A\u5B57\u7B26',
                TIP_MESS: '\u8BF7\u5728\u6B64\u8F93\u5165\u7559\u8A00\u5185\u5BB9\uFF0C\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u4E0E\u60A8\u8054\u7CFB\u3002',
                ERR_NOT_NULL: '\u4E0D\u80FD\u4E3A\u7A7A',
                ERR_NOT_SELECTED: '\u672A\u9009\u62E9\u6709\u6548\u7684\u503C',
                ERR_TEXT_TOO_LONG: '\u4E0D\u80FD\u8D85\u8FC7500\u4E2A\u5B57\u7B26',
                ERR_ITEM_TOO_LONG: '\u4E0D\u80FD\u8D85\u8FC7100\u4E2A\u5B57\u7B26',
                ERR_TITLE: '\u5BF9\u4E0D\u8D77\uFF0C\u60A8\u63D0\u4EA4\u7684\u7559\u8A00\u5B58\u5728\u4EE5\u4E0B\u9519\u8BEF\uFF1A',
                ERR_NUMBER_ONLY: '\u5E94\u5F53\u5168\u90E8\u7531\u6570\u5B57\u7EC4\u6210',
                ERR_EMAIL_STYLE: '\u4E0D\u662F\u6807\u51C6\u90AE\u7BB1\u683C\u5F0F',
                SUCCESS: '\u7559\u8A00\u6210\u529F\uFF01\u8C22\u8C22\u60A8\uFF0C\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u4E0E\u60A8\u8054\u7CFB\uFF01',
                FAILED: '\u5BF9\u4E0D\u8D77\uFF01\u60A8\u7684\u7F51\u7EDC\u5B58\u5728\u5F02\u5E38\uFF0C\u4E3A\u4E86\u786E\u4FDD\u7559\u8A00\u53D1\u9001\u6210\u529F\u8BF7\u7A0D\u540E\u518D\u8BD5\u4E00\u6B21\uFF01'
            }, t = {
                TITLE: 'Send message to us',
                TEXT: 'Contents',
                SEND: 'Send',
                RIGHT_TIP: 'Powered by Baidu',
                NAME: 'Name',
                PHONE: 'Tel%bd_bp_sp%Leave us your telephone number',
                ADDRESS: 'Address',
                EMAIL: 'Email%bd_bp_sp%Leave us your email',
                SELECT: 'Please Select ',
                TIP_DEFAULT: 'Less than 100 chars',
                TIP_MESS: 'Leave us your message\uFF0Cwe will contact you as soon as possible\uFF01',
                ERR_NOT_NULL: ' is necessary',
                ERR_NOT_SELECTED: ' is not correctly selected',
                ERR_TEXT_TOO_LONG: ' should be less than 500 chars',
                ERR_ITEM_TOO_LONG: ' should be less than 100 chars',
                ERR_TITLE: 'Sorry, some errors exist in your submition:',
                ERR_NUMBER_ONLY: ' should be numbers',
                ERR_EMAIL_STYLE: ' is illegal',
                SUCCESS: 'Thank You! We have received your message and will respond promptly',
                FAILED: 'Opps\uFF01The Operation Failed Due to Network or Other Communication Problems'
            };
        return {
            CHINESE: e,
            ENGLISH: t
        };
    }), define('front/mess/view', [
        'require',
        '../base/browser',
        '../base/emitter',
        '../base/dom',
        '../base/lang',
        '../common/Mask',
        '../common/Fixed',
        './view/language',
        './view/common',
        './view/container',
        './view/body',
        './view/head',
        './view/foot',
        '../common/view'
    ], function (require) {
        'use strict';
        function e() {
            a.on('mess:min', I.min), a.on('mess:max', I.max), a.on('mess:show', I.show), a.on('mess:center', I.center), a.on('mess:toggle', I.toggle);
        }
        function t(e) {
            var t = s.g(S);
            if (!t)
                t = document.createElement('ins'), t.id = S, t.className = N, t.style.visibility = 'hidden', t.style.display = 'none', e.appendChild(t);
            else
                t.innerHTML = '';
            return t;
        }
        function n() {
            y.status = 'show', w.messWrap.style.display = 'block', h.setWrapTop(w.messWrap);
        }
        function i() {
            w.messWrap.style.display = 'none', y.status = 'hide';
        }
        var r, o = require('../base/browser'), a = require('../base/emitter'), s = require('../base/dom'), u = require('../base/lang'), c = require('../common/Mask'), d = require('../common/Fixed'), l = require('./view/language'), f = require('./view/common'), m = require('./view/container'), p = require('./view/body'), g = require('./view/head'), v = require('./view/foot'), b = null, h = require('../common/view'), w = {
                messWrap: null,
                container: null,
                body: null,
                head: null,
                foot: null
            }, y = { status: 'hide' }, I = {}, E = f.className('wrap-min'), T = f.className('wrap-center'), S = f.id('wrap'), N = f.className('wrap');
        return I.max = function () {
            s.removeClass(w.messWrap, E), r && r.auto(), b && b.resizeFix();
        }, I.show = function () {
            if ('hide' == y.status)
                n();
            s.removeClass(w.messWrap, E);
        }, I.min = function () {
            if (s.removeClass(w.messWrap, T), s.addClass(w.messWrap, E), 6 == o.ie)
                w.messWrap.style.cssText = '';
            r && r.auto(), b && b.resizeFix();
        }, I.toggle = function () {
            var e = w.messWrap.className;
            if (-1 != e.indexOf(E))
                a.emit('mess:max');
            else
                a.emit('mess:min');
        }, I.center = function () {
            if (n(), s.removeClass(w.messWrap, E), s.addClass(w.messWrap, T), 6 == o.ie)
                w.messWrap.style.cssText = '';
            r && r.auto(), b && b.resizeFix(), a.emit('stat', 'CLICK_MESS', {});
        }, {
            render: function (n, i) {
                if (i = u.extend({}, i), !i.LANGUAGE)
                    i.LANGUAGE = 0 == i.messItem.language ? l.CHINESE : l.ENGLISH;
                var o = {};
                w.messWrap = t(n), w.container = m.render(w.messWrap, i), o.head = g.render(w.container, i), o.body = p.render(w.container, i), o.foot = v.render(w.container, i), r = new c(w.messWrap), b = new d(w.messWrap), e();
                var a = w.messWrap;
                return o.container = w.container, o.messWrap = w.messWrap, u.extend(a, { elements: o });
            },
            show: n,
            hide: i
        };
    }), define('front/mess/main', [
        'require',
        './view',
        '../common/view',
        '../data/config',
        '../data/group',
        '../base/emitter',
        './view/language',
        '../base/lang'
    ], function (require) {
        function e(e) {
            e = e || {}, l = require('../base/lang').extend(l, e), l.siteId = require('../data/config').getSiteId(), l.ucid = require('../data/config').getUcId(), l.pageId = require('../data/config').getPageId();
        }
        function t() {
            if (!s.hasLoginSub())
                r.show();
        }
        function n() {
            r.hide();
        }
        function i(e) {
            if (0 == l.messItem.language)
                l.LANGUAGE = c.CHINESE;
            else
                l.LANGUAGE = c.ENGLISH;
            var i = r.render(e, l);
            if (0 == l.messType.disableMess)
                if (1 == l.messShow.messFloatType)
                    r.show();
                else {
                    var o = s.asyncHandle();
                    o.then(t);
                }
            return d = i, u.on('mess:hide', n), i;
        }
        var r = require('./view'), o = require('../common/view'), a = require('../data/config'), s = require('../data/group'), u = require('../base/emitter'), c = require('./view/language'), d = null, l = {
                messItem: {
                    messItemName: 0,
                    messItemPhone: 0,
                    messItemAddress: 0,
                    messItemEmail: 0,
                    messItemText: 1,
                    language: 0
                },
                extraMessItems: [],
                messType: { disableMess: 0 },
                messShow: { messFloatType: 1 },
                messPosition: { position: 3 },
                messSkin: {
                    active: 0,
                    backgroundColor: '#3399CC',
                    backgroundUrl: 'http://qiao.baidu.com/v3/res/messbg/04.png'
                }
            };
        return {
            init: function () {
                var t = a.getStyleConfig('mess');
                e(t), o.getWrap();
                var n = o.asyncHandle();
                n.then(i);
            }
        };
    }), require([
        'front/data/config',
        'front/mess/main'
    ], function (e, t) {
        t.init(e.getStyleConfig('mess'));
    }), define('front/api/main', [
        'require',
        'exports',
        '../base/emitter',
        '../base/lang'
    ], function (require, exports) {
        function e(e) {
            e = i.extend({}, e), n.emit('windowChat:open', e);
        }
        function t(e) {
            switch (e) {
            case 'icon':
                n.emit('icon:hide');
                break;
            case 'invite':
                n.emit('invite:hide');
                break;
            case 'mess':
                n.emit('mess:hide');
                break;
            default:
                n.emit('icon:hide'), n.emit('invite:hide'), n.emit('mess:hide');
            }
        }
        var n = require('../base/emitter'), i = require('../base/lang');
        window.BaiduBridge = {}, BaiduBridge.openWebim = e, BaiduBridge.hide = t;
    }), require(['front/api/main'], function (e) {
    }), define('front/prevent/tpl', [
        'require',
        'exports'
    ], function (require, exports) {
        var e = {
            secondVerify: '<ins class="#{wrap}">    <ins class="#{container}">        <ins class="#{text}">\u60A8\u786E\u5B9A\u8981\u5F00\u59CB\u4E0E\u5BA2\u670D\u6C9F\u901A\u5417?</ins>        <ins class="#{button}">            <a class="#{confirmcode}" id="#{confirmcode}">\u786E\u5B9A</a>            <a class="#{cancle}" id="#{cancle}">\u53D6\u6D88</a>        </ins>    </ins></ins>',
            authCode: '<ins class="#{wrap}">    <ins class="#{container}">        <ins class="#{text}">\u8F93\u5165\u9A8C\u8BC1\u7801\u540E\uFF0C\u5C06\u4E3A\u60A8\u5F00\u542F\u5728\u7EBF\u54A8\u8BE2</ins>        <ins class="#{inputauth}" >            <input type="text" class="#{input}"id="#{input}" placeholder="\u8F93\u5165\u4E0B\u65B9\u9A8C\u8BC1\u7801"/>            <a class="#{error}" id="#{error}"></a>        </ins>        <ins class="#{inputimg}">             <img class="#{authimg}"id="#{authimg}"/>             <a class="#{changeimg}" id="#{changeimg}">\u5237\u65B0</a>        </ins>        <ins class="#{button}" >             <a class="#{confirmcode}" id="#{confirmcode}">\u786E\u5B9A</a>             <a class="#{cancle}" id="#{cancle}">\u53D6\u6D88</a>    </ins></ins>'
        };
        return {
            secondVerify: e.secondVerify,
            authCode: e.authCode
        };
    }), define('front/prevent/const', [
        'require',
        '../common/view'
    ], function (require) {
        var e = require('../common/view'), t = e.getIdPre('prevent'), n = e.getClassPre('prevent');
        return function (e, i) {
            return ('id' === i ? t : n) + e.toLowerCase();
        };
    }), define('front/prevent/main', [
        'require',
        'exports',
        './const',
        './tpl',
        '../base/emitter',
        '../common/view',
        '../common/Mask',
        '../base/dom',
        '../base/string',
        '../data/config',
        '../net/jsonp',
        '../common/identity',
        '../storage/localStorage',
        '../base/event'
    ], function (require, exports) {
        function e() {
            if (!x) {
                var e = y.getItem(w.getLSKey('bid')), i = {
                        data: {
                            bid: e || '',
                            codeid: N,
                            val: _,
                            timestamp: new Date().valueOf()
                        },
                        onsuccess: t,
                        onfail: n
                    };
                h.request(R.SEND_CODE, i), x = !0;
            }
        }
        function t(e) {
            if (x = !1, 0 !== e.status) {
                var t = g.g(S.error), n = g.g(S.input);
                if (1 === e.status)
                    t.innerHTML = '\u9A8C\u8BC1\u7801\u9519\u8BEF', n.value = '';
                else if (2 === e.status)
                    t.innerHTML = '\u9A8C\u8BC1\u7801\u9519\u8BEF', n.value = '';
                return void i();
            }
            l(L);
            var r = {
                code: _,
                codeId: N
            };
            M.call(this, r);
        }
        function n(e) {
            x = !1;
        }
        function i() {
            var e = {
                data: { timestamp: new Date().valueOf() },
                onsuccess: r,
                onfail: o
            };
            h.request(R.GET_CODE, e);
        }
        function r(e) {
            var t = g.g(S.authimg);
            t.setAttribute('src', e.body.url), N = e.body.codeid;
        }
        function o() {
            i();
        }
        function a() {
            var t = g.g(S.min), n = g.g(S.changeimg), r = g.g(S.confirmcode), o = g.g(S.cancle);
            I.on(t, 'click', l), I.on(o, 'click', function () {
                l();
                var e = g.g(S.error), t = g.g(S.input);
                e.innerHTML = '', t.value = '';
            }), I.on(r, 'click', function () {
                var t = g.g(S.input).value;
                _ = t, e();
            }), I.on(n, 'click', i);
        }
        function s() {
            var e = g.g(S.confirmcode), t = g.g(S.cancle);
            I.on(t, 'click', l), I.on(e, 'click', function () {
                l(), M.call(this);
            });
        }
        function u(e) {
            var t = m.authCode;
            t = v.format(t, S);
            var n = document.createElement('ins'), i = S.auth;
            n.className = i, n.id = E, n.innerHTML = t, e.appendChild(n), A = new p(n), a(), L = g.g(i);
        }
        function c(e) {
            var t = m.secondVerify;
            t = v.format(t, S);
            var n = document.createElement('ins'), i = S.second;
            n.className = i, n.id = T, n.innerHTML = t, e.appendChild(n), A = new p(n), s(), O = g.g(i);
        }
        function d() {
            var e;
            if (L)
                e = L;
            else if (O)
                e = O;
            if (e)
                g.removeClass(e, S.iconClose);
            A && A.auto();
        }
        function l() {
            var e;
            if (L)
                e = L;
            else if (O)
                e = O;
            if (e)
                g.addClass(e, S.iconClose);
            A && A.auto();
        }
        var f = require('./const'), m = require('./tpl'), p = (require('../base/emitter'), require('../common/view'), require('../common/Mask')), g = require('../base/dom'), v = require('../base/string'), b = require('../data/config'), h = require('../net/jsonp'), w = require('../common/identity'), y = require('../storage/localStorage'), I = require('../base/event'), E = f('auth'), T = f('second'), S = {
                auth: f('auth'),
                second: f('second'),
                iconClose: f('close'),
                wrap: f('wrap'),
                head: f('head'),
                container: f('container'),
                min: f('min'),
                text: f('text'),
                inputauth: f('inputauth'),
                inputimg: f('inputimg'),
                input: f('input'),
                error: f('error'),
                authimg: f('authimg'),
                changeimg: f('changeimg'),
                button: f('button'),
                confirmcode: f('confirmcode'),
                cancle: f('cancle')
            }, N = null, _ = null, x = !1, C = b.getImRoot(), R = {
                SEND_CODE: C + 'atverifycode',
                GET_CODE: C + 'atgetcode'
            }, L = null, O = null, A = null, M = null;
        return {
            authShow: function (e) {
                if (M = e, i(), L)
                    d();
                else
                    u(document.body);
            },
            secondShow: function (e) {
                if (M = e, O)
                    d();
                else
                    c(document.body);
            },
            URL: R
        };
    }), define('front/net/jsonp', ['require'], function (require) {
        'use strict';
        function e(e, i) {
            var s = o(), m = null, p = i.timeout || null, g = i.callbackKey || l, v = s, b = i.data || {};
            b.t = new Date().getTime();
            var h = i.charset || f, w = function (e) {
                    i.onsuccess && i.onsuccess(e), n(m), r(v);
                }, y = function () {
                    i.onfail && i.onfail(), n(m), r(v);
                }, I = a({
                    url: e + t(e, b, g, v),
                    charset: h,
                    id: s
                });
            if (c[s] = u[s] = function () {
                    w.apply(null, arguments);
                }, d[s] = function () {
                    y.apply(null, arguments);
                }, p)
                m = setTimeout(function () {
                    m = null, I.abort(), y.call(null);
                }, p);
            I.send();
        }
        function t(e, t, n, i) {
            var r = {}.toString.call(t), o = '?';
            if (e.indexOf('?') > -1)
                o = '&';
            var a = o + n + '=' + i;
            if ('[object Object]' === r)
                for (var s in t)
                    if (t.hasOwnProperty(s))
                        a += '&' + s + '=' + encodeURIComponent(t[s]);
            return a;
        }
        function n(e) {
            if (e)
                clearTimeout(e), e = null;
        }
        function i(e) {
            if (u[e])
                u[e] = m(e), c[e] = null, delete c[e];
        }
        function r(e) {
            try {
                c[e] = null, u[e] = null, delete c[e], delete u[e];
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
        function a(e) {
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
                        if (d[t.id])
                            d[t.id].call(null);
                        t = null;
                    }, n.insertBefore(t, n.firstChild);
                },
                abort: function () {
                    if (t)
                        t.onload(!0);
                }
            };
        }
        var s = document, u = window, c = {}, d = {}, l = 'callback', f = 'utf-8', m = function (e) {
                return function () {
                    try {
                        u[e] = null, delete u[e];
                    } catch (t) {
                    }
                };
            };
        return { request: e };
    }), define('front/base/json', [], function () {
        function e(e) {
            var t = {}.toString.call(e);
            return t = t.substring(8, t.length - 1), t.toLowerCase();
        }
        function t(t) {
            var i = n[e(t)];
            return i ? i(t) : '' + t;
        }
        var n = {};
        return n.array = function (e) {
            var n = [];
            n.push('[');
            for (var i = 0, r = e.length; r > i; i++)
                n.push(t(e[i])), n.push(',');
            return n.splice(n.length - 1, 1), n.push(']'), n.join('');
        }, n.object = function (e) {
            if (null === e)
                return 'null';
            var n = [];
            n.push('{');
            for (var i in e)
                if (e.hasOwnProperty(i))
                    n.push('"' + i + '":'), n.push(t(e[i])), n.push(',');
            return n.splice(n.length - 1, 1), n.push('}'), n.join('');
        }, n.string = function (e) {
            return '"' + e + '"';
        }, {
            parse: function (e) {
                var t = null;
                try {
                    if (window.JSON && window.JSON.parse)
                        t = window.JSON.parse(e);
                    else
                        t = new Function('return (' + e + ');')();
                } catch (n) {
                }
                return t;
            },
            stringify: function (e) {
                var n;
                if (window.JSON && window.JSON.stringify)
                    n = window.JSON.stringify(e);
                else
                    n = t(e);
                return n;
            }
        };
    }), define('front/base/loader', [], function () {
        function e(e, o, a, s) {
            var u, c, d, l = this, f = t.getElementsByTagName('head')[0];
            for (l.callback = s || function () {
                }, l.queue = [], o = 'string' == typeof o ? [o] : o, c = 0, d = o.length; d > c; c++) {
                if (this.queue[c] = 1, 'css' == e)
                    if (!n.isGecko)
                        u = r.createNode('link', r.merge({
                            type: 'text/css',
                            rel: 'stylesheet',
                            href: o[c]
                        }, a));
                    else
                        u = r.createNode('style'), u.innerHTML = '@import "' + o[c] + '";';
                else
                    u = r.createNode('script', r.merge({
                        type: 'text/javascript',
                        src: o[c],
                        charset: 'utf-8'
                    }, a));
                if (i)
                    if ('css' == e && 2 == i)
                        !function () {
                            var e = 0, t = setInterval(function () {
                                    try {
                                        u.sheet.cssRules, clearInterval(t), l._callback();
                                    } catch (n) {
                                        if (e += 1, e > 100)
                                            clearInterval(t), l._callback();
                                    }
                                }, 100);
                        }();
                    else
                        u.onload = function () {
                            l._callback();
                        };
                else
                    u.onreadystatechange = function () {
                        if (/^loaded|complete$/.test(this.readyState))
                            this.onreadystatechange = null, l._callback();
                    };
            }
            f.appendChild(u);
        }
        var t = document, n = function () {
                var e = navigator.userAgent;
                return {
                    async: t.createElement('script').async === !0,
                    firefox: /firefox\/(\d+\.\d+)/i.test(e) ? +RegExp.$1 : void 0,
                    ie: /msie (\d+\.\d+)/i.test(e) ? document.documentMode || +RegExp.$1 : void 0,
                    isStrict: 'CSS1Compat' == document.compatMode,
                    isGecko: /gecko/i.test(e) && !/like gecko/i.test(e),
                    isWebkit: /webkit/i.test(e),
                    opera: /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(e) ? +(RegExp.$6 || RegExp.$2) : void 0
                };
            }(), i = n.ie ? 0 : n.opera ? 1 : 2, r = {
                createNode: function (e, n) {
                    var i, r = t.createElement(e);
                    for (i in n)
                        if (n.hasOwnProperty(i))
                            r.setAttribute(i, n[i]);
                    return r;
                },
                load: function (t, n, i, r) {
                    if ('function' == typeof i)
                        r = i, i = {};
                    new e(t, n, i, r);
                },
                merge: function (e, t) {
                    for (var n in t)
                        if (t.hasOwnProperty(n))
                            e[n] = t[n];
                    return e;
                }
            };
        return e.prototype = {
            _callback: function () {
                var e = this;
                if (e.queue.pop() && 0 == e.queue)
                    e.callback();
            }
        }, {
            css: function (e, t, n) {
                return r.load('css', e, t, n);
            },
            js: function (e, t, n) {
                return r.load('js', e, t, n);
            }
        };
    }), define('front/webim/lite', [
        'require',
        'exports',
        '../base/dom',
        '../base/lang',
        '../base/string',
        '../common/view',
        '../data/config',
        '../data/group',
        '../base/emitter',
        '../common/identity',
        '../storage/localStorage',
        '../base/loader',
        '../base/json',
        '../net/jsonp',
        '../prevent/main'
    ], function (require, exports) {
        function e(e) {
            var n;
            if (4 == e.status) {
                n = v.getGroupBySub(e.subid) || {};
                var i = {
                    type: 0,
                    chattype: E.chatType.enforce,
                    tid: n.groupid,
                    subid: e.subid,
                    groupname: n.groupname
                };
                t(i);
            }
        }
        function t(e) {
            var t = S.DIS, n = e.type, i = e.tid, r = e.subid, s = e.groupname, u = e.from, c = e.lastsubid, d = e.siteid, l = e.ucid, f = e.chat;
            new Date().getTime();
            if ('' === i) {
                n = 3, E.vis_type = n, E.vis_subid = r, E.vis_from = u, E.lastsubid = c, E.chattype = e.chattype, E.chat = f;
                var m = '&siteid=' + d + '&ucid=' + l + '&groupid=' + i + '&groupname=' + s + '&from=' + u + '&lastsubid=' + c, v = g.getJsFunctionResult();
                if (v || 0 === v) {
                    var b = { jscode: v };
                    b = p.objectToString(b), b = '&tag=' + b, m += b;
                }
                y.request(t + m, { onsuccess: a });
            } else
                _ = !0, o({
                    type: n,
                    chattype: e.chattype,
                    bridgeTid: i + '',
                    subid: r || '',
                    userGroupName: s,
                    chat: f
                });
        }
        function n(e) {
            return h.getLSKey(e);
        }
        function i(e) {
            localStorage.setItem(n('chattype'), e.chattype), localStorage.setItem(n('tid'), e.bridgeTid), localStorage.setItem(n('subid'), e.subid), localStorage.setItem(n('userGroupName'), e.userGroupName);
        }
        function r() {
            return {
                chattype: localStorage.getItem(n('chattype')),
                bridgeTid: localStorage.getItem(n('tid')),
                subid: localStorage.getItem(n('subid')),
                userGroupName: localStorage.getItem(n('userGroupName'))
            };
        }
        function o(e) {
            if (e)
                R = m.extend({}, e);
            if (_ && N) {
                var t = {
                    type: R.type,
                    chattype: R.chattype,
                    bridgeTid: R.bridgeTid || R.tid || 0,
                    subid: R.subid || '',
                    userGroupName: R.userGroupName || R.groupname,
                    chat: R.chat || ''
                };
                T.accept(t), i(R);
            }
        }
        function a(e) {
            if (0 == e.status) {
                var t = e.groupid, n = e.groupname;
                _ = !0, o({
                    type: E.vis_type,
                    chattype: E.chattype,
                    bridgeTid: t,
                    subid: E.vis_subid || '',
                    userGroupName: n,
                    chat: E.chat
                });
            }
        }
        function s(e) {
            g.setStyleConfig('webim', { webimtype: e });
        }
        function u() {
            var e = g.getStyleConfig('webim');
            T.on('revertsession', function () {
                s(1), _ = !0, o(r());
            }), T.on('ready', function () {
                s(1);
            });
            var t = e.webimposition;
            t = 3 === t ? 1 : 0;
            var n = 'undefined' != typeof e.webimchat.showtype ? e.webimchat.showtype : -1;
            T.on('auth', I.authShow), T.init({
                bid: g.getModelData('bid'),
                peerid: g.getModelData('peerid'),
                siteid: g.getSiteId(),
                ucid: g.getUcId(),
                mainid: g.getMainId() || 0,
                SITE_ID: g.getSiteIdMd5() || 0,
                userName: g.getUserName(),
                offsetTime: 0,
                root: g.getRoot(),
                bgColor: e.webimlitebgcolor || '',
                position: t || 0,
                csNameType: n,
                customName: e.webimchat.name || '',
                searchInfo: E.searchInfo,
                jscode: g.getJsFunctionResult(),
                IM_ROOT: g.getImRoot(),
                authCode: g.authCode
            });
        }
        function c() {
            var e = g.getFrontRoot() || g.getRoot();
            w.css(e + 'asset/css/m-webim-lite.css?v=20160803'), require(['front/webimlite/main'], function (e) {
                x = 1, T = e, d();
            });
        }
        function d() {
            if (x && C)
                T.refreshCode({ jsCode: g.getJsFunctionResult() }), u(T), N = !0, o();
        }
        function l(e) {
            var t, n, i = [
                    'referrer',
                    'location',
                    'title',
                    'word',
                    'wordtype',
                    'wordid',
                    'from'
                ], r = m.extend({}, g.getModelData());
            for (E.searchInfo = {}, t = 0; n = i[t]; t++)
                E.searchInfo[n] = r[n] || '';
            C = 1, d();
        }
        function f() {
            T.refreshCode({ authCode: g.authCode });
        }
        var m = (require('../base/dom'), require('../base/lang')), p = require('../base/string'), g = (require('../common/view'), require('../data/config')), v = require('../data/group'), b = require('../base/emitter'), h = require('../common/identity'), w = (require('../storage/localStorage'), require('../base/loader')), y = (require('../base/json'), require('../net/jsonp')), I = require('../prevent/main'), E = {
                chatType: {
                    byInvite: 0,
                    bySelf: 1,
                    enforce: 5
                }
            }, T = null, S = { DIS: g.getRoot() + '?module=default&controller=webim&action=visdistribute' }, N = !1, _ = !1, x = 0, C = 0, R = {};
        exports.init = function () {
            c();
            var t = v.asyncHandle();
            t.then(l), b.on('rcv:refresh', function (t) {
                if (e(t), t.tag && T)
                    T.refreshCode({ jsCode: g.getJsFunctionResult() });
            }), b.on('setAuth', f);
        }, exports.chat = t, exports.show = function () {
            T.show();
        };
    }), define('front/webim/main', [
        'require',
        '../base/emitter',
        '../data/config',
        '../common/identity',
        './lite',
        '../base/browser',
        '../storage/localStorage',
        '../base/lang',
        '../data/group',
        '../prevent/main'
    ], function (require) {
        function e() {
            var e = c.getRoot(), t = c.getImRoot(), n = t + 'im/index';
            if (e.indexOf('h.qiao.baidu.com') > -1)
                n = t + 'im/index';
            return n;
        }
        function t(t, n) {
            var i = e() + '?siteid=' + t.siteid + '&ucid=' + t.ucid + '&siteidstr=' + t.siteidstr + '&mainid=' + t.mainid + '&csNameType=2&csName=' + encodeURIComponent('\u5728\u7EBF\u5BA2\u670D') + '&userName=' + encodeURIComponent(t.userName) + '&groupName=' + encodeURIComponent(t.groupname) + '&groupid=' + t.groupid + '&sub=' + t.subid + '&distributeType=' + t.type + '&bid=' + n + '&tok=' + t.tok, r = navigator.userAgent, o = !!r.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (o) {
                var a = document.createElement('a');
                a.setAttribute('href', i), document.body.appendChild(a), setTimeout(function () {
                    a.click(), a.parentNode.removeChild(a);
                }, 0);
            } else
                window.open(i, 'BridgeImWindow');
        }
        function n(e) {
            var t, n, i, r = [];
            for (t in e)
                if (e.hasOwnProperty(t))
                    if (n = e[t], p.isArray(n))
                        for (i = n.length; i--;)
                            r.push(t + '=' + encodeURIComponent(n[i]));
                    else
                        r.push(t + '=' + encodeURIComponent(n));
            return r.join('&');
        }
        function i() {
            return g.hasLoginSub();
        }
        function r(r) {
            var o = c.getIsWebIm(), a = c.isAuthCode, w = c.isSecondVerify;
            if (o && !h)
                if (a)
                    return void v.authShow(function (e) {
                        c.authCode = e.code, u.emit('setAuth'), h = !0, u.emit('webim:open', r);
                    });
                else if (w)
                    return void v.secondShow(function () {
                        h = !0, u.emit('webim:open', r);
                    });
            if (r = r || {}, !i())
                return void u.emit('mess:center');
            var y = r.groupid, I = r.groupname, E = r.chat, T = r.subid, S = r.subname, N = c.getSiteId(), _ = c.getUcId(), x = m.getItem(d.getLSKey('bid')), C = b.webimtype, R = p.extend({}, c.getModelData());
            if (void 0 !== y) {
                var L = g.getGroupNameById(y);
                r.groupname = L, I = L;
            }
            if (void 0 !== T) {
                var O = g.getGroupBySub(T);
                r.subname = O.subname, r.groupid = O.groupid, r.groupname = O.groupname, y = O.groupid, S = O.subname, I = O.groupname;
            }
            if (void 0 === y)
                r.groupid = '', r.groupname = '', y = '';
            if (R.tid = y, '' !== T && void 0 !== T)
                R.type = 0, R.subid = T, R.subname = S;
            else
                R.type = 1, R.subid = '', R.subname = '', r.subid = '', r.subname = '';
            r.groupid = '' + r.groupid, r.subid = '' + r.subid;
            var A = new Date().getTime().toString(32), M = c.getModelData('ls') || '';
            if (f.isMobile) {
                var D = R.type;
                if (1 === D && ('' === y || void 0 === y))
                    D = 3;
                t({
                    type: D,
                    siteid: N,
                    ucid: _,
                    siteidstr: c.getSiteIdMd5(),
                    mainid: c.getMainId(),
                    userName: c.getUserName(),
                    groupname: I,
                    groupid: y,
                    subid: T,
                    tok: A
                }, x);
            } else if (!C) {
                r.ref = window.location.href;
                var k = 'siteid=' + N + '&ucid=' + _ + '&lastsubid=' + M + '&from=' + encodeURIComponent(c.getModelData('from')) + '&bid=' + x + '&tok=' + A + '&' + n(r), q = (window.screen.availWidth - 796) / 2, P = (window.screen.availHeight - 562) / 2, B = 'left=' + q + ',top=' + P + ',resizable=yes,width=795,height=561';
                if (!s || s && s.closed) {
                    var j = e();
                    s = window.open(j + '?' + k, 'BridgeImWindow', B);
                } else
                    s.focus();
                if (!s)
                    u.emit('stat', 'BLOCK_POP', {});
            } else {
                var H = {
                    type: R.type,
                    chattype: r.chattype,
                    tid: r.groupid,
                    subid: r.subid,
                    groupname: r.groupname,
                    from: c.getModelData('from'),
                    lastsubid: M,
                    siteid: N,
                    ucid: _,
                    chat: E
                };
                l.chat(H);
            }
            h = !1;
        }
        function o(i) {
            i = i || {};
            var r = i.groupid, o = i.subid, a = c.getSiteId(), l = c.getUcId(), v = m.getItem(d.getLSKey('bid')), b = p.extend({}, c.getModelData());
            if (void 0 !== o) {
                var h = g.getGroupBySub(o);
                if (h)
                    i.subname = h.subname, i.groupid = h.groupid, i.groupname = h.groupname;
                else
                    i.subid = '', i.subname = '', i.groupid = '', i.groupname = '';
            } else if (void 0 !== r) {
                var w = g.getGroupNameById(r);
                if (w && '\u5206\u7EC4' !== w)
                    i.groupname = w;
                else
                    i.groupid = '', i.groupname = '';
            }
            if (void 0 === i.groupid)
                i.groupid = '', i.groupname = '';
            if (void 0 === i.subid)
                i.subid = '', i.subname = '', b.type = 1;
            else
                b.type = 0;
            b.subid = i.subid, b.subname = i.subname, b.tid = i.groupid, i.subid = '' + i.subid, i.tid = i.groupid;
            var y = c.getModelData('ls') || '', I = b.type;
            if (1 === I && '' === i.groupid)
                I = 3;
            var E = new Date().getTime().toString(32);
            if (f.isMobile)
                t({
                    type: I,
                    siteid: a,
                    ucid: l,
                    siteidstr: c.getSiteIdMd5(),
                    mainid: c.getMainId(),
                    userName: c.getUserName(),
                    groupname: i.groupname,
                    groupid: i.groupid,
                    subid: i.subid,
                    tok: E
                }, v);
            else {
                var T = c.getModelData('from') ? c.getModelData('from') : '';
                i.ref = window.location.href;
                var S = 'siteid=' + a + '&ucid=' + l + '&lastsubid=' + y + '&from=' + encodeURIComponent(T) + '&bid=' + v + '&tok=' + E + '&' + n(i), N = (window.screen.availWidth - 796) / 2, _ = (window.screen.availHeight - 562) / 2, x = 'left=' + N + ',top=' + _ + ',resizable=yes,width=795,height=561';
                if (!s || s && s.closed) {
                    var C = e();
                    s = window.open(C + '?' + S, 'BridgeImWindow', x);
                } else
                    s.focus();
                if (!s)
                    u.emit('stat', 'BLOCK_POP', {});
            }
        }
        function a() {
            u.on('webim:open', r), u.on('windowChat:open', o);
        }
        var s, u = require('../base/emitter'), c = require('../data/config'), d = require('../common/identity'), l = require('./lite'), f = require('../base/browser'), m = require('../storage/localStorage'), p = require('../base/lang'), g = require('../data/group'), v = require('../prevent/main'), c = require('../data/config'), v = require('../prevent/main'), b = c.getStyleConfig('webim'), h = !1;
        return {
            init: function () {
                l.init(), a();
            }
        };
    }), define('front/net/img', ['require'], function (require) {
        'use strict';
        function e(e, n) {
            e += t(e, n.data);
            var i = new Image();
            i.onload = function () {
                if (i.onload = null, i.onerror = null, i = null, n.onsuccess)
                    n.onsuccess();
            }, i.onerror = function () {
                if (i.onload = null, i.onerror = null, i = null, n.onfail)
                    n.onfail();
            }, i.src = e;
        }
        function t(e, t) {
            var i = {}.toString.call(t), r = '?';
            if (e.indexOf('?') > -1)
                r = '&';
            if ('[object Object]' === i) {
                for (var o in t)
                    if (t.hasOwnProperty(o))
                        r += o + '=' + encodeURIComponent(t[o]) + '&';
                r += 't=' + n();
            }
            return r;
        }
        var n = function () {
            var e = 0;
            return function () {
                var t = new Date().getTime();
                return t += '_' + e++;
            };
        }();
        return { request: e };
    }), define('front/common/log', [
        'require',
        '../base/emitter',
        '../data/config',
        '../base/json',
        '../base/lang',
        '../net/img'
    ], function (require) {
        function e(e, t) {
            if (e && a[e]) {
                var s = o + '?siteid=' + n.getSiteId() + '&ucid=' + n.getUcId() + '&type=' + a[e];
                r.request(s, { data: i.extend({}, t) });
            }
        }
        var t = require('../base/emitter'), n = require('../data/config'), i = (require('../base/json'), require('../base/lang')), r = require('../net/img'), o = n.getRoot() + 'statlog/stat.gif', a = {
                SEND_INVITE: 'invite',
                CLICK_ICON: 'clickIcon',
                CLOSE_INVITE: 'inviteclose',
                CLICK_MESS: 'clickIconMess',
                BLOCK_POP: 'blockpop',
                ALREADY_OPEN: 'alreadyopen',
                OPEN_WEBIMLITE: 'openwebimlite',
                LOAD_TIME: 'loadtime'
            };
        return {
            init: function () {
                t.on('stat', e);
            }
        };
    }), define('front/common/stat', [
        'require',
        'exports',
        '../base/emitter',
        '../data/config',
        './log'
    ], function (require, exports) {
        function e() {
            return Math.floor(10000000000 * Math.random());
        }
        function t(e) {
            var t = new Image(), n = m + '?' + e;
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
            var i = 'si=' + l.siteId + '&et=99&ep=' + l.mainId;
            i += r(n), i = i + g + e(), t(i);
        }
        function r(e) {
            var t, n, i = '', r = b.length;
            for (t = 0; r > t; t++)
                n = b[t], i += '' === e[n] ? '*' + p : '*' + e[n];
            return i;
        }
        function o(e) {
            if (h.visitor_count)
                n(f, e), f.eventId = v.VISITOR_IM, f.count = h.visitor_count, f.valid = 1, i(f), h.visitor_count = 0, f.valid = 0;
        }
        function a(e) {
            if (!e.chatId)
                h.visitor_count += e.count;
            else
                n(f, e), f.eventId = v.VISITOR_IM, f.valid = 1, i(f), h.visitor_count = 0, f.valid = 0;
        }
        function s(e, t) {
            if (e && v[e])
                switch (l.siteId = l.siteId || c.getSiteIdMd5() || 0, l.mainId = l.mainId || c.getMainId() || 0, e = e.toUpperCase()) {
                case 'VISITOR_IM':
                    a(t);
                    break;
                case 'START_IM':
                    o(t);
                    break;
                default:
                    n(f, t), f.eventId = v[e], i(f);
                }
        }
        var u = require('../base/emitter'), c = require('../data/config'), d = require('./log'), l = {
                siteId: '',
                mainId: ''
            }, f = {
                mainId: '',
                subId: '',
                sessionId: '',
                eventId: '',
                chatId: '',
                from: '',
                open: '',
                valid: '',
                count: ''
            }, m = 'http://hm.baidu.com/hm.gif', p = 0, g = '&nv=0&st=4&v=bridge-0.2&rnd=', v = {
                REFRESH_IM: 1,
                SEND_INVITE: 3,
                ACCEPT_INVITE: 4,
                SEND_MESS: 5,
                VISITOR_IM: 6,
                SERVER_IM: 7,
                START_IM: 0
            }, b = [
                'subId',
                'sessionId',
                'eventId',
                'chatId',
                'from',
                'open',
                'valid',
                'count'
            ], h = { visitor_count: 0 };
        return window.BDBridgeStat = function (e, t, n) {
            s(e, n);
        }, function () {
            u.on('stat', s), d.init();
        };
    }), define('front/rcv/leave', [
        'require',
        '../base/event',
        '../base/emitter',
        '../net/img',
        '../base/string',
        '../data/config'
    ], function (require) {
        function e(t) {
            if (!c) {
                c = !0, n.un(window, 'unload', e), d.bid = t.bid || d.bid, d.siteid = t.siteid || d.siteid, d.ucid = t.ucid || d.ucid;
                var s = {
                    data: {
                        bid: d.bid,
                        siteid: d.siteid,
                        ucid: d.ucid
                    }
                };
                if (d.bid) {
                    var l = a.getJsFunctionResult();
                    if (l || 0 === l) {
                        var f = { jscode: l };
                        f = o.objectToString(f), s.data.tag = f;
                    }
                    r.request(u.LEAVE, s), i.emit('rcv:leave', s.data);
                }
            }
        }
        function t(t) {
            d.bid = t.bid || '', d.siteid = t.siteid || '', d.ucid = t.ucid || '', n.on(window, 'unload', e, !1), n.on(window, 'beforeunload', e, !1);
        }
        var n = require('../base/event'), i = require('../base/emitter'), r = require('../net/img'), o = require('../base/string'), a = require('../data/config'), s = a.getRcvRoot(), u = { LEAVE: s + 'Leave.php' }, c = !1, d = { state: 0 };
        return {
            init: t,
            leave: e
        };
    }), define('front/log/log', ['require'], function (require) {
        var e = 'http://sc.qiao.baidu.com/';
        return {
            sendLog: function (module, t, n) {
                var i = e + module + '/' + t + '.gif?';
                for (var r in n)
                    i += r + '=' + encodeURIComponent(n[r]) + '&';
                i = i.substring(0, i.length - 1);
                var o = new Image();
                o.src = i;
            }
        };
    }), define('front/rcv/refresh', [
        'require',
        '../net/jsonp',
        '../base/emitter',
        '../base/string',
        '../data/config',
        '../log/log'
    ], function (require) {
        function e(e) {
            if (e.tag) {
                var t = {
                    bid: I.bid || '',
                    s: 'web',
                    siteid: I.siteid || '',
                    t: new Date().getTime(),
                    type: 2,
                    op: e.tag.op
                };
                if (e.tag.op === b)
                    a.setJsFunction(e.tag.val), t.val = encodeURIComponent(e.tag.val);
                else if (e.tag.op === h)
                    a.isAuthCode = !0;
                else if (e.tag.op === w)
                    a.isSecondVerify = !0;
                t.jsfunction = encodeURIComponent(a.jscodeForLog()), t.jscode = encodeURIComponent(a.getJsFunctionResult()), s.sendLog(module, y, t);
            }
            if (v = p, I.callback)
                I.callback(e);
            else if (0 === e.saved)
                E.stop();
            r.emit('rcv:refresh', e);
        }
        function t() {
            var e = {
                bid: I.bid || '',
                s: 'web',
                siteid: I.siteid || '',
                t: new Date().getTime(),
                type: 1
            };
            s.sendLog(module, y, e), v = p;
        }
        function n() {
            if (m) {
                v = g;
                var r = {
                        data: {
                            bid: I.bid || '',
                            siteid: I.siteid || '',
                            ucid: I.ucid || ''
                        },
                        onsuccess: e,
                        onfail: t
                    }, s = a.getJsFunctionResult();
                if (s || 0 === s) {
                    var u = { jscode: s };
                    u = o.objectToString(u), r.data.tag = u;
                }
                i.request(c.REFRESH, r), setTimeout(function () {
                    n();
                }, I.refreshTime);
            }
        }
        var i = require('../net/jsonp'), r = require('../base/emitter'), o = require('../base/string'), a = require('../data/config'), s = require('../log/log'), u = a.getRcvRoot(), c = {
                REFRESH: u + 'Refresh.php',
                REJECT: u + 'Reject.php'
            }, d = 5000, l = 15000, f = function () {
            }, m = !0, p = 1, g = 2, v = 1, b = 2, h = 4, w = 3, module = 'attack', y = 'attack', I = {
                siteid: '',
                bid: '',
                ucid: '',
                refreshTime: d,
                timeout: l,
                callback: f,
                timer: null
            }, E = {};
        return E.start = function (e) {
            I.siteid = e.siteid, I.ucid = e.ucid, I.bid = e.bid || '', I.refreshHandler = e.callback || f, I.refreshTime = e.refreshTime || d, m = !0, n();
        }, E.stop = function () {
            m = !1;
        }, E.revert = function () {
            if (v != p)
                setTimeout(function () {
                    E.revert();
                }, 500);
            else
                m = !0, n();
        }, E;
    }), define('front/rcv/entered', [
        'require',
        'exports',
        '../base/emitter',
        './refresh',
        './leave',
        '../base/json',
        '../net/img',
        '../data/group',
        '../common/identity',
        '../data/config',
        '../prevent/main',
        '../base/string',
        '../log/log',
        '../storage/localStorage'
    ], function (require, exports) {
        function e(e, t) {
            var n = d.getLSKey(e), i = t || '';
            g.setItem(n, i);
        }
        function t(t) {
            var n = {
                bid: t.bid || '',
                s: 'web',
                siteid: l.getSiteId() || '',
                t: new Date().getTime(),
                type: 3,
                loadingtime: new Date().getTime() - l.getStartTime()
            };
            if (p.sendLog(module, w, n), t.jscode)
                l.setJsFunction(t.jscode);
            if (t.isAuthCode)
                if (l.isAuthCode = !0, t.url) {
                    var i = l.getImRoot();
                    f.URL.SEND_CODE = i + t.url.checkurl, f.URL.GET_CODE = i + t.url.geturl;
                }
            if (t.isSecondVerify)
                l.isSecondVerify = !0;
            b.bid = t.bid;
            var r = {
                bid: t.bid,
                siteid: l.getSiteId(),
                ucid: l.getUcId(),
                from: t.from,
                word: t.word,
                wordid: t.wordid,
                wordtype: t.wordtype,
                referrer: t.referrer,
                title: t.title,
                location: t.location,
                peerid: t.peerid
            };
            if (t.zhixin && (r.zhixin = t.zhixin), 'undefined' != typeof t.ls)
                r.ls = t.ls + '';
            var o = t.service_type;
            o && o > 0 && (r.servertype = t.service_type), l.setModelData(r), e('bid', t.bid);
        }
        function n(e) {
            var t = {
                bid: b.bid,
                siteid: l.getSiteId(),
                ucid: l.getUcId()
            };
            if (l.getJsFunctionResult() || 0 === l.getJsFunctionResult()) {
                var n = { jscode: l.getJsFunctionResult() };
                n = m.objectToString(n), t.tag = n;
            }
            u.request(h.REJECT, { data: t });
        }
        function i() {
            o.on('rcv:reject', n);
        }
        function r(e, n) {
            if (0 === b.state) {
                b.state = 1;
                var r = {
                        siteid: e.siteid || '',
                        ucid: e.ucid || '',
                        bid: e.bid || n.bid
                    }, u = {
                        siteid: e.siteid || '',
                        ucid: e.ucid || '',
                        bid: e.bid || n.bid
                    };
                t(n), i(), a.start(r), s.init(u), c.handleGroup(n), o.emit('rcv:enter', n);
                var d = l.getStartTime() || new Date().getTime(), f = new Date().getTime(), m = f - d;
                o.emit('stat', 'LOAD_TIME', { cost: m });
            }
        }
        var o = require('../base/emitter'), a = require('./refresh'), s = require('./leave'), u = (require('../base/json'), require('../net/img')), c = require('../data/group'), d = require('../common/identity'), l = require('../data/config'), f = require('../prevent/main'), m = require('../base/string'), f = require('../prevent/main'), m = require('../base/string'), p = require('../log/log'), g = require('../storage/localStorage'), v = l.getRcvRoot(), b = { state: 0 }, h = { REJECT: v + 'Reject.php' }, module = 'attack', w = 'attack';
        return r;
    }), require([
        'front/common/identity',
        'front/data/config',
        'front/common/stat',
        'front/storage/localStorage',
        'front/rcv/entered',
        'front/webim/main'
    ], function (e, t, n, i, r, o) {
        function a() {
            var t = e.getBSLNs();
            return t.data || null;
        }
        function s(t) {
            var n = e.getBSLNs();
            n.callback = t;
        }
        function u(e) {
            r({
                siteid: c,
                ucid: d,
                bid: l
            }, e);
        }
        n();
        var c = t.getSiteId(), d = t.getUcId(), l = i.getItem(e.getLSKey('bid'));
        o.init();
        var f = a();
        if (f)
            return void u(f);
        else
            return void s(u);
    });
}(qiao.define, qiao.require));