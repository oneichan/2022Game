phina.define('AnimateButton', {
    superClass: 'Button',
    /**
     * @constructor
     */
    init: function(options) {
      options = (options || {}).$safe(AnimateButton.defaults);
      this.superInit(options);

      this.fontFamily = 'noto';
      
      // 独自プロパティ
      var scaleMin = options.scaleMin;
      // プッシュ時の処理を追加
      this.on('pointstay', function() {
        // 少し縮小
        this.setScale(scaleMin, scaleMin);
      });
      this.on('pointend', function() {
        // 元に戻す
        this.setScale(1.0, 1.0);
      });
    },
    
    _static: {
      defaults: {
        scaleMin: 0.95,
      },
    },
  });

phina.define('NotoLabel', {
  superClass: 'Label',
  init: function (options) {
    options = (options || {}).$safe(NotoLabel.defaults);
    this.superInit(options);
    this.fontSize = 40;
    this.fontFamily = 'noto';
  },
   
  _static: {
    defaults: {
      
    },
  },  
});