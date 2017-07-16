/* ========================================================================
 * CircularCountdown v1.0.0
 * ========================================================================
 * Copyright 2014-2015 Playntek
 * Author Sébastien Doutre - http://sebastien-doutre.playntek.fr/
 * Licensed under MIT (https://github.com/Playntek/CircularCountdown/LICENSE)
 * ======================================================================== */

if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

+function ($) {
  'use strict';

  var CircularCountdown = function(element, options){
    this.cvs      =
    this.options  =
    this.$element = null
    this.diff_time = 0
    this.init(element, options)
  }

  CircularCountdown.PLUGIN_NAME = 'CircularCountdown'
  CircularCountdown.VERSION = '1.0.0'

  CircularCountdown.DEFAULT = {
    def_color : '#000',
    padding   : 10,
    max_w     : 360,
    epaisseur : 20,
    interval  : 100
  }

  CircularCountdown.UNITS = {
    'DAYS'    : { s: 86400000, max: 365 },
    'HOURS'   : { s: 3600000,  max: 24  },
    'MINUTES' : { s: 60000,    max: 60  },
    'SECONDS' : { s: 1000,     max: 60  },
    'TENTHSEC': { s: 10,       max: 100 }
  }

  CircularCountdown.FLATCOLOR = {
      'green-sea'     : '#16A085',
      'emerland'      : '#2ECC71',
      'nephritis'     : '#27AE60',
      'peter-river'   : '#3498DB',
      'belize-hole'   : '#2980B9',
      'amethyst'      : '#9B59B6',
      'wisteria'      : '#8E44AD',
      'wet-asphalt'   : '#34495E',
      'midnight-blue' : '#2C3E50',
      'night-shade'   : '#22313F',
      'sun-flower'    : '#F1C40F',
      'orange'        : '#F39C12',
      'carrot'        : '#E67E22',
      'pumpkin'       : '#D35400',
      'alizarin'      : '#E74C3C',
      'pomegranate'   : '#C0392B',
      'clouds'        : '#ECF0F1',
      'silver'        : '#BDC3C7',
      'concrete'      : '#95A5A6',
      'asbestos'      : '#7F8C8D'
  }

  CircularCountdown.prototype.init = function (element, options){
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.cvs       = this.$element.find('canvas')

    for (var i = 0; i <= this.cvs.length-1; i++) {
      this.cvs[i].cvs_name      = this.cvs[i].id.toUpperCase()
      this.cvs[i].unit          = this.getUnit(this.cvs[i].cvs_name)
    }

    setInterval($.proxy(this.cycle, this), this.options.interval);
  }

  CircularCountdown.prototype.getOptions = function(options){
    options.color = this.getColor(options.color)
    options.fcolor = this.getColor(options.fcolor)
    return options
  }

  CircularCountdown.prototype.getColor = function(color){
    if (color == undefined) {
      return CircularCountdown.DEFAULT.def_color
    } else if (color == ""){
      throw new Error(CircularCountdown.PLUGIN_NAME + ' - ' + CircularCountdown.VERSION + ' : color is empty')
    } else if (this.getFlatColor(color)) {
      return this.getFlatColor(color)
    } else {
      return 'rgb(' + color + ')'
    }
  }

  CircularCountdown.prototype.getUnit = function(unit){
    if (CircularCountdown.UNITS[unit]) {
      return CircularCountdown.UNITS[unit]
    }else{
      throw new Error(CircularCountdown.PLUGIN_NAME + ' - ' + CircularCountdown.VERSION + ' : Unit [' + unit + '] not valid. Please use days, hours, minutes, seconds and tenth of seconds')
    }
  }

  CircularCountdown.prototype.getFlatColor = function(color){
    return CircularCountdown.FLATCOLOR[color] ? CircularCountdown.FLATCOLOR[color] : false
  }

  CircularCountdown.prototype.resize = function(cvs){
    cvs.w = ($(cvs).parent().width()) <= CircularCountdown.DEFAULT.max_w ? $(cvs).parent().width() : CircularCountdown.DEFAULT.max_w
    cvs.h = cvs.w                  
    cvs.r = (cvs.w - CircularCountdown.DEFAULT.epaisseur - CircularCountdown.DEFAULT.padding)/2

    cvs.setAttribute('width',cvs.w)         
    cvs.setAttribute('height',cvs.h)

    $(cvs).css({ width: cvs.w+"px", height: cvs.h+"px" })
    cvs.ctx = cvs.getContext('2d')   
    cvs.ctx.textAlign = 'center'
  }

  CircularCountdown.prototype.cycle = function(){
    this.diff_time = $.now() - (new Date(this.options.to).getTime())

    for (var j = 0; j <= 3; j++) {
      this.resize(this.cvs[j]);
      this.draw(this.cvs[j]); 
    }
  }

  CircularCountdown.prototype.draw = function(cvs){
    var pos_x
    var pos_y
    var value
    var seconds = cvs.unit.s

    value = parseFloat(this.diff_time/seconds)
    this.diff_time-=Math.round(parseInt(value)) * seconds
    value = Math.abs(value)
    
    var degrees = 360-(value / cvs.unit.max) * 360.0
    var endAngle = degrees * (Math.PI / 180)
    
    cvs.ctx.save()
    cvs.ctx.clearRect(0,0,cvs.w,cvs.h)

    cvs.ctx.strokeStyle = "rgba(128,128,128,0.2)"
    cvs.ctx.beginPath()
    cvs.ctx.arc(cvs.w/2, cvs.h/2, cvs.r, 0, 2 * Math.PI, 2)
    cvs.ctx.lineWidth = this.options.epaisseur
    cvs.ctx.stroke()
   
    cvs.ctx.strokeStyle = this.options.color
    cvs.ctx.beginPath()
    cvs.ctx.arc(cvs.w/2, cvs.h/2, cvs.r, 0, endAngle, 1)
    cvs.ctx.lineWidth = this.options.epaisseur
    cvs.ctx.stroke()
    
    cvs.ctx.fillStyle = this.options.fcolor

    cvs.ctx.font = cvs.h*0.10 + 'px Helvetica,Arial,sans-serif'
    cvs.ctx.fillText(cvs.cvs_name, cvs.w/2, cvs.h/2 + (cvs.h*0.10))
    
    cvs.ctx.font = 'bold ' + cvs.h*0.30 + 'px Helvetica,Arial,sans-serif'
    cvs.ctx.fillText(Math.floor(value), cvs.w/2, cvs.h/2)
    
    cvs.ctx.restore();
  }

  // CIRCULAR COUNTDOWN PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.circularcountdown')
      var options = $.extend({}, CircularCountdown.DEFAULT, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.circularcountdown', (data = new CircularCountdown(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.circularcountdown

  $.fn.circularcountdown             = Plugin
  $.fn.circularcountdown.Constructor = CircularCountdown

  // CIRCULAR COUNTDOWN NO CONFLICT
  // =====================

  $.fn.circularcountdown.noConflict = function () {
    $.fn.circularcountdown = old
    return this
  }

  // CIRCULAR COUNTDOWN DATA-API
  // ==================
  $(window).on('load', function () {
    $('[data-toggle="circularcountdown"]').each(function () {
      var $circularcountdown = $(this)
      Plugin.call($circularcountdown, $circularcountdown.data())
    })
  })

}(jQuery);