(function() {
    var e, t, n = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    t = {
        noJobs: {
            fr: "D\xe9sol\xe9, nous n'avons pas d'offres en ce moment.",
            en: "Sorry, no job opening available at this time."
        },
        startDate: {
            fr: "Date de d\xe9but :",
            en: "Start Date:"
        }
    }, window.welcomeKitReady = function(e) {
        return "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
    }, e = function() {
        function e(e, t) {
            null == t && (t = "welcomekit-"), this.renderOffices = n(this.renderOffices, this), this.renderDepartments = n(this.renderDepartments, this), this.renderWidget = n(this.renderWidget, this), this.render = n(this.render, this), this.classPrefix = t, this.reference = e, this.data = null, this.options = {
                group: "job",
                locale: "fr",
                display: [],
                website: null
            }, this.offices = [], this.departments = []
        }
        return e.prototype.group = function(e) {
            return this.options.group = e
        }, e.prototype.display = function(e) {
            return this.options.display = Array.isArray(e) ? e : JSON.parse(e)
        }, e.prototype.locale = function(e) {
            return this.options.locale = e
        }, e.prototype.website = function(e) {
            return this.options.website = e
        }, e.prototype.render = function() {
            return this.fetch(this.renderWidget)
        }, e.prototype.fetch = function(e) {
            var t;
            return t = new XMLHttpRequest, t.open("GET", "https://www.welcomekit.co/api/v1/embed?organization_reference=" + this.reference, !0), t.onload = function() {
                return t.status >= 200 && t.status < 400 ? e(JSON.parse(t.responseText)) : console.log("Fail to load WTTJ widget")
            }, t.onerror = function() {
                return console.log("Fail to load WTTJ widget")
            }, t.send()
        }, e.prototype.renderWidget = function(e) {
            var t, n, r, i, s, o;
            if (this.data = e, t = [], n = [], 0 === this.data.jobs.length) return this.$container().appendChild(this.renderNothing());
            for (o = this.data.jobs, i = 0, s = o.length; i < s; i++) r = o[i], r.department && -1 === t.indexOf(r.department.id) && (t.push(r.department.id), this.departments.push(r.department)), r.office && -1 === n.indexOf(r.office.id) && (n.push(r.office.id), this.offices.push(r.office));
            return "office" === this.options.group ? this.renderOffices() : "department" === this.options.group ? this.renderDepartments() : this.$container().appendChild(this.renderJobs(e.jobs))
        }, e.prototype.$container = function() {
            return null != this._container ? this._container : this._container = document.getElementById("welcomekit-embed")
        }, e.prototype.renderDepartments = function() {
            var e, t, n, r, i;
            for (e = document.createElement("div"), e.className = this.classPrefix + "departments", i = this.departments.sort(function(e, t) {
                    return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
                }), n = 0, r = i.length; n < r; n++) t = i[n], e.appendChild(this.renderDepartment(t));
            return this.$container().appendChild(e)
        }, e.prototype.renderDepartment = function(e) {
            var t, n, r, i;
            return r = document.createElement("div"), r.className = this.classPrefix + "department", e.name && (i = document.createElement("h2"), i.className = this.classPrefix + "department-name", i.innerHTML = e.name, r.appendChild(i)), n = function() {
                var n, r, i, s;
                for (i = this.data.jobs, s = [], n = 0, r = i.length; n < r; n++) t = i[n], t.department && t.department.id === e.id && s.push(t);
                return s
            }.call(this), r.appendChild(this.renderJobs(n)), r
        }, e.prototype.renderOffices = function() {
            var e, t, n, r, i;
            for (e = document.createElement("div"), e.className = this.classPrefix + "offices", i = this.offices.sort(function(e, t) {
                    return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
                }), t = 0, n = i.length; t < n; t++) r = i[t], e.appendChild(this.renderOffice(r));
            return this.$container().appendChild(e)
        }, e.prototype.renderOffice = function(e) {
            var t, n, r, i;
            return r = document.createElement("div"), r.className = this.classPrefix + "office", e.city && (i = document.createElement("h2"), i.className = this.classPrefix + "office-city", i.innerHTML = e.city, r.appendChild(i)), n = function() {
                var n, r, i, s;
                for (i = this.data.jobs, s = [], n = 0, r = i.length; n < r; n++) t = i[n], t.office && t.office.id === e.id && s.push(t);
                return s
            }.call(this), r.appendChild(this.renderJobs(n)), r
        }, e.prototype.renderJobs = function(e) {
            var t, n, r, i, s;
            for (t = document.createElement("ul"), t.className = this.classPrefix + "jobs-list", s = e, r = 0, i = s.length; r < i; r++) n = s[r], t.appendChild(this.renderJob(n));
            return t
        }, e.prototype.renderJob = function(e) {
            var n, r, i, s, o, a, c, d, l;
            s = document.createElement("li"), s.className = this.classPrefix + "jobs-list-item", a = document.createElement("a"), a.className = this.classPrefix + "jobs-list-item-link", a.href = this.jobUrl(e), a.target = "_blank", c = document.createElement("h3"), c.className = this.classPrefix + "job-name", c.innerHTML = e.name, a.appendChild(c), s.appendChild(a), i = document.createElement("ul"), i.className = this.classPrefix + "job-infos", d = this.options.display;
            for (n in d) {
                switch (o = d[n], r = document.createElement("li"), o) {
                    case "description":
                        l = e.description;
                        break;
                    case "department":
                        l = e.department ? e.department.name : "";
                        break;
                    case "officeCity":
                        l = e.office ? e.office.city : "";
                        break;
                    case "officeCountry":
                        l = e.office ? e.office.country[this.options.locale] : "";
                        break;
                    case "contractType":
                        l = e.contract_type ? e.contract_type[this.options.locale] : "";
                        break;
                    case "createdAt":
                        l = e.created_at[this.options.locale];
                        break;
                    case "startDate":
                        l = e.start_date ? t.startDate[this.options.locale] + " " + e.start_date[this.options.locale] : "";
                        break;
                    default:
                        l = null
                }
                l && (r.className = this.classPrefix + "job-" + o, r.innerHTML = l, i.appendChild(r))
            }
            return a.appendChild(i), s
        }, e.prototype.renderNothing = function() {
            var e;
            return e = document.createElement("div"), e.className = this.classPrefix + "warning", e.innerHTML = t.noJobs[this.options.locale], e
        }, e.prototype.jobUrl = function(e) {
            var t;
            return e.websites_urls.length ? (t = e.websites_urls.filter(function(e) {
                return function(t) {
                    return t.website_reference === e.options.website || "wk-careers_" + t.website_reference === e.options.website
                }
            }(this)), t.length ? t[0].url : e.websites_urls[0].url) : this.data.websites[0].root_url
        }, e
    }(), window.WelcomeKitEmbed = e
}).call(this);


