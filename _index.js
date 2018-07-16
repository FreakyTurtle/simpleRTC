! function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var a = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(i, a, function(t) {
                return e[t]
            }.bind(null, a));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }();
    var a = {
            optional: [{
                minWidth: 320
            }, {
                minWidth: 640
            }, {
                minWidth: 1024
            }, {
                minWidth: 1280
            }]
        },
        o = {
            iceServers: [{
                urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
            }]
        };
    t.getMedia = function() {
        var e = {
            video: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
            audio: !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
        };
        return new Promise(function(t, n) {
            navigator.mediaDevices.getUserMedia(e).then(function(e) {
                t(e)
            }).catch(function(e) {
                n(e)
            })
        })
    }, t.Bond = function() {
        function e(t, n, i) {
            var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [250, 2250],
                d = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : o;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), console.log("=== CONSTRUCTOR ==="), this.localStream = t, this.remoteStream, this.id = n, this.callbacks = a, this.sendMessage = i, this.servers = d, this.bandwidth = s, this.pc = new RTCPeerConnection(this.servers), this.handleIceCandidate = this.handleIceCandidate.bind(this), this.handleRemoteStreamAdded = this.handleRemoteStreamAdded.bind(this), this.handleRemoteStreamRemoved = this.handleRemoteStreamRemoved.bind(this), this.onDataChannelOpen = this.onDataChannelOpen.bind(this), this.onDataChannelReceive = this.onDataChannelReceive.bind(this), this.getBandwidth = this.getBandwidth.bind(this), this.dataChannel = this.pc.createDataChannel("data", {
                negotiated: !0,
                id: 7
            }), this.dataChannel.onopen = this.onDataChannelOpen, this.dataChannel.onmessage = this.onDataChannelReceive, this.pc.onicecandidate = this.handleIceCandidate, this.pc.onaddstream = this.handleRemoteStreamAdded, this.pc.onremovestream = this.handleRemoteStreamRemoved, this.pc.addStream(this.localStream)
        }
        return i(e, [{
            key: "createAndSendOffer",
            value: function() {
                var e = this;
                console.log("=== CREATE AND SEND OFFER ==="), this.pc.createOffer().then(function(t) {
                    e.pc.setLocalDescription(t), t.sdp = e.setSessionDescriptionBandwidth(t.sdp), e.sendMessage(t)
                }).catch(function(e) {
                    console.error("Failed to create session description: " + e.toString())
                })
            }
        }, {
            key: "receivedOffer",
            value: function(e) {
                console.log("=== RECEIVED OFFER ==="), this.pc.setRemoteDescription(new RTCSessionDescription(e));
                var t = this.getBandwidth(e.sdp);
                this.bandwidth[0] + this.bandwidth[0] > t[0] + t[1] && (this.bandwidth = t), this.createAndSendAnswer()
            }
        }, {
            key: "createAndSendAnswer",
            value: function() {
                var e = this;
                console.log("=== CREATE AND SEND ANSWER ==="), this.pc.createAnswer().then(function(t) {
                    e.pc.setLocalDescription(t), t.sdp = e.setSessionDescriptionBandwidth(t.sdp), e.sendMessage(t, e.id)
                }).catch(function(e) {
                    console.error("Failed to create session description: " + e.toString())
                })
            }
        }, {
            key: "receivedAnswer",
            value: function(e) {
                console.log("=== RECEIVED ANSWER ==="), this.pc.setRemoteDescription(new RTCSessionDescription(e))
            }
        }, {
            key: "receivedIceCandidate",
            value: function(e) {
                var t = new RTCIceCandidate({
                    sdpMLineIndex: e.label,
                    candidate: e.candidate
                });
                this.pc.addIceCandidate(t)
            }
        }, {
            key: "handleIceCandidate",
            value: function(e) {
                e.target;
                e.candidate && (console.log("icecandidate event: ", e), e.candidate ? this.sendMessage({
                    type: "candidate",
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate
                }, this.id) : console.log("End of candidates."))
            }
        }, {
            key: "handleRemoteStreamAdded",
            value: function(e) {
                this.remoteStream = e.stream, this.callbacks.remoteStreamAdded && this.callbacks.remoteStreamAdded(this.remoteStream, this.id)
            }
        }, {
            key: "handleRemoteStreamRemoved",
            value: function(e) {
                this.remoteStream = null, this.callbacks.remoteStreamRemoved && this.callbacks.remoteStreamRemoved(this.id)
            }
        }, {
            key: "hangup",
            value: function() {
                this.pc.close(), this.pc = null, this.sendMessage("bye", this.id)
            }
        }, {
            key: "handleRemoteHangup",
            value: function() {
                this.pc.close(), this.pc = null
            }
        }, {
            key: "onDataChannelOpen",
            value: function(e) {
                console.log("=== DATA CHANNEL OPEN ===")
            }
        }, {
            key: "onDataChannelReceive",
            value: function(e) {
                console.log("received data", e), this.callbacks.onDataReceive(e)
            }
        }, {
            key: "sendData",
            value: function(e) {
                this.dataChannel.send(e)
            }
        }, {
            key: "getIceConnectionState",
            value: function() {
                return !!this.pc && this.pc.iceConnectionState
            }
        }, {
            key: "getLocalStream",
            value: function() {
                return this.localStream
            }
        }, {
            key: "getRemoteStream",
            value: function() {
                return this.remoteStream
            }
        }, {
            key: "getCallbacks",
            value: function() {
                return this.callbacks
            }
        }, {
            key: "getSendMessage",
            value: function() {
                return this.sendMessage
            }
        }, {
            key: "getConnection",
            value: function() {
                return this.pc
            }
        }, {
            key: "getServers",
            value: function() {
                return this.servers
            }
        }, {
            key: "setBandwidth",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [250, 2250];
                this.bandwidth = e, this.createAndSendOffer()
            }
        }, {
            key: "getBandwidth",
            value: function(e) {
                for (var t = e.split("\n"), n = [], i = 0; i < t.length; i++) t[i].indexOf("b=AS:") > -1 && n.push(parseInt(t[i].split(":")[1]));
                return n
            }
        }, {
            key: "setSessionDescriptionBandwidth",
            value: function(e) {
                for (var t = e.split("\n"), n = 0, i = 0, a = 0; a < t.length; a++) {
                    var o = t[a];
                    o.indexOf("m=audio") > -1 && (t[a + 2].indexOf("b=AS") > -1 ? t[a + 2] = "b=AS:" + this.bandwidth[0] : n = a + 2), o.indexOf("m=video") > -1 && (t[a + 2].indexOf("b=AS") > -1 ? t[a + 2] = "b=AS:" + this.bandwidth[1] : i = a + 2)
                }
                return n > 0 && t.splice(n, 0, "b=AS:" + this.bandwidth[0]), i && t.splice(n > 0 ? i + 1 : i, 0, "b=AS:" + this.bandwidth[1]), t.join("\n")
            }
        }]), e
    }()
}]);