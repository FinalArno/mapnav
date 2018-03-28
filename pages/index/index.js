//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    markers: [{
      iconPath: "../../resources/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 18,
      height:24
    }],
    controls: [{
      id: 1,
      iconPath: '../../resources/others.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 56,
        height: 56
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=23.10229,113.3245211&to=23.21229,113.324520&output=json&callback=cb&key=TSDBZ-EGJRK-ZSMJB-ATLZ6-XJNV5-2OFH5',
      success: function (e) {
        // console.log(e.data.result.routes[0].polyline)
        var coors = e.data.result.routes[0].polyline
        var _polyline = []
        for (var i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
          if (i % 2 != 0) {
            _polyline.push({
              longitude: coors[i],
              latitude: coors[i-1]
            })
          }
        }
        _polyline.unshift({
          longitude: 113.3245211,
          latitude: 23.10229
        })
     //   console.log(_polyline)
        that.setData({
          polyline:[{
            points: _polyline,
            color: "#FF0000DD",
            width: 3
          }]
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },

})
